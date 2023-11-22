import { addDoc, collection, deleteDoc, getDocs, query, where } from "firebase/firestore";
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

export {fetchStepLogs, fetchStepLog, changeStepStateFirestore, deleteStepLogs}