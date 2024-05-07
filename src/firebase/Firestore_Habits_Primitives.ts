import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, documentId, Firestore, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"
import { auth, db } from "./InitialisationFirebase"
import { listKeyIDfromArray, toISOStringWithoutTimeZone } from "../primitives/BasicsMethods"
import { createDefaultStepFromHabit } from "../primitives/StepMethods"
import { removeHabitLogs } from "./Firestore_Step_Primitives"
import { checkIfStreakEndedHabit, getUpdatedStreakOfHabit, getUsersDataBaseFromMember, stringToFrequencyType } from "../primitives/HabitMethods"
import { FormDetailledHabit } from "../types/FormHabitTypes"
import { FirestoreStep, GlobalFirestoreHabit, GlobalHabit, UserFirestoreHabit } from "../types/FirestoreTypes/FirestoreHabitTypes"
import { FrequencyTypes, Habit, HabitList, StepList, StreakValues } from "../types/HabitTypes"
import { FirestoreCollections, FirestoreUserSubCollections } from "../types/FirestoreTypes/FirestoreCollections"
import { Database_getUsersInfo, UserDataBase } from "./Database_User_Primitives"

/**
 * [FIRESTORE] Prépare une habitude pour l'envoyer dans la collection globale des habitudes
 */

const setupFirestoreGlobalHabit = (habit: FormDetailledHabit, userMail: string, userID: string, habitStartingDate?: string): GlobalFirestoreHabit => {
    const startingDate = habitStartingDate ?? toISOStringWithoutTimeZone(new Date())

    const { alertTime, notificationEnabled, objectifID, ...habitTemp } = habit;

    const globalHabit: GlobalFirestoreHabit = { 
        ...habitTemp, 
        steps: habitTemp.steps.map((step) => ({...step, created: startingDate})),
        members: [{mail: userMail, id: userID}]
    }
    
    return globalHabit
}

/**
 * [FIRESTORE] Prépare une habitude pour l'envoyer dans la collection privée d'un utilisateur 
 */

const setupFirestoreUserHabit = (habitID: string, habitStartingDate?: string, objectifID: string | null = null, alertTime: string = "", notificationEnabled: boolean = false) => {
    const startingDate = habitStartingDate ?? toISOStringWithoutTimeZone(new Date())

    const userHabit: UserFirestoreHabit = { 
        alertTime,
        notificationEnabled,
        habitID,
        startingDate,
        objectifID: objectifID ?? null,
        bestStreak: 0,
        currentStreak: 0, 
        lastCompletionDate: "none",
        doneDates: [],
    }

    return userHabit
}

/**
 * [FIRESTORE] Ajoute une habitude dans la collection globale puis ajoute dans la collection privée de l'utilisateur
 */

const addHabitToFireStore = async(habit: FormDetailledHabit, userMail: string, userID: string): Promise<Habit | null> => {
    try {
        console.log("adding habit to firestore...")

        //Ajout dans global
        const globalHabit = setupFirestoreGlobalHabit(habit, userMail, userID, habit.startingDate)
    
        const habitsCollection = collection(db, FirestoreCollections.Habits)
        const habitRef = await addDoc(habitsCollection, globalHabit)
    
        const habitID = habitRef.id    
        console.log("Habit well added to firestore with id : ", habitID)
    
        //Ajout en spécifique
        const userHabit = await addRefHabitToFirestore(habitID, userMail, habit.startingDate, habit.objectifID, habit.alertTime, habit.notificationEnabled)
    
        console.log("Habit well added to user firestore")
    
        let oldSteps: FirestoreStep[];
    
        //Si pas de vrai step => placeholder
    
        if(globalHabit.steps.length === 1 && globalHabit.steps[0].numero === -1)
            oldSteps = [createDefaultStepFromHabit(globalHabit, habitID, habit.startingDate ? new Date(habit.startingDate) : new Date())]   
    
        else oldSteps = globalHabit.steps
    
        //copy
        oldSteps = oldSteps.map(step => ({...step}))
    
        const steps: StepList  = listKeyIDfromArray(oldSteps, "stepID", habitID)
    
        const frequency: FrequencyTypes = stringToFrequencyType(globalHabit.frequency)
        const startingDate =  new Date(userHabit.startingDate)
    
        return {
            ...globalHabit, 
            ...userHabit,
            objectifID: userHabit.objectifID ?? undefined, 
            startingDate, 
            habitID, 
            steps, 
            frequency,
            members: []
        }
    }
    
    catch(e) {
        console.log("Error while adding habit to firestore : ", e)
        return null
    }
}

/**
 * [FIRESTORE] Ajoute une référence, dans la collection de l'utilisateurs, d'une habitude déjà présente dans la collection global
 */

const addRefHabitToFirestore = async (habitID: string, userID: string, startingDate?: string, objectifID: string | null = null, alertTime: string = "", notificationEnabled: boolean = false): Promise<UserFirestoreHabit> => {
    console.log("Adding ref habit to Firestore...");

    const userHabit = setupFirestoreUserHabit(habitID, startingDate, objectifID, alertTime, notificationEnabled)

    try {
        const userDoc = doc(db,  FirestoreCollections.Users, userID)
        const habitRef = await setDoc(
            doc(userDoc, FirestoreUserSubCollections.UserHabits, habitID),
            userHabit
        )

        console.log("Habit reference successfully added");
    } catch (error) {
        console.error("Error adding habit reference to Firestore:", error);
    }

    return userHabit
};

/**
 * [FIRESTORE] Supprime une habitude dans la collection d'un utilisateur et l'enlève des membres
 */

const removeHabitInFirestore = async(habit: Habit, userMail: string, userID: string, deleteLogs = true, baseState = HabitState.Current) => {

    const userDoc = doc(db, FirestoreCollections.Users, userMail)

    console.log("Deleting habit in firestore with id : ", habit.habitID, "...")

    const customCollection = 
    baseState === HabitState.Archived ? FirestoreUserSubCollections.UserArchivedHabits
        : baseState === HabitState.Done ? FirestoreUserSubCollections.UserDoneHabits
            : FirestoreUserSubCollections.UserHabits

    const docRef = doc(collection(userDoc, customCollection), habit.habitID)
    await deleteDoc(docRef);

    console.log("Habit successfully deleted in firestore !")

    if(deleteLogs) {
        const habitDoc = doc(db, FirestoreCollections.Habits, habit.habitID)
        await updateDoc(habitDoc, {members: arrayRemove({
            mail: userMail,
            id: userID
        })})
    
        await removeHabitLogs(userMail, habit.habitID)
    }
}

/**
 * [FIRESTORE] Modifie une habitude dans la collection globale ou privée en fonction des données modifiées
 */

const updateHabitInFirestore = async(userID: string, oldHabit: Habit, newValues: {[key: string]: any}) => {
    
    console.log("Updating habit in firestore with id : ", oldHabit.habitID, "...")

    //Modification des éléments propres à l'utilisateur

    if("objectifID" in newValues || "alertTime" in newValues || "notificationEnabled" in newValues) {
        const userDoc = doc(db, FirestoreCollections.Users, userID)
        const docRef = doc(
            collection(userDoc, FirestoreUserSubCollections.UserHabits), 
            oldHabit.habitID
        )
        
        const newValues_temp = {}

        if("objectifID" in newValues) newValues_temp["objectifID"] = newValues.objectifID
        if("alertTime" in newValues) newValues_temp["alertTime"] = newValues.alertTime
        if("notificationEnabled" in newValues) newValues_temp["notificationEnabled"] = newValues.notificationEnabled

        await updateDoc(docRef, {...newValues_temp});

        console.log("User-specific habit information updated!");
    }

    //Modification des éléments généraux

    const {objectifID, alertTime, notificationEnabled, ...newValues_global} = newValues

    if(Object.keys(newValues_global).length > 0) {
        const habitDoc = doc(db, FirestoreCollections.Habits, oldHabit.habitID)
        await updateDoc(habitDoc, newValues_global);

        console.log("Global habit information updated!");
    }


    console.log("Habit successfully updated in firestore !")
} 

/**
 * [FIRESTORE] Mise à jour des streaks-infos d'une habitude
 */

const updateCompletedHabit = async(userID: string, habitID: string, newStreakValues: StreakValues) => {
    console.log("Updating habit streak...")

    const userDoc = doc(db, FirestoreCollections.Users, userID)

    const userHabitRef = doc(collection(userDoc, FirestoreUserSubCollections.UserHabits), habitID);

    await updateDoc(userHabitRef, {...newStreakValues});

    console.log("Streak of habit updated !");
}

/**
 * [FIRESTORE] Ajoute une date à l'historique de complétion d'un utilisateur pour une habitude
 */

const addHabitDoneDate = async(userID: string, habitID: string, dateString: string) => {
    const userDoc = doc(db, FirestoreCollections.Users, userID)

    console.log("Updating habit done dates by adding : ", dateString, " in firestore for habit with id : ", habitID, "...")

    const habitsRef = collection(userDoc, FirestoreUserSubCollections.UserHabits)
    const docRef = doc(habitsRef, habitID)

    await updateDoc(docRef, {doneDates: arrayUnion(dateString)});

    console.log("Habit done dates successfully updated in firestore !")
}

/**
 * [FIRESTORE] Récupère une habitude spécifique globale
 */

const getSpecificGlobalHabit = async(habitID: string): Promise<GlobalHabit | null> => {
    const habitDoc = doc(db, FirestoreCollections.Habits, habitID)
    const habitSnap = await getDoc(habitDoc)
    
    if(habitSnap.exists()) {
        const data = habitSnap.data() as GlobalFirestoreHabit
        let steps: StepList = {}

        const notPlaceholderSteps = data.steps.filter((step: FirestoreStep) => (step.numero !== -1))
        steps = listKeyIDfromArray(notPlaceholderSteps, "stepID", habitID)
 
        if(notPlaceholderSteps.length < data.steps.length || notPlaceholderSteps.length === 0){
            steps[habitID] = createDefaultStepFromHabit(data, habitID, new Date())
        }

        const isAllDays = data.daysOfWeek.length === 0 && data.daysOfWeek.includes(7)
        const daysOfWeek = isAllDays ? [0,1,2,3,4,5,6] : data.daysOfWeek

        const frequency = stringToFrequencyType(data.frequency)

        return  {...data, steps, daysOfWeek, frequency};
    }

    return null
}

/**
 * [FIRESTORE] Récupère les informations propres à un utilisateur sur une habitude spécifique
 */

const getUserInfoForSpecificHabit = async(userID: string, habitID: string, customCollection = FirestoreUserSubCollections.UserHabits): Promise<UserFirestoreHabit | null> => {
    const userDoc = doc(db, FirestoreCollections.Users, userID)
    const habitDoc = doc(collection(userDoc, customCollection), habitID);

    const habitSnap = await getDoc(habitDoc)
    if(habitSnap.exists()) {    
        const data = habitSnap.data() as UserFirestoreHabit
        return data
    }

    return null
}

/**
 * [FIRESTORE] Récupère les informations propres à un utilisateur et les informations globales sur une habitude spécifique
 */

const getSpecificHabitForUser = async(userID: string, habitID: string): Promise<Habit | null> => {
    const globalHabit = await getSpecificGlobalHabit(habitID)
    if(globalHabit) {
        const userHabit = await getUserInfoForSpecificHabit(userID, habitID)
        if(userHabit) {
            const objectifID = userHabit.objectifID ?? undefined
            const startingDate = new Date(userHabit.startingDate)

            const members = await getUsersDataBaseFromMember(globalHabit.members, undefined, userID)

            return {...globalHabit, ...userHabit, objectifID, startingDate, members}
        }
    }

    return null
}

/**
 * [FIRESTORE] Récupère les habitudes liées à un objectif pour un utilisateur
 */

const getUserHabitsForObjectif = async(userMail: string, objectifID: string): Promise<Habit[]> => {

    try{
        const habits: Habit[] = []

        const userDoc = doc(db, FirestoreCollections.Users, userMail)
        const habitCollection = collection(userDoc, FirestoreUserSubCollections.UserHabits); 

        const qry = query(habitCollection, where("objectifID", "==", objectifID))

        const qrySnap = await getDocs(qry)

        await Promise.all(qrySnap.docs.map(async(firestoreHabit) => {
            const userHabit = firestoreHabit.data() as UserFirestoreHabit

            const globalHabit = await getSpecificGlobalHabit(userHabit.habitID)
            if(globalHabit) {
                const startingDate = new Date(userHabit.startingDate)

                const members = await getUsersDataBaseFromMember(globalHabit.members, undefined, userMail)
    
                habits.push({...globalHabit, ...userHabit, objectifID, startingDate, members})
            }
        }))

        return habits
    }

    catch(e) {
        console.log("Error while retrieving habits for objectif : ", e)
    }

    return []
}

export enum HabitState {
    Current = "Current",
    Done = "Done",
    Archived = "Archived"
}

/**
 * [FIRESTORE] Archive une habitude en fonction de son état courant
 */

export const archiveUserHabit = async(habit: Habit, userMail: string, userID: string, baseState = HabitState.Current): Promise<void> => {

    try {
        console.log("Archiving habit...")

        const userDoc = doc(db, FirestoreCollections.Users, userMail)
    
        const customCollection = 
            baseState === HabitState.Archived ? FirestoreUserSubCollections.UserArchivedHabits
                : baseState === HabitState.Done ? FirestoreUserSubCollections.UserDoneHabits
                    : FirestoreUserSubCollections.UserHabits

        const userHabit = await getUserInfoForSpecificHabit(userMail, habit.habitID, customCollection)

        await removeHabitInFirestore(habit, userMail, userID, false)
        
        await setDoc(
            doc(userDoc, FirestoreUserSubCollections.UserArchivedHabits, habit.habitID),
            userHabit
        )

        console.log("Habit successfully archived !")
    }

    catch(e) {
        console.log("Error while archiving habit : ", e)
    }
}

/**
 * [FIRESTORE] Marque une habitude comme terminée en fonction de son état courant
 */

export const markUserHabitAsDone = async(habit: Habit, userMail: string, userID: string, baseState = HabitState.Current): Promise<void> => {
    try {
        console.log("Marking habit as done...")
        
        const userDoc = doc(db, FirestoreCollections.Users, userMail)

        const customCollection = 
            baseState === HabitState.Archived ? FirestoreUserSubCollections.UserArchivedHabits
                : baseState === HabitState.Done ? FirestoreUserSubCollections.UserDoneHabits
                    : FirestoreUserSubCollections.UserHabits

        const userHabit = await getUserInfoForSpecificHabit(userMail, habit.habitID, customCollection)
    
        await removeHabitInFirestore(habit, userMail, userID, false)
    
        await setDoc(
            doc(userDoc, FirestoreUserSubCollections.UserDoneHabits, habit.habitID),
            userHabit
        )

        console.log("Habit successfully marked as done !")
    }

    catch(e) {
        console.log("Error while marking habit as done : ", e)
    }
}

/**
 * [FIRESTORE] Récupère une habitude qui était soit terminée ou archivée et la remets dans les currents
 */

export const getBackUserHabit = async(habit: Habit, userMail: string, userID: string, baseState = HabitState.Done): Promise<void> => {
    try {
        console.log("Getting habit back...")
        
        if(baseState !== HabitState.Current) {
            const userDoc = doc(db, FirestoreCollections.Users, userMail)

            const customCollection = 
                baseState === HabitState.Archived ? FirestoreUserSubCollections.UserArchivedHabits
                    : FirestoreUserSubCollections.UserDoneHabits
    
            const userHabit = await getUserInfoForSpecificHabit(userMail, habit.habitID, customCollection)
        
            await removeHabitInFirestore(habit, userMail, userID, false, baseState)
        
            await setDoc(
                doc(userDoc, FirestoreUserSubCollections.UserHabits, habit.habitID),
                userHabit
            )

            console.log("Habit successfully got back !")
        }

        else console.log("Habit already current")
    }

    catch(e) {
        console.log("Error while marking habit as done : ", e)
    }
}

export {
    addHabitToFireStore, 
    removeHabitInFirestore, 
    updateHabitInFirestore, 
    updateCompletedHabit,
    addHabitDoneDate,
    getSpecificGlobalHabit,
    getUserInfoForSpecificHabit,
    getSpecificHabitForUser,
    addRefHabitToFirestore,
    getUserHabitsForObjectif
}