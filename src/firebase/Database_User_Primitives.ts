import { child, equalTo, get, limitToFirst, orderByChild, query, ref, set, startAt, endAt } from "firebase/database"
import { database } from "./InitialisationFirebase"
import { User, UserInfo } from "firebase/auth";
import { UserType } from "../data/UserContext";

export interface UserDataBase {
    uid: string,
    firstName: string,
    lastName: string,
    displayName: string,
    email: string,
    photoURL?: string,
    isPrivate?: boolean
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
            return {uid: userID, ...userSnapshot.val()} as UserDataBase
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
            const userRef = ref(database, `Users/${userID}`);
            const userSnapshot = await get(userRef)

            if(userSnapshot.exists()){
                return {uid: userID, ...userSnapshot.val() } as UserDataBase
            }

            else{
                console.log("Uilisateur introuvable.")
                return null
            }
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
            const usersArray = Object.entries(users_vals).map(([uid, userData]: [string, any]) => ({ ...userData, uid }));


            if(includedInUserIDs) {
                return usersArray.filter(user => includedInUserIDs.includes(user.uid))
            }

            return usersArray
        }

        else return []
    }

    catch(e){
        console.log("Error while fetching all users :", e)
        return []
    }
}

export {Database_setUser, Database_GetSpecificUser, Database_getUsersInfo, Database_getAllUsers}