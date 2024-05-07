import { addDoc, collection, doc, query, setDoc, where } from "firebase/firestore";
import { Habit } from "../types/HabitTypes";
import { db } from "./InitialisationFirebase";
import { FirestoreCollections } from "../types/FirestoreTypes/FirestoreCollections";
import { UserDataBase } from "./Database_User_Primitives";

export interface PostHabit {
    habitID: string,
    icon: string,
    color: string,
    titre: string,
    description: string,
    bio: string,
    userMail: string,
    userID: string
}

export interface TestPostHabit {
    user: UserDataBase,
    habit: Habit,
    bio?: string,
    date: Date
}

const postHabit = async(userID: string, userMail: string, habit: Habit, bio: string) => {
    console.log("Adding post...")
    
    const userPostsRef = collection(db, FirestoreCollections.Posts)

    const {icon, color, titre, description, habitID} = habit

    await addDoc(userPostsRef, {
        date: new Date(),
        habitID,
        icon,
        color,
        titre,
        description,
        bio,
        userMail,
        userID,
    })

    console.log("Post well added !")
}

const getAllPostsForUser = async(friendsID: string[], userID: string, userMail: string): Promise<PostHabit[]>  => {
    console.log("Getting all posts for user : ", userMail)

    const qry = query(
        collection(db, FirestoreCollections.Posts), 
        where("userID", "in", friendsID)
    )

    return []
}

export {
    postHabit,
    getAllPostsForUser
}