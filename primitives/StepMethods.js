import { deleteStepLogs, fetchStepLog } from "../firebase/Firestore_Step_Primitives";

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

export const updateHabitStepState = (previousHabits, habit, habitType, stepID, isChecked) => {
    
    const frequency = habit.frequency
    const objectifID = habit.objectifID
    const habitID = habit.habitID
    const habitSteps = habit.steps
    const step = habitSteps[stepID]
    
    if(habitType === "Habitudes"){

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

    else {
      return {
        ...previousHabits,
        [frequency]: {
          ...previousHabits[frequency],
          [habitType]: {
            ...previousHabits[frequency][habitType],
            [objectifID]: {
              ...previousHabits[frequency][habitType][objectifID],
              [habitID]: {
                ...previousHabits[frequency][habitType][objectifID][habitID],
                steps: {
                  ...habitSteps,
                  [stepID]: {...step, isChecked}
                }
              }
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

export const setHabitWithDefaultStep = (habit) => {
  let finalHabit = {...habit}

  if(Object.values(habit.steps).length === 0){
    const placeholderStep = [createDefaultStepFromHabit(habit, habit.habitID)];
    console.log("placeholderStep : ", placeholderStep)
    finalHabit = {...finalHabit, steps: placeholderStep}
  }

  return finalHabit
}

export const removeStepLogs = async(stepsID) => {
    console.log("Deleting steps logs in firestore...")

    await Promise.all(stepsID.map(async(stepID) => {
         await deleteStepLogs(stepID);
    }))

    console.log("Steps Logs successfully deleted in firestore !")
}