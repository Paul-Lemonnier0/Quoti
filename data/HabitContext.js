import { createContext, useState, useEffect } from "react";
import { addHabitToFireStore, getAllOwnHabits, removeHabitInFirestore, updateHabitInFirestore } from "../firebase/Firestore_Habits_Primitives";
import { changeStepStateFirestore, fetchStepLog } from "../firebase/Firestore_Step_Primitives";
import { isHabitScheduledForDate } from "../primitives/HabitudesReccurence";
import { AnimatedBasicSpinnerView } from "../components/Spinners/AnimatedSpinner";
import { filterHabits, getHabitType, removeHabitFromFilteredHabits, removeHabitFromHabits, updateFilteredHabitsWithNewHabit, updateHabitsWithNewHabit } from "../primitives/HabitMethods";
import { createDefaultStepFromHabit, updateHabitStepState } from "../primitives/StepMethods";

const HabitsContext = createContext();

const HabitsProvider = ({ children }) => {

    const alreadyFetchedStepLogs = {};  //de la forme [stepID, currentDay]: isChecked
    const alreadySeenHabitsScheduledForDay = {}; //De la forme {date: [habitID_1, habitID_2, ...]}
    const [Habits, setHabits] = useState({});

    const selectedDate = new Date()

    const [filteredHabitsByDate, setFilteredHabitsByDate] = useState(
      {
        Quotidien: {Habitudes: {}, Objectifs: {}}, 
        Hebdo: {Habitudes: {}, Objectifs: {}}, 
        Mensuel: {Habitudes: {}, Objectifs: {}}
      });

    const [isFetched, setIsFetched] = useState(false)
    const [isFetchingHabit, setIsFetchingHabit] = useState(false)

    const fetchAllHabits = async () => {
        console.log("Fetching habits...")

        const habits = await getAllOwnHabits()
        setHabits(habits);

        console.log("habits successfully fetched.")
        return habits;
    };

    const fetchHabits = async () => {
      try{
        const habits = await fetchAllHabits()

        filterHabits(new Date(), habits, alreadySeenHabitsScheduledForDay, alreadyFetchedStepLogs, setIsFetchingHabit)
          .then(filteredHabits => {
            setFilteredHabitsByDate(filteredHabits)
            setIsFetched(true)
        })
      }

      catch(e) { 
        console.log("Error while fetching habits : ", e) 
      }
    }

    useEffect(() => {
      fetchHabits();
    }, []);

    const changeDate = async(date) => {
      selectedDate = date

      try{
        filterHabits(date, Habits, alreadySeenHabitsScheduledForDay, alreadyFetchedStepLogs, setIsFetchingHabit)
          .then(filteredHabits => {
            setFilteredHabitsByDate(filteredHabits)
          })
      }

      catch(e) { console.log("error while changing date : ", e)}
    }

    const handleCheckStep = (habitID, stepID, date, isChecked) => {
      const habit = Habits[habitID]
      const frequency = habit.frequency
      const isObjective = getHabitType(habit) === "Objectifs"

      const isHabitInObjectifPlanned = isObjective &&
            filteredHabitsByDate[frequency]["Objectifs"]?.[habit.objectifID]?.hasOwnProperty(habit.habitID)

      const habitPlannedForCurrentDate = isHabitInObjectifPlanned ||
            filteredHabitsByDate[frequency]["Habitudes"]?.[habit.habitID] !== undefined;

      if(habitPlannedForCurrentDate){        
        setFilteredHabitsByDate(previousFilteredHabits => (
          updateHabitStepState(previousFilteredHabits, habit, stepID, isChecked)))
      }

      changeStepStateFirestore(date, stepID, isChecked)
    }

    const addHabit = async(habit) => {
      try{
          console.log("adding habit...")
          const habitWithID = await addHabitToFireStore(habit)

          let finalHabit = {...habitWithID}
          
          if(Object.values(habitWithID.steps).length === 0){
            const placeholderStep = createDefaultStepFromHabit(habitWithID, habitWithID.habitID, true);
            finalHabit = {...finalHabit, steps: placeholderStep}
          }
          
          if(isHabitScheduledForDate(finalHabit, selectedDate)){
            setFilteredHabitsByDate(previousFilteredHabits => (
              updateFilteredHabitsWithNewHabit(previousFilteredHabits, finalHabit, selectedDate)
            ))
          }

          setHabits((prevHabits) => (updateHabitsWithNewHabit(prevHabits, finalHabit)));

          console.log("habit well added", finalHabit)
          return finalHabit
      }

      catch(e) {
        console.log("Error while adding habit : ", e)
      }
    }

    const removeHabit = async(habit) => {
      console.log("Deleting habit : ", habit.titre, "...")
      const habitID = habit.habitID

      await removeHabitInFirestore(habit)
      setFilteredHabitsByDate(previousFilteredHabits => removeHabitFromFilteredHabits(previousFilteredHabits, habit))
      setHabits(previousHabits => removeHabitFromHabits(previousHabits, habitID))

      console.log("Habit : ", habit.titre, " succesfully deleted !")
    }

    const updateHabit = async(oldHabitID, newValues, currentDate) => {
      const oldHabit = Habits[oldHabitID]

      console.log("Updating habit : ", oldHabit.titre, "...")
      const updatedHabit = {...oldHabit, ...newValues}
      
      await updateHabitInFirestore(oldHabit, newValues)
      
      setFilteredHabitsByDate(previousFilteredHabits => updateFilteredHabitsWithNewHabit(previousFilteredHabits, updatedHabit, currentDate))
      setHabits(previousHabits => updateHabitsWithNewHabit(previousHabits, updatedHabit))

      console.log("Habit : ", updatedHabit.titre, " successfully updated !")
    }

    if(!isFetched) {
      return <AnimatedBasicSpinnerView/>
    }

    const exportedValues = {
      Habits,
      filteredHabitsByDate,
      isFetched,
      changeDate,
      addHabit,
      removeHabit,
      updateHabit,
      handleCheckStep,
    }

    return (
        <HabitsContext.Provider value={exportedValues}>
          {children}
        </HabitsContext.Provider>
    );
};

export { HabitsProvider, HabitsContext };
