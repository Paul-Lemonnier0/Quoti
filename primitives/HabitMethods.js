import { getDateLogs } from "../firebase/Firestore_Step_Primitives";
import { displayTree } from "./BasicsMethods";
import { calculateNextScheduledDate, isHabitPlannedThisMonth, isHabitScheduledForDate } from "./HabitudesReccurence";
import { getStepLog } from "./StepMethods";

export const filterHabits = async (date, habits, setIsFetchingHabit) => {
  setIsFetchingHabit(true)

  let habitsScheduledForDate = { 
      Quotidien: {Habitudes: {}, Objectifs: {}}, 
      Hebdo: {Habitudes: {}, Objectifs: {}}, 
      Mensuel: {Habitudes: {}, Objectifs: {}} 
  };

  const doneSteps = await getDateLogs(date)

  for(let habitID in habits){

    const habit = habits[habitID]
    const habitPlannedForThisDate = isHabitScheduledForDate(habit, date)

    if(habitPlannedForThisDate){
      const habitStepsID = Object.keys(habit.steps);
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

  setIsFetchingHabit(false)

  return habitsScheduledForDate;
};

export const getHabitType = (habit) => {
  const isObjective = habit.objectifID !== undefined && habit.objectifID !== null
  const habitType = isObjective ? "Objectifs" : "Habitudes";

  return habitType
}


export const removeHabitFromHabits = (Habits, habitID) => {
  const habits = {...Habits}
  delete habits[habitID]

  return habits;
}

export const removeHabitFromFilteredHabits = (FilteredHabits, habit) => {

  const habitType = getHabitType(habit)
  const frequency = habit.frequency
  const updatedFilteredHabits  = {...FilteredHabits}

  if(updatedFilteredHabits[frequency] && updatedFilteredHabits[frequency][habitType]){
    if(habitType === "Objectifs" && updatedFilteredHabits[frequency][habitType][habit.objectifID]){
      
      delete updatedFilteredHabits[frequency][habitType][habit.objectifID][habit.habitID]
      const isObjectifEmpty = Object.keys(updatedFilteredHabits[frequency][habitType][habit.objectifID]).length === 0
      if(isObjectifEmpty){
        delete updatedFilteredHabits[frequency][habitType][habit.objectifID]
      }
    }

    else delete updatedFilteredHabits[frequency][habitType][habit.habitID]
  }

  return {...updatedFilteredHabits} ;
}

const addPlannedHabitsToFilteredHabits = (filteredHabits, habit) => {
  const habitType = getHabitType(habit)
  const frequency = habit.frequency
  const habitID = habit.habitID
  const objectifID = habit.objectifID

  if(habitType === "Habitudes"){
    return {
      ...filteredHabits,
      [frequency]: {
        ...filteredHabits[frequency],
        [habitType]: {
          ...filteredHabits[frequency][habitType],
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
        ...filteredHabits[frequency][habitType],
        [objectifID]: {
          ...filteredHabits[frequency][habitType][objectifID],
          [habitID]: habit
        }
      }
    }
  }
}


export const updateFilteredHabitsWithNewHabit = (previousFilteredHabits, newHabit, currentDate) => {

  if(isHabitScheduledForDate(newHabit, currentDate))
    return addPlannedHabitsToFilteredHabits(previousFilteredHabits, newHabit)

  else return removeHabitFromFilteredHabits(previousFilteredHabits, newHabit)
}


export const updateHabitsWithNewHabit = (previousHabits, newHabit) => {
  const habitID = newHabit.habitID

  return {
    ...previousHabits,
    [habitID]: newHabit
  }
}

export const getSeriazableHabit = (habit) => {
  const startingDate = habit.startingDate.toDateString()
  
  return({
      ...habit,
      startingDate
    })
}

export const convertBackSeriazableHabit = (habit) => {
  const startingDate = new Date(habit.startingDate)
  
  return({
    ...habit,
    startingDate
  })
}


export const getObjectifHabitFromFilteredHabitsMethod = (filteredHabitsByDate, frequency, objectifID, habitID) => {
  if(habitID){
    return filteredHabitsByDate[frequency]["Objectifs"][objectifID][habitID]
  }

  else return Object.values(filteredHabitsByDate[frequency]["Objectifs"][objectifID]);
}

export const getHabitFromFilteredHabitsMethod = (filteredHabitsByDate, frequency, objectifID, habitID) => {
  if(objectifID !== null && objectifID !== undefined){
    return getObjectifHabitFromFilteredHabitsMethod(filteredHabitsByDate, frequency, objectifID, habitID)
  }

  if(habitID !== null && habitID !== undefined){
    return filteredHabitsByDate[frequency]["Habitudes"][habitID]
  }

  else return Object.values(filteredHabitsByDate[frequency]["Habitudes"]);
}

export const getUpdatedStreakOfHabit = (habit, currentDate) => {

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

  let newStreakValues = {
      currentStreak,
      lastCompletionDate,
      bestStreak
  }

  if(bestStreak === habit.bestStreak){
      delete newStreakValues[bestStreak]
  }

  return newStreakValues
}