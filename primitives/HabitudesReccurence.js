const startingDate = new Date()

function calculReccurenceHabitude(habit, currentDate) {
    switch (habit.frequency){
        case "Quotidien":
            return isHabitPlannedThisDay(habit.startingDate, currentDate, habit.reccurence)

        case "Hebdo":
            return isHabitPlannedThisWeek(habit.startingDate, currentDate, habit.reccurence)

        case "Mensuel":
            return isHabitPlannedThisMonth(habit.startingDate, currentDate, habit.reccurence)
    }
}


const isHabitPlannedThisDay = (date, currentDate, reccurence) => {
    return numberOfWeekBetweenDates(date, currentDate) % reccurence === 0
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
    
    console.log("Week number of " + date +
        " is :   " + weekNumber);
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



export {weekNumber, numberOfWeekBetweenDates, isHabitPlannedThisMonth, calculReccurenceHabitude}