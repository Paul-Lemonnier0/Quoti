import { createContext, useState, useContext } from "react";
import { addNewHabit, getAllOwnHabits } from "../firebase/FirestorePrimitives";
import { useEffect } from "react";
import { areIntervalsOverlapping } from "date-fns";
import { HOUR_BLOCK_HEIGHT } from "react-native-calendars/src/timeline/Packer";
import { cloneElement } from "react";

const HabitsContext = createContext();

const HabitsProvider = ({ children }) => {
    const [Habits, setHabits] = useState([]);

    const fetchAllHabits = async () => {
        setHabits(await getAllOwnHabits());
    };

    const addHabit = async(habit) => {

        const habitID = await addNewHabit(habit)
        const newHabit = { ...habit, habitID: habitID };

        console.log("Habitude bien ajoutée avec comme identifiant : " + habitID)
        return newHabit

    }

    const handleAddHabit = (newHabit) => {
        setHabits((prevHabits) => [...prevHabits, JSON.parse(JSON.stringify(newHabit))])

        console.log("HABIT : ", newHabit)

        const newIndex = Habits.findIndex((habit) => {
          return habit.habitID === newHabit.habitID;
        });

        return newIndex;
    }

    useEffect(() => {
        const fetchData = async () => {
        await fetchAllHabits();
        };

        fetchData();
    }, []);

    const handleCheckStep = (stepIndex, habitID, isUnCheck) => {

        const habitsFiltered = Habits.filter((habit) => habit.id === habitID)
        const habitConcerned = habitsFiltered[0]

        const habitIndex = Habits.indexOf(habitConcerned)
      
        const updatedSteps = habitConcerned.steps.map((step, index) => {
          if (index === stepIndex) {
            return { ...step, isComplete: !isUnCheck };
          }
          return step;
        });
      
        const updatedHabit = { ...habitConcerned, steps: updatedSteps };
      
        const updatedHabits = [...Habits];
        updatedHabits[habitIndex] = updatedHabit;
      
        setHabits(updatedHabits);
      
        /*console.log(
          "L'étape avec pour ID : " + updatedSteps[stepIndex].stepID + " a bien été checkée",
          updatedHabit
        );*/
      };

      
      

    return (
        <HabitsContext.Provider value={{ Habits, fetchAllHabits, addHabit, handleAddHabit, handleCheckStep}}>
        {children}
        </HabitsContext.Provider>
    );
};

export { HabitsProvider, HabitsContext };
