import { FieldValue, addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "./InitialisationFirebase";

async function changeStepStateFirestore(date, habitID, stepID, isChecked) {

    const dateString = date.toDateString()
    console.log("step concerned at date : ", stepID, " | ", dateString)

    try{
        if(isChecked){
            await addStepLog(date, habitID, stepID)
        }
    
        else await removeStepLog(date, habitID, stepID)

        console.log("step successfully updated !")
    }

    catch(e){
        console.log("Error while updating state of step : ", stepID, " => ", e)
    }

}

async function removeHabitLogs (habitID){
    console.log("Deleting logs of habit : ", habitID, "...")

    const qry = query(collection(db, "History"), where(`habitudes.${habitID}`, '!=', undefined))
    const querySnapshot = await getDocs(qry)

    try{
        const deletePromises = querySnapshot.docs.map(async (doc) => {
            await updateDoc(doc.ref, {
                [`habitudes.${habitID}`]: FieldValue.delete()
            });
        });

        await Promise.all(deletePromises);

        console.log("Logs well deleted !");
    }

    catch(e){
        console.log("Error while deleting logs of habit : ", habitID, " => ", e)
    }
}

async function addStepLog(date, habitID, stepID) {

    const date_string = date.toDateString()
    
    const dateDocRef = doc(db, "History", date_string)

    const docSnapshot = await getDoc(dateDocRef);

    if (!docSnapshot.exists()) {
        await setDoc(dateDocRef, { date });
    }
    
    await setDoc(dateDocRef, {
        habitudes: 
            {
                [habitID]: arrayUnion(stepID)
            }
    }, {merge: true})
}

async function removeStepLog(date, habitID, stepID){
    const date_string = date.toDateString()
    
    const dateDocRef = doc(db, "History", date_string)

    
    await setDoc(dateDocRef, {
        habitudes: 
            {
                [habitID]: arrayRemove(stepID)
            }
    }, {merge: true})
}

async function getDateLogs(date) {

    let doneSteps = [];
    const date_string = date.toDateString()

    const dateDocRef = doc(db, "History", date_string)
    const dateDocSnap = await getDoc(dateDocRef);

    const habitudes = dateDocSnap.data()?.habitudes || {}
    for(const habitID in habitudes){
        doneSteps = doneSteps.concat(habitudes[habitID])
    }

    return doneSteps
}

export async function getLogsForHabitInDate(date, habitID = 0){

    const date_string = date.toDateString()
    
    const dateDocRef = doc(db, "History", date_string)
    const dateDocSnap = await getDoc(dateDocRef);

    if(dateDocSnap.exists()){
        const habits = dateDocSnap.data()?.habitudes || {}

        for(const habID in habits){
            console.log(habID, " => ", habits[habID])
        }
    }
}

export async function getDateLogsForHabit(date, habitID){

    const qry = query(collection(db, "History"), where(`habitudes.${habitID}`, '!=', undefined))
    const querySnapshot = await getDocs(qry)

    try{
        const deletePromises = querySnapshot.docs.map(async (doc) => {
            await updateDoc(doc.ref, {
                [`habitudes.${habitID}`]: FieldValue.delete()
            });
        });

        await Promise.all(deletePromises);

        console.log("Logs well deleted !");
    }

    catch(e){
        console.log("Error while deleting logs of habit : ", habitID, " => ", e)
    }
}

export async function getLogsForHabitInDateRange(startDate, endDate, habitID){

    try{
        let doneSteps = {}

        const qry = query(collection(db, "History"),
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
    }
}

export {
    changeStepStateFirestore, 
    removeHabitLogs, 
    addStepLog,
    removeStepLog,
    getDateLogs
}