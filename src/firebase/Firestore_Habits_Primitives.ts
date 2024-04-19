import { addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc } from "firebase/firestore"
import { db } from "./InitialisationFirebase"
import { listKeyIDfromArray } from "../primitives/BasicsMethods"
import { createDefaultStepFromHabit } from "../primitives/StepMethods"
import { removeHabitLogs } from "./Firestore_Step_Primitives"
import { getUpdatedStreakOfHabit, stringToFrequencyType } from "../primitives/HabitMethods"
import { FormDetailledHabit } from "../types/FormHabitTypes"
import { FirestoreHabit, FirestoreStep } from "../types/FirestoreTypes/FirestoreHabitTypes"
import { FrequencyTypes, Habit, HabitList, StepList, StreakValues } from "../types/HabitTypes"
import { UserEventRequest } from "../data/UserContext"
const setupHabit = (habit: FormDetailledHabit): FirestoreHabit => {

    const todayDateString = new Date().toISOString()
    const startingDate = habit.startingDate ?? todayDateString
    const objectifID = habit.objectifID ?? null

    const settedUpHabit: FirestoreHabit = { 
        ...habit, 
        startingDate, 
        objectifID,
        bestStreak: 0,
        currentStreak: 0, 
        lastCompletionDate: "none",
        steps: habit.steps.map((step) => ({...step, created: startingDate}))
    }

    return settedUpHabit
}

const addHabitToFireStore = async(habit: FormDetailledHabit, userID: string): Promise<Habit> => {
    console.log("adding habit to firestore...")

    const userDoc = doc(db, "Users", userID)

    const habitToAdd: FirestoreHabit = setupHabit(habit)

    const habitRef = await addDoc(collection(userDoc, "Habits"), habitToAdd)
    const habitID = habitRef.id

    let oldSteps: FirestoreStep[];

    if(habitToAdd.steps[0].numero === -1)
        oldSteps = [createDefaultStepFromHabit(habitToAdd, habitID)]   

    else oldSteps = habitToAdd.steps

    oldSteps = oldSteps.map(step => ({...step}))

    const steps: StepList  = listKeyIDfromArray(oldSteps, "stepID", habitID)
      
    console.log("Habit well added to firestore with id : ", habitID)

    const frequency: FrequencyTypes = stringToFrequencyType(habitToAdd.frequency)
    const startingDate =  new Date(habitToAdd.startingDate)

    return {...habitToAdd, objectifID: habitToAdd.objectifID ?? undefined, startingDate, habitID, steps, frequency}
}

const addRefHabitToFirestore = async (habitData: UserEventRequest, userID: string) => {
    console.log("Adding ref habit to Firestore...");

    try {
        const userDoc = doc(db, "Users", userID)
        const habitRef = await setDoc(doc(userDoc, "SharedHabits", habitData.habitID), habitData)

        console.log("Habit reference successfully added");
    } catch (error) {
        console.error("Error adding habit reference to Firestore:", error);
    }
};

interface HabitsFromFirestoreRetrieve {
    habits: HabitList,
    history: {[key: string]: Date[]}
}

const getAllOwnHabits = async(userID: string): Promise<HabitsFromFirestoreRetrieve> => {

    const today = new Date()
    const userDoc = doc(db, "Users", userID)

    const qry = query(collection(userDoc, "Habits"));
    const querySnapshot = await getDocs(qry)

    const habitsHistory: {[key: string]: Date[]} = {}

    const habitArray: Habit[] = await Promise.all(
        querySnapshot.docs.map(async (habit) => {
        const habitID = habit.id;

        const data = habit.data() as FirestoreHabit;
        let steps: StepList = {}

        const notPlaceholderSteps = data.steps.filter((step: FirestoreStep) => (step.numero !== -1))
        steps = listKeyIDfromArray(notPlaceholderSteps, "stepID", habitID)
 
        if(notPlaceholderSteps.length < data.steps.length || notPlaceholderSteps.length === 0){
            steps[habitID] = createDefaultStepFromHabit(data, habitID)
        }

        const isAllDays = data.daysOfWeek.length === 0 && data.daysOfWeek.includes(7)
        const daysOfWeek = isAllDays ? [0,1,2,3,4,5,6] : data.daysOfWeek

        const startingDate = new Date(data.startingDate)
        const frequency = stringToFrequencyType(data.frequency)

        const newStreakValues: StreakValues = getUpdatedStreakOfHabit(data, today);

        if(data.doneDates) {
            habitsHistory[habitID] = data.doneDates.map((stringDate) => new Date(stringDate))
        }

        return  {...data, habitID, startingDate, steps, daysOfWeek, newStreakValues, frequency, objectifID: data.objectifID ?? undefined};
    }));

    return {
        habits: habitArray.reduce((newHabitList, habit) => ({...newHabitList, [habit.habitID]: {...habit}}), {}),
        history: habitsHistory
    }
}

const getAllSharedHabits = async(userID: string): Promise<HabitsFromFirestoreRetrieve> => {

    const userDoc = doc(db, "Users", userID)

    const habitsHistory: {[key: string]: Date[]} = {}

    const qry = query(collection(userDoc, "SharedHabits"));
    const querySnapshot = await getDocs(qry)

    const habitArray: (Habit | null)[] = await Promise.all(
        querySnapshot.docs.map(async (habit) => {
            const data = habit.data()
            const habitID = data.habitID

            //Récupère l'historique des jours ou l'hab à été faite
            if(data.doneDates) {
                habitsHistory[habitID] = data.doneDates.map((stringDate: Date | string) => new Date(stringDate))
            }

            //Récupère les data de l'hab
            return await getSpecificHabit(data.ownerMail, habitID)
        }
    ))

    const habits = habitArray.filter(habit => habit !== null)
    const habitsList: HabitList = habits.reduce((newHabitList, habit) => ({...newHabitList, [habit.habitID]: {...habit, isShared: true}}), {})

    return {
        habits: habitsList,
        history: habitsHistory
    }
}

const removeHabitInFirestore = async(habit: Habit, userID: string) => {

    const userDoc = doc(db, "Users", userID)
    console.log("Deleting habit in firestore with id : ", habit.habitID, "...")
    const docRef = doc(collection(userDoc, 'Habits'), habit.habitID)

    await deleteDoc(docRef);
    console.log("Habit successfully deleted in firestore !")

    await removeHabitLogs(userID, habit.habitID)
}

const updateHabitInFirestore = async(userID: string, oldHabit: Habit, newValues: {[key: string]: any}) => {

    const userDoc = doc(db, "Users", userID)

    console.log("Updating habit in firestore with id : ", oldHabit.habitID, "...")

    const docRef = doc(collection(userDoc, 'Habits'), oldHabit.habitID)
    await updateDoc(docRef, {...newValues});
    console.log("Habit successfully updated in firestore !")
} 

const updateCompletedHabit = async(userID: string, habitID: string, newStreakValues: StreakValues) => {
    const userDoc = doc(db, "Users", userID)

    console.log("Updating habit streak...")

    const docRef = doc(collection(userDoc, "Habits"), habitID);

    await updateDoc(docRef, {...newStreakValues});
    console.log("Streak of habit updated !");
}

const addHabitDoneDate = async(userID: string, habitID: string, dateString: string) => {
    const userDoc = doc(db, "Users", userID)

    console.log("Updating habit done dates by adding : ", dateString, " in firestore for habit with id : ", habitID, "...")

    const habitsRef = collection(userDoc, 'Habits')
    const docRef = doc(habitsRef, habitID)

    await updateDoc(docRef, {doneDates: arrayUnion(dateString)});

    console.log("Habit done dates successfully updated in firestore !")
}

const getSpecificHabit = async(userID: string, habitID: string): Promise<Habit | null> => {
    const userDoc = doc(db, "Users", userID)

    const habitDoc = doc(collection(userDoc, "Habits"), habitID);
    const habitSnap = await getDoc(habitDoc)

    if(habitSnap.exists()) {    
        const data = habitSnap.data() as FirestoreHabit
        let steps: StepList = {}

        const notPlaceholderSteps = data.steps.filter((step: FirestoreStep) => (step.numero !== -1))
        steps = listKeyIDfromArray(notPlaceholderSteps, "stepID", habitID)
 
        if(notPlaceholderSteps.length < data.steps.length || notPlaceholderSteps.length === 0){
            steps[habitID] = createDefaultStepFromHabit(data, habitID)
        }

        const isAllDays = data.daysOfWeek.length === 0 && data.daysOfWeek.includes(7)
        const daysOfWeek = isAllDays ? [0,1,2,3,4,5,6] : data.daysOfWeek

        const startingDate = new Date(data.startingDate)
        const frequency = stringToFrequencyType(data.frequency)

        return  {...data, habitID, startingDate, steps, daysOfWeek, frequency, objectifID: data.objectifID ?? undefined};
    }

    else return null
}


export {
    addHabitToFireStore, 
    removeHabitInFirestore, 
    updateHabitInFirestore, 
    getAllOwnHabits,
    getAllSharedHabits,
    updateCompletedHabit,
    addHabitDoneDate,
    getSpecificHabit,
    addRefHabitToFirestore
}