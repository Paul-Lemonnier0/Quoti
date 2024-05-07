import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "./InitialisationFirebase";
import { FirestoreCollections, FirestoreUserSubCollections } from "../types/FirestoreTypes/FirestoreCollections";
import { toISOStringWithoutTimeZone } from "../primitives/BasicsMethods";

/**
 * [FIRESTORE] Ajoute le log d'une étape d'une habitude à une date donnée pour un utilisateur
 */

async function addStepLog(date: Date, userID: string, habitID: string, stepID: string) {

    const date_string = toISOStringWithoutTimeZone(date)

    const userDoc = doc(db, FirestoreCollections.Users, userID)

    const dateDocRef = doc(userDoc, FirestoreUserSubCollections.History, date_string)

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

/**
 * [FIRESTORE] Supprime le log d'une étape d'une habitude à une date donnée pour un utilisateur
 */

async function removeStepLog(date: Date, userID: string, habitID: string, stepID: string){
    const date_string = toISOStringWithoutTimeZone(date)
    
    
    const userDoc = doc(db, FirestoreCollections.Users, userID)

    const dateDocRef = doc(userDoc, FirestoreUserSubCollections.History, date_string)

    
    await setDoc(dateDocRef, {
        habitudes: 
            {
                [habitID]: arrayRemove(stepID)
            }
    }, {merge: true})
}

/**
 * [FIRESTORE] Met à jour l'état d'une étape d'une habitude pour une utilisateur à une date donnée pour un utilisateur
 */

async function changeStepStateFirestore(date: Date, userID: string, habitID: string, stepID: string, isChecked: boolean) {

    const dateString = toISOStringWithoutTimeZone(date)
    console.log("Step concerned at date : ", stepID, " | ", dateString)

    try{
        if(isChecked){
            await addStepLog(date, userID, habitID, stepID)
        }
    
        else await removeStepLog(date, userID, habitID, stepID)

        console.log("Step successfully updated !")
    }

    catch(e){
        console.log("Error while updating state of step : ", stepID, " => ", e)
    }
}

/**
 * Supprime tous les logs des étapes d'une habitude pour un utilisateur
 */

async function removeHabitLogs (userID: string, habitID: string){
    console.log("Deleting logs of habit : ", habitID, "...")
    
    const userDoc = doc(db, FirestoreCollections.Users, userID)

    const qry = query(
        collection(userDoc, FirestoreUserSubCollections.History), 
        where("habitsID", 'array-contains', habitID)
    )

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

/**
 * Récupère les logs d'une date pour un utilisateur
 */

async function getDateLogs(date: Date, userID: string): Promise<string[]> {

    let doneSteps: string[] = [];
    const date_string = toISOStringWithoutTimeZone(date)

    
    const userDoc = doc(db, FirestoreCollections.Users, userID)

    const dateDocRef = doc(userDoc, FirestoreUserSubCollections.History, date_string)
    const dateDocSnap = await getDoc(dateDocRef);

    const habitudes = dateDocSnap.data()?.habitudes || {}
    for(const habitID in habitudes){
        doneSteps = doneSteps.concat(habitudes[habitID])
    }

    return doneSteps
}

export const getHabitLogsInDateRange = async(habitID: string, start: Date, end: Date, userMail: string): Promise<string[]> => {
    const userDoc = doc(db, FirestoreCollections.Users, userMail)

    const qry = query(
        collection(userDoc, FirestoreUserSubCollections.History), 
        where("habitsID", 'array-contains', habitID), 
        where("date", ">=", start),
        where("date", "<=", end))

    const qrySnap = await getDocs(qry)

    let logs: string[] = []
    qrySnap.docs.forEach(log => {
        if("habitudes" in log.data()) {
            if(log.data().habitudes.hasOwnProperty(habitID)) {
                logs = logs.concat(log.data().habitudes[habitID])
            }
        }
    })
    
    return logs
}

async function getHabitsDateLogs(habitsID: string[], date: Date, userID: string): Promise<string[]> {

    //A voir si utile et fonctionnel
    let doneSteps: string[] = [];
    const date_string = toISOStringWithoutTimeZone(date)

    const userDoc = doc(db, FirestoreCollections.Users, userID)

    const snap = await Promise.all(habitsID.map(async(habitID) => {
        const qry = query(collection(userDoc, FirestoreUserSubCollections.History), where(habitID, 'in', "habitsID"))
        return getDocs(qry)
    }))

    const habitudesLogs = snap.map(logs => logs.docs.map(log => log.data()))

    return doneSteps
}

export {
    changeStepStateFirestore, 
    removeHabitLogs, 
    addStepLog,
    removeStepLog,
    getDateLogs
}