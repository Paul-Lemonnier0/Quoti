import { addDoc, collection, doc, getDocs, limit, query, where } from "firebase/firestore";
import { Habit, SeriazableHabit } from "../types/HabitTypes";
import { db } from "./InitialisationFirebase";
import { FirestoreCollections } from "../types/FirestoreTypes/FirestoreCollections";
import { UserDataBase } from "./Database_User_Primitives";

export enum PostStateType {
    Started = "Started",
    Ended = "Ended",
    Done = "Done",
}

export interface HabitPostFirestore {
    userID: string,
    userMail: string,
    habitID: string,
    color: string,
    icon: string,
    titre: string,
    description: string,
    legend: string,
    likes: string[],
    comments: string[],
    date: Date,
    state: PostStateType
}

export interface HabitPostType extends HabitPostFirestore {
    postID: string
}

/**
 * [FIRESTORE] Ajoute dans firestore le post courant
 */

export const postHabitActivity = async(userID: string, userMail: string, habit: Habit | SeriazableHabit, legend: string, postState: PostStateType): Promise<string | null> => {
    const postData: HabitPostFirestore = {
        userID: userID,
        userMail: userMail,
        habitID: habit.habitID, 
        titre: habit.titre,
        description:  habit.description,
        color: habit.color,
        icon: habit.icon,
        legend: legend,
        likes: [],
        comments: [],
        date: new Date(),
        state: postState
    }

    try {
        const postsCollection = collection(db, FirestoreCollections.Posts)
        const postID = await addDoc(postsCollection, postData)

        return postID.id
    }

    catch(e) {
        console.log("Error while posting : ", e)
        return null
    }
}

export const getPosts = async(userID: string, friendIDs: string[], numberOfPosts = 15): Promise<HabitPostType[]> => {
    try {
        const allIDs = [userID, ...friendIDs]

        const postsCollection = collection(db, FirestoreCollections.Posts)
         
        const postsQuery = query(
            postsCollection,
            where('userID', 'in', allIDs),
            limit(numberOfPosts)
        );

        const querySnapshot = await getDocs(postsQuery)
        const posts = querySnapshot.docs.map(post => ({...(post.data() as HabitPostFirestore), postID: post.id})) as HabitPostType[]

        return posts
    }

    catch(e) {
        console.log("Error while retrieving posts : ", e)
        return []
    }
}