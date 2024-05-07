import { addDays, differenceInDays } from "date-fns";
import { Database_getUsersInfo } from "../firebase/Database_User_Primitives";
import { getDateLogs, getHabitLogsInDateRange } from "../firebase/Firestore_Step_Primitives";
import { MemberType, UserFirestoreHabit } from "../types/FirestoreTypes/FirestoreHabitTypes";
import { FilteredHabitsType, FrequencyTypes, HabitList, Habit, StreakValues, StepList, Step, SeriazableHabit, EMPTY_FILTERED_HABITS } from "../types/HabitTypes";
import { toISOStringWithoutTimeZone } from "./BasicsMethods";
import { calculateNextScheduledDate, isHabitScheduledForDate } from "./HabitudesReccurence";
import { FormDetailledObjectifHabit, FormStepsHabit } from "../types/FormHabitTypes";

//TODO: gérer le cache

export const filterHabits = async (date: Date, userID: string, habits: HabitList) => {

  let habitsScheduledForDate: FilteredHabitsType = EMPTY_FILTERED_HABITS;

  const currentDateDoneSteps = await getDateLogs(date, userID)

  const scheduledHabits = getScheduledHabits(date, Object.values(habits))

  const scheduledHabitsWithLogs = await Promise.all(scheduledHabits.map(async(habit) => {
    const stepsWithLogs = await setHabitStepsLogs(date, habit, currentDateDoneSteps, userID)
    return {...habit, steps: stepsWithLogs} as Habit
  }));

  scheduledHabitsWithLogs.forEach(habit => {
    habitsScheduledForDate = addPlannedHabitsToFilteredHabits(habitsScheduledForDate, habit)
  })

  return habitsScheduledForDate;
}

const getScheduledHabits = (date: Date, habits: Habit[]): Habit[] => {
  return habits.filter(habit => isHabitScheduledForDate(habit, date));
};

const setHabitStepsLogs = async(date: Date, habit: Habit, currentDateDoneSteps: string[], userID: string): Promise<StepList> => {

  let periodLogs: string[] = []
  const validHabitStepsID = Object.keys(getValidHabitsStepsForDate(Object.values(habit.steps), habit.habitID, date));
 
  if(habit.frequency !== FrequencyTypes.Quotidien) {
    const startPeriodeDay = getFirstDayOfHabitOccurenceFromDate(date, habit)
    const endDay = date

    periodLogs = await getHabitLogsInDateRange(habit.habitID, startPeriodeDay, endDay, userID)
  }

  const stepsWithLogsArray = validHabitStepsID.map(validHabitStepID => {
    const habitStep = habit.steps[validHabitStepID]
    const isChecked = currentDateDoneSteps.includes(validHabitStepID) || periodLogs.includes(validHabitStepID)

    return {...habitStep, isChecked}
  })

  return stepsWithLogsArray.reduce((acc, step) => {
    acc[step.stepID] = step;
    return acc;
  }, {});
}


export const getHabitType = (habit: Habit | UserFirestoreHabit): "Objectifs" | "Habitudes" => {
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
  if(habit.startingDate instanceof Date) {
    const startingDate = toISOStringWithoutTimeZone(habit.startingDate)
  
    return({
        ...habit,
        startingDate
      })
  }

  const startingDate = habit.startingDate as string

  return {...habit, startingDate}
}

export const convertBackSeriazableHabit = (habit: SeriazableHabit): Habit => {
  const startingDate = new Date(habit.startingDate)
  
  return({
    ...habit,
    startingDate
  })
}

/**
 * Vérifie si une série est terminée sur une habitude. Renvoie les nouvelles streakValues
 */

export const checkIfStreakEndedHabit = (habit: Habit, currentDate: Date): StreakValues => {

  const completedDateTemp = new Date(currentDate)

  let streakStopped = false;

  if(habit.lastCompletionDate !== "none"){
    const nextDateAfterLastCompletion = calculateNextScheduledDate(habit, new Date(habit.lastCompletionDate))
    streakStopped = nextDateAfterLastCompletion.setHours(0,0,0,0) < completedDateTemp.setHours(0,0,0,0)

    const currentStreak = streakStopped ? 0 : habit.currentStreak

    return {
      currentStreak: currentStreak,
      lastCompletionDate: habit.lastCompletionDate,
      bestStreak: habit.bestStreak
    }
  }

  return {
      currentStreak: habit.currentStreak,
      lastCompletionDate: habit.lastCompletionDate,
      bestStreak: habit.bestStreak
  }
}

export const getUpdatedStreakOfHabit = (habit: Habit, currentDate: Date): StreakValues => {

  const completedDateTemp = new Date(currentDate)
  const completedDateString = toISOStringWithoutTimeZone(currentDate)

  let streakStopped = false;
  if(habit.lastCompletionDate !== "none"){
    const nextDateAfterLastCompletion = calculateNextScheduledDate(habit, new Date(habit.lastCompletionDate))
    streakStopped = nextDateAfterLastCompletion.setHours(0,0,0,0) < completedDateTemp.setHours(0,0,0,0)
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
  const currentDateTemp = new Date(currentDate)

  steps.forEach((step) => {
    if(step.created && step.stepID !== habitID){
      const createdDate = new Date(step.created)

      if(currentDateTemp.setHours(0,0,0,0) >= createdDate.setHours(0,0,0,0)){
        if(step.deleted){
          const deletedDate = new Date(step.deleted)
  
          if(currentDateTemp.setHours(0,0,0,0) < deletedDate.setHours(0,0,0,0)){
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

export const getUsersDataBaseFromMember = async(members: MemberType[], userID?: string, userMail?: string, removeCurrentUser: boolean = true) => {
    
    if(removeCurrentUser) {
      if(members.length > 1) {
        let membersID: string[] = [] 

        if(userID) {
          membersID = members.filter(member => member.id !== userID).map(member => member.id)
        }

        else if (userMail) {
          membersID = members.filter(member => member.mail !== userMail).map(member => member.id)
        }

        else {
          membersID = members.map(member => member.id)
        }
        
        return await Database_getUsersInfo(membersID)
      }
    }

    else {
      if(members.length > 0) {
        const membersID = members.map(member => member.id)  
        return await Database_getUsersInfo(membersID)
      }
    }

    return []
}

export const getFirstDayOfHabitOccurenceFromDate = (date: Date, habit: Habit): Date => {
  const diffDays = differenceInDays(habit.startingDate, date)

  if(habit.frequency === FrequencyTypes.Hebdo) {
    const startDate = addDays(date, diffDays % 7)
    return new Date(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).setUTCHours(0, 0, 0, 0));
  }

  else if (habit.frequency === FrequencyTypes.Mensuel) {
    return new Date(toISOStringWithoutTimeZone(new Date(date.getFullYear(), date.getMonth(), 1)))
  }

  return date
}

/**
 * Compare deux habitudes ainsi que les valeurs qui sont censées avoir bougées afin de déterminer si elles sont identiques
 */

export const notSameHabit = (newValues: FormStepsHabit, newHabit: SeriazableHabit, oldHabit: SeriazableHabit | FormDetailledObjectifHabit): boolean => {
  for(let oldKey of Object.keys(oldHabit)){
      if(oldKey !== "steps" && (!newHabit.hasOwnProperty(oldKey) || newHabit[oldKey] !== oldHabit[oldKey])){
          return true
      }
  }

  if(newValues.steps) {
      let oldSteps = Object.values((oldHabit as SeriazableHabit).steps)

      if(oldSteps.length !== newValues.steps.length){
          return true
      }

      const isOldStepPlaceholder = oldSteps.length === 1 && oldSteps[0].stepID === oldHabit.habitID
      const isNewStepPlaceholder = newValues.steps.filter((step) => (step.numero === -1)).length > 0

      if(isOldStepPlaceholder || isNewStepPlaceholder) {
          return !(isOldStepPlaceholder && isNewStepPlaceholder)
      }

      oldSteps = oldSteps.map((step) => {
          if(step.created){
              const createdDate = new Date(step.created)
              return {...step, created: toISOStringWithoutTimeZone(createdDate)}
          }

          if(step.deleted){
              const deletedDate = new Date(step.deleted)
              return {...step, deleted: toISOStringWithoutTimeZone(deletedDate)}
          }

          return {...step}
      })

      for(let i = 0; i < oldSteps.length; ++i){
          for(let oldStepKey of Object.keys(newValues.steps[i])){
              if(!oldSteps[i].hasOwnProperty(oldStepKey)){
                  return true
              }
  
              if(newValues.steps[i][oldStepKey] !== oldSteps[i][oldStepKey]){
                  return true
              }
          }
      }
  }

  return false
}