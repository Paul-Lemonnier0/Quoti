import { arrayRemove, arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore"
import { db } from "./InitialisationFirebase"
import { Unsubscribe } from "firebase/auth"
import { UserEventRequest, UserType } from "../data/UserContext"
import { UserDataBase } from "./Database_User_Primitives"
import { Habit } from "../types/HabitTypes"
import { addRefHabitToFirestore } from "./Firestore_Habits_Primitives"

export const sendFriendInvitation = async(senderID: string, senderMail: string, receiverID: string, receiverMail: string) => {
    try{
        console.log("Sending friend invitation...")

        const requestRef = doc(db, "Users", receiverMail, "Friends", "Requests")

        const requestsDoc = await getDoc(requestRef)

        if(requestsDoc.exists()){
            await updateDoc(requestRef, {friends: arrayUnion(senderID)})
        }

        else{
            await setDoc(requestRef, {friends: [senderID]})
        }

        const sendedRequestRef = doc(db, "Users", senderMail, "Friends", "Requests")

        const sendedRequestsDoc = await getDoc(sendedRequestRef)

        if(sendedRequestsDoc.exists()){
            await updateDoc(sendedRequestRef, {sended: arrayUnion(receiverID)})
        }

        else{
            await setDoc(sendedRequestRef, {sended: [receiverID]})
        }

        console.log("Invitation well sended !")
    
    }

    catch(e){
        console.log("Error while sending friend invitation : ", e)
    }
}

export const cancelFriendInvitation = async(senderID: string, senderMail: string, receiverID: string, receiverMail: string) => {
    try{
        console.log("Sending friend invitation...")

        const requestRef = doc(db, "Users", receiverMail, "Friends", "Requests")

        const requestsDoc = await getDoc(requestRef)

        if(requestsDoc.exists()){
            await updateDoc(requestRef, {friends: arrayRemove(senderID)})
        }

        else{
            await setDoc(requestRef, {friends: [senderID]})
        }

        const sendedRequestRef = doc(db, "Users", senderMail, "Friends", "Requests")

        const sendedRequestsDoc = await getDoc(sendedRequestRef)

        if(sendedRequestsDoc.exists()){
            await updateDoc(sendedRequestRef, {sended: arrayRemove(receiverID)})
        }

        else{
            await setDoc(sendedRequestRef, {sended: [receiverID]})
        }

        console.log("Invitation well canceled !")
    
    }

    catch(e){
        console.log("Error while sending friend invitation : ", e)
    }
}

export const acceptFriendInvitation = async(userID: string, userMail: string, friendID: string, friendMail: string) => {
    try{
        console.log("Accepting friend invitation...")

        const requestRef = doc(db, "Users", userMail, "Friends", "Requests")
        await updateDoc(requestRef, {friends: arrayRemove(friendID)})
        
        const acceptedRef = doc(db, "Users", userMail, "Friends", "Accepted")
        const acceptedDoc = await getDoc(acceptedRef)

        if(acceptedDoc.exists()){
            await updateDoc(acceptedRef, {friends: arrayUnion(friendID)})
        }

        else await setDoc(acceptedRef, {friends: [friendID]})

        //Pour le sender

        const requestRefSender = doc(db, "Users", friendMail, "Friends", "Requests")
        await updateDoc(requestRefSender, {sended: arrayRemove(userID)})

        const acceptedRefSender = doc(db, "Users", friendMail, "Friends", "Accepted")
        const acceptedDocSender = await getDoc(acceptedRefSender)

        if(acceptedDocSender.exists()){
            await updateDoc(acceptedRefSender, {friends: arrayUnion(userID)})
        }

        else await setDoc(acceptedRefSender, {friends: [userID]})

        console.log("Friend well accepted !")
    }

    catch(e){
        console.log("Error while accepting friend invitation : ", e)
    }
}

export const refuseFriendInvitation = async(userID: string, userMail: string, friendID: string, friendMail: string) => {
    try{
        console.log("Refusing friend invitation...")

        const requestRef = doc(db, "Users", userMail, "Friends", "Requests")

        await updateDoc(requestRef, {friends: arrayRemove(friendID)})

        const requestRefSender = doc(db, "Users", friendMail, "Friends", "Requests")

        await updateDoc(requestRefSender, {sended: arrayRemove(userID)})

        console.log("Friend well refused !")
    }

    catch(e){
        console.log("Error while refusing friend invitation : ", e)
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

export const getSendedFriendRequest = async(userMail: string): Promise<string[]> => {
    const sendedRequestRef = doc(db, "Users", userMail, "Friends", "Requests")
    const sendedRequestsDoc = await getDoc(sendedRequestRef)

    if(sendedRequestsDoc.exists()) {
        if("sended" in sendedRequestsDoc.data()) {
            return sendedRequestsDoc.data().sended
        }
    }

    return []
}

export const subscribeToHabitsRequests = (userID: string, callback: (habitsRequests: Array<any>) => void): Unsubscribe => {
    const requestRef = doc(db, "Users", userID, "Friends", "HabitsInvitations")

    const unsubscribe = onSnapshot(requestRef, (snapshot) => {
        if(snapshot.exists()){
            const habits = snapshot.data().habits || []
            callback(habits)
        }

        else callback([])
    })

    return unsubscribe
}

export const getHabitInvitationRequest = async(userMail: string): Promise<string[]> => {
    const habitSendedRequestRef = doc(db, "Users", userMail, "Friends", "HabitsInvitations")
    const habitSendedRequestsDoc = await getDoc(habitSendedRequestRef)

    if(habitSendedRequestsDoc.exists()) {
        if("habits" in habitSendedRequestsDoc.data()) {
            return habitSendedRequestsDoc.data().habits
        }
    }

    return []
}

export const setBaseDetailsUser = async(userMail: string, birthDate: Date, isPrivate: boolean) => {
    const userRef = doc(db, 'Users', userMail)
    const userDoc = await getDoc(userRef)

    if(userDoc.exists()) {
        await updateDoc(userRef, {
            birthDate: birthDate.toISOString(),
            isPrivate: isPrivate
        })

        console.log("Profil Well updated !")
    }
}

export interface VisitInfoUser extends UserDataBase {
    isPrivate?: boolean,
    nbHabits?: number,
    nbObjectifs?: number,
    nbHabitsFinished?: number,
    nbObjectifsFinished?: number,
    nbSucces?: number
}

export const getVisitInfoUserFromUserDB = async(userDB: UserDataBase): Promise<VisitInfoUser> => {
    const user: VisitInfoUser = {...userDB}
    
    // const userRef = doc(db, "Users", userDB.email)
    // const userDoc = await getDoc(userRef)

    // if(userDoc.exists()) {
    //     if(userDoc.data() && "isPrivate" in userDoc.data()) {
    //         user.isPrivate = (userDoc.data().isPrivate) as boolean
    //     }
    // }

    // else console.log("dont exists : ", userDB.email)

    return user
}   

export const sendHabitInvitation = async(senderID: string, senderMail: string, receiverMail: string, habitID: string) => {
    try{
        console.log("Sending friend invitation...")

        const requestRef = doc(db, "Users", receiverMail, "Friends", "HabitsInvitations")
        const data: UserEventRequest = {ownerMail: senderMail, ownerID: senderID, habitID: habitID}

        const requestsDoc = await getDoc(requestRef)

        if(requestsDoc.exists()){
            await updateDoc(requestRef, {habits: arrayUnion(data)})
        }

        else{
            await setDoc(requestRef, {habits: [data]})
        }

        console.log("Habit invitation well sended !")
    }

    catch(e){
        console.log("Error while sending friend invitation : ", e)
    }
}


export const acceptHabitInvitation = async(senderID: string, senderMail: string, userMail: string, habit: Habit) => {
    try{
        console.log("Accepting habit invitation...")

        const data: UserEventRequest = {ownerMail: senderMail, ownerID: senderID, habitID: habit.habitID}

        //Retirer la demande

        const requestRef = doc(db, "Users", userMail, "Friends", "HabitsInvitations")
        await updateDoc(requestRef, {habits: arrayRemove(data)})

        //Ajouter dans les habits (en tant que ref)

        await addRefHabitToFirestore(data, userMail)

        console.log("Habit invitation well accepted !")
    }

    catch(e){
        console.log("Error while refusing friend invitation : ", e)
    }
}

export const refuseHabitInvitation = async(senderID: string, senderMail: string, userMail: string, habitID: string) => {
    try{
        console.log("Refusing habit invitation...")

        const data: UserEventRequest = {ownerMail: senderMail, ownerID: senderID, habitID: habitID}

        console.log("data : ", data)

        const requestRef = doc(db, "Users", userMail, "Friends", "HabitsInvitations")

        await updateDoc(requestRef, {habits: arrayRemove(data)})

        console.log("Habit invitation well refused !")
    }

    catch(e){
        console.log("Error while refusing friend invitation : ", e)
    }
}