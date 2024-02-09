import { FirestoreHabit } from "../types/FirestoreTypes/FirestoreHabitTypes";
import { FilteredHabitsType, Habit, Step, StepList, StreakValues } from "../types/HabitTypes";

export const updateHabitStepState = (
  previousHabits: FilteredHabitsType, habit: Habit,
  habitType: string, stepID: string, 
  isChecked: boolean, newStreakValues: StreakValues
): FilteredHabitsType => {
    
    const frequency = habit.frequency
    const objectifID = habit.objectifID
    const habitID = habit.habitID
    const habitSteps = habit.steps
    const step = habitSteps[stepID]
    
    if(!objectifID){

      return {
        ...previousHabits,
        [frequency]: {
          ...previousHabits[frequency],
          [habitType]: {
            ...previousHabits[frequency][habitType],
            [habitID]: {
              ...previousHabits[frequency][habitType]?.[habitID], 
              ...newStreakValues,
              steps: {
                ...previousHabits[frequency][habitType]?.[habitID]["steps"],
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

export const createDefaultStepFromHabit = (habit: FirestoreHabit | Habit, habitID: string): Step => {

    const defaultStep: Step = {
        numero: 0,
        titre: habit.titre, 
        description: habit.description, 
        duration: 30, 
        stepID: habitID,
        habitID,
        created: "Sun Jan 31 2024"
    }

    return defaultStep;
}

export const setHabitWithDefaultStep = (habit: Habit): Habit => {
  let finalHabit: Habit = {...habit}

  if(Object.values(habit.steps).length === 0){
    const habitID = habit.habitID
    
    const placeholderStep: StepList = {[habitID]: createDefaultStepFromHabit(habit, habitID)};
    finalHabit = {...finalHabit, steps: placeholderStep}
  }

  return finalHabit
}