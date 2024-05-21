import { addDoc, collection, deleteDoc, doc, documentId, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"
import { db } from "./InitialisationFirebase"
import { Goal, GoalList } from "../types/HabitTypes"
import { FirestoreGoal, GlobalFirestoreGoal, UserFirestoreHabit, UserFirestoreGoal } from "../types/FirestoreTypes/FirestoreHabitTypes"
import { FormDetailledGoal } from "../types/FormGoalTypes"
import { FirestoreCollections, FirestoreUserSubCollections } from "../types/FirestoreTypes/FirestoreCollections"
import { toISOStringWithoutTimeZone } from "../primitives/BasicsMethods"

/**
 * [FIRESTORE] Ajoute un goal dans la collection globale puis ajoute dans la collection privée de l'utilisateur
 */

const addGoalToFirestore = async(goalToAdd: FormDetailledGoal, userMail: string): Promise<Goal> => {

    const {startingDate, endingDate, ...globalGoal} = goalToAdd

    //Ajout dans global
    const goalsCollection = collection(db, FirestoreCollections.Goals)
    const goalRef = await addDoc(goalsCollection, globalGoal)

    const goalID = goalRef.id;
    console.log("Goal well added to firestore with id : ", goalID)

    //Ajout en spécifique

    await addRefHabitToFirestore(goalID, userMail, startingDate, endingDate)
    console.log("Goal well added to user firestore")

    const startingDate_obj = new Date(goalToAdd.startingDate)
    const endingDate_obj = goalToAdd.endingDate ? new Date(goalToAdd.endingDate) : undefined

    return {...goalToAdd, goalID, startingDate: startingDate_obj, endingDate: endingDate_obj}
}

const addRefHabitToFirestore = async (goalID: string, userMail: string, startingDate?: string, endingDate?: string): Promise<UserFirestoreGoal | null> => {
    console.log("Adding ref habit to Firestore...");

    try {

        const userSpecificValues: UserFirestoreGoal = {
            goalID: goalID,
            startingDate: startingDate ?? toISOStringWithoutTimeZone(new Date())
        }

        if(endingDate) {
            userSpecificValues.endingDate = endingDate
        }
        
        const userDoc = doc(db,  FirestoreCollections.Users, userMail)
        await setDoc(
            doc(userDoc, FirestoreUserSubCollections.UserGoals, goalID),
            userSpecificValues
        )

        console.log("Goal reference successfully added");

        return userSpecificValues
    } 
    
    catch (error) {
        console.error("Error adding goal reference to Firestore:", error);
    }

    return null
};

/**
 * [FIRESTORE] Récupère tous les goals d'un utilisateur
 */

const fetchAllGoals = async(userMail: string): Promise<GoalList> => {

    //Récupère les goals d'un utilisateur

    const userDoc = doc(db, FirestoreCollections.Users, userMail)
    const userGoals_qry = query(collection(userDoc, FirestoreUserSubCollections.UserGoals))
    const userGoalsSnapshot = await getDocs(userGoals_qry)

    const userGoalsArray: UserFirestoreGoal[] = await Promise.all(
        userGoalsSnapshot.docs.map(async(obj) => {
            const data = obj.data() as UserFirestoreGoal
            return { 
                goalID: obj.id, 
                startingDate: data.startingDate, 
                endingDate: data.endingDate
            }
        })
    )

    const userGoalsList = userGoalsArray.reduce((newGoalList, goal) => ({...newGoalList, [goal.goalID]: {...goal}}), {})
    const userGoalsID = Object.keys(userGoalsList)

    //Récupère les détails de ces goals

    if(userGoalsID.length > 0) {
        const goals_qry = query(
            collection(db, FirestoreCollections.Goals),
            where(documentId(), "in", userGoalsID)
        )
    
        const goalsSnapshot = await getDocs(goals_qry)
    
        const goalsArray: Goal[] = await Promise.all(
            goalsSnapshot.docs.map(async (obj) => {
            const goalID = obj.id;
    
            const obj_data = obj.data() as GlobalFirestoreGoal;

            obj_data.titre = obj_data.titre.trim()
            obj_data.description = obj_data.description.trim()
    
            const startingDate = new Date(userGoalsList[obj.id].startingDate)
            const endingDate = userGoalsList[obj.id].endingDate ? new Date(userGoalsList[obj.id].endingDate) : undefined
    
            const goal: Goal = {
                ...obj_data, 
                startingDate,
                goalID
            }
    
            if(endingDate) goal.endingDate = endingDate

            return goal
        }));
    
        return goalsArray.reduce((newGoalsList, goal) => 
            ({
                ...newGoalsList, 
                [goal.goalID]: {...goal}
            }),
        {});
    }

    return {}
}

/**
 * [FIRESTORE] Supprime un goal dans la collection d'un utilisateur
 */

const removeGoalInFirestore = async(goalID: string, userMail: string): Promise<void> => {

    const userDoc = doc(db, FirestoreCollections.Users, userMail)

    console.log("Deleting goal in firestore with id : ", goalID, "...")

    const docRef = doc(collection(userDoc, FirestoreUserSubCollections.UserGoals), goalID)
    await deleteDoc(docRef);

    console.log("Goal successfully deleted in firestore !")
}

/**
 * [FIRESTORE] Modifie un goal dans la collection globale ou privée en fonction des données modifiées
 */

const updateGoalInFirestore = async(userMail: string, oldGoal: Goal, newValues: {[key: string]: any}) => {
    
    console.log("Updating goal in firestore with id : ", oldGoal.goalID, "...")
    
    
    if("startingDate" in newValues || "endingDate" in newValues) {
        const userDoc = doc(db, FirestoreCollections.Users, userMail)
        const docRef = doc(
            collection(userDoc, FirestoreUserSubCollections.UserGoals), 
            oldGoal.goalID
        )
        
        const newValues_temp = {}

        if("startingDate" in newValues) newValues_temp["startingDate"] = newValues.startingDate
        if("endingDate" in newValues) newValues_temp["endingDate"] = newValues.endingDate

        await updateDoc(docRef, {...newValues_temp});

        console.log("User-specific goal information updated!");
    }
    
    const {startingDate, endingDate, ...newValues_global} = newValues

    //Modification des éléments généraux
    if(Object.keys(newValues_global).length > 0) {
        const goalDoc = doc(db, FirestoreCollections.Goals, oldGoal.goalID)    
        await updateDoc(goalDoc, newValues_global)

        console.log("Global goal information updated!");
    }


    console.log("Goal successfully updated in firestore !")
}



export {addGoalToFirestore, fetchAllGoals, removeGoalInFirestore, updateGoalInFirestore}