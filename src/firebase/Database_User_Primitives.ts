import { child, equalTo, get, limitToFirst, orderByChild, query, ref, set, startAt, endAt } from "firebase/database"
import { auth, database } from "./InitialisationFirebase"
import { User, UserInfo } from "firebase/auth";
import { UserType } from "../data/UserContext";

export interface UserDataBase {
    uid: string,
    firstName: string,
    lastName: string,
    displayName: string,
    email: string,
    photoURL?: string,
    isPrivate?: boolean,
    blocked?: string[]
}

async function Database_setUser(user: User, firstName: string, lastName: string, isPrivate?: boolean){
    await set(ref(database, "Users/" + user.uid), {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        firstName: firstName,
        lastName: lastName,
        isPrivate: isPrivate ?? true
    })
}

async function Database_GetSpecificUser(userID: string): Promise<(UserDataBase | null)>{
    try{
        const userRef = ref(database, `Users/${userID}`);
        const userSnapshot = await get(userRef)

        if(userSnapshot.exists()){

            const blocked: string[] = []
            if("Blocked" in userSnapshot.val()) {
                const blockedStateUsers: {[key: string]: boolean} = userSnapshot.val().Blocked

                Object.keys(blockedStateUsers).map(uID => {
                    if(blockedStateUsers[uID]) {
                        blocked.push(uID)
                    }
                })
            }

            return {uid: userID, ...userSnapshot.val(), blocked} as UserDataBase
        }

        else{
            console.log("Utilisateur introuvable.")
            return null
        }
    }

    catch(e){
        console.log("Error while getting specific user : ", e)
        return null
    }
}

async function Database_getUsersInfo(usersIDs: string[]): Promise<(UserDataBase | null)[]>{

    try{
        const promises = usersIDs.map(async(userID) => {
            return await Database_GetSpecificUser(userID)
        })

        const usersData = await Promise.all(promises);
        return usersData
    }

    catch(e){
        console.log("Error while getting bunch of specifics users : ", e)
        return []
    }
}

async function Database_getAllUsers(text: string, includedInUserIDs?: string[]): Promise<UserDataBase[]>{
    
    if(text.length === 0){
        return []
    } 

    try{
        
        const prefix = text
        const qry = query(ref(database, "Users"), orderByChild("displayName"), startAt(prefix), endAt(prefix + "\uf8ff"), limitToFirst(10));
  
        const usersSnapshot = await get(qry);

        if(usersSnapshot.exists()){
            const users_vals: User[] = usersSnapshot.val()
            const usersArray: (UserDataBase | null)[] = Object.entries(users_vals).map(([uid, userData]: [string, any]) => {
                const blocked: string[] = []

                if("Blocked" in userData) {
                    const blockedStateUsers: {[key: string]: boolean} = userData.Blocked
    
                    Object.keys(blockedStateUsers).map(uID => {
                        if(blockedStateUsers[uID]) {
                            blocked.push(uID)
                        }
                    })
                }

                if(auth.currentUser && !blocked.includes(auth.currentUser.uid)) {
                    return { ...userData, uid, blocked }
                }

                return null
            });

            const notNullUsersIDs = usersArray.filter(user => user !== null)

            if(includedInUserIDs) {
                return notNullUsersIDs.filter(user => includedInUserIDs.includes(user.uid))
            }

            return notNullUsersIDs
        }

        else return []
    }

    catch(e){
        console.log("Error while fetching all users :", e)
        return []
    }
}

const Database_changeBlockUserState = async (userID: string, userToBlockID: string, unBlock = false) => {
    try {
        const newBlockedUser = {
            [userToBlockID]: !unBlock
        };

        await set(ref(database, `Users/${userID}/Blocked`), newBlockedUser);
        
        if(!unBlock) console.log(`Utilisateur ${userID} a bloqué l'utilisateur ${userToBlockID} avec succès.`);
        else console.log(`Utilisateur ${userID} a débloqué l'utilisateur ${userToBlockID} avec succès.`);

    } catch (error) {
        console.error("Erreur lors du blocage de l'utilisateur :", error);
    }
};

export {
    Database_setUser, 
    Database_changeBlockUserState,
    Database_GetSpecificUser, 
    Database_getUsersInfo, 
    Database_getAllUsers
}