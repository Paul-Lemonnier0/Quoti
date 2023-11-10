import { createContext, useState, useEffect } from "react";
import { addHabitToFireStore, getAllOwnHabits } from "../firebase/Firestore_Habits_Primitives";
import { changeStepState, fetchStepLogs } from "../firebase/Firestore_Step_Primitives";
import { isHabitScheduledForDate } from "../primitives/HabitudesReccurence";
import { AnimatedBasicSpinnerView } from "../components/Spinners/AnimatedSpinner";

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
        const allStepsID = []
        const habitsNotInOldVersion = []
        const habitsInOldVersion = []

        const newFilteredHabitsByDate = { Quotidien: {}, Hebdo: {}, Mensuel: {} }

        const oldFilteredHabitsID = [...Object.keys(filteredHabitsByDate.Quotidien), ...Object.keys(filteredHabitsByDate.Hebdo), ...Object.keys(filteredHabitsByDate.Mensuel)]

        for (const habitID in habits) {
          if(isHabitScheduledForDate(habits[habitID], currentDate)){

            habitsFiltered.push(habits[habitID]);

            if(!oldFilteredHabitsID.includes(habitID)){
              habitsNotInOldVersion.push(habitID)
              stepsID = Object.keys((habits[habitID].steps))
              allStepsID.push(stepsID)
            }

            else habitsInOldVersion.push(habitID)
          }
        }

        if(habitsNotInOldVersion.length > 0) {
            fetchStepLogs(currentDate, habitsNotInOldVersion).then(stepLogs => {
            habitsFiltered.map(habit => { 
              const stepsUpdated = habit.steps;
    
              for(const stepID in habit.steps){
                let isChecked = false;
    
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
          habitsInOldVersion.map(habitID => {
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
            console.log("habits successfully fetched.")

            const filteredHabits = await filterHabits(habits, new Date())
            console.log("habits successfully filtered.")

            setFilteredHabitsByDate(filteredHabits)
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

      changeStepState(date, stepID, isChecked)
    
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
