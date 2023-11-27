import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { db } from "./InitialisationFirebase"

const userID = "Paul"
const collectionName = "Objectifs"

const addObjectifToFirestore = async(objectif) => {

    let startingDate = objectif.startingDate;
    let endingDate = objectif.endingDate;
    if(typeof objectif.startingDate !== 'string'){
        startingDate = objectif.startingDate.toDateString();
        endingDate = objectif.endingDate.toDateString();
    }

    const objectifToAdd = {...objectif, startingDate, endingDate, userID}

    console.log("adding objectif to firestore...")
    const objectifRef = await addDoc(collection(db, collectionName), objectifToAdd)

    const objectifID = objectifRef.id;
    console.log("objectif added to firestore with id : ", objectifID)

    return {...objectifToAdd, objectifID}
}

const fetchAllObjectifs = async() => {

    const qry = query(collection(db, collectionName), where("userID", "==", userID));
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