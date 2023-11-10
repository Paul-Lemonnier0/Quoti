import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { db } from "./InitialisationFirebase"
import { listKeyIDfromArray } from "../primitives/BasicsMethods"
import { addHabitToFireStore } from "./Firestore_Habits_Primitives"

const userID = "Paul"

const addObjectifToFirestore = async(objectif) => {

    console.log("adding habits of objectif to firestore...")

    const objectifRef = await addDoc(collection(db, "Objectifs"), {
        ...objectif,
        userID: userID
    })

    const objectifID = objectifRef.id;

    const habitsIDArray = []
    objectif.habits.forEach(habit => {

        const habitToAdd = {
            ...habit,
            objectifID        
        }

        addHab(habitToAdd)
            .then(addedHabit => {
                habitsIDArray.push(addedHabit.habitID)
            })
    });

    const updatedObjectif = {...objectif, objectifID, habits: habitsIDArray} 

    console.log("adding objectif to firestore...")

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