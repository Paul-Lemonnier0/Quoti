import { deleteStepLogs, fetchStepLog } from "../firebase/Firestore_Step_Primitives";

export const updateHabitStepState = (previousHabits, habit, habitType, stepID, isChecked, newStreakValues) => {
    
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
              ...newStreakValues,
              steps: {
                ...previousHabits[frequency][habitType][habitID]["steps"],
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
                ...newStreakValues,
                steps: {
                  ...previousHabits[frequency][habitType][objectifID][habitID]["steps"],
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