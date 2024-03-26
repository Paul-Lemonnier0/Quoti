import { arrayRemove, arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore"
import { db } from "./InitialisationFirebase"
import { Unsubscribe } from "firebase/auth"

export const sendFriendInvitation = async(senderID: string, receiverID: string) => {
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

export const acceptFriendInvitation = async(userID: string, friendID: string) => {
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

export const subscribeToFriendRequests = (userID: string, callback: (friendRequests: Array<any>) => void): Unsubscribe => {
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

export const subscribeToFriends = (userID: string, callback: (friendRequests: Array<any>) => void): Unsubscribe => {
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