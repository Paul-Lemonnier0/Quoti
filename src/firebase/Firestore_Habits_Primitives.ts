import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { db } from "./InitialisationFirebase"
import { displayTree, listKeyIDfromArray } from "../primitives/BasicsMethods"
import { createDefaultStepFromHabit } from "../primitives/StepMethods"
import { removeHabitLogs } from "./Firestore_Step_Primitives"
import { getUpdatedStreakOfHabit, stringToFrequencyType } from "../primitives/HabitMethods"
import { FormDetailledHabit } from "../types/FormHabitTypes"
import { FirestoreHabit, FirestoreStep } from "../types/FirestoreTypes/FirestoreHabitTypes"
import { FrequencyTypes, Habit, HabitList, Step, StepList, StreakValues } from "../types/HabitTypes"

const setupHabit = (habit: FormDetailledHabit): FirestoreHabit => {

    const todayDateString = new Date().toDateString()
    const startingDate = todayDateString
    const objectifID = habit.objectifID ?? null

    const settedUpHabit: FirestoreHabit = { 
        ...habit, 
        startingDate, 
        objectifID,
        bestStreak: 0,
        currentStreak: 0, 
        lastCompletionDate: "none",
        steps: habit.steps.map((step) => ({...step, created: todayDateString}))
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

    oldSteps = oldSteps.map(step => ({...step, created: "Sun Jan 21 2024"}))

    const steps: StepList  = listKeyIDfromArray(oldSteps, "stepID", habitID)
      
    console.log("Habit well added to firestore with id : ", habitID)

    const frequency: FrequencyTypes = stringToFrequencyType(habitToAdd.frequency)
    const startingDate =  new Date(habitToAdd.startingDate)

    return {...habitToAdd, objectifID: habitToAdd.objectifID ?? undefined, startingDate, habitID, steps, frequency}
}

const getAllOwnHabits = async(userID: string): Promise<HabitList> => {

    const today = new Date()
    const userDoc = doc(db, "Users", userID)

    const qry = query(collection(userDoc, "Habits"));
    const querySnapshot = await getDocs(qry)

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

        return  {...data, habitID, startingDate, steps, daysOfWeek, newStreakValues, frequency, objectifID: data.objectifID ?? undefined};
    }));

    return habitArray.reduce((newHabitList, habit) => ({...newHabitList, [habit.habitID]: {...habit}}), {});
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

export {
    addHabitToFireStore, 
    removeHabitInFirestore, 
    updateHabitInFirestore, 
    getAllOwnHabits,
    updateCompletedHabit}