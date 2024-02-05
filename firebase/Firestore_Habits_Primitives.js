import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { db } from "./InitialisationFirebase"
import { displayTree, listKeyIDfromArray } from "../primitives/BasicsMethods"
import { createDefaultStepFromHabit, removeStepLogs } from "../primitives/StepMethods"
import { removeHabitLogs } from "./Firestore_Step_Primitives"
import { getUpdatedStreakOfHabit } from "../primitives/HabitMethods"
import { useAuthentification } from "../primitives/useAuthentification"

const setupHabit = (habit) => {
    const todayDateString = new Date().toDateString()
    const startingDate = habit.startingDate === undefined ? todayDateString : habit.startingDate

    const bestStreak = 0;
    const currentStreak = 0;
    const lastCompletionDate = "none"

    const settedUpHabit = { 
        ...habit, 
        startingDate, 
        bestStreak,
        currentStreak, 
        lastCompletionDate,
        steps: habit.steps.map((step) => ({...step, created: todayDateString}))
    }

    return settedUpHabit
}

const addHabitToFireStore = async(habit, userID) => {
    console.log("adding habit to firestore...")
    const today = new Date().toISOString()

    const userDoc = doc(db, "Users", userID)

    const habitToAdd = setupHabit(habit)

    const habitRef = await addDoc(collection(userDoc, "Habits"), habitToAdd)
    const habitID = habitRef.id

    let oldSteps;

    if(habitToAdd.steps[0].numero === -1)
        oldSteps = [createDefaultStepFromHabit(habitToAdd, habitID)]   

    else oldSteps = habitToAdd.steps

    oldSteps = oldSteps.map(step => ({...step, created: "Sun Jan 21 2024"}))

    const steps = listKeyIDfromArray(oldSteps, "stepID", habitID)
      
    console.log("Habit well added to firestore with id : ", habitID)

    const startingDate =  new Date(habitToAdd.startingDate)
    return {...habitToAdd, startingDate, habitID, steps}
}

const getAllOwnHabits = async(userID) => {

    const today = new Date()


    const userDoc = doc(db, "Users", userID)

    const qry = query(collection(userDoc, "Habits"));
    const querySnapshot = await getDocs(qry)

    const habitArray = await Promise.all(
        querySnapshot.docs.map(async (habit) => {
        const habitID = habit.id;

        const data = habit.data();
        let steps = {}

        const notPlaceholderSteps = data.steps.filter((step) => (step.numero !== -1))
        steps = listKeyIDfromArray(notPlaceholderSteps, "stepID", habitID)
 
        if(notPlaceholderSteps.length < data.steps.length){
            steps[habitID] = createDefaultStepFromHabit(data, habitID)
        }

        const daysOfWeek = data.daysOfWeek == [7] ? [0,1,2,3,4,5,6] : data.daysOfWeek
        const startingDate = new Date(data.startingDate)

        const newStreakValues = getUpdatedStreakOfHabit(data, today);

        return  {...data, habitID, startingDate, steps, daysOfWeek, newStreakValues};
    }));

    return habitArray.reduce((newHabitList, habit) => ({...newHabitList, [habit.habitID]: {...habit}}), {});
}

const removeHabitInFirestore = async(habit, userID) => {

    const userDoc = doc(db, "Users", userID)
    console.log("Deleting habit in firestore with id : ", habit.habitID, "...")
    const docRef = doc(collection(userDoc, 'Habits'), habit.habitID)

    await deleteDoc(docRef);
    console.log("Habit successfully deleted in firestore !")

    await removeHabitLogs(userID, habit.habitID)
}

const updateHabitInFirestore = async(userID, oldHabit, newValues) => {

    const userDoc = doc(db, "Users", userID)

    console.log("Updating habit in firestore with id : ", oldHabit.habitID, "...")

    const docRef = doc(collection(userDoc, 'Habits'), oldHabit.habitID)
    await updateDoc(docRef, {...newValues});
    console.log("Habit successfully updated in firestore !")
} 

const updateCompletedHabit = async(userID, habitID, newStreakValues) => {
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