import { displayTree } from "./BasicsMethods";
import { isHabitPlannedThisMonth, isHabitScheduledForDate } from "./HabitudesReccurence";
import { getStepLog } from "./StepMethods";

export const filterHabits = async (date, habits, alreadySeenHabitsScheduledForDay, alreadyFetchedStepLogs, setIsFetchingHabit) => {
    setIsFetchingHabit(true)

    if (!alreadySeenHabitsScheduledForDay.hasOwnProperty(date)) 
      alreadySeenHabitsScheduledForDay[date] = [];
  
    const habitsScheduledForDate = { 
        Quotidien: {Habitudes: {}, Objectifs: {}}, 
        Hebdo: {Habitudes: {}, Objectifs: {}}, 
        Mensuel: {Habitudes: {}, Objectifs: {}} 
    };
  
    const habitsID = Object.keys(habits)
    await Promise.all(habitsID.map(async(habitID) => {
        const habit = habits[habitID];
        const habitNotInObjectif = !habit.objectifID
    
        if(alreadySeenHabitsScheduledForDay[date].includes(habitID) || isHabitScheduledForDate(habit, date)){
            alreadySeenHabitsScheduledForDay[date].push(habitID);

            const habitWithStepsLogs = await getHabitWithStepsLogs(habit, date, alreadyFetchedStepLogs);

            if(habitNotInObjectif){
                habitsScheduledForDate[habit.frequency]["Habitudes"][habitID] = habitWithStepsLogs;
            }

            else {
              if (!habitsScheduledForDate[habit.frequency]["Objectifs"][habit.objectifID]) {
                  habitsScheduledForDate[habit.frequency]["Objectifs"][habit.objectifID] = {};
              }

              habitsScheduledForDate[habit.frequency]["Objectifs"][habit.objectifID][habitID] = habitWithStepsLogs;
          }
        }
      })
    );

    setIsFetchingHabit(false)

    return habitsScheduledForDate;
};

export const getHabitType = (habit) => {
  const isObjective = habit.objectifID !== undefined && habit.objectifID !== null
  const habitType = isObjective ? "Objectifs" : "Habitudes";

  return habitType
}

export const getHabitWithStepsLogs = async (habit, date, alreadyFetchedStepLogs) => {
  
  const stepsID = Object.keys(habit.steps)
  const stepsWithLogsPromises = stepsID.map(async(stepID) => {
    const isChecked = await getStepLog(date, stepID, alreadyFetchedStepLogs);

    const step = habit.steps[stepID];
    return { [stepID]: { ...step, isChecked } };
  });

  const stepsWithLogsArray = await Promise.all(stepsWithLogsPromises);
  const stepsWithLogs = Object.assign({}, ...stepsWithLogsArray);

  return { ...habit, steps: stepsWithLogs };
};


export const removeHabitFromHabits = (Habits, habitID) => {
  console.log(Object.keys(Habits).length)
  const habits = {...Habits}
  delete habits[habitID]
  console.log(Object.keys(habits).length)

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

export const updateFilteredHabitsWithNewHabit = (previousFilteredHabits, newHabit, currentDate) => {

  const habitType = getHabitType(newHabit)
  const frequency = newHabit.frequency
  const habitID = newHabit.habitID
  const objectifID = newHabit.objectifID

  if(isHabitScheduledForDate(newHabit, currentDate)){
    if(habitType === "Habitudes"){
      return {
        ...previousFilteredHabits,
        [frequency]: {
          ...previousFilteredHabits[frequency],
          [habitType]: {
            ...previousFilteredHabits[frequency][habitType],
            [habitID]: newHabit
          }
        }
      }
    }

    return {
      ...previousFilteredHabits,
      [frequency]: {
        ...previousFilteredHabits[frequency],
        [habitType]: {
          ...previousFilteredHabits[frequency][habitType],
          [objectifID]: {
            ...previousFilteredHabits[frequency][habitType][objectifID],
            [habitID]: newHabit
          }
        }
      }
    }
  }

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