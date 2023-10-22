import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { Habitudes } from "../data/habitudes"
import { db } from "./InitialisationFirebase"
import { addSteps, getAllStepsFromHabit } from "./Firestore_Step_Primitives"

const userID = "Paul"

const addHabitToFireStore = async(habit) => {

    console.log("adding habit to firestore...")

    const steps = habit.steps;
    delete habit.steps

    const habitRef = await addDoc(collection(db, "Habits"), {
        ...habit, 
        userID: userID
    })

    const habitSteps = await addSteps(steps, habitRef)
    const habitComplete = {...habit, habitID: habitRef.id, steps: habitSteps}

    console.log("Habit well added to firestore.")
    return habitComplete
}

const getAllOwnHabits = async() => {

    const qry = query(collection(db, "Habits"), where("userID", "==", userID));
    const querySnapshot = await getDocs(qry)

    const habitArray = await Promise.all(
        querySnapshot.docs.map(async (habit) => {
        const habitID = habit.id;
        const stepsFromFirebase = await getAllStepsFromHabit(habit);

        const data = habit.data();
        let steps = stepsFromFirebase 
        if(Object.values(stepsFromFirebase).length === 0)
        {
            const defaultStep = {
                titre: data.titre, 
                description: data.description, 
                duration: 30, 
                numero: 0, 
                habitID
            }

            steps = {defaultStep} 
        }

        return {habitID: habitID, steps: steps, ...data };
    }));

    return habitArray.reduce((newHabitList, habit) => ({...newHabitList, [habit.habitID]: {...habit}}), {});
}

export {addHabitToFireStore, getAllOwnHabits}