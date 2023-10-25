import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { Habitudes } from "../data/habitudes"
import { db } from "./InitialisationFirebase"
import { addSteps, getAllStepsFromHabit } from "./Firestore_Step_Primitives"
import { listKeyIDfromArray } from "../primitives/BasicsMethods"

const userID = "Paul"

const addHabitToFireStore = async(habit) => {

    const todayDate = new Date()
    const todayDateString = todayDate.toDateString()
    const habitWithDate = {...habit, startingDate: todayDateString}

    console.log("adding habit to firestore...")
    let isStepsEmpty = false
    if(habitWithDate.steps.length === 0){
        habitWithDate.steps.push({
            numero: -1,
        })

        isStepsEmpty = true
    }

    const habitRef = await addDoc(collection(db, "Habits"), {
        ...habitWithDate, 
        userID: userID
    })

    const habitID = habitRef.id

    let steps = {}
    if(isStepsEmpty)
    {
        habitWithDate.steps[0] = {
            ...habitWithDate.steps[0],
            titre: habitWithDate.titre, 
            description: habitWithDate.description, 
            duration: 30, 
            habitID,
        }
    }

    else steps = listKeyIDfromArray(habitWithDate.steps, "stepID", habitID)
      
    const habitComplete = {...habitWithDate, habitID, steps}
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
 
        if(data.steps[0].numero === -1)
        {
            console.log("Pas de step définie ici")
            steps[habitID] = {
                ...data.steps[0],
                numero: 0,
                titre: data.titre, 
                description: data.description, 
                duration: 30, 
                stepID: habitID,
                habitID,
            }
        }

        else steps = listKeyIDfromArray(data.steps, "stepID", habitID)

        return  {habitID: habitID, ...data, startingDate: new Date(data.startingDate), steps, daysOfWeek: data.daysOfWeek == [7] ? [0,1,2,3,4,5,6] : data.daysOfWeek };
    }));

    return habitArray.reduce((newHabitList, habit) => ({...newHabitList, [habit.habitID]: {...habit}}), {});
}

const updateStepInFireStore = async(habitID, stepID, newData) => {
    const habitRef = doc(db, "Habits", habitID);

    console.log(newData)

    await updateDoc(habitRef, newData)
        .then(newHabitRef => console.log('Step successfully updated.'))
        .catch((error) => console.error('Error while updating the step :', stepID, " with  error : ", error));    
}

const fetchAllStepsLogsFromDate = (steps, date) => {
     
}

export {addHabitToFireStore, getAllOwnHabits, updateStepInFireStore}