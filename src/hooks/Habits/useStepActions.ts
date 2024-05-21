import { addHabitDoneDate, updateCompletedHabit } from "../../firebase/Firestore_Habits_Primitives";
import { changeStepStateFirestore } from "../../firebase/Firestore_Step_Primitives";
import { auth } from "../../firebase/InitialisationFirebase";
import { toISOStringWithoutTimeZone } from "../../primitives/BasicsMethods";
import { getUpdatedStreakOfHabit } from "../../primitives/HabitMethods";
import { isHabitScheduledForDate } from "../../primitives/HabitudesReccurence";
import { Habit, StreakValues } from "../../types/HabitTypes";
import { useHabitContext } from "./useHabitContext";

export const useStepActions = () => {

    const {Habits, addDayToHabitHistory, checkHabitStepIntern} = useHabitContext()
    
    const handleCheckStep = async (habitID: string, stepID: string, date: Date, isChecked: boolean, isHabitNowCompleted: boolean) => {
        if(auth.currentUser && auth.currentUser.email) {
            const userEmail = auth.currentUser.email

            let habit = Habits[habitID];
            const dateString = toISOStringWithoutTimeZone(date)
            const promises: Promise<void>[] = [];
          
            promises.push(changeStepStateFirestore(date, userEmail, habitID, stepID, isChecked));
          
            let newStreakValues = getUpdatedStreakOfHabit(habit, date);
          
            if (isHabitNowCompleted) {
                addHabitDoneDate(userEmail, habitID, dateString)

                addDayToHabitHistory(habitID, date)
                habit = {...habit, ...newStreakValues};

                promises.push(updateCompletedHabit(userEmail, habitID, newStreakValues))
            }
          
            checkHabitStepIntern(habit, date, stepID, isChecked)
          
            await Promise.all(promises);
            console.log("End of check step transactions.");
        }
    }

    return {
        handleCheckStep
    }
}