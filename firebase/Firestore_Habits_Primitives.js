import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { db } from "./InitialisationFirebase"
import { listKeyIDfromArray } from "../primitives/BasicsMethods"

const userID = "Paul"

const addHabitToFireStore = async(habit) => {

    const todayDate = new Date()
    const todayDateString = todayDate.toDateString()

    console.log("adding habit to firestore...")
    let isStepsEmpty = false
    if(habit.steps.length === 0){
        habit.steps.push({
            numero: -1,
        })

        isStepsEmpty = true
    }

    const habitRef = await addDoc(collection(db, "Habits"), {
        ...habit,
        startingDate: todayDateString,
        userID: userID
    })

    const habitID = habitRef.id

    let steps = {}
    if(isStepsEmpty)
    {
        habit.steps[0] = {
            ...habit.steps[0],
            titre: habit.titre, 
            description: habit.description, 
            duration: 30, 
            habitID,
        }
    }

    else steps = listKeyIDfromArray(habit.steps, "stepID", habitID)
      
    const habitComplete = {...habit, startingDate: todayDate, habitID, steps}
    console.log("Habit well added to firestore.")
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


export {addHabitToFireStore, getAllOwnHabits}