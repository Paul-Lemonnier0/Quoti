import { createContext, useState, useContext } from "react";
import { addHabitToFireStore, addNewHabit, getAllOwnHabits } from "../firebase/FirestorePrimitives";
import { useEffect } from "react";
import { addSteps } from "../firebase/Firestore_Step_Primitives";

const HabitsContext = createContext();

const HabitsProvider = ({ children }) => {
    const [Habits, setHabits] = useState({});

    const fetchAllHabits = async () => {
        console.log("Fetching habits...")
        setHabits(await getAllOwnHabits());
        return;
    };

    useEffect(() => {
        const fetchData = async () => {
          await fetchAllHabits();
          console.log("Habits fetched")
        };

        fetchData();
    }, []);


    const addHabit = async(habit) => {

        console.log("adding habit...")

        const habitFull = await addHabitToFireStore(habit)
        
        setHabits((prevHabits) => ({
          ...prevHabits,
          [habitFull.habitID]: habitFull
        }));

        console.log("habit well added")

        return habitFull.habitID
    }

    const handleCheckStep = (stepIndex, habitID, isUnCheck) => {

        // const habitsFiltered = Habits.filter((habit) => habit.id === habitID)
        // const habitConcerned = habitsFiltered[0]

        // const habitIndex = Habits.indexOf(habitConcerned)
      
        // const updatedSteps = habitConcerned.steps.map((step, index) => {
        //   if (index === stepIndex) {
        //     return { ...step, isComplete: !isUnCheck };
        //   }
        //   return step;
        // });
      
        // const updatedHabit = { ...habitConcerned, steps: updatedSteps };
      
        // const updatedHabits = [...Habits];
        // updatedHabits[habitIndex] = updatedHabit;
      
        // setHabits(updatedHabits);
      
        /*console.log(
          "L'étape avec pour ID : " + updatedSteps[stepIndex].stepID + " a bien été checkée",
          updatedHabit
        );*/
      };

      
      

    return (
        <HabitsContext.Provider value={{ Habits, fetchAllHabits, addHabit, handleCheckStep}}>
          {children}
        </HabitsContext.Provider>
    );
};

export { HabitsProvider, HabitsContext };
