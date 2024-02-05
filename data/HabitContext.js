import { createContext, useState, useEffect, useContext } from "react";
import { addHabitToFireStore, getAllOwnHabits, removeHabitInFirestore, updateCompletedHabit, updateHabitInFirestore } from "../firebase/Firestore_Habits_Primitives";
import { changeStepStateFirestore } from "../firebase/Firestore_Step_Primitives";
import { AnimatedBasicSpinnerView } from "../components/Spinners/AnimatedSpinner";
import { filterHabits, getHabitFromFilteredHabitsMethod, getHabitType, getUpdatedStreakOfHabit, getValidHabitsStepsForDate, removeHabitFromFilteredHabits, removeHabitFromHabits, updateFilteredHabitsWithNewHabit, updateHabitsWithNewHabit } from "../primitives/HabitMethods";
import { createDefaultStepFromHabit, setHabitWithDefaultStep, updateHabitStepState } from "../primitives/StepMethods";
import { addObjectifToFirestore, fetchAllObjectifs } from "../firebase/Firestore_Objectifs_Primitives";
import { convertBackSeriazableObjectif } from "../primitives/ObjectifMethods";
import { NormalText } from "../styles/StyledText";
import { View } from "react-native";
import { displayTree } from "../primitives/BasicsMethods";
import { UserContext } from "./UserContext";

const HabitsContext = createContext();

const HabitsProvider = ({ children }) => {

    const {user} = useContext(UserContext)
    const userID = user.email

    const alreadyFetchedStepLogs = {};  //de la forme [stepID, currentDay]: isChecked
    const alreadySeenHabitsScheduledForDay = {}; //De la forme {date: [habitID_1, habitID_2, ...]}

    const [Habits, setHabits] = useState({});
    const [Objectifs, setObjectifs] = useState({});

    let selectedDate = new Date()

    const [filteredHabitsByDate, setFilteredHabitsByDate] = useState(
      {
        Quotidien: {Habitudes: {}, Objectifs: {}}, 
        Hebdo: {Habitudes: {}, Objectifs: {}}, 
        Mensuel: {Habitudes: {}, Objectifs: {}}
      });

    const [isFetched, setIsFetched] = useState(false)
    const [isFetchingHabit, setIsFetchingHabit] = useState(false)


    const fetchHabits = async () => {
        console.log("Fetching habits...")

        const habits = await getAllOwnHabits(userID)
        // const habits={}
        setHabits(habits);        

        console.log("habits successfully fetched.")
        return habits;
    };



    const settupHabits = async () => {
      try{
        const habits = await fetchHabits()

        filterHabits(new Date(), userID, habits, setIsFetchingHabit)
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



    const changeDate = async(date) => {
      selectedDate = date

      try{
        const filteredHabits = await filterHabits(date, userID, Habits, setIsFetchingHabit)
        setFilteredHabitsByDate(filteredHabits)
      }

      catch(e) { console.log("error while changing date : ", e)}
    }


    const isHabitPlannedForSelectedDay = (habit, date) => {
      const frequency = habit.frequency
      const isObjective = getHabitType(habit) === "Objectifs"

      const isHabitInObjectifPlanned = isObjective &&
            filteredHabitsByDate[frequency]["Objectifs"]?.[habit.objectifID]?.hasOwnProperty(habit.habitID)

      const habitPlannedForCurrentDate = isHabitInObjectifPlanned ||
            filteredHabitsByDate[frequency]["Habitudes"].hasOwnProperty(habit.habitID);

      return habitPlannedForCurrentDate
    }


    const handleCheckStep = async(habitID, stepID, date, isChecked, isHabitNowCompleted) => {
      let habit = Habits[habitID]

      const promises = []
      promises.push(changeStepStateFirestore(date, userID, habitID, stepID, isChecked))

      let newStreakValues = {}
      if(isHabitNowCompleted){
        newStreakValues = getUpdatedStreakOfHabit(habit, date)
        promises.push(updateCompletedHabit(userID, habitID, newStreakValues))

        setHabits(previousHabits => ({
          ...previousHabits,
          [habitID]: {...habit, ...newStreakValues}
        }))

        habit = {...habit, ...newStreakValues}
      }

      if(isHabitPlannedForSelectedDay(habit, date)){       
        const habitType = getHabitType(habit)

        setFilteredHabitsByDate(previousFilteredHabits => (
          updateHabitStepState(previousFilteredHabits, habit, habitType, stepID, isChecked, newStreakValues)))
      }

      await Promise.all(promises)
      console.log("End of check step transactions.")
    }




    const addHabit = async(habit) => {
      try{
          
          const habitWithID = await addHabitToFireStore(habit, userID)          
          const finalHabit = setHabitWithDefaultStep(habitWithID)

          setHabits((prevHabits) => (updateHabitsWithNewHabit(prevHabits, finalHabit)));

          setFilteredHabitsByDate(previousFilteredHabits => (
            updateFilteredHabitsWithNewHabit(previousFilteredHabits, finalHabit, selectedDate)
          ))


          console.log("habit well added !")
          return finalHabit
      }

      catch(e) {
        console.log("Error while adding habit : ", e)
      }
    }


    const addObjectif = async(objectif) => {
      try{
        console.log("Adding objectif...")
        const addedObjectif = await addObjectifToFirestore(objectif, userID)
        const deserializedObjectif = convertBackSeriazableObjectif(addedObjectif)

        setObjectifs(prevObjs => ({...prevObjs, [deserializedObjectif.objectifID]: deserializedObjectif}))

        console.log("Objectif well added !")

        return addedObjectif
      }

      catch(e) { console.log("Error while adding objectif : ", e) }
    }




    const removeHabit = async(habit) => {
      console.log("Deleting habit : ", habit.titre, "...")
      const habitID = habit.habitID

      await removeHabitInFirestore(habit, userID)

      setHabits(previousHabits => removeHabitFromHabits(previousHabits, habitID))
      setFilteredHabitsByDate(previousFilteredHabits => removeHabitFromFilteredHabits(previousFilteredHabits, habit))

      console.log("Habit : ", habit.titre, " succesfully deleted !")
    }


    const updateHabitRelationWithObjectif = async(habit, destination_objectifID = null) => {

      const habitWithLogs = getHabitFromFilteredHabits(habit.frequency, habit.objectifID, habit.habitID)

      setFilteredHabitsByDate(previousFilteredHabits =>  removeHabitFromFilteredHabits(previousFilteredHabits, habit))
      const newHabit = await updateHabit(habit, { objectifID: destination_objectifID}, selectedDate)
    }




    const updateHabit = async(oldHabit, newValues, currentDate = selectedDate) => {

      setFilteredHabitsByDate(previousFilteredHabits =>  removeHabitFromFilteredHabits(previousFilteredHabits, oldHabit))

      console.log("Updating habit : ", oldHabit.titre, "...")
      let updatedHabit = {...oldHabit, ...newValues}

      if(newValues.hasOwnProperty("steps")){
        newValues["steps"] = Object.values(newValues.steps)
      }
      
      await updateHabitInFirestore(userID, oldHabit, newValues)

      const isNewStepPlaceholder = Object.values(updatedHabit.steps).some(step => step.numero === -1);

      if(isNewStepPlaceholder){
        const newSteps =  Object.values(updatedHabit.steps).filter((step) => (step.numero !== -1))
        newSteps.push(createDefaultStepFromHabit(updatedHabit, updatedHabit.habitID))

        updatedHabit["steps"] = [...newSteps]
      }



      const validSteps = getValidHabitsStepsForDate(Object.values(updatedHabit.steps), oldHabit.habitID, currentDate)
      updatedHabit["steps"] = {...validSteps}
        
      setFilteredHabitsByDate(previousFilteredHabits => updateFilteredHabitsWithNewHabit(previousFilteredHabits, updatedHabit, currentDate))
      setHabits(previousHabits => updateHabitsWithNewHabit(previousHabits, updatedHabit))

      console.log("Habit : ", updatedHabit.titre, " successfully updated !")
      return updatedHabit
    }


    const getHabitFromFilteredHabits = (frequency, objectifID, habitID) => {
      return getHabitFromFilteredHabitsMethod(filteredHabitsByDate, frequency, objectifID, habitID)
    }


    const exportedValues = {
      Habits,
      Objectifs,
      filteredHabitsByDate,
      getHabitFromFilteredHabits,
      isFetched,
      changeDate,
      addHabit,
      removeHabit,
      updateHabitRelationWithObjectif,
      updateHabit,
      addObjectif,
      handleCheckStep,
    }

    return (
        <HabitsContext.Provider value={exportedValues}>
          {children}
        </HabitsContext.Provider>
    );
};

export { HabitsProvider, HabitsContext };
