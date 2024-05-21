import { addObjectifToFirestore, removeObjectifInFirestore, updateObjectifInFirestore } from "../../firebase/Firestore_Objectifs_Primitives"
import { auth } from "../../firebase/InitialisationFirebase"
import { FormDetailledObjectif } from "../../types/FormObjectifTypes"
import { Habit, Objectif } from "../../types/HabitTypes"
import { useHabitActions } from "./useHabitActions"
import { useHabitContext } from "./useHabitContext"

export const useGoalsActions = () => {

    const {
        getHabitsByObjectifID,
        addObjectifIntern, removeObjectifIntern, updateObjectifIntern
    } = useHabitContext()

    const {
        removeHabit, 
        updateHabitRelationWithObjectif
    } = useHabitActions()

    const addGoal = async(goal: FormDetailledObjectif): Promise<Objectif | undefined> => {
        try{
            if(auth.currentUser && auth.currentUser.email) {
                const userMail = auth.currentUser.email

                const newGoal = await addObjectifToFirestore(goal, userMail)
                addObjectifIntern(newGoal)
        
                console.log("Goal well added !")
        
                return newGoal
            }
        }
  
        catch(e) { 
            console.log("Error while adding objectif : ", e) 
        }

        return undefined
    }

    const removeGoal = async(objectifID: string, deletePinnedHabit?: boolean) => {
        if(auth.currentUser && auth.currentUser.email) {
            const userMail = auth.currentUser.email

            const habits = getHabitsByObjectifID(objectifID)
            const promise: Promise<Habit | void>[] = [removeObjectifInFirestore(objectifID, userMail)]
            removeObjectifIntern(objectifID)
    
            const updatePromises = habits.map((habit) => {
                if (deletePinnedHabit) {
                    return removeHabit(habit);
                } else {
                    return updateHabitRelationWithObjectif(habit, null);
                }
            });
    
            await Promise.all([promise, ...updatePromises])
        }
    }

    const updateGoal = async(oldObjectif: Objectif, newValues: {[key: string]: any}): Promise<Objectif> => {
        if(auth.currentUser && auth.currentUser.email) {
            const userMail = auth.currentUser.email

            const updatedObjectif: Objectif = {...oldObjectif, ...newValues}
        
            updateObjectifIntern(updatedObjectif)
      
            await updateObjectifInFirestore(userMail, oldObjectif, newValues)
      
            console.log("Objectif updated")
            return updatedObjectif
        }

        return oldObjectif
      }

    return {
        addGoal,
        removeGoal,
        updateGoal
    }
}