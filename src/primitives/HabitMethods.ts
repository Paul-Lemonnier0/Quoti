import { getDateLogs } from "../firebase/Firestore_Step_Primitives";
import { FirestoreHabit } from "../types/FirestoreTypes/FirestoreHabitTypes";
import { FilteredHabitsType, FrequencyTypes, HabitList, Habit, StreakValues, StepList, Step, SeriazableHabit } from "../types/HabitTypes";
import { calculateNextScheduledDate, isHabitScheduledForDate } from "./HabitudesReccurence";

export const filterHabits = async (date: Date, userID: string, habits: HabitList) => {

  let habitsScheduledForDate: FilteredHabitsType = { 
      Quotidien: {Habitudes: {}, Objectifs: {}}, 
      Hebdo: {Habitudes: {}, Objectifs: {}}, 
      Mensuel: {Habitudes: {}, Objectifs: {}} 
  };

  const doneSteps = await getDateLogs(date, userID)

  for(let habitID in habits){

    const habit: Habit = habits[habitID]
    const habitPlannedForThisDate = isHabitScheduledForDate(habit, date)

    if(habitPlannedForThisDate){
      const habitStepsID = Object.keys(getValidHabitsStepsForDate(Object.values(habit.steps), habitID, date));
      const stepsWithLogsArray = habitStepsID.map(habitStepID => {


        const habitStep = habit.steps[habitStepID]
        const isChecked = doneSteps.includes(habitStepID)

        return { [habitStepID]: {...habitStep, isChecked}}
      })

      const stepsWithLogs = Object.assign({}, ...stepsWithLogsArray);

      const habitWithLogs = {...habit, steps: stepsWithLogs}

      habitsScheduledForDate = addPlannedHabitsToFilteredHabits(habitsScheduledForDate, habitWithLogs)
    }
  }

  return habitsScheduledForDate;
};

export const getHabitType = (habit: Habit | FirestoreHabit): "Objectifs" | "Habitudes" => {
  const isObjective = habit.objectifID !== undefined && habit.objectifID !== null
  const habitType = isObjective ? "Objectifs" : "Habitudes";

  return habitType
}


export const removeHabitFromHabits = (Habits: HabitList, habitID: string): HabitList => {
  const habits = {...Habits}
  delete habits[habitID]

  return habits;
}

export const removeHabitFromFilteredHabits = (filteredHabits: FilteredHabitsType, habit: Habit): FilteredHabitsType => {

  const frequency = habit.frequency
  const updatedFilteredHabits  = {...filteredHabits}

  if(habit.objectifID){
    if(updatedFilteredHabits[frequency].Objectifs?.[habit.objectifID]){
    
      delete updatedFilteredHabits[frequency].Objectifs?.[habit.objectifID][habit.habitID]

      let objectifArray = updatedFilteredHabits[frequency]?.Objectifs?.[habit.objectifID] ?? {} 
      const isObjectifEmpty = Object.keys(objectifArray).length === 0

      if(isObjectifEmpty){
        delete updatedFilteredHabits[frequency].Objectifs?.[habit.objectifID]  
      }

      else delete updatedFilteredHabits[frequency].Habitudes?.[habit.habitID]
    }
  }

  else {
    delete updatedFilteredHabits[frequency].Habitudes?.[habit.habitID]
  }
  

  return {...updatedFilteredHabits};
}

const addPlannedHabitsToFilteredHabits = (filteredHabits: FilteredHabitsType, habit: Habit): FilteredHabitsType => {
  const habitType = getHabitType(habit)
  const frequency = habit.frequency
  const habitID = habit.habitID
  const objectifID = habit.objectifID

  if(!objectifID){
    return {
      ...filteredHabits,
      [frequency]: {
        ...filteredHabits[frequency],
        [habitType]: {
          ...filteredHabits[frequency].Habitudes,
          [habitID]: habit
        }
      }
    }
  }

  return {
    ...filteredHabits,
    [frequency]: {
      ...filteredHabits[frequency],
      [habitType]: {
        ...filteredHabits[frequency].Objectifs,
        [objectifID]: {
          ...filteredHabits[frequency].Objectifs?.[objectifID],
          [habitID]: habit
        }
      }
    }
  }
}


export const updateFilteredHabitsWithNewHabit = (previousFilteredHabits: FilteredHabitsType, newHabit: Habit, currentDate: Date): FilteredHabitsType => {

  if(isHabitScheduledForDate(newHabit, currentDate))
    return addPlannedHabitsToFilteredHabits(previousFilteredHabits, newHabit)

  else return removeHabitFromFilteredHabits(previousFilteredHabits, newHabit)
}


export const updateHabitsWithNewHabit = (previousHabits: HabitList, newHabit: Habit): HabitList => {
  const habitID = newHabit.habitID

  return {
    ...previousHabits,
    [habitID]: newHabit
  }
}

export const getSeriazableHabit = (habit: Habit): SeriazableHabit => {
  if("startingDate" in habit) {
    const startingDate = habit.startingDate.toDateString()
  
    return({
        ...habit,
        startingDate
      })
  }

  return habit
}

export const convertBackSeriazableHabit = (habit: SeriazableHabit): Habit => {
  const startingDate = new Date(habit.startingDate)
  
  return({
    ...habit,
    startingDate
  })
}

export const getUpdatedStreakOfHabit = (habit: Habit | FirestoreHabit, currentDate: Date): StreakValues => {

  const completedDateString = currentDate.toDateString()

  let streakStopped = false;
  if(habit.lastCompletionDate !== "none"){
    const nextDateAfterLastCompletion = calculateNextScheduledDate(habit, new Date(habit.lastCompletionDate))
    streakStopped = nextDateAfterLastCompletion < currentDate 
  }

  const newStreak = streakStopped ? 1 : habit.currentStreak + 1

  const currentStreak = newStreak
  const lastCompletionDate = completedDateString
  const bestStreak = newStreak > habit.bestStreak ? newStreak : habit.bestStreak

  const newStreakValues: StreakValues = {
      currentStreak,
      lastCompletionDate,
      bestStreak
  }

  if(bestStreak === habit.bestStreak){
      delete newStreakValues[bestStreak]
  }

  return newStreakValues
}

export const getValidHabitsStepsForDate = (steps: Step[], habitID: string, currentDate: Date): StepList  => {
  const validSteps: StepList = {}

  steps.forEach((step) => {
    if(step.created && step.stepID !== habitID){
      const createdDate = new Date(step.created)

      if(currentDate >= createdDate){
        if(step.deleted){
          const deletedDate = new Date(step.deleted)
  
          if(currentDate < deletedDate){
            validSteps[step.stepID] = {...step}
          }
        }
  
        else validSteps[step.stepID] = {...step}
      }
    }
  })

  if(Object.keys(validSteps).length === 0){
    const placeholderStep = steps.filter((step) => (step.stepID) === habitID)[0]
    validSteps[habitID] = {...placeholderStep}
  }

  return validSteps
}

export const stringToFrequencyType = (str: string): FrequencyTypes => {
  switch (str.toLowerCase()) {

      case "quotidien":
          return FrequencyTypes.Quotidien;

      case "hebdo":
          return FrequencyTypes.Hebdo;

      case "mensuel":
          return FrequencyTypes.Mensuel;

      default:
          return FrequencyTypes.Quotidien;
  }
}


export const getHabitFromFilteredHabitsMethod = (filteredHabitsByDate: FilteredHabitsType, frequency: FrequencyTypes, objectifID: string | undefined, habitID: string): Habit | undefined => {
  if(objectifID){
    return filteredHabitsByDate[frequency].Objectifs?.[objectifID]?.[habitID]
  }

  return filteredHabitsByDate[frequency].Habitudes?.[habitID]
}