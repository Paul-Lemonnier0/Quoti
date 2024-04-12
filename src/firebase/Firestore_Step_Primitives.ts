import { FieldValue, Firestore, addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "./InitialisationFirebase";

async function addStepLog(date: Date, userID: string, habitID: string, stepID: string) {

    const date_string = date.toISOString()

    const userDoc = doc(db, "Users", userID)

    const dateDocRef = doc(userDoc, "History", date_string)

    const docSnapshot = await getDoc(dateDocRef);

    if (!docSnapshot.exists()) {
        await setDoc(dateDocRef, { date });
    }
    
    await setDoc(dateDocRef, {
        habitudes: 
            {
                [habitID]: arrayUnion(stepID)
            },

        habitsID: arrayUnion(habitID)

        
    }, {merge: true})
}

async function removeStepLog(date: Date, userID: string, habitID: string, stepID: string){
    const date_string = date.toISOString()
    
    
    const userDoc = doc(db, "Users", userID)

    const dateDocRef = doc(userDoc, "History", date_string)

    
    await setDoc(dateDocRef, {
        habitudes: 
            {
                [habitID]: arrayRemove(stepID)
            }
    }, {merge: true})
}

async function changeStepStateFirestore(date: Date, userID: string, habitID: string, stepID: string, isChecked: boolean) {

    const dateString = date.toISOString()
    console.log("step concerned at date : ", stepID, " | ", dateString)

    try{
        if(isChecked){
            await addStepLog(date, userID, habitID, stepID)
        }
    
        else await removeStepLog(date, userID, habitID, stepID)

        console.log("step successfully updated !")
    }

    catch(e){
        console.log("Error while updating state of step : ", stepID, " => ", e)
    }
}

async function removeHabitLogs (userID: string, habitID: string){
    console.log("Deleting logs of habit : ", habitID, "...")
    
    const userDoc = doc(db, "Users", userID)

    const qry = query(collection(userDoc, "History"), where("habitsID", 'array-contains', habitID))
    const querySnapshot = await getDocs(qry)

    try{
        const deletePromises = querySnapshot.docs.map(async (doc) => {
            await updateDoc(doc.ref, {
                [`habitudes.${habitID}`]: null,
                habitsID: arrayRemove(habitID)

            });
        });

        await Promise.all(deletePromises);

        console.log("Logs well deleted !");
    }

    catch(e){
        console.log("Error while deleting logs of habit : ", habitID, " => ", e)
    }
}

async function getDateLogs(date: Date, userID: string): Promise<string[]> {

    let doneSteps: string[] = [];
    const date_string = date.toISOString()

    
    const userDoc = doc(db, "Users", userID)

    const dateDocRef = doc(userDoc, "History", date_string)
    const dateDocSnap = await getDoc(dateDocRef);

    const habitudes = dateDocSnap.data()?.habitudes || {}
    for(const habitID in habitudes){
        doneSteps = doneSteps.concat(habitudes[habitID])
    }

    return doneSteps
}



export async function getLogsForHabitInDate(date: Date, userID: string){

    const date_string = date.toISOString()

    const userDoc = doc(db, "Users", userID)
    
    const dateDocRef = doc(userDoc, "History", date_string)
    const dateDocSnap = await getDoc(dateDocRef);

    if(dateDocSnap.exists()){
        const habits = dateDocSnap.data()?.habitudes || {}
    }
}

export async function getDateLogsForHabit(userID: string, habitID: string){

    const userDoc = doc(db, "Users", userID)

    const qry = query(collection(userDoc, "History"), where(`habitudes.${habitID}`, '!=', undefined))
    const querySnapshot = await getDocs(qry)

    try{
        const deletePromises = querySnapshot.docs.map(async (doc) => {
            await updateDoc(doc.ref, {
                // [`habitudes.${habitID}`]: (FieldValue.delete()) as any
            });
        });

        await Promise.all(deletePromises);

        console.log("Logs well deleted !");
    }

    catch(e){
        console.log("Error while deleting logs of habit : ", habitID, " => ", e)
    }
}

export async function getLogsForHabitInDateRange(startDate: Date, endDate: Date, userID: string, habitID: string): Promise<{[key: string]: string[]}>{

    try{
        let doneSteps: {[key: string]: string[]} = {}
        const userDoc = doc(db, "Users", userID)

        const qry = query(collection(userDoc, "History"),
        where("date", ">=", startDate),
        where("date", "<=", endDate))

        const querySnapshot = await getDocs(qry)

        querySnapshot.forEach((doc) => {
            const habitudes = doc.data()?.habitudes || {}

            if(habitudes.hasOwnProperty(habitID)){
                const dateTimeStamp = doc.data().date;
                const date = dateTimeStamp.toDate();
                
                doneSteps[date] = habitudes[habitID]
            }
        })
        return doneSteps;
    }

    catch(e){
        console.log("Error while getting logs in range of habit : ", habitID, " => ", e)
        return {}
    }
}

export {
    changeStepStateFirestore, 
    removeHabitLogs, 
    addStepLog,
    removeStepLog,
    getDateLogs
}