import { createContext, useState, useContext } from "react";
import { addHabitToFireStore, addNewHabit, getAllOwnHabits, updateStepInFireStore } from "../firebase/FirestorePrimitives";
import { useEffect } from "react";
import { addSteps, changeStepState, fetchStepLogs } from "../firebase/Firestore_Step_Primitives";
import { calculReccurenceHabitude } from "../primitives/HabitudesReccurence";
import { listKeyIDfromArray } from "../primitives/BasicsMethods";
import { NormalText } from "../styles/StyledText";
import { View } from "react-native";
import { AnimatedBasicSpinner, AnimatedBasicSpinnerView } from "../components/Spinners/AnimatedSpinner";
import Animated from "react-native-reanimated";

const HabitsContext = createContext();

const HabitsProvider = ({ children }) => {
    const [Habits, setHabits] = useState({});
    const [filteredHabitsByDate, setFilteredHabitsByDate] = useState({Quotidien: {}, Hebdo: {}, Mensuel: {}});

    const [isFetched, setIsFetched] = useState(false)

    const [isFetchingHabit, setIsFetchingHabit] = useState(false)

    const fetchAllHabits = async () => {
        console.log("Fetching habits...")

        const habits = await getAllOwnHabits()

        setHabits(habits);

        return habits;
    };

    const filterHabits = (habits, currentDate) => {
      return new Promise((resolve, reject) => {
    
        const habitsFiltered = []
        const habitsID = []

        const oldFilteredHabitsID = [...Object.keys(filteredHabitsByDate.Quotidien), ...Object.keys(filteredHabitsByDate.Hebdo), ...Object.keys(filteredHabitsByDate.Mensuel)]
        console.log("old : ", oldFilteredHabitsID)
        for (const habitID in habits) {
          if(calculReccurenceHabitude(habits[habitID], currentDate)){
            habitsFiltered.push(habits[habitID]); 
            habitsID.push(habitID) 
          }
        }

        console.log("habits: ", habitsID)

        const habitsNotInOldVersion  = habitsID.filter(habitID => !oldFilteredHabitsID.includes(habitID))
        const habitsInOldVersion = habitsID.filter(habitID => oldFilteredHabitsID.includes(habitID))

        console.log("habitsNotInOldVersion: ", habitsNotInOldVersion)
        console.log("habitsInOldVersion: ", habitsInOldVersion)


        const newFilteredHabitsByDate = { Quotidien: {}, Hebdo: {}, Mensuel: {} }

        if(habitsNotInOldVersion.length > 0) {
            fetchStepLogs(currentDate, habitsNotInOldVersion).then(stepLogs => {
            habitsFiltered.map(habit => { 
              const stepsUpdated = habit.steps;
    
              for(const stepID in habit.steps){
    
                let isChecked = false;
                console.log("step id : ", stepID)
    
                if(stepLogs.hasOwnProperty(stepID)) 
                  isChecked = stepLogs[stepID]
    
                stepsUpdated[stepID] = {...stepsUpdated[stepID], isChecked}
              }

    
              newFilteredHabitsByDate[habit.frequency][habit.habitID] = {...habit, steps: stepsUpdated}
            })

            habitsInOldVersion.map(habitID => {
              const habit = habits[habitID]
              newFilteredHabitsByDate[habit.frequency][habit.habitID] = habit
            })

            resolve(newFilteredHabitsByDate)
          })
          .catch(e => {
            console.log("Error while filtering habits : ", e)
            reject(e)
          })
        }

        else {
          habitsID.map(habitID => {
            const habit = habits[habitID]
            newFilteredHabitsByDate[habit.frequency][habit.habitID] = habit
          })

          resolve(newFilteredHabitsByDate)
        }
      })
    };


    const changeDate = async(date) => {
      try{
        setIsFetchingHabit(true)
        const filteredHabits = await filterHabits(Habits, date)
        setIsFetchingHabit(false)
        setFilteredHabitsByDate(filteredHabits)
      }

      catch(e) { console.log("error while changing date : ", e)}
    }

    useEffect(() => {

        const fetchData = async () => {
          try{
            const habits = await fetchAllHabits()
            console.log("habits fetched : ", habits)

            const filteredHabits = await filterHabits(habits, new Date())
            console.log("habits filtered : ", filteredHabits)

            setFilteredHabitsByDate(filteredHabits)

            // setTimeout(() => {
            //   console.log("Test spinner");

            // }, 10000);
            setIsFetched(true)

          }

          catch(e) { 
            console.log("Error while fetching data : ", e) 
          }
        }

        fetchData();

    }, []);

    const handleCheckStep = (habitID, stepID, stepIndex, date, isChecked) => {

      const habit = Habits[habitID]
      const step = habit.steps[stepID]

      const stepsFireStore = Object.values(habit.steps);
      stepsFireStore[stepIndex].isChecked = isChecked

      console.log("stepID: ", stepID)
      changeStepState(date, stepID, habitID, isChecked)
    
      setHabits((prevHabits) => ({
        ...prevHabits,
        [habitID]: {...habit, steps: {...habit.steps, [stepID]: {...step, isChecked: isChecked}}}
      }));
    }

    const addHabit = async(habit) => {

        console.log("adding habit...")

        const habitFull = await addHabitToFireStore(habit)
        
        setHabits((prevHabits) => ({
          ...prevHabits,
          [habitFull.habitID]: habitFull
        }));

        console.log("habit well added", habitFull)

        return habitFull
    }

    if(!isFetched) {
      return <AnimatedBasicSpinnerView/>
    }

    return (
        <HabitsContext.Provider value={{ Habits, filteredHabitsByDate, isFetched, isFetchingHabit, changeDate, filterHabits, fetchAllHabits, addHabit, handleCheckStep}}>
          {children}
        </HabitsContext.Provider>
    );
};

export { HabitsProvider, HabitsContext };
