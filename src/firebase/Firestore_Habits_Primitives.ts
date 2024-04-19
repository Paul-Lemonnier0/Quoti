import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, documentId, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"
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
    console.log(habitStartingDate)
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
        console.log("globalHabit : ", globalHabit)
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


interface HabitsFromFirestoreRetrieve {
    habits: HabitList,
    history: {[key: string]: Date[]}
}

/**
 * [FIRESTORE] Récupère toutes les habitudes d'un utilisateur ainsi que l'historique associé
 */

const getAllOwnHabits = async(userID: string): Promise<HabitsFromFirestoreRetrieve> => {
    try {
        const today = new Date()
  
        const userDoc = doc(db, FirestoreCollections.Users, userID)
        const userHabits_qry = query(collection(userDoc, FirestoreUserSubCollections.UserHabits))
        const userHabitsSnapshot = await getDocs(userHabits_qry)
    
        const habitsHistory: {[key: string]: Date[]} = {}
        
        const userHabitsArray: UserFirestoreHabit[] = await Promise.all(
            userHabitsSnapshot.docs.map(async(habit) => {
                const habitID = habit.id
                const data = habit.data() as UserFirestoreHabit
    
                const objectifID = data.objectifID
    
                if(data.doneDates && data.doneDates.length > 0) {
                    habitsHistory[habitID] = data.doneDates.map((stringDate) => new Date(stringDate))
                }
    
                return {...data, habitID, objectifID };
            })
        )
    
        const userHabitsList = userHabitsArray.reduce((newHabitList, habit) => ({...newHabitList, [habit.habitID]: {...habit}}), {})
    
        const userHabitsID = Object.keys(userHabitsList)
        
        if(userHabitsID.length > 0) {

            if (userHabitsID.length > 0) {
                const batchSize = 30;
                const habitBatches: (string[])[] = [];

                for (let i = 0; i < userHabitsID.length; i += batchSize) {
                    const batch = userHabitsID.slice(i, i + batchSize);
                    habitBatches.push(batch);
                }

                
                const habitsArray: Habit[] = [];
                for (const batch_habitsID of habitBatches) {
                    const habits_qry = query(
                        collection(db, FirestoreCollections.Habits),
                        where(documentId(), "in", batch_habitsID)
                    );

                    const habitsSnapshot = await getDocs(habits_qry);

                    const batchHabitsArray = await Promise.all(
                        habitsSnapshot.docs.map(async (habit) => {
                            const habitID = habit.id;
                            const data = habit.data() as GlobalFirestoreHabit;
                            const userHabit = userHabitsList[habitID] as UserFirestoreHabit;

                            let steps: StepList = {};
                            const notPlaceholderSteps = data.steps.filter((step: FirestoreStep) => step.numero !== -1);
                            steps = listKeyIDfromArray(notPlaceholderSteps, "stepID", habitID);

                            if (notPlaceholderSteps.length < data.steps.length || notPlaceholderSteps.length === 0) {
                                steps[habitID] = createDefaultStepFromHabit(data, habitID, new Date(userHabit.startingDate));
                            }

                            const isAllDays = data.daysOfWeek.length === 0 && data.daysOfWeek.includes(7);
                            const daysOfWeek = isAllDays ? [0, 1, 2, 3, 4, 5, 6] : data.daysOfWeek;

                            const frequency = stringToFrequencyType(data.frequency);

                            const objectifID = userHabit.objectifID ?? undefined;

                            const startingDate = new Date(userHabit.startingDate);

                            const members = await getUsersDataBaseFromMember(data.members, undefined, userID);

                            const fullHabit = { ...data, ...userHabit, startingDate, steps, daysOfWeek, frequency, objectifID, members };

                            const newStreakValues: StreakValues = checkIfStreakEndedHabit(fullHabit, today);

                            return { ...fullHabit, ...newStreakValues };
                        })
                    );

                    habitsArray.push(...batchHabitsArray);
                }

                return {
                    habits: habitsArray.reduce((newHabitList, habit) => ({...newHabitList, [habit.habitID]: {...habit}}), {}),
                    history: habitsHistory
                }
            }
        }
    }

    catch(e) {
        console.log("Error while fetching habits in firestore : ", e)
    }
    
    
    return {
        habits: {},
        history: {}
    }
}

/**
 * [FIRESTORE] Supprime une habitude dans la collection d'un utilisateur et l'enlève des membres
 */

const removeHabitInFirestore = async(habit: Habit, userMail: string, userID: string) => {

    const userDoc = doc(db, FirestoreCollections.Users, userMail)

    console.log("Deleting habit in firestore with id : ", habit.habitID, "...")

    const docRef = doc(collection(userDoc, FirestoreUserSubCollections.UserHabits), habit.habitID)
    await deleteDoc(docRef);

    console.log("Habit successfully deleted in firestore !")

    const habitDoc = doc(db, FirestoreCollections.Users, habit.habitID)
    await updateDoc(habitDoc, {members: arrayRemove({
        mail: userMail,
        id: userID
    })})

    await removeHabitLogs(userMail, habit.habitID)
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

const getUserInfoForSpecificHabit = async(userID: string, habitID: string): Promise<UserFirestoreHabit | null> => {
    const userDoc = doc(db, FirestoreCollections.Users, userID)
    const habitDoc = doc(collection(userDoc, FirestoreUserSubCollections.UserHabits), habitID);

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


export {
    addHabitToFireStore, 
    removeHabitInFirestore, 
    updateHabitInFirestore, 
    getAllOwnHabits,
    updateCompletedHabit,
    addHabitDoneDate,
    getSpecificGlobalHabit,
    getUserInfoForSpecificHabit,
    getSpecificHabitForUser,
    addRefHabitToFirestore
}