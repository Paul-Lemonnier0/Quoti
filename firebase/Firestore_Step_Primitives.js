import { addDoc, collection, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./InitialisationFirebase";

const collectionName = "StepsDone"

async function changeStepState(date, stepID, isChecked) {

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
    const stepsLogs = {};

    try {
        const qry = query(collection(db, collectionName), where("date", "==", date.toDateString()), where("stepID", "in", allStepsID));
        const querySnapShot = await getDocs(qry);

        querySnapShot.forEach(stepLogDoc => {
            const stepID = stepLogDoc.get('stepID');
            stepsLogs[stepID] = { stepID, isChecked: true };
        });
    } 
    catch (e) {
        console.log("Error while fetching stepLogs: ", e);
    }

    return stepsLogs;
}
  
export {fetchStepLogs, changeStepState}