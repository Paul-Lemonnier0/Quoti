import { addDoc, collection, deleteDoc, doc, documentId, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"
import { db } from "./InitialisationFirebase"
import { Objectif, ObjectifList } from "../types/HabitTypes"
import { FirestoreObjectif, GlobalFirestoreObjectif, UserFirestoreHabit, UserFirestoreObjectif } from "../types/FirestoreTypes/FirestoreHabitTypes"
import { FormDetailledObjectif } from "../types/FormObjectifTypes"
import { FirestoreCollections, FirestoreUserSubCollections } from "../types/FirestoreTypes/FirestoreCollections"
import { toISOStringWithoutTimeZone } from "../primitives/BasicsMethods"

/**
 * [FIRESTORE] Ajoute un objectif dans la collection globale puis ajoute dans la collection privée de l'utilisateur
 */

const addObjectifToFirestore = async(objectifToAdd: FormDetailledObjectif, userMail: string): Promise<Objectif> => {

    const {startingDate, endingDate, ...globalObjectif} = objectifToAdd

    //Ajout dans global
    const objectifsCollection = collection(db, FirestoreCollections.Objectifs)
    const objectifRef = await addDoc(objectifsCollection, globalObjectif)

    const objectifID = objectifRef.id;
    console.log("Objectif well added to firestore with id : ", objectifID)

    //Ajout en spécifique

    await addRefHabitToFirestore(objectifID, userMail, startingDate, endingDate)
    console.log("Objectif well added to user firestore")

    const startingDate_obj = new Date(objectifToAdd.startingDate)
    const endingDate_obj = objectifToAdd.endingDate ? new Date(objectifToAdd.endingDate) : undefined

    return {...objectifToAdd, objectifID, startingDate: startingDate_obj, endingDate: endingDate_obj}
}

const addRefHabitToFirestore = async (objectifID: string, userMail: string, startingDate?: string, endingDate?: string): Promise<UserFirestoreObjectif | null> => {
    console.log("Adding ref habit to Firestore...");

    try {

        const userSpecificValues: UserFirestoreObjectif = {
            objectifID: objectifID,
            startingDate: startingDate ?? toISOStringWithoutTimeZone(new Date())
        }

        if(endingDate) {
            userSpecificValues.endingDate = endingDate
        }
        
        const userDoc = doc(db,  FirestoreCollections.Users, userMail)
        await setDoc(
            doc(userDoc, FirestoreUserSubCollections.UserObjectifs, objectifID),
            userSpecificValues
        )

        console.log("Objectif reference successfully added");

        return userSpecificValues
    } 
    
    catch (error) {
        console.error("Error adding objectif reference to Firestore:", error);
    }

    return null
};

/**
 * [FIRESTORE] Récupère tous les objectifs d'un utilisateur
 */

const fetchAllObjectifs = async(userMail: string): Promise<ObjectifList> => {

    //Récupère les objectifs d'un utilisateur

    const userDoc = doc(db, FirestoreCollections.Users, userMail)
    const userObjectifs_qry = query(collection(userDoc, FirestoreUserSubCollections.UserObjectifs))
    const userObjectifsSnapshot = await getDocs(userObjectifs_qry)

    const userObjectifsArray: UserFirestoreObjectif[] = await Promise.all(
        userObjectifsSnapshot.docs.map(async(obj) => {
            const data = obj.data() as UserFirestoreObjectif
            return { 
                objectifID: obj.id, 
                startingDate: data.startingDate, 
                endingDate: data.endingDate
            }
        })
    )

    const userObjectifsList = userObjectifsArray.reduce((newObjectifList, objectif) => ({...newObjectifList, [objectif.objectifID]: {...objectif}}), {})
    const userObjectifsID = Object.keys(userObjectifsList)

    //Récupère les détails de ces objectifs

    if(userObjectifsID.length > 0) {
        const objectifs_qry = query(
            collection(db, FirestoreCollections.Objectifs),
            where(documentId(), "in", userObjectifsID)
        )
    
        const objectifsSnapshot = await getDocs(objectifs_qry)
    
        const objectifsArray: Objectif[] = await Promise.all(
            objectifsSnapshot.docs.map(async (obj) => {
            const objectifID = obj.id;
    
            const obj_data = obj.data() as GlobalFirestoreObjectif;

            obj_data.titre = obj_data.titre.trim()
            obj_data.description = obj_data.description.trim()
    
            const startingDate = new Date(userObjectifsList[obj.id].startingDate)
            const endingDate = userObjectifsList[obj.id].endingDate ? new Date(userObjectifsList[obj.id].endingDate) : undefined
    
            const objectif: Objectif = {
                ...obj_data, 
                startingDate,
                objectifID
            }
    
            if(endingDate) objectif.endingDate = endingDate

            return objectif
        }));
    
        return objectifsArray.reduce((newObjectifsList, objectif) => 
            ({
                ...newObjectifsList, 
                [objectif.objectifID]: {...objectif}
            }),
        {});
    }

    return {}
}

/**
 * [FIRESTORE] Supprime un objectif dans la collection d'un utilisateur
 */

const removeObjectifInFirestore = async(objectifID: string, userMail: string): Promise<void> => {

    const userDoc = doc(db, FirestoreCollections.Users, userMail)

    console.log("Deleting objectif in firestore with id : ", objectifID, "...")

    const docRef = doc(collection(userDoc, FirestoreUserSubCollections.UserObjectifs), objectifID)
    await deleteDoc(docRef);

    console.log("Objectif successfully deleted in firestore !")
}

/**
 * [FIRESTORE] Modifie un objectif dans la collection globale ou privée en fonction des données modifiées
 */

const updateObjectifInFirestore = async(userMail: string, oldObjectif: Objectif, newValues: {[key: string]: any}) => {
    
    console.log("Updating objectif in firestore with id : ", oldObjectif.objectifID, "...")
    
    
    if("startingDate" in newValues || "endingDate" in newValues) {
        const userDoc = doc(db, FirestoreCollections.Users, userMail)
        const docRef = doc(
            collection(userDoc, FirestoreUserSubCollections.UserObjectifs), 
            oldObjectif.objectifID
        )
        
        const newValues_temp = {}

        if("startingDate" in newValues) newValues_temp["startingDate"] = newValues.startingDate
        if("endingDate" in newValues) newValues_temp["endingDate"] = newValues.endingDate

        await updateDoc(docRef, {...newValues_temp});

        console.log("User-specific objectif information updated!");
    }
    
    const {startingDate, endingDate, ...newValues_global} = newValues

    //Modification des éléments généraux
    if(Object.keys(newValues_global).length > 0) {
        const objectifDoc = doc(db, FirestoreCollections.Objectifs, oldObjectif.objectifID)    
        await updateDoc(objectifDoc, newValues_global)

        console.log("Global objectif information updated!");
    }


    console.log("Objectif successfully updated in firestore !")
}



export {addObjectifToFirestore, fetchAllObjectifs, removeObjectifInFirestore, updateObjectifInFirestore}