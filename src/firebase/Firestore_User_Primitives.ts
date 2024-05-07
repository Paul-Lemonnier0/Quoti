import { arrayRemove, arrayUnion, collection, doc, getCountFromServer, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore"
import { db } from "./InitialisationFirebase"
import { Unsubscribe } from "firebase/auth"
import { UserEventRequest, UserType } from "../data/UserContext"
import { UserDataBase } from "./Database_User_Primitives"
import { Habit } from "../types/HabitTypes"
import { addRefHabitToFirestore, HabitState } from "./Firestore_Habits_Primitives"
import { FirestoreCollections, FirestoreSocialSubCollections, FirestoreUserSubCollections } from "../types/FirestoreTypes/FirestoreCollections"


/**
 * [FIRESTORE] Supprime un lien d'amitiée
 */

export const removeUserFriendFirestore = async(userID: string, userMail: string, friendID: string, friendMail: string) => {
    try{
        console.log("Removing friend...")

        const userFriendsRef = doc(
            db, 
            FirestoreCollections.Users, 
            userMail, 
            FirestoreUserSubCollections.Social, 
            FirestoreSocialSubCollections.Friends
        )

        await updateDoc(userFriendsRef, {friends: arrayRemove(friendID)})

        const friendFriendsRef = doc(
            db, 
            FirestoreCollections.Users, 
            friendMail, 
            FirestoreUserSubCollections.Social, 
            FirestoreSocialSubCollections.Friends
        )

        await updateDoc(friendFriendsRef, {friends: arrayRemove(userID)})

        console.log("Friend well accepted !")
    }

    catch(e){
        console.log("Error while accepting friend invitation : ", e)
    }
}


/**
 * [FIRESTORE] Envoie une demande d'amis
 */

export const sendFriendInvitation = async(senderID: string, senderMail: string, receiverID: string, receiverMail: string) => {
    try{
        console.log("Sending friend invitation...")

        const requestRef = doc(
            db, 
            FirestoreCollections.Users, 
            receiverMail, 
            FirestoreUserSubCollections.Social, 
            FirestoreSocialSubCollections.Requests
        )

        const requestsDoc = await getDoc(requestRef)

        if(requestsDoc.exists()) 
            await updateDoc(requestRef, {friends: arrayUnion(senderID)})

        else await setDoc(requestRef, {friends: [senderID]})

        const sendedRequestRef = doc(
            db, 
            FirestoreCollections.Users, 
            senderMail, 
            FirestoreUserSubCollections.Social, 
            FirestoreSocialSubCollections.Requests
        )

        const sendedRequestsDoc = await getDoc(sendedRequestRef)

        if(sendedRequestsDoc.exists())
            await updateDoc(sendedRequestRef, {sended: arrayUnion(receiverID)})
        

        else await setDoc(sendedRequestRef, {sended: [receiverID]})

        console.log("Invitation well sended !")
    }

    catch(e){
        console.log("Error while sending friend invitation : ", e)
    }
}


/**
 * [FIRESTORE] Annule une demande d'ami envoyée
 */


export const cancelFriendInvitation = async(senderID: string, senderMail: string, receiverID: string, receiverMail: string) => {
    try{
        console.log("Sending friend invitation...")

        const requestRef = doc(
            db, 
            FirestoreCollections.Users, 
            receiverMail, 
            FirestoreUserSubCollections.Social, 
            FirestoreSocialSubCollections.Requests
        )

        const requestsDoc = await getDoc(requestRef)

        if(requestsDoc.exists()){
            await updateDoc(requestRef, {friends: arrayRemove(senderID)})
        }

        else{
            await setDoc(requestRef, {friends: [senderID]})
        }

        const sendedRequestRef = doc(
            db, 
            FirestoreCollections.Users, 
            senderMail, 
            FirestoreUserSubCollections.Social, 
            FirestoreSocialSubCollections.Requests
        )

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

/**
 * [FIRESTORE] Accepte une demande d'ami reçue
 */

export const acceptFriendInvitation = async(userID: string, userMail: string, friendID: string, friendMail: string) => {
    try{
        console.log("Accepting friend invitation...")

        const requestRef = doc(
            db, 
            FirestoreCollections.Users, 
            userMail, 
            FirestoreUserSubCollections.Social, 
            FirestoreSocialSubCollections.Requests
        )

        await updateDoc(requestRef, {friends: arrayRemove(friendID)})
        
        const acceptedRef = doc(
            db, 
            FirestoreCollections.Users, 
            userMail, 
            FirestoreUserSubCollections.Social, 
            FirestoreSocialSubCollections.Friends
        )

        const acceptedDoc = await getDoc(acceptedRef)

        if(acceptedDoc.exists()){
            await updateDoc(acceptedRef, {friends: arrayUnion(friendID)})
        }

        else await setDoc(acceptedRef, {friends: [friendID]})

        //Pour le sender

        const requestRefSender = doc(
            db, 
            FirestoreCollections.Users, 
            friendMail, 
            FirestoreUserSubCollections.Social, 
            FirestoreSocialSubCollections.Requests
        )

        await updateDoc(requestRefSender, {sended: arrayRemove(userID)})

        const acceptedRefSender = doc(
            db, 
            FirestoreCollections.Users, 
            friendMail, 
            FirestoreUserSubCollections.Social, 
            FirestoreSocialSubCollections.Friends
        )

        const acceptedDocSender = await getDoc(acceptedRefSender)

        if(acceptedDocSender.exists())
            await updateDoc(acceptedRefSender, {friends: arrayUnion(userID)})
        

        else await setDoc(acceptedRefSender, {friends: [userID]})

        console.log("Friend well accepted !")
    }

    catch(e){
        console.log("Error while accepting friend invitation : ", e)
    }
}

/**
 * [FIRESTORE] Refuse une demande d'ami reçue
 */


export const refuseFriendInvitation = async(userID: string, userMail: string, friendID: string, friendMail: string) => {
    try{
        console.log("Refusing friend invitation...")

        const requestRef = doc(
            db, 
            FirestoreCollections.Users, 
            userMail, 
            FirestoreUserSubCollections.Social, 
            FirestoreSocialSubCollections.Requests
        )

        await updateDoc(requestRef, {friends: arrayRemove(friendID)})

        const requestRefSender = doc(
            db, 
            FirestoreCollections.Users, 
            friendMail, 
            FirestoreUserSubCollections.Social, 
            FirestoreSocialSubCollections.Requests
        )

        await updateDoc(requestRefSender, {sended: arrayRemove(userID)})

        console.log("Friend well refused !")
    }

    catch(e){
        console.log("Error while refusing friend invitation : ", e)
    }
}

/**
 * [FIRESTORE] Ecoute les changements des demandes d'amis reçues (lance le callback si il y a une modification)
 */


export const subscribeToFriendRequests = (userID: string, callback: (friendRequests: Array<any>) => void): Unsubscribe => {
    const requestRef = doc(db, FirestoreCollections.Users, userID, FirestoreUserSubCollections.Social, FirestoreSocialSubCollections.Requests)

    const unsubscribe = onSnapshot(requestRef, (snapshot) => {
        if(snapshot.exists()){
            const friendRequests = snapshot.data().friends || []
            callback(friendRequests)
        }

        else callback([])
    })

    return unsubscribe
}

/**
 * [FIRESTORE] Ecoute les changements des amis de l'utilisateurs (ajout/suppression) (lance le callback si il y a une modification)
 */


export const subscribeToFriends = (userID: string, callback: (friendRequests: Array<any>) => void): Unsubscribe => {
    const requestRef = doc(
        db, 
        FirestoreCollections.Users,
        userID, 
        FirestoreUserSubCollections.Social, 
        FirestoreSocialSubCollections.Friends
    )

    const unsubscribe = onSnapshot(requestRef, (snapshot) => {
        if(snapshot.exists()){
            const friends = snapshot.data().friends || []
            callback(friends)
        }

        else callback([])
    })

    return unsubscribe
}

/**
 * [FIRESTORE] Récupère les demandes d'amies envoyées par l'utilisateur
 */


export const getSendedFriendRequest = async(userMail: string): Promise<string[]> => {
    const sendedRequestRef = doc(
        db, 
        FirestoreCollections.Users, 
        userMail, 
        FirestoreUserSubCollections.Social, 
        FirestoreSocialSubCollections.Requests
    )

    const sendedRequestsDoc = await getDoc(sendedRequestRef)

    if(sendedRequestsDoc.exists()) {
        if("sended" in sendedRequestsDoc.data()) {
            return sendedRequestsDoc.data().sended
        }
    }

    return []
}

/**
 * [FIRESTORE] Ecoute les changements des invitations à des habitudes reçues (lance le callback si il y a une modification)
 */

export const subscribeToHabitsRequests = (userID: string, callback: (habitsRequests: Array<any>) => void): Unsubscribe => {
    const requestRef = doc(
        db, 
        FirestoreCollections.Users, 
        userID, 
        FirestoreUserSubCollections.Social, 
        FirestoreSocialSubCollections.HabitsInvitation
    )

    const unsubscribe = onSnapshot(requestRef, (snapshot) => {
        if(snapshot.exists()){
            const habits = snapshot.data().habits || []
            callback(habits)
        }

        else callback([])
    })

    return unsubscribe
}

/**
 * [FIRESTORE] Récupère les invitations reçues de collaboration à des habitudes
 */

export const getHabitInvitationRequest = async(userMail: string): Promise<string[]> => {
    const habitSendedRequestRef = doc(
        db, 
        FirestoreCollections.Users, 
        userMail, 
        FirestoreUserSubCollections.Social, 
        FirestoreSocialSubCollections.HabitsInvitation
    )

    const habitSendedRequestsDoc = await getDoc(habitSendedRequestRef)

    if(habitSendedRequestsDoc.exists()) {
        if("habits" in habitSendedRequestsDoc.data()) {
            return habitSendedRequestsDoc.data().habits
        }
    }

    return []
}

export interface VisitInfoUser extends UserDataBase {
    isPrivate: boolean,
    nbHabits: number,
    nbObjectifs: number,
    nbHabitsFinished: number,
    nbObjectifsFinished: number,
    friendsID: string[],
    nbSucces: number
}

/**
 * [FIRESTORE] Envoie une invitation de collaboration à une habitude
 */

export const sendHabitInvitation = async(senderID: string, senderMail: string, receiverMail: string, habitID: string) => {
    try{
        console.log("Sending friend invitation...")

        const requestRef = doc(
            db, 
            FirestoreCollections.Users, 
            receiverMail, 
            FirestoreUserSubCollections.Social, 
            FirestoreSocialSubCollections.HabitsInvitation
        )

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

/**
 * [FIRESTORE] Accepte une invitation de collaboration à une habitude
 */

export const acceptHabitInvitation = async(senderID: string, senderMail: string, userID: string, userMail: string, habitID: string): Promise<boolean> => {
    try{
        console.log("Accepting habit invitation...")

        const data: UserEventRequest = {
            ownerMail: senderMail, 
            ownerID: senderID, 
            habitID: habitID
        }

        //Retirer la demande

        const requestRef = doc(
            db,
            FirestoreCollections.Users,
            userMail,
            FirestoreUserSubCollections.Social,
            FirestoreSocialSubCollections.HabitsInvitation
        )

        await updateDoc(requestRef, {habits: arrayRemove(data)})

        //Ajouter dans les habits (en tant que ref)

        await addRefHabitToFirestore(habitID, userMail)

        //Ajouter le nouvel utilisateur aux membres

        const habitDoc = doc(
            db,
            FirestoreCollections.Habits,
            habitID
        )

        await updateDoc(habitDoc, ({
            members: arrayUnion({mail: userMail, id: userID})
        }))

        console.log("Habit invitation well accepted !")

        return true
    }

    catch(e){
        console.log("Error while accepting friend invitation : ", e)
    }

    return false
}

/**
 * [FIRESTORE] Refuse une invitation de collaboration à une habitude
 */

export const refuseHabitInvitation = async(senderID: string, senderMail: string, userMail: string, habitID: string) => {
    try{
        console.log("Refusing habit invitation...")

        const data: UserEventRequest = {
            ownerMail: senderMail, 
            ownerID: senderID, 
            habitID: habitID
        }

        const requestRef = doc(
            db,
            FirestoreCollections.Users,
            userMail,
            FirestoreUserSubCollections.Social,
            FirestoreSocialSubCollections.HabitsInvitation
        )

        await updateDoc(requestRef, {habits: arrayRemove(data)})

        console.log("Habit invitation well refused !")
    }

    catch(e){
        console.log("Error while refusing friend invitation : ", e)
    }
}

const getNumberOfHabitsForUser = async(userMail: string, baseState = HabitState.Current): Promise<number> => {
    const userDoc = doc(db, FirestoreCollections.Users, userMail)

    const customCollection = 
    baseState === HabitState.Archived ? FirestoreUserSubCollections.UserArchivedHabits
        : baseState === HabitState.Done ? FirestoreUserSubCollections.UserDoneHabits
            : FirestoreUserSubCollections.UserHabits

    const userHabitsCollection = collection(userDoc, customCollection); 

    const nbHabits = await getCountFromServer(userHabitsCollection)

    return nbHabits.data().count
}

const getNumberOfObjectifsForUser = async(userID: string): Promise<number> => {
    const userDoc = doc(db, FirestoreCollections.Users, userID)
    const userObjectifsCollection = collection(userDoc, FirestoreUserSubCollections.UserObjectifs); 

    const nbObjectifs = await getCountFromServer(userObjectifsCollection)

    return nbObjectifs.data().count
}

const getUserFriendsID = async(userID: string): Promise<string[]> => {
    const userDoc = doc(db, FirestoreCollections.Users, userID)
    const userFriendsDoc = doc(userDoc, FirestoreUserSubCollections.Social, FirestoreSocialSubCollections.Friends); 

    const friendsSnap = await getDoc(userFriendsDoc)

    if(friendsSnap.exists()) {
        return friendsSnap.data().friends ?? []
    }

    return []
}

export {
    getNumberOfHabitsForUser,
    getNumberOfObjectifsForUser,
    getUserFriendsID
}