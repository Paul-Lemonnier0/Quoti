import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "./InitialisationFirebase";

const collectionName = "StepsDone"

async function changeStepStateFirestore(date, stepID, isChecked) {

    const dateString = date.toDateString()
    console.log("step concerned at date : ", stepID, " | ", dateString)

    const qry = query(collection(db, collectionName), where('date', '==', dateString), where('stepID', '==', stepID))

    getDocs(qry)
        .then(querySnapShot => {
            if(!querySnapShot.empty){
                querySnapShot.forEach(stepLog => {
                    if(!isChecked){
                        deleteDoc(stepLog.ref)
                            .then(() => console.log("Step ", stepID, " marked as not done for the date : ", date))
                            .catch(() => console.log("Error while deleting stepLog : ", e))
                    }  
                })
            }
        
            else {
                const newStepLog = {date: dateString, stepID}
        
                addDoc(collection(db, collectionName), newStepLog)
                    .then(stepLogRef => console.log("Step marked as done with ref : ", stepLogRef.path))
                    .catch(e => console.log("Error while adding log : ", e))
            }
        })
        .catch(e => console.log("Error while fetching log : ", e))
}

async function fetchStepLogs(date, allStepsID) {

    const flattenStepsID = allStepsID.flat(1)
    const stepsLogs = {};

    try {
        const qry = query(collection(db, collectionName), where("date", "==", date.toDateString()), where("stepID", "in", flattenStepsID));
        const querySnapShot = await getDocs(qry);

        querySnapShot.forEach(stepLogDoc => {
            const stepID = stepLogDoc.get('stepID');
            stepsLogs[stepID] = true ;
        });

    } 
    catch (e) {
        console.log("Error while fetching stepLogs: ", e);
    }

    return stepsLogs;
}

async function fetchStepLog(date, stepID) {

    let isChecked = false;

    try {
        const qry = query(collection(db, collectionName), where("date", "==", date.toDateString()), where("stepID", "==", stepID));
        const querySnapShot = await getDocs(qry);

        querySnapShot.forEach(stepLogDoc => {
            isChecked = true ;
        });

    } 
    catch (e) {
        console.log("Error while fetching stepLog with id : ", stepID, " | error : ", e);
    }

    return isChecked;
}

async function deleteStepLogs (stepID){
    console.log("Deleting stepLogs of step : ", stepID, "...")

    const qry = query(collection(db, collectionName), where('stepID', '==', stepID))

    getDocs(qry)
        .then(querySnapShot => {
                querySnapShot.forEach(stepLog => {
                    deleteDoc(stepLog.ref)
                        .then(() => console.log("Steplog deleted of step : ", stepID))
                        .catch(() => console.log("Error while deleting stepLog : ", e))
                })  
            })
        .catch(() => console.log("Error while deleting stepLogs : ", e))
}

async function addStepLog(date, habitID, stepID) {

    const [date_string] = date.toISOString().split('T');
    
    const dateDocRef = doc(db, "History", date_string)

    
    setDoc(dateDocRef, {
        habitudes: 
            {
                [habitID]: arrayUnion(stepID)
            }
    }, {merge: true})
}

async function removeStepLog(date, habitID, stepID){
    const [date_string] = date.toISOString().split('T');
    
    const dateDocRef = doc(db, "History", date_string)

    
    setDoc(dateDocRef, {
        habitudes: 
            {
                [habitID]: arrayRemove(stepID)
            }
    }, {merge: true})
}

async function getDateLogs(date) {

    let doneSteps = [];
    const [date_string] = date.toISOString().split('T');

    const dateDocRef = doc(db, "History", date_string)
    const dateDocSnap = await getDoc(dateDocRef);

    const habitudes = dateDocSnap.data().habitudes
    for(const habitID in habitudes){
        doneSteps = doneSteps.concat(habitudes[habitID])
    }

    return doneSteps
}

export async function getLogsForHabitInDate(date, habitID = 0){

    const [date_string] = date.toISOString().split('T');
    
    const dateDocRef = doc(db, "History", date_string)
    const dateDocSnap = await getDoc(dateDocRef);

    if(dateDocSnap.exists()){
        const habits = dateDocSnap.data()?.habitudes || {}

        for(const habID in habits){
            console.log(habID, " => ", habits[habID])
        }
    }
}

export function getLogsForHabitInDateRange(startDate, endDate, habitID){

    const [start_date_string] = startDate.toISOString().split('T');
    const [end_date_string] = endDate.toISOString().split('T');
}

export {
    fetchStepLogs, 
    fetchStepLog, 
    changeStepStateFirestore, 
    deleteStepLogs, 
    addStepLog,
    removeStepLog,
    getDateLogs
}