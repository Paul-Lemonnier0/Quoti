import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { db } from "./InitialisationFirebase"

const userID = "Paul"
const collectionName = "Objectifs"

const addObjectifToFirestore = async(objectif) => {

    console.log("adding objectif to firestore...")
    console.log("Objectif to add : ", objectif)
    const objectifRef = await addDoc(collection(db, collectionName), {
        ...objectif,
        userID: userID
    })

    const objectifID = objectifRef.id;
    console.log("objectif added to firestore with id : ", objectifID)

    return {...objectif, objectifID}
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

        console.log(obj.data())

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