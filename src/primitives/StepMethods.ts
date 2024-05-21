import { GlobalFirestoreHabit } from "../types/FirestoreTypes/FirestoreHabitTypes";
import { FormDetailledGoalHabit, FormFullStep, FormStep, FormStepsHabitValues } from "../types/FormHabitTypes";
import { FilteredHabitsType, Habit, PrioritesType, SeriazableHabit, Step, StepList, StreakValues } from "../types/HabitTypes";
import { toISOStringWithoutTimeZone } from "./BasicsMethods";
import { getValidHabitsStepsForDate } from "./HabitMethods";

export const updateHabitStepState = (
  previousHabits: FilteredHabitsType, habit: Habit,
  habitType: string, stepID: string, 
  isChecked: boolean, newStreakValues: StreakValues
): FilteredHabitsType => {
    
    const frequency = habit.frequency
    const goalID = habit.goalID
    const habitID = habit.habitID
    const habitSteps = habit.steps
    const step = habitSteps[stepID]
    
    if(!goalID){

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
            [goalID]: {
              ...previousHabits[frequency][habitType][goalID],
              [habitID]: {
                ...previousHabits[frequency][habitType][goalID][habitID],
                ...newStreakValues,
                steps: {
                  ...previousHabits[frequency][habitType][goalID][habitID]["steps"],
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

export const setNewSteps = (values: FormStepsHabitValues, habit: SeriazableHabit | FormDetailledGoalHabit) => {
  let oldStepsArray = Object.values(habit.steps)

  //On filtre pour enlever le placeholder
  let updatedStepsArray = oldStepsArray.filter((step) => (step as Step).stepID !== habit.habitID)

  if(values.steps){
      const today = new Date().toISOString()
      const newStepIDs: string[] = values.steps.map((step) => (step as (Step | FormFullStep)).stepID);
      
      //les deleted
      const deletedSteps = updatedStepsArray.map((step) => {
          if(step as (Step | FormFullStep)){
              //Si les nouvelles steps ne contiennent pas une step d'avant on met à jour le deleted
              if(!newStepIDs.includes((step as (Step | FormFullStep)).stepID)) {
                  return step = {...step, deleted: today}
              }
          }
      }).filter(step => step != undefined)


      //les added, intact, modified
      const otherSteps = values.steps.map(step => {
          //Si l'étape est déjà connue
          if("created" in step){
              //Si l'étape n'éxistait pas avant dans l'habit (normalement on rentre pas dedans)
              if(!habit.steps.hasOwnProperty((step as Step).stepID))
                  return {...step, created: today}

              else {
                  //Si l'étape a simplement été modifiée
                  if(habit.steps[(step as Step).stepID] != step) {
                      return {...step, created: today}
                  }

                  else {
                      //Sinon on ajoute sans mettre à jour la date de création
                      return {...step}
                  }
              }
          }

          //Si c'est une nouvelle étape
          else {
              return {...step, created: today}
          }
      });

      updatedStepsArray = [...deletedSteps, ...otherSteps] as (Step | FormStep)[]
      
      //Suppression du placeholder
      if(updatedStepsArray.filter(step => step.numero !== -1 && !("deleted" in step)).length > 0) {
          updatedStepsArray = updatedStepsArray.map(step => step.numero === -1 ? {...step, deleted: today} : {...step})
      }

      //Ajout du placeholder
      if(updatedStepsArray.filter(step => !("deleted" in step)).length === 0) {
          updatedStepsArray = [{created: today, numero: -1}]
      }
  }

  return updatedStepsArray
}

export const updateHabitSteps = (updatedHabit: Habit, currentDate: Date): StepList => {
    const {habitID, startingDate, steps} = updatedHabit
    const newSteps = Object.values(steps)

    const deletedSteps = newSteps.filter((step) => !("deleted" in step))

    const isNewStepPlaceholder = 
      ((deletedSteps.length === 1) && deletedSteps[0].numero === -1) 
      || deletedSteps.length === 0;

    if(isNewStepPlaceholder){
      const placeholderStep: StepList = {}
      placeholderStep[updatedHabit.habitID] = createDefaultStepFromHabit(updatedHabit, habitID, startingDate)
      return {...placeholderStep}
    }

    const validSteps = getValidHabitsStepsForDate(newSteps, habitID, currentDate)
    return {...validSteps}
}