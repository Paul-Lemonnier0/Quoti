import { child, equalTo, get, limitToFirst, orderByChild, query, ref, set, startAt, endAt } from "firebase/database"
import { database } from "./InitialisationFirebase"
import { User, UserInfo } from "firebase/auth";

async function Database_setUser(user: User){
    await set(ref(database, "Users/" + user.uid), {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
    })
}

async function Database_GetSpecificUser(userID: string){
    try{
        const userRef = ref(database, `Users/${userID}`);
        const userSnapshot = await get(userRef)

        if(userSnapshot.exists()){
            return userSnapshot.val()
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

async function Database_getUsersInfo(usersIDs: string[]){
    try{
        const promises = usersIDs.map(async(userID) => {
            const userRef = ref(database, `Users/${userID}`);
            const userSnapshot = await get(userRef)

            if(userSnapshot.exists()){
                return {uid: userID, ...userSnapshot.val()}
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
        return null
    }
}

async function Database_getAllUsers(text: string): Promise<User[]>{
    
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