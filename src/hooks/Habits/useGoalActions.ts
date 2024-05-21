import { addGoalToFirestore, removeGoalInFirestore, updateGoalInFirestore } from "../../firebase/Firestore_Goals_Primitives"
import { auth } from "../../firebase/InitialisationFirebase"
import { FormDetailledGoal } from "../../types/FormGoalTypes"
import { Habit, Goal } from "../../types/HabitTypes"
import { useHabitActions } from "./useHabitActions"
import { useHabitContext } from "./useHabitContext"

export const useGoalsActions = () => {

    const {
        getHabitsByGoalID,
        addGoalIntern, removeGoalIntern, updateGoalIntern
    } = useHabitContext()

    const {
        removeHabit, 
        updateHabitRelationWithGoal
    } = useHabitActions()

    const addGoal = async(goal: FormDetailledGoal): Promise<Goal | undefined> => {
        try{
            if(auth.currentUser && auth.currentUser.email) {
                const userMail = auth.currentUser.email

                const newGoal = await addGoalToFirestore(goal, userMail)
                addGoalIntern(newGoal)
        
                console.log("Goal well added !")
        
                return newGoal
            }
        }
  
        catch(e) { 
            console.log("Error while adding goal : ", e) 
        }

        return undefined
    }

    const removeGoal = async(goalID: string, deletePinnedHabit?: boolean) => {
        if(auth.currentUser && auth.currentUser.email) {
            const userMail = auth.currentUser.email

            const habits = getHabitsByGoalID(goalID)
            const promise: Promise<Habit | void>[] = [removeGoalInFirestore(goalID, userMail)]
            removeGoalIntern(goalID)
    
            const updatePromises = habits.map((habit) => {
                if (deletePinnedHabit) {
                    return removeHabit(habit);
                } else {
                    return updateHabitRelationWithGoal(habit, null);
                }
            });
    
            await Promise.all([promise, ...updatePromises])
        }
    }

    const updateGoal = async(oldGoal: Goal, newValues: {[key: string]: any}): Promise<Goal> => {
        if(auth.currentUser && auth.currentUser.email) {
            const userMail = auth.currentUser.email

            const updatedGoal: Goal = {...oldGoal, ...newValues}
        
            updateGoalIntern(updatedGoal)
      
            await updateGoalInFirestore(userMail, oldGoal, newValues)
      
            console.log("Goal updated")
            return updatedGoal
        }

        return oldGoal
      }

    return {
        addGoal,
        removeGoal,
        updateGoal
    }
}