import { isFirstDayOfMonth, startOfWeek } from "date-fns"

function isHabitScheduledForDate(habit, currentDate) {
    if(habit.startingDate > currentDate) return false

    if(habit.startingDate.getFullYear() === currentDate.getFullYear()
        && habit.startingDate.getMonth() === currentDate.getMonth()
        && habit.startingDate.getDate() === currentDate.getDate())
    { return true }

    switch (habit.frequency){
        case "Quotidien":
            return isHabitPlannedThisDay(habit.daysOfWeek, habit.startingDate, habit.reccurence, currentDate)

        case "Hebdo":
            if(startOfWeek(habit.startingDate, {weekStartsOn: 1}) > currentDate) return false
            return isHabitPlannedThisWeek(habit.startingDate, currentDate, habit.reccurence)

        case "Mensuel":
            if(isFirstDayOfMonth(habit.startingDate) > currentDate) return false
            return isHabitPlannedThisMonth(habit.startingDate, currentDate, habit.reccurence)
    }
}

const isHabitPlannedThisWeek = (date, currentDate, reccurence) => {

    return numberOfWeekBetweenDates(date, currentDate) % reccurence === 0
}

const isHabitPlannedThisMonth = (date, currentDate, reccurence) => {

    return numberOfMonthBetweenDates(date, currentDate) % reccurence === 0
}

const weekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    
    var days = Math.floor((date - firstDayOfYear) /
    (24 * 60 * 60 * 1000));
 
    var weekNumber = Math.ceil(days / 7);
    
    console.log("Week number of " + date + " is :   " + weekNumber);
}

const isHabitPlannedThisDay = (daysOfActivity, startingDate, reccurence, date) => {

    let dayNumberInWeek = date.getDay() === 0 ? 6 : date.getDay() - 1

    if(daysOfActivity.length === 0){
        return reccurence === 1 || (numberOfDayBetweenDates(startingDate, date) % reccurence == 0);
    }

    return daysOfActivity.includes(dayNumberInWeek)
}

const numberOfDayBetweenDates = (date1, date2) => {
    return differenceEnJours = Math.abs((date1 - date2) / (1000 * 60 * 60 * 24));
}

const numberOfWeekBetweenDates = (date1, date2) => {
    const differenceEnJours = numberOfDayBetweenDates(date1, date2)
    const nombreSemaines = Math.floor(differenceEnJours / 7);

    return nombreSemaines
}   

const numberOfMonthBetweenDates = (date1, date2) => {
    return Math.abs(date2.getFullYear() - date1.getFullYear()) * 12 + Math.abs(date2.getMonth() - date1.getMonth());    
}



export {weekNumber, numberOfWeekBetweenDates, isHabitPlannedThisMonth, isHabitScheduledForDate}