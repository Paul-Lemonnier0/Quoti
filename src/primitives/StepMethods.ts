import { GlobalFirestoreHabit } from "../types/FirestoreTypes/FirestoreHabitTypes";
import { FilteredHabitsType, Habit, PrioritesType, Step, StepList, StreakValues } from "../types/HabitTypes";
import { toISOStringWithoutTimeZone } from "./BasicsMethods";

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

export const createDefaultStepFromHabit = (habit: GlobalFirestoreHabit | Habit, habitID: string, startingDate: Date): Step => {

    const defaultStep: Step = {
        numero: 0,
        duration: 30, 

        titre: habit.titre, 
        description: habit.description, 

        created: toISOStringWithoutTimeZone(startingDate),
        stepID: habitID,
        habitID,
    }

    return defaultStep;
}

export const setHabitWithDefaultStep = (habit: Habit): Habit => {
  let finalHabit: Habit = {...habit}

  if(Object.values(habit.steps).length === 0){
    const habitID = habit.habitID
    
    const placeholderStep: StepList = {[habitID]: createDefaultStepFromHabit(habit, habitID, habit.startingDate)};
    finalHabit = {...finalHabit, steps: placeholderStep}
  }

  return finalHabit
}

export interface PriorityDetailsType {
  color: string,
  text: string,
  icon: string
}

export const getPriorityDetails = (priority: PrioritesType | undefined): PriorityDetailsType => {

  if(!priority || priority === PrioritesType.None) {
    return {
      color: "",
      text: "",
      icon: ""
    }
  }

  switch(priority){
    case PrioritesType.Low:
      return {
        color: "#54d152",
        text: "Faible",
        icon: "chevron-down"
      }

    case PrioritesType.Medium:
      return {
        color: "#ffb86e",
        text: "Moyenne",
        icon: "chevron-up"
      }

    case PrioritesType.High:
      return {
        color: "#ff6c6c",
        text: "Élevée",
        icon: "chevrons-up"
      }
  }
}