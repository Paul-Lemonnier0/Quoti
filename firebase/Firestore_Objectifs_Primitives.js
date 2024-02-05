import { addDoc, collection, doc, getDocs, query, where } from "firebase/firestore"
import { db } from "./InitialisationFirebase"

const collectionName = "Objectifs"

const addObjectifToFirestore = async(objectif, userID) => {

    const userDoc = doc(db, "Users", userID)

    let startingDate = objectif.startingDate;
    let endingDate = objectif.endingDate;
    if(typeof objectif.startingDate !== 'string'){
        startingDate = objectif.startingDate.toDateString();
        endingDate = objectif.endingDate.toDateString();
    }

    const objectifToAdd = {...objectif, startingDate, endingDate}

    console.log("adding objectif to firestore...")
    const objectifRef = await addDoc(collection(userDoc, collectionName), objectifToAdd)

    const objectifID = objectifRef.id;
    console.log("objectif added to firestore with id : ", objectifID)

    return {...objectifToAdd, objectifID}
}

const fetchAllObjectifs = async(userID) => {

    const userDoc = doc(db, "Users", userID)

    const qry = query(collection(userDoc, collectionName));
    const querySnapshot = await getDocs(qry)

    const objectifArray = await Promise.all(
        querySnapshot.docs.map(async (obj) => {
        const objectifID = obj.id;

        const obj_data = obj.data();
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


export {addObjectifToFirestore, fetchAllObjectifs}