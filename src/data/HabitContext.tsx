import React, { createContext, useState, useEffect, useContext, FC, ReactNode, Dispatch } from "react";
import { addHabitDoneDate, addHabitToFireStore, archiveUserHabit, getBackUserHabit, HabitState, markUserHabitAsDone, removeHabitInFirestore, updateCompletedHabit, updateHabitInFirestore } from "../firebase/Firestore_Habits_Primitives";
import { changeStepStateFirestore } from "../firebase/Firestore_Step_Primitives";
import { filterHabits, getHabitFromFilteredHabitsMethod, getHabitType, getUpdatedStreakOfHabit, getValidHabitsStepsForDate, removeHabitFromFilteredHabits, removeHabitFromHabits, updateFilteredHabitsWithNewHabit, updateHabitsWithNewHabit } from "../primitives/HabitMethods";
import { createDefaultStepFromHabit, setHabitWithDefaultStep, updateHabitStepState } from "../primitives/StepMethods";
import { addObjectifToFirestore, fetchAllObjectifs, removeObjectifInFirestore, updateObjectifInFirestore } from "../firebase/Firestore_Objectifs_Primitives";
import { UserContext, UserContextType } from "./UserContext";
import { EMPTY_FILTERED_HABITS, FilteredHabitsType, FrequencyTypes, Habit, HabitList, Objectif, ObjectifList, Step, StepList, StreakValues } from "../types/HabitTypes";
import { FormDetailledHabit } from "../types/FormHabitTypes";
import { FormDetailledObjectif } from "../types/FormObjectifTypes";
import { DefaultHabit } from "../types/DefaultHabit";
import { removeObjectifFromFilteredHabits, removeObjectifFromObjectifs } from "../primitives/ObjectifMethods";
import { auth } from "../firebase/InitialisationFirebase";
import { calculateNextScheduledDate, isHabitScheduledForDate } from "../primitives/HabitudesReccurence";
import { toISOStringWithoutTimeZone } from "../primitives/BasicsMethods";
import { fetchUserHabits } from "../firebase/Firestore_Fetch_Habits_Primitives";

export interface HabitContextType {
  Habits: HabitList,
  ArchivedHabits: HabitList,
  DoneHabits: HabitList,
  
  HabitsHistory: {[key: string]: Date[]},
  Objectifs: ObjectifList,
  ObjectifsHistory: {[key: string]: Date[]}

  filteredHabitsByDate: FilteredHabitsType,

  isFetched: boolean,
  isArchivedHabitsFetched: boolean,
  setIsArchivedHabitsFetched: Dispatch<boolean>,
  isDoneHabitsFetched: boolean,
  setIsDoneHabitsFetched: Dispatch<boolean>

  changeDate: (date: Date) => Promise<void>,
  addHabit: (habit: FormDetailledHabit) => Promise<Habit | undefined>,
  removeHabit: (habit: Habit) => Promise<void>,
  updateHabitRelationWithObjectif: (habit: Habit, destination_objectifID: string | null) => Promise<Habit>,
  updateHabit: (oldHabit: Habit, newValues: { [key: string]: any }, currentDate?: Date) => Promise<Habit>,
  addObjectif: (objectif: FormDetailledObjectif) => Promise<Objectif | undefined>,
  handleCheckStep: (habitID: string, stepID: string, date: Date, isChecked: boolean, isHabitNowCompleted: boolean) => Promise<void>,
  getHabitFromFilteredHabits: (frequency: FrequencyTypes, objectifID: string | undefined, habitID: string) => Habit | undefined,
  removeObjectif: (objectifID: string, deletePinnedHabit?: boolean) => Promise<void>,
  updateObjectif: (oldObjectif: Objectif, newValues: { [key: string]: any }, currentDate?: Date) => Promise<Objectif>,
  retrieveHabitsLinkToObjectif: (objectifID: string) => Habit[],
  addHabitIntern: (habit: Habit) => Habit,

  fetchArchivedHabits: () => Promise<Habit[]>,
  fetchDoneHabits: () => Promise<Habit[]>,

  archiveHabit: (habit: Habit, habitState?: HabitState) => Promise<void>,
  markHabitAsDone: (habit: Habit, habitState?: HabitState) => Promise<void>,
  getBackHabit: (habit: Habit, habitState?: HabitState) => Promise<void>,
}

const defaultHabitContext: HabitContextType = {
  Habits: {}, 
  ArchivedHabits: {},
  DoneHabits: {},

  HabitsHistory: {},

  Objectifs: {}, 
  ObjectifsHistory: {},

  filteredHabitsByDate: EMPTY_FILTERED_HABITS,

  isFetched: false,
  isArchivedHabitsFetched: false,
  setIsArchivedHabitsFetched: () => {},
  isDoneHabitsFetched: false,
  setIsDoneHabitsFetched: () => {},

  changeDate: async () => {},
  addHabit: async () => undefined,
  removeHabit: async () => {},
  updateHabitRelationWithObjectif: async (habit: Habit, destination_objectifID: string | null) => habit,
  updateHabit: async (oldHabit: Habit, newValues: { [key: string]: any }, currentDate?: Date) => oldHabit,
  addObjectif: async (objectif: FormDetailledObjectif) => undefined,
  handleCheckStep: async () => {},
  getHabitFromFilteredHabits: (frequency: FrequencyTypes, objectifID: string | undefined, habitID: string) => DefaultHabit,
  removeObjectif: async() => {},
  updateObjectif: async (oldObjectif: Objectif, newValues: { [key: string]: any }, currentDate?: Date) => oldObjectif,
  retrieveHabitsLinkToObjectif: (objectifID: string) => [],
  addHabitIntern: (habit: Habit) => habit,
  fetchArchivedHabits: async() => [],
  fetchDoneHabits: async() => [],

  archiveHabit: async() => {},
  markHabitAsDone: async() => {},
  getBackHabit: async() => {},
}

const HabitsContext = createContext<HabitContextType>(defaultHabitContext);

export interface HabitsProviderProps {
  children: ReactNode
}

const HabitsProvider: FC<HabitsProviderProps> = ({ children }) => {

    const {user} = useContext(UserContext) as UserContextType
    if(!user) return null

    const userID = user.email as string

    const [Habits, setHabits] = useState<HabitList>({});
    const [HabitsHistory, setHabitsHistory] = useState<{[key: string]: Date[]}>({});

    const [ArchivedHabits, setArchivedHabits] = useState<HabitList>({});
    const [isArchivedHabitsFetched, setIsArchivedHabitsFetched] = useState<boolean>(false);

    const [DoneHabits, setDoneHabits] = useState<HabitList>({});
    const [isDoneHabitsFetched, setIsDoneHabitsFetched] = useState<boolean>(false);

    const [Objectifs, setObjectifs] = useState<ObjectifList>({});
    const [ObjectifsHistory, setObjectifsHistory] = useState<{[key: string]: Date[]}>({});

    let selectedDate = new Date()

    const [filteredHabitsByDate, setFilteredHabitsByDate] = useState<FilteredHabitsType>(EMPTY_FILTERED_HABITS);

    const [isFetched, setIsFetched] = useState<boolean>(false)

    const fetchHabits = async (): Promise<HabitList> => {
        console.log("Fetching habits...")

        const {habits, history} = await fetchUserHabits(userID)
        const today = new Date()

        for (const [habitID, habit] of Object.entries(habits)) {
          if(habit.currentStreak > 0) {
            if(habit.lastCompletionDate !== "none") {
              const nextDateAfterLastCompletion = calculateNextScheduledDate(habit, new Date(habit.lastCompletionDate))
  
              if(nextDateAfterLastCompletion.setHours(0,0,0,0) < today.setHours(0,0,0,0)) {
                habits[habitID] = {...habit, currentStreak: 0}
              }
            } 
          }
        }

        setHabits(habits)
        setHabitsHistory(history)

        console.log("habits successfully fetched.")
        return habits;
    };

    const settupHabits = async () => {
      try{
        const habits = await fetchHabits()
        filterHabits(new Date(), userID, habits)
          .then(filteredHabits => {
            setFilteredHabitsByDate(filteredHabits)
            setIsFetched(true)
        })
      }

      catch(e) { 
        console.log("Error while fetching habits : ", e) 
      }
    }

    const fetchObjectifs = async () => {
      try{
        console.log("fetching objectifs...")

        const objectifs = await fetchAllObjectifs(userID);
        setObjectifs(objectifs)

        console.log("objectifs successfully fetched.")
      }

      catch(e){
        console.log("Error while fetching objectifs : ", e)
      }
    }

    useEffect(() => {
      settupHabits();
      fetchObjectifs();
    }, []);

    const changeDate = async(date: Date) => {
      selectedDate = date

      try{
        const filteredHabits = await filterHabits(date, userID, Habits)
        setFilteredHabitsByDate(filteredHabits)
      }

      catch(e) { console.log("error while changing date : ", e)}
    }

    const handleCheckStep = async(habitID: string, stepID: string, date: Date, isChecked: boolean, isHabitNowCompleted: boolean) => {
      let habit = Habits[habitID]

      const promises: Promise<void>[] = []
      promises.push(changeStepStateFirestore(date, userID, habitID, stepID, isChecked))

      let newStreakValues: StreakValues = {
        currentStreak: habit.currentStreak,
        lastCompletionDate: habit.lastCompletionDate,
        bestStreak: habit.bestStreak
      }

      if(isHabitNowCompleted){
        if(auth.currentUser && auth.currentUser.email)
          addHabitDoneDate(auth?.currentUser.email as string, habit.habitID, toISOStringWithoutTimeZone(date))

        setHabitsHistory((prevHabitHistory) => {
          if(prevHabitHistory[habitID]) {
            prevHabitHistory[habitID].push(date)
          }

          else prevHabitHistory[habitID] = [date]

          return {...prevHabitHistory}
        })

        newStreakValues = getUpdatedStreakOfHabit(habit, date)
        promises.push(updateCompletedHabit(userID, habitID, newStreakValues))

        setHabits(previousHabits => ({
          ...previousHabits,
          [habitID]: {...habit, ...newStreakValues}
        }))

        habit = {...habit, ...newStreakValues}
      }

      if(isHabitScheduledForDate(habit, date)){       
        const habitType = getHabitType(habit)

        setFilteredHabitsByDate(previousFilteredHabits => (updateHabitStepState(previousFilteredHabits, habit, habitType, stepID, isChecked, newStreakValues)))
      }

      await Promise.all(promises)
      console.log("End of check step transactions.")
    }

    /**
     * Ajoute une nouvelle habitude dans le stockage interne et dans firestore
     */

    const addHabit = async(habit: FormDetailledHabit): Promise<Habit | undefined> => {
      try{
          if(auth.currentUser && auth.currentUser.email) {
            const habitWithID = await addHabitToFireStore(habit, auth.currentUser.email, auth.currentUser.uid)    
            if(habitWithID) {
              const finalHabit = addHabitIntern(habitWithID)
  
              console.log("habit well added !")
              return finalHabit
            }
          }
      }

      catch(e) {
        console.log("Error while adding habit : ", e)
      }
    }

    /**
     * Ajoute une nouvelle habitude dans le stockage interne
     */

    const addHabitIntern = (habit: Habit): Habit => {
      const finalHabit = setHabitWithDefaultStep(habit)
  
      setHabits((prevHabits) => (updateHabitsWithNewHabit(prevHabits, finalHabit)));

      setFilteredHabitsByDate(previousFilteredHabits => (
        updateFilteredHabitsWithNewHabit(previousFilteredHabits, finalHabit, selectedDate)
      ))

      return finalHabit
    }


    const addObjectif = async(objectif: FormDetailledObjectif): Promise<Objectif | undefined> => {
      try{
        console.log("Adding objectif...")
        const addedObjectif = await addObjectifToFirestore(objectif, userID)

        setObjectifs(prevObjs => ({...prevObjs, [addedObjectif.objectifID]: addedObjectif}))

        console.log("Objectif well added !")

        return addedObjectif
      }

      catch(e) { console.log("Error while adding objectif : ", e) }
    }

    /**
     * Supprime l'habitude spécifiée pour l'utilisateur courant en interne et sur firestore
     */

    const removeHabit = async(habit: Habit) => {
      if(auth.currentUser && auth.currentUser.email) {
        console.log("Deleting habit : ", habit.titre, "...")
        const habitID = habit.habitID
  
        await removeHabitInFirestore(habit, auth.currentUser.email, userID)
  
        setHabits(previousHabits => removeHabitFromHabits(previousHabits, habitID))
        setFilteredHabitsByDate(previousFilteredHabits => removeHabitFromFilteredHabits(previousFilteredHabits, habit))
  
        console.log("Habit : ", habit.titre, " succesfully deleted !")
      }
    }


    const updateHabitRelationWithObjectif = async(habit: Habit, destination_objectifID: string | null) => {
      return await updateHabit(habit, { objectifID: destination_objectifID }, selectedDate)
    }


    const updateHabit = async(oldHabit: Habit, newValues: {[key: string]: any}, currentDate: Date = selectedDate): Promise<Habit> => {

      setFilteredHabitsByDate(previousFilteredHabits =>  removeHabitFromFilteredHabits(previousFilteredHabits, oldHabit))

      console.log("Updating habit : ", oldHabit.titre, "...")

      if(newValues.hasOwnProperty("steps")){
        newValues["steps"] = Object.values(newValues.steps)
      }
      
      await updateHabitInFirestore(userID, oldHabit, newValues)

      //On créer une habit qui a les valeurs updated
      let updatedHabit: Habit = {...oldHabit, ...newValues}

      let newSteps = Object.values(updatedHabit.steps)

      const deletedSteps = Object.values(updatedHabit.steps).filter((step) => !("deleted" in step))

      const isNewStepPlaceholder = 
        ((deletedSteps.length === 1) && deletedSteps[0].numero === -1) 
        || deletedSteps.length === 0;

      if(isNewStepPlaceholder){
        const placeholderStep: StepList = {}
        placeholderStep[oldHabit.habitID] = createDefaultStepFromHabit(updatedHabit, updatedHabit.habitID, updatedHabit.startingDate)
        updatedHabit["steps"] = {...placeholderStep}
      }

      else {
        const validSteps = getValidHabitsStepsForDate(newSteps, oldHabit.habitID, currentDate)
        updatedHabit["steps"] = {...validSteps}
      } 
        
      setFilteredHabitsByDate(previousFilteredHabits => updateFilteredHabitsWithNewHabit(previousFilteredHabits, updatedHabit, currentDate))
      setHabits(previousHabits => updateHabitsWithNewHabit(previousHabits, updatedHabit))

      console.log("Habit : ", updatedHabit.titre, " successfully updated !")

      return oldHabit
    }

    const getHabitFromFilteredHabits = (frequency: FrequencyTypes, objectifID: string | undefined, habitID: string): Habit | undefined => {
      return getHabitFromFilteredHabitsMethod(filteredHabitsByDate, frequency, objectifID, habitID)
    }

    const removeObjectif = async(objectifID: string, deletePinnedHabit?: boolean) => {
        const habits = Object.values(Habits).filter((habit => habit.objectifID === objectifID))
        const promises: Promise<void | Habit>[] = [removeObjectifInFirestore(objectifID, userID)]

        setObjectifs(previousObjectifs => removeObjectifFromObjectifs(previousObjectifs, objectifID))
        setFilteredHabitsByDate(previousFilteredHabits => removeObjectifFromFilteredHabits(previousFilteredHabits, objectifID))

        await Promise.all(promises);

        const updatePromises = habits.map((habit) => {
            if (deletePinnedHabit) {
                return removeHabit(habit);
            } else {
                return updateHabitRelationWithObjectif(habit, null);
            }
        });

        await Promise.all(updatePromises)
    }

    const updateObjectif = async(oldObjectif: Objectif, newValues: {[key: string]: any}, currentDate: Date = selectedDate): Promise<Objectif> => {
      
      console.log("Updating objectif...")

      const updatedObjectif: Objectif = {...oldObjectif, ...newValues}
      
      setObjectifs((previousObjectifs) => {
          previousObjectifs[oldObjectif.objectifID] = {...updatedObjectif}
          return {...previousObjectifs}
      })

      await updateObjectifInFirestore(userID, oldObjectif, newValues)

      console.log("Objectif updated")
      return updatedObjectif
    }

    const retrieveHabitsLinkToObjectif = (objectifID: string): Habit[] => {
      const habits = Object.values(Habits)
      return habits.filter((habit) => habit.objectifID === objectifID)
    }

    const fetchArchivedHabits = async(): Promise<Habit[]> => {
      if(user.email) {
        const {habits, history} = await fetchUserHabits(user.email, HabitState.Archived)

        setArchivedHabits(habits)

        setHabitsHistory(prevHistory => ({
          ...prevHistory,
          ...history
        }))

        return Object.values(habits)
      }

      return []
    }

    const fetchDoneHabits = async(): Promise<Habit[]> => {
      if(user.email) {
        const {habits, history} = await fetchUserHabits(user.email, HabitState.Done)

        setDoneHabits(habits)

        setHabitsHistory(prevHistory => ({
          ...prevHistory,
          ...history
        }))

        return Object.values(habits)
      }

      return []
    }

    const archiveHabit = async(habit: Habit, habitState = HabitState.Current) => {
      if(user.email) {
        if(habitState !== HabitState.Archived) {
          setArchivedHabits(prevArchivedHabits => ({
            ...prevArchivedHabits,
            [habit.habitID]: {...habit}
          }))

          if(habitState === HabitState.Done) {
            setDoneHabits(prevHabits => {
              const updatedHabits = { ...prevHabits };
              delete updatedHabits[habit.habitID]
              return updatedHabits
            })
          }

          else {
              setFilteredHabitsByDate(removeHabitFromFilteredHabits(filteredHabitsByDate, habit))

              setHabits(prevHabits => {
              const updatedHabits = { ...prevHabits };
              delete updatedHabits[habit.habitID]
              return updatedHabits
            })
          }

          await archiveUserHabit(habit, user.email, user.uid, habitState)
        }

        else console.log("habit already archived")
      }
    }

    const markHabitAsDone = async(habit: Habit, habitState = HabitState.Current) => {
      if(user.email) {
        if(habitState !== HabitState.Done) {
          setDoneHabits(prevArchivedHabits => ({
            ...prevArchivedHabits,
            [habit.habitID]: {...habit}
          }))
  
          if(habitState === HabitState.Archived) {
            setArchivedHabits(prevHabits => {
              const updatedHabits = { ...prevHabits };
              delete updatedHabits[habit.habitID]
              return updatedHabits
            })
          }
  
          else {
              setFilteredHabitsByDate(removeHabitFromFilteredHabits(filteredHabitsByDate, habit))
  
              setHabits(prevHabits => {
              const updatedHabits = { ...prevHabits };
              delete updatedHabits[habit.habitID]
              return updatedHabits
            })
          }
  
          await markUserHabitAsDone(habit, user.email, user.uid, habitState)
        }
        
        else console.log("habit alreay marked as done")
      }
    }

    
    const getBackHabit = async(habit: Habit, habitState = HabitState.Current) => {
      if(user.email) {
        if(habitState === HabitState.Current) {
          console.log("Habit already current")
        }

        else {
          if(habitState === HabitState.Archived) {
            setArchivedHabits(prevHabits => {
              const updatedHabits = { ...prevHabits };
              delete updatedHabits[habit.habitID]
              return updatedHabits
            })
          }

          else {
            setDoneHabits(prevHabits => {
              const updatedHabits = { ...prevHabits };
              delete updatedHabits[habit.habitID]
              return updatedHabits
            })
          }
        }

        addHabitIntern(habit)

        await getBackUserHabit(habit, user.email, user.uid, habitState)
      }
    }

    const exportedValues: HabitContextType = {
      Habits,
      ArchivedHabits,
      DoneHabits,

      HabitsHistory,
      Objectifs,
      ObjectifsHistory,

      filteredHabitsByDate,

      isFetched,
      
      isArchivedHabitsFetched,
      isDoneHabitsFetched,

      setIsArchivedHabitsFetched,
      setIsDoneHabitsFetched,

      changeDate,
      addHabit, addHabitIntern,
      removeHabit,
      updateHabitRelationWithObjectif,
      updateHabit,
      addObjectif,
      handleCheckStep,
      getHabitFromFilteredHabits,
      removeObjectif,
      updateObjectif,
      retrieveHabitsLinkToObjectif,

      fetchArchivedHabits,
      fetchDoneHabits,

      archiveHabit,
      markHabitAsDone,
      getBackHabit
    }

    return (
        <HabitsContext.Provider value={exportedValues}>
          {children}
        </HabitsContext.Provider>
    );
};

export { HabitsProvider, HabitsContext };
