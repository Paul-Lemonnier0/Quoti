import { differenceInDays, startOfWeek } from "date-fns"
import { Habit } from "../types/HabitTypes"
import { GlobalFirestoreHabit, GlobalHabit, UserFirestoreHabit } from "../types/FirestoreTypes/FirestoreHabitTypes"

function isHabitScheduledForDate(habit: Habit, currentDate: Date): boolean { 
    const completedDateTemp = new Date(currentDate)  
    const habitStartingDate = new Date(habit.startingDate)  

    if(habitStartingDate.setHours(0,0,0,0) > completedDateTemp.setHours(0,0,0,0)) return false

    

    if(habitStartingDate.getFullYear() === completedDateTemp.getFullYear()
        && habitStartingDate.getMonth() === completedDateTemp.getMonth()
        && habitStartingDate.getDate() === completedDateTemp.getDate()
        && habit.daysOfWeek.length === 0)
    { return true }

    switch (habit.frequency){
        case "Quotidien":
            return isHabitPlannedThisDay(habit.daysOfWeek, habitStartingDate, habit.reccurence, completedDateTemp)

        case "Hebdo":
            if(startOfWeek(habitStartingDate, {weekStartsOn: 1}).setHours(0,0,0,0) > completedDateTemp.setHours(0,0,0,0)) return false
            return isHabitPlannedThisWeek(habitStartingDate, completedDateTemp, habit.reccurence)

        case "Mensuel":
            if(getFirstDayOfMonth(habitStartingDate).setHours(0,0,0,0) > completedDateTemp.setHours(0,0,0,0)) return false
            return isHabitPlannedThisMonth(habitStartingDate, completedDateTemp, habit.reccurence)
    }

    return false
}

const isHabitPlannedThisWeek = (date: Date, currentDate: Date, reccurence: number): boolean => {
    return numberOfWeekBetweenDates(date, currentDate) % reccurence === 0
}

const isHabitPlannedThisMonth = (date: Date, currentDate: Date, reccurence: number): boolean => {
    return numberOfMonthBetweenDates(date, currentDate) % reccurence === 0
}

const isHabitPlannedThisDay = (daysOfActivity: number[], startingDate: Date, reccurence: number, date: Date): boolean => {

    const dayNumberInWeek = date.getDay() === 0 ? 6 : date.getDay() - 1

    if(daysOfActivity.length === 0){
        return reccurence === 1 || (numberOfDayBetweenDates(startingDate, date) % reccurence == 0);
    }

    return daysOfActivity.includes(dayNumberInWeek)
}

export const numberOfDayBetweenDates = (date1: Date, date2: Date): number => {
    const differenceInMs = Math.abs(date1.getTime() - date2.getTime());

    return Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
}

const numberOfWeekBetweenDates = (date1: Date, date2: Date): number => {
    const differenceEnJours = differenceInDays(date1, date2)
    const nombreSemaines = Math.floor(Math.abs(differenceEnJours) / 7);

    return nombreSemaines
}   

const numberOfMonthBetweenDates = (date1: Date, date2: Date): number => {
    return Math.abs(date2.getFullYear() - date1.getFullYear()) * 12 + Math.abs(date2.getMonth() - date1.getMonth());    
}

const getNextDayInDaysOfActivity = (day: number, daysOfActivity: number[]): number => {
    for(let i = 0; i<daysOfActivity.length; ++i){
        if(daysOfActivity[i] > day) {
            return daysOfActivity[i]
        }
    }

    return daysOfActivity[0]
}

const getFirstDayOfMonth = (date: Date): Date => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDayOfMonth
}

export const calculateNextScheduledDate = (habit: Habit | GlobalHabit | GlobalFirestoreHabit, startingDate: Date): Date => {
    let nextScheduledDate = startingDate;

    switch (habit.frequency) {
        case "Quotidien":      
            const daysOfActivity = habit.daysOfWeek
            if(daysOfActivity.length === 0){
                nextScheduledDate.setDate(nextScheduledDate.getDate() + habit.reccurence);
            }

            else {
                const dayNumberInWeek = startingDate.getDay() === 0 ? 6 : startingDate.getDay() - 1

                const nextDayIndex = getNextDayInDaysOfActivity(dayNumberInWeek, daysOfActivity)
                const dayToGoToNextDay = (7 - dayNumberInWeek + nextDayIndex) % 7

                nextScheduledDate.setDate(nextScheduledDate.getDate() + dayToGoToNextDay);
            }

        break;

        case "Hebdo":
            
            nextScheduledDate.setDate(nextScheduledDate.getDate() + (7 * habit.reccurence));
            break;

        case "Mensuel":
            nextScheduledDate = getFirstDayOfMonth(nextScheduledDate)
            nextScheduledDate.setMonth(nextScheduledDate.getMonth() + habit.reccurence);
            break;
  }

  return nextScheduledDate;
}



export {numberOfWeekBetweenDates, isHabitPlannedThisMonth, isHabitScheduledForDate}