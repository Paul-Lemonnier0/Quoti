import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { db } from "./InitialisationFirebase"
import { Objectif, ObjectifList } from "../types/HabitTypes"
import { FirestoreObjectif } from "../types/FirestoreTypes/FirestoreHabitTypes"
import { FormDetailledObjectif } from "../types/FormObjectifTypes"

const collectionName = "Objectifs"

const addObjectifToFirestore = async(objectifToAdd: FormDetailledObjectif, userID: string): Promise<Objectif> => {

    const userDoc = doc(db, "Users", userID)

    console.log("adding objectif to firestore...")

    const objectifRef = await addDoc(collection(userDoc, collectionName), objectifToAdd)
    const objectifID = objectifRef.id;

    console.log("objectif added to firestore with id : ", objectifID)

    const startingDate = new Date(objectifToAdd.startingDate)
    const endingDate = new Date(objectifToAdd.endingDate)

    return {...objectifToAdd, objectifID, startingDate, endingDate}
}

const fetchAllObjectifs = async(userID: string): Promise<ObjectifList> => {

    const userDoc = doc(db, "Users", userID)

    const qry = query(collection(userDoc, collectionName));
    const querySnapshot = await getDocs(qry)

    const objectifArray = await Promise.all(
        querySnapshot.docs.map(async (obj) => {
        const objectifID = obj.id;

        const obj_data = obj.data() as FirestoreObjectif;
        const startingDate = new Date(obj_data.startingDate)
        const endingDate = new Date(obj_data.endingDate)

        return  {
            ...obj_data, 
            startingDate,
            endingDate,
            objectifID, 
        };
    }));

    return objectifArray.reduce((newObjectifsList, objectif) => 
        ({
            ...newObjectifsList, 
            [objectif.objectifID]: {...objectif}
        }),
    {});
}

const removeObjectifInFirestore = async(objectifID: string, userID: string): Promise<void> => {

    const userDoc = doc(db, "Users", userID)
    console.log("Deleting objectif in firestore with id : ", objectifID, "...")
    const docRef = doc(collection(userDoc, 'Objectifs'), objectifID)

    await deleteDoc(docRef);
    console.log("Objectif successfully deleted in firestore !")
}

const updateObjectifInFirestore = async(userID: string, oldObjectif: Objectif, newValues: {[key: string]: any}) => {
    const userDoc= doc(db, "Users", userID)

    console.log("Updating objectif in firestore with id : ", oldObjectif.objectifID, "...")

    const docRef = doc(collection(userDoc, 'Objectifs'), oldObjectif.objectifID)
    await updateDoc(docRef, {...newValues})

    console.log("Objectif successfully updated in firestore !")
}



export {addObjectifToFirestore, fetchAllObjectifs, removeObjectifInFirestore, updateObjectifInFirestore}