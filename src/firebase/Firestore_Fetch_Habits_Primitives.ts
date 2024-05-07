//TODO : cache ces values

import { collection, doc, documentId, getDocs, query, where } from "firebase/firestore"
import { FirestoreCollections, FirestoreUserSubCollections } from "../types/FirestoreTypes/FirestoreCollections"
import { Habit, HabitList, StepList, StreakValues } from "../types/HabitTypes"
import { db } from "./InitialisationFirebase"
import { FirestoreStep, GlobalFirestoreHabit, UserFirestoreHabit } from "../types/FirestoreTypes/FirestoreHabitTypes"
import { listKeyIDfromArray } from "../primitives/BasicsMethods"
import { createDefaultStepFromHabit } from "../primitives/StepMethods"
import { checkIfStreakEndedHabit, getUsersDataBaseFromMember, stringToFrequencyType } from "../primitives/HabitMethods"
import { HabitState } from "./Firestore_Habits_Primitives"


export interface HabitsFromFirestoreRetrieve {
    habits: HabitList,
    history: {[key: string]: Date[]}
}


/**
 * [FIRESTORE] Récupèren les habitudes archivées d'un utilisateur
 */

export const fetchUserHabits = async(userMail: string, habitState = HabitState.Current): Promise<HabitsFromFirestoreRetrieve> => {
    try {
        const today = new Date()
        const habitsHistory: {[key: string]: Date[]} = {}

        const customCollection = 
        habitState === HabitState.Archived ? FirestoreUserSubCollections.UserArchivedHabits
            : habitState === HabitState.Done ? FirestoreUserSubCollections.UserDoneHabits
                : FirestoreUserSubCollections.UserHabits

        const userDoc = doc(db, FirestoreCollections.Users, userMail)
        const userArchivedHabits_qry = query(collection(userDoc, customCollection))
        const userArchivedHabitsSnapshot = await getDocs(userArchivedHabits_qry)
            
        const userArchivedHabitsArray: UserFirestoreHabit[] = await Promise.all(
            userArchivedHabitsSnapshot.docs.map(async(archivedHabit) => {
                const habitID = archivedHabit.id
                const data = archivedHabit.data() as UserFirestoreHabit
    
                const objectifID = data.objectifID

                if(data.doneDates && data.doneDates.length > 0) {
                    habitsHistory[habitID] = data.doneDates.map((stringDate) => new Date(stringDate))
                }
    
                return {...data, habitID, objectifID };
            })
        )
    
        const userHabitsList = userArchivedHabitsArray.reduce((newHabitList, habit) => ({...newHabitList, [habit.habitID]: {...habit}}), {})
    
        const userArchivedHabitsID = Object.keys(userHabitsList)
        
        if(userArchivedHabitsID.length > 0) {

            if (userArchivedHabitsID.length > 0) {
                const batchSize = 30;
                const habitBatches: (string[])[] = [];

                for (let i = 0; i < userArchivedHabitsID.length; i += batchSize) {
                    const batch = userArchivedHabitsID.slice(i, i + batchSize);
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

                            const members = await getUsersDataBaseFromMember(data.members, undefined, userMail);

                            const fullHabit = { ...data, ...userHabit, startingDate, steps, daysOfWeek, frequency, objectifID, members };

                            const newStreakValues: StreakValues = checkIfStreakEndedHabit(fullHabit, today);
           
                            fullHabit.titre = fullHabit.titre.trim()
                            fullHabit.description = fullHabit.description.trim()

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