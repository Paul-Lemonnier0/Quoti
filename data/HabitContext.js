import { createContext, useState, useEffect } from "react";
import { addHabitToFireStore, getAllOwnHabits, removeHabitInFirestore, updateHabitInFirestore } from "../firebase/Firestore_Habits_Primitives";
import { changeStepStateFirestore } from "../firebase/Firestore_Step_Primitives";
import { AnimatedBasicSpinnerView } from "../components/Spinners/AnimatedSpinner";
import { filterHabits, getHabitFromFilteredHabitsMethod, getHabitType, removeHabitFromFilteredHabits, removeHabitFromHabits, updateFilteredHabitsWithNewHabit, updateHabitsWithNewHabit } from "../primitives/HabitMethods";
import { setHabitWithDefaultStep, updateHabitStepState } from "../primitives/StepMethods";
import { addObjectifToFirestore, fetchAllObjectifs } from "../firebase/Firestore_Objectifs_Primitives";
import { convertBackSeriazableObjectif } from "../primitives/ObjectifMethods";
import { NormalText } from "../styles/StyledText";
import { View } from "react-native";

const HabitsContext = createContext();

const HabitsProvider = ({ children }) => {

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

        const habits = await getAllOwnHabits()
        // const habits={}
        setHabits(habits);        

        console.log("habits successfully fetched.")
        return habits;
    };



    const settupHabits = async () => {
      try{
        const habits = await fetchHabits()

        filterHabits(new Date(), habits, setIsFetchingHabit)
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
        const objectifs = await fetchAllObjectifs();
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
        filterHabits(date, Habits, setIsFetchingHabit)
          .then(filteredHabits => {
            setFilteredHabitsByDate(filteredHabits)
          })
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


    const handleCheckStep = (habitID, stepID, date, isChecked) => {

      console.log(date)

      const habit = Habits[habitID]

      if(isHabitPlannedForSelectedDay(habit, date)){       
        console.log("Planned")
        const habitType = getHabitType(habit)

        setFilteredHabitsByDate(previousFilteredHabits => (
          updateHabitStepState(previousFilteredHabits, habit, habitType, stepID, isChecked)))
      }

      changeStepStateFirestore(date, habitID, stepID, isChecked)
    }




    const addHabit = async(habit) => {
      try{
          
          const habitWithID = await addHabitToFireStore(habit)          
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
        const addedObjectif = await addObjectifToFirestore(objectif)
        const deserializedObjectif = convertBackSeriazableObjectif(addedObjectif)

        console.log(addedObjectif)
        setObjectifs(prevObjs => ({...prevObjs, [deserializedObjectif.objectifID]: deserializedObjectif}))

        console.log("Objectif well added !")

        return addedObjectif
      }

      catch(e) { console.log("Error while adding objectif : ", e) }
    }




    const removeHabit = async(habit) => {
      console.log("Deleting habit : ", habit.titre, "...")
      const habitID = habit.habitID

      await removeHabitInFirestore(habit)

      setHabits(previousHabits => removeHabitFromHabits(previousHabits, habitID))
      setFilteredHabitsByDate(previousFilteredHabits => removeHabitFromFilteredHabits(previousFilteredHabits, habit))

      console.log("Habit : ", habit.titre, " succesfully deleted !")
    }


    const updateHabitRelationWithObjectif = async(habit, destination_objectifID = null) => {
      const newHabit = await updateHabit(habit.habitID, { objectifID: destination_objectifID}, selectedDate)
      console.log(Objectifs)

      setFilteredHabitsByDate(previousFilteredHabits => removeHabitFromFilteredHabits(previousFilteredHabits, habit))
    }




    const updateHabit = async(oldHabitID, newValues, currentDate) => {
      const oldHabit = Habits[oldHabitID]

      console.log("Updating habit : ", oldHabit.titre, "...")
      const updatedHabit = {...oldHabit, ...newValues}
      
      await updateHabitInFirestore(oldHabit, newValues)
      
      setFilteredHabitsByDate(previousFilteredHabits => updateFilteredHabitsWithNewHabit(previousFilteredHabits, updatedHabit, currentDate))
      setHabits(previousHabits => updateHabitsWithNewHabit(previousHabits, updatedHabit))

      console.log("Habit : ", updatedHabit.titre, " successfully updated !")
      return updatedHabit
    }


    const getHabitFromFilteredHabits = (frequency, objectifID, habitID) => {
      return getHabitFromFilteredHabitsMethod(filteredHabitsByDate, frequency, objectifID, habitID)
    }

    if(!isFetched) {
      // return <AnimatedBasicSpinnerView/>
      return <View><NormalText text={"Attente..."}/></View>
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
