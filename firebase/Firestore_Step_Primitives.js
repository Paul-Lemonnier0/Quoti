import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "./InitialisationFirebase";

async function changeStepState(date, stepID, habitID, isChecked) {

    const dateString = date.toDateString()
    console.log(dateString)
    console.log(stepID)
    console.log(habitID)

    const qry = query(collection(db, "StepLogs"), where('date', '==', dateString), where('stepID', '==', stepID), where("habitID", "==", habitID))

    getDocs(qry)
        .then(querySnapShot => {
            if(!querySnapShot.empty){
                setDoc(collection(db, "StepLogs"), {isChecked: isChecked}, {merge: true})
                    .then(updatedStepLogRef => console.log("Log updated with ref : ", updatedStepLogRef.path))
                    .catch(e => console.log("Error while updating log : ", e))
            }
        
            else {
                const newStepLog = {date: dateString, stepID, habitID, isChecked}
        
                addDoc(collection(db, "StepLogs"), newStepLog)
                    .then(stepLogRef => console.log("Log added with ref : ", stepLogRef.path))
                    .catch(e => console.log("Error while adding log : ", e))
            }
        })
        .catch(e => console.log("Error while fetching log : ", e))
}

async function fetchStepLogs(date, habitsID) {
    const stepsLogs = {};

    try {
        const qry = query(collection(db, "StepLogs"), where("date", "==", date.toDateString()), where("habitID", "in", habitsID));
        const querySnapShot = await getDocs(qry);

        querySnapShot.forEach(stepLogDoc => {
        const isChecked = stepLogDoc.get('isChecked');
        const stepID = stepLogDoc.get('stepID');
        stepsLogs[stepID] = { stepID, isChecked };
        });
    } catch (e) {
        console.log("Error while fetching stepLogs: ", e);
    }

    return stepsLogs;
}
  
export {fetchStepLogs, changeStepState}