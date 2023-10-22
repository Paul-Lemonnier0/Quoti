import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { Habitudes } from "../data/habitudes"
import { db } from "./InitialisationFirebase"
import { addSteps, getAllStepsFromHabit } from "./Firestore_Step_Primitives"
import { listKeyIDfromArray } from "../primitives/BasicsMethods"

const userID = "Paul"

const addHabitToFireStore = async(habit) => {

    console.log("adding habit to firestore...")

    const habitRef = await addDoc(collection(db, "Habits"), {
        ...habit, 
        userID: userID
    })

    const habitID = habitRef.id

    let steps = {}
    if(habit.steps.length === 0)
        {
            const defaultStep = {
                titre: habit.titre, 
                description: habit.description, 
                duration: 30, 
                numero: 0, 
                habitID,
                stepID: habitID
            }

            steps = { [defaultStep.stepID]: defaultStep };        
        }

    else steps = listKeyIDfromArray(habit.steps, "stepID", habitID)
      
    const habitComplete = {...habit, habitID, steps}
    console.log("Habit well added to firestore.")
    console.log("HABIT ADDED : ", habitComplete)
    return habitComplete
}

const getAllOwnHabits = async() => {

    const qry = query(collection(db, "Habits"), where("userID", "==", userID));
    const querySnapshot = await getDocs(qry)

    const habitArray = await Promise.all(
        querySnapshot.docs.map(async (habit) => {
        const habitID = habit.id;

        const data = habit.data();
        let steps = {}
 
        if(data.steps.length === 0)
        {
            const defaultStep = {
                titre: data.titre, 
                description: data.description, 
                duration: 30, 
                numero: 0, 
                habitID,
                stepID: habitID
            }

            steps = { [defaultStep.stepID]: defaultStep };        
        }

        else steps = listKeyIDfromArray(data.steps, "stepID", habitID)

        return  {habitID: habitID, ...data, steps };
    }));

    return habitArray.reduce((newHabitList, habit) => ({...newHabitList, [habit.habitID]: {...habit}}), {});
}

export {addHabitToFireStore, getAllOwnHabits}