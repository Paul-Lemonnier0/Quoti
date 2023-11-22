import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { db } from "./InitialisationFirebase"
import { listKeyIDfromArray } from "../primitives/BasicsMethods"
import { createDefaultStepFromHabit, removeStepLogs } from "../primitives/StepMethods"

const userID = "Paul"

const setupHabit = (habit) => {
    const todayDateString = new Date().toDateString()
    const startingDate = habit.startingDate === undefined ? todayDateString : habit.startingDate

    const settedUpHabit = { ...habit, startingDate, userID }
    return settedUpHabit
}

const addHabitToFireStore = async(habit) => {
    console.log("adding habit to firestore...")

    let habitToAdd = setupHabit(habit)

    const habitRef = await addDoc(collection(db, "Habits"), habitToAdd)
    const habitID = habitRef.id

    let oldSteps;

    if(habitToAdd.steps[0].numero === -1)
        oldSteps = [createDefaultStepFromHabit(habitToAdd, habitID)]   

    else oldSteps = habitToAdd.steps

    const steps = listKeyIDfromArray(oldSteps, "stepID", habitID)
      
    console.log("Habit well added to firestore.")

    const startingDate =  new Date(habitToAdd.startingDate)
    console.log(startingDate)
    return {...habitToAdd, startingDate, habitID, steps}
}

const getAllOwnHabits = async() => {

    const qry = query(collection(db, "Habits"), where("userID", "==", userID));
    const querySnapshot = await getDocs(qry)

    const habitArray = await Promise.all(
        querySnapshot.docs.map(async (habit) => {
        const habitID = habit.id;

        const data = habit.data();
        let steps = {}
 
        if(data.steps[0].numero === -1)
            steps[habitID] = createDefaultStepFromHabit(data, habitID)

        else steps = listKeyIDfromArray(data.steps, "stepID", habitID)

        const daysOfWeek = data.daysOfWeek == [7] ? [0,1,2,3,4,5,6] : data.daysOfWeek
        const startingDate = new Date(data.startingDate)

        return  {...data, habitID, startingDate, steps, daysOfWeek};
    }));

    return habitArray.reduce((newHabitList, habit) => ({...newHabitList, [habit.habitID]: {...habit}}), {});
}

const removeHabitInFirestore = async(habit) => {
    console.log("Deleting habit in firestore with id : ", habit.habitID, "...")
    const docRef = doc(collection(db, 'Habits'), habit.habitID)

    await deleteDoc(docRef);
    console.log("Habit successfully deleted in firestore !")

    const stepsID = Object.keys(habit.steps)

    await removeStepLogs(stepsID)
}

const updateHabitInFirestore = async(oldHabit, newValues) => {
    console.log("Updating habit in firestore with id : ", oldHabit.habitID, "...")

    const docRef = doc(collection(db, 'Habits'), oldHabit.habitID)
    await updateDoc(docRef, {...newValues});
    console.log("Habit successfully updated in firestore !")
} 


export {addHabitToFireStore, removeHabitInFirestore, updateHabitInFirestore, getAllOwnHabits}