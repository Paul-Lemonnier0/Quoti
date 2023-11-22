import { deleteStepLogs, fetchStepLog } from "../firebase/Firestore_Step_Primitives";
import { getHabitType } from "./HabitMethods";

export const getStepLog = async (date, stepID, alreadyFetchedStepLogs) => {
    const stepLogID = [stepID, date];
    if(alreadyFetchedStepLogs.hasOwnProperty(stepLogID)){
        return alreadyFetchedStepLogs[stepLogID]
    }

    else{
      try{
        const isChecked = await fetchStepLog(date, stepID)
        alreadyFetchedStepLogs[stepLogID] = isChecked

        return isChecked
      }

      catch(e){
        console.log("error while fetching step log : ", e)
        return false;
      }
    }
}

export const updateHabitStepState = (previousHabits, habit, stepID, isChecked) => {
  
    const habitType = getHabitType(habit)
  
    const frequency = habit.frequency
    const habitID = habit.habitID
    const habitSteps = habit.steps
    const step = habitSteps[stepID]
    
    return {
      ...previousHabits,
      [frequency]: {
        ...previousHabits[frequency],
        [habitType]: {
          ...previousHabits[frequency][habitType],
          [habitID]: {
            ...previousHabits[frequency][habitType][habitID],
            steps: {
              ...habitSteps,
              [stepID]: {...step, isChecked}
            }
          }
        }
      }
    }
}

export const createDefaultStepFromHabit = (habit, habitID, listFormat) => {

    const defaultStep = {
        numero: 0,
        titre: habit.titre, 
        description: habit.description, 
        duration: 30, 
        stepID: habitID,
        habitID
    }
    
    if(listFormat){
        return {[habitID]: {...defaultStep}}
    }

    return defaultStep;
}

export const removeStepLogs = async(stepsID) => {
    console.log("Deleting steps logs in firestore...")

    await Promise.all(stepsID.map(async(stepID) => {
         await deleteStepLogs(stepID);
    }))

    console.log("Steps Logs successfully deleted in firestore !")
}