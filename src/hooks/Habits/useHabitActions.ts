import { auth } from "../../firebase/InitialisationFirebase"
import { updateHabitSteps } from "../../primitives/StepMethods"
import { FormDetailledHabit } from "../../types/FormHabitTypes"
import { Habit } from "../../types/HabitTypes"
import { useHabitContext } from "./useHabitContext"
import { 
    addHabitToFireStore,
    archiveUserHabit,
    getBackUserHabit,
    HabitState,
    markUserHabitAsDone,
    removeHabitInFirestore, 
    updateHabitInFirestore 
} from "../../firebase/Firestore_Habits_Primitives"

export const useHabitActions = () => {

    const { 
        selectedDate,
        addHabitIntern, removeHabitIntern, updateHabitIntern, 
        addArchivedHabitIntern, markHabitAsDoneIntern,
        removeArchivedHabitIntern, removeHabitFromMarkedAsDoneIntern
    } = useHabitContext()

    const addHabit = async(habit: FormDetailledHabit): Promise<Habit | undefined> => {
        try{
            if(auth.currentUser && auth.currentUser.email) {
              const habitWithID = await addHabitToFireStore(habit, auth.currentUser.email, auth.currentUser.uid)    
              if(habitWithID) {
                addHabitIntern(habitWithID)
    
                console.log("habit well added !")
                return habitWithID
              }
            }
        }
  
        catch(e) {
          console.log("Error while adding habit : ", e)
        }
    }

    const removeHabit = async(habit: Habit) => {
        if(auth.currentUser && auth.currentUser.email) {
            const userID = auth.currentUser.uid
        
            await removeHabitInFirestore(habit, auth.currentUser.email, userID)
            removeHabitIntern(habit)

            console.log("Habit : ", habit.titre, " succesfully deleted !")
        }
    }

    const updateHabit = async(oldHabit: Habit, newValues: {[key: string]: any}, currentDate: Date = selectedDate): Promise<Habit> => {
        if(auth.currentUser && auth.currentUser.email) {
            const userMail = auth.currentUser.email

            await updateHabitInFirestore(userMail, oldHabit, newValues)
        
            const updatedHabit: Habit = {...oldHabit, ...newValues}
            
            const newSteps = updateHabitSteps(updatedHabit, currentDate)
            updatedHabit.steps = {...newSteps}

            updateHabitIntern(oldHabit, updatedHabit, currentDate)

            console.log("Habit : ", updatedHabit.titre, " successfully updated !")
        }

        return oldHabit
    }

    const updateHabitRelationWithObjectif = async(habit: Habit, newObjectifID: string | null) => {
        return await updateHabit(habit, { objectifID: newObjectifID }, selectedDate)
    }

    const archiveHabit = async(habit: Habit, habitState = HabitState.Current) => {
        if(auth.currentUser && auth.currentUser.email) {
            const userEmail = auth.currentUser.email
            const userID = auth.currentUser.uid

            if(habitState !== HabitState.Archived) {
                addArchivedHabitIntern(habit)
                
                if(habitState === HabitState.Done) {
                    removeHabitFromMarkedAsDoneIntern(habit)
                }
    
                else {
                    removeHabitIntern(habit)
                }
    
                await archiveUserHabit(habit, userEmail, userID, habitState)
            }
    
            else console.log("habit already archived")
        }
    }

    const markHabitAsDone = async(habit: Habit, habitState = HabitState.Current) => {
        if(auth.currentUser && auth.currentUser.email) {
            const userEmail = auth.currentUser.email
            const userID = auth.currentUser.uid

            if(habitState !== HabitState.Done) {
                markHabitAsDoneIntern(habit)
    
                if(habitState === HabitState.Archived) {
                    removeArchivedHabitIntern(habit)
                }
    
                else {
                    removeHabitIntern(habit)
                }
    
                await markUserHabitAsDone(habit, userEmail, userID, habitState)
            }
          
          else console.log("habit alreay marked as done")
        }
    }

    const getBackHabit = async(habit: Habit, habitState = HabitState.Current) => {
        if(auth.currentUser && auth.currentUser.email) {
            const userEmail = auth.currentUser.email
            const userID = auth.currentUser.uid

            if(habitState !== HabitState.Current) {
                addHabitIntern(habit)
    
                if(habitState === HabitState.Archived) {
                    removeArchivedHabitIntern(habit)
                }
    
                else {
                    removeHabitFromMarkedAsDoneIntern(habit)
                }
    
                await getBackUserHabit(habit, userEmail, userID, habitState)
            }

            else console.log("Habit already current")
        }
    }

    return {
        addHabit, removeHabit, updateHabit, updateHabitRelationWithObjectif,
        archiveHabit, markHabitAsDone, getBackHabit
    }
}