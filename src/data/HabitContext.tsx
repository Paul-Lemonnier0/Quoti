import React, { createContext, useState, useEffect, useContext, FC, ReactNode, Dispatch } from "react";
import { HabitState } from "../firebase/Firestore_Habits_Primitives";
import { filterHabits, getHabitFromFilteredHabitsMethod, getHabitType, getUpdatedStreakOfHabit, removeHabitFromFilteredHabits, removeHabitFromHabits, updateFilteredHabitsWithNewHabit, updateHabitsWithNewHabit } from "../primitives/HabitMethods";
import { setHabitWithDefaultStep, updateHabitStepState } from "../primitives/StepMethods";
import { fetchAllGoals } from "../firebase/Firestore_Goals_Primitives";
import { UserContext, UserContextType } from "./UserContext";
import { EMPTY_FILTERED_HABITS, FilteredHabitsType, FrequencyTypes, Habit, HabitList, Goal, GoalList } from "../types/HabitTypes";
import { DEFAULT_HABIT, DEFAULT_GOAL } from "../types/DefaultHabit";
import { removeGoalFromFilteredHabits, removeGoalFromGoals } from "../primitives/GoalMethods";
import { calculateNextScheduledDate, isHabitScheduledForDate } from "../primitives/HabitudesReccurence";
import { fetchUserHabits } from "../firebase/Firestore_Fetch_Habits_Primitives";
import { HabitPostFirestore } from "../firebase/Firestore_Posts_Primitives";

export interface HabitContextType {
  selectedDate: Date,

  //Data
  Habits: HabitList,
  ArchivedHabits: HabitList,
  DoneHabits: HabitList,
  HabitsHistory: {[key: string]: Date[]},
  Goals: GoalList,
  GoalsHistory: {[key: string]: Date[]}
  filteredHabitsByDate: FilteredHabitsType,

  //State
  isFetched: boolean,
  isArchivedHabitsFetched: boolean,
  setIsArchivedHabitsFetched: Dispatch<boolean>,
  isDoneHabitsFetched: boolean,
  setIsDoneHabitsFetched: Dispatch<boolean>

  //Basic methods
  changeDate: (date: Date) => Promise<void>,

  //Fetchs
  fetchArchivedHabits: () => Promise<Habit[]>,
  fetchDoneHabits: () => Promise<Habit[]>,
  fetchPosts: () => Promise<HabitPostFirestore[]>,

  //Utils
  addDayToHabitHistory: (habitID: string, date: Date) => void,
  addArchivedHabitIntern: (habit: Habit) => void,
  removeArchivedHabitIntern: (habit: Habit) => void,
  markHabitAsDoneIntern: (habit: Habit) => void,
  removeHabitFromMarkedAsDoneIntern: (habit: Habit) => void,

  //Habits intern
  addHabitIntern: (habit: Habit) => void,
  removeHabitIntern: (habit: Habit) => void,
  updateHabitIntern: (oldHabit: Habit, newHabit: Habit, currentDate: Date) => void,

  //Goals intern
  addGoalIntern: (goal: Goal) => void,
  removeGoalIntern: (goalID: string, deletePinnedHabit?: boolean) => void,
  updateGoalIntern: (newGoal: Goal) => void,

  //Steps intern
  checkHabitStepIntern: (habit: Habit, date: Date, stepID: string, isChecked: boolean) => void,

  //Gets
  getHabitFromFilteredHabits: (frequency: FrequencyTypes, goalID: string | undefined, habitID: string) => Habit | undefined,
  getHabitsByGoalID: (goalID: string) => Habit[]
}

const defaultHabitContext: HabitContextType = {
  selectedDate: new Date(),

  //Data
  Habits: {}, 
  ArchivedHabits: {},
  DoneHabits: {},
  HabitsHistory: {},
  Goals: {}, 
  GoalsHistory: {},
  filteredHabitsByDate: EMPTY_FILTERED_HABITS,

  //States
  isFetched: false,
  isArchivedHabitsFetched: false,
  isDoneHabitsFetched: false,
  setIsArchivedHabitsFetched: () => {},
  setIsDoneHabitsFetched: () => {},
  changeDate: async () => {},

  //Habits intern
  addHabitIntern: () => {},
  removeHabitIntern: () => {},
  updateHabitIntern: () => {},

  //Goals intern
  addGoalIntern: async () => undefined,
  removeGoalIntern: async() => {},
  updateGoalIntern: async () => DEFAULT_GOAL,

  //Step intern
  checkHabitStepIntern: () => {},

  //Gets
  getHabitFromFilteredHabits: () => DEFAULT_HABIT,
  getHabitsByGoalID: () => [],

  //Fetchs
  fetchArchivedHabits: async() => [],
  fetchDoneHabits: async() => [],
  fetchPosts: async() => [],

  //Utils
  addDayToHabitHistory: () => {},
  addArchivedHabitIntern: () => {},
  removeArchivedHabitIntern: () => {},
  markHabitAsDoneIntern: () => {},
  removeHabitFromMarkedAsDoneIntern: () => {},
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

    const [Goals, setGoals] = useState<GoalList>({});
    const [GoalsHistory, setGoalsHistory] = useState<{[key: string]: Date[]}>({});

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

    const fetchGoals = async () => {
      try{
        console.log("fetching goals...")

        const goals = await fetchAllGoals(userID);
        setGoals(goals)

        console.log("goals successfully fetched.")
      }

      catch(e){
        console.log("Error while fetching goals : ", e)
      }
    }

    useEffect(() => {
      settupHabits();
      fetchGoals();
    }, []);

    const changeDate = async(date: Date) => {
      selectedDate = date

      try{
        const filteredHabits = await filterHabits(date, userID, Habits)
        setFilteredHabitsByDate(filteredHabits)
      }

      catch(e) { console.log("error while changing date : ", e)}
    }

    /*
      Fetch methods
    */

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

      const fetchPosts = async(): Promise<HabitPostFirestore[]> => {
        return []
      }

    /*
      Get methods
    */

    const getHabitFromFilteredHabits = (frequency: FrequencyTypes, goalID: string | undefined, habitID: string): Habit | undefined => {
      return getHabitFromFilteredHabitsMethod(filteredHabitsByDate, frequency, goalID, habitID)
    }

    const getHabitsByGoalID = (goalID: string): Habit[] => {
      return Object.values(Habits).filter((habit => habit.goalID === goalID))
    }

    /*
      Basics utils
    */

    const addDayToHabitHistory = (habitID: string, date: Date) => {
      setHabitsHistory((prevHabitHistory) => {
        if(prevHabitHistory[habitID]) {
          prevHabitHistory[habitID].push(date)
        }

        else prevHabitHistory[habitID] = [date]

        return {...prevHabitHistory}
      })
    }

    const addArchivedHabitIntern = (habit: Habit) => {
      setArchivedHabits(prevArchivedHabits => ({
        ...prevArchivedHabits,
        [habit.habitID]: {...habit}
      }))
    }

    const removeArchivedHabitIntern = (habit: Habit) => {
      setArchivedHabits(prevHabits => {
        const updatedHabits = { ...prevHabits };
        delete updatedHabits[habit.habitID]
        return updatedHabits
      })
    }

    const markHabitAsDoneIntern = (habit: Habit) => {
      setDoneHabits(prevArchivedHabits => ({
        ...prevArchivedHabits,
        [habit.habitID]: {...habit}
      }))
    }

    const removeHabitFromMarkedAsDoneIntern = (habit: Habit) => {
      setDoneHabits(prevHabits => {
        const updatedHabits = { ...prevHabits };
        delete updatedHabits[habit.habitID]
        return updatedHabits
      })
    }

    /*
      Steps actions methods
    */

    const checkHabitStepIntern = (habit: Habit, date: Date, stepID: string, isChecked: boolean) => {
        const {habitID} = habit
        const newStreakValues = getUpdatedStreakOfHabit(habit, date)
  
        setHabits(previousHabits => ({
            ...previousHabits,
            [habitID]: {...habit, ...newStreakValues}
          }))
  
        const updatedHabit = {...habit, ...newStreakValues} 
        
        if(isHabitScheduledForDate(habit, date)){       
          const habitType = getHabitType(habit)
  
          setFilteredHabitsByDate(previousFilteredHabits => 
            updateHabitStepState(
              previousFilteredHabits, 
              updatedHabit, 
              habitType,
              stepID, 
              isChecked, 
              newStreakValues
          ))
        }
    }

    /*
      Habits actions methods
    */

    const addHabitIntern = (habit: Habit) => {
      const finalHabit = setHabitWithDefaultStep(habit)
  
      setHabits((prevHabits) => (updateHabitsWithNewHabit(prevHabits, finalHabit)));

      setFilteredHabitsByDate(previousFilteredHabits => (
        updateFilteredHabitsWithNewHabit(previousFilteredHabits, finalHabit, selectedDate)
      ))

      return finalHabit
    }
    
    const removeHabitIntern = (habit: Habit) => {
      const {habitID} = habit

      setHabits(previousHabits => removeHabitFromHabits(previousHabits, habitID))
      setFilteredHabitsByDate(previousFilteredHabits => removeHabitFromFilteredHabits(previousFilteredHabits, habit))
    }

    const updateHabitIntern = (oldHabit: Habit, newHabit: Habit, currentDate: Date) => {
      setFilteredHabitsByDate(previousFilteredHabits => removeHabitFromFilteredHabits(previousFilteredHabits, oldHabit))

      setFilteredHabitsByDate(previousFilteredHabits => updateFilteredHabitsWithNewHabit(previousFilteredHabits, newHabit, currentDate))
      setHabits(previousHabits => updateHabitsWithNewHabit(previousHabits, newHabit))
    }

    /*
      Goals actions methods
    */

    const addGoalIntern = (goal: Goal) => {
      setGoals(prevObjs => ({...prevObjs, [goal.goalID]: goal}))
    }

    const removeGoalIntern = (goalID: string) => {
      setGoals(previousGoals => removeGoalFromGoals(previousGoals, goalID))
      setFilteredHabitsByDate(previousFilteredHabits => removeGoalFromFilteredHabits(previousFilteredHabits, goalID))
    }

    const updateGoalIntern = (updatedGoal: Goal)=> {
      setGoals((previousGoals) => {
          previousGoals[updatedGoal.goalID] = {...updatedGoal}
          return {...previousGoals}
      })
    }

    const exportedValues: HabitContextType = {
      selectedDate,

      Habits,
      ArchivedHabits,
      DoneHabits,

      HabitsHistory,
      Goals,
      GoalsHistory,

      filteredHabitsByDate,

      isFetched,
      
      isArchivedHabitsFetched,
      isDoneHabitsFetched,

      setIsArchivedHabitsFetched,
      setIsDoneHabitsFetched,

      changeDate,
      addHabitIntern,
      removeHabitIntern,

      updateHabitIntern,

      addGoalIntern,
      checkHabitStepIntern,

      getHabitFromFilteredHabits,
      removeGoalIntern,
      updateGoalIntern,

      fetchArchivedHabits,
      fetchDoneHabits,

      addArchivedHabitIntern,
      removeArchivedHabitIntern,
      markHabitAsDoneIntern,
      removeHabitFromMarkedAsDoneIntern,

      fetchPosts,
      addDayToHabitHistory,

      getHabitsByGoalID
    }

    return (
        <HabitsContext.Provider value={exportedValues}>
          {children}
        </HabitsContext.Provider>
    );
};

export { HabitsProvider, HabitsContext };
