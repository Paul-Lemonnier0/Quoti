import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "./InitialisationFirebase";

const collectionName = "HabitSteps"

async function addStep(step, habit){

    const stepRef = await addDoc(collection(habit, collectionName), {
        titre: step.titre,
        description: step.description,
        duration: step.duration,
        numero: step.numero,
        habitID: habit.id
    })

    const stepID = stepRef.id;

    console.log("Step bien ajoutée avec comme identifiant : ", stepID)
    return stepID;
}

async function addSteps(steps, habit){
    const stepsWithID = await Promise.all(
        steps.map(async (step) => {
            const stepID = addStep(step, habit)
            return {...stepsWithID, [stepID]: {...step, stepID: stepID, habitID: habit.id}}
        })
    )

    return stepsWithID;
}

async function getAllStepsFromHabit(habit){

    console.log("fetching steps for habits : ", habit.id)

    const qry = query(collection(habit.ref, collectionName))
    const querySnapshot = await getDocs(qry)
    const steps = {}
    let data, stepID;

    querySnapshot.forEach(step => {
        stepID=step.id,
        data=step.data()
        steps[stepID] = {...data, habitID: habit.id, stepID}
    });

    console.log("steps fetched")
    return steps;

}

export {addStep, addSteps, getAllStepsFromHabit}