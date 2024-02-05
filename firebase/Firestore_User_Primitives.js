import { arrayRemove, arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore"
import { db } from "./InitialisationFirebase"

export const sendFriendInvitation = async(senderID, receiverID) => {
    try{
        console.log("Sending friend invitation...")

        const requestRef = doc(db, "Users", receiverID, "Friends", "Requests")

        const requestsDoc = await getDoc(requestRef)

        if(requestsDoc.exists()){
            await updateDoc(requestRef, {friends: arrayUnion(senderID)})
        }

        else{
            await setDoc(requestRef, {friends: [senderID]})
        }

        console.log("Invitation well sended !")
    
    }

    catch(e){
        console.log("Error while sending friend invitation : ", e)
    }
}

export const acceptFriendInvitation = async(userID, friendID) => {
    try{
        console.log("Accepting friend invitation...")

        const requestRef = doc(db, "Users", userID, "Friends", "Requests")

        await updateDoc(requestRef, {friends: arrayRemove(friendID)})
        
        const acceptedRef = doc(db, "Users", userID, "Friends", "Accepted")
        const acceptedDoc = await getDoc(acceptedRef)

        if(acceptedDoc.exists()){
            await updateDoc(acceptedRef, {friends: arrayUnion(friendID)})
        }

        else await setDoc(acceptedRef, {friends: [friendID]})

        console.log("Friend well accepted !")
    }

    catch(e){
        console.log("Error while accepting friend invitation : ", e)
    }
}

export const getAcceptedFriends = async(userID) => {
    try{
        const acceptedRef = doc(db, "Users", userID, "Friends", "Accepted")
        const acceptedSnapshot = await acceptedRef.get();

        if(acceptedSnapshot.exists()){
            return acceptedSnapshot.data().friends || []
        }

        console.log("Aucun ami accepté")
        return []
    }

    catch(e){
        console.log("Error while getting accepted friends : ", e)
        return []
    }
}


export const subscribeToFriendRequests = (userID, callback) => {
    const requestRef = doc(db, "Users", userID, "Friends", "Requests")

    const unsubscribe = onSnapshot(requestRef, (snapshot) => {
        if(snapshot.exists()){
            const friendRequests = snapshot.data().friends || []
            callback(friendRequests)
        }

        else callback([])
    })

    return unsubscribe
}

export const subscribeToFriends = (userID, callback) => {
    const requestRef = doc(db, "Users", userID, "Friends", "Accepted")

    const unsubscribe = onSnapshot(requestRef, (snapshot) => {
        if(snapshot.exists()){
            const friends = snapshot.data().friends || []
            callback(friends)
        }

        else callback([])
    })

    return unsubscribe
}