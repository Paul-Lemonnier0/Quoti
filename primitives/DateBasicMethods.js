import { endOfWeek, startOfWeek } from "date-fns"

const LOCAL = "fr"

export const shortWeekStringFormat = (date) => {

    const optionsStart = { day: "numeric" }
    const optionsEnd = { day: "numeric", month: "short" }

    const _startOfWeek = startOfWeek(date, {weekStartsOn: 1})
    const _endOfWeek = endOfWeek(date, {weekStartsOn: 1})

    return _startOfWeek.toLocaleDateString(LOCAL, optionsStart) + " - " + _endOfWeek.toLocaleDateString(LOCAL, optionsEnd)
}

export const shortDateStringFormat = (date) => {

    const dateNumber = date.getDate()
    const month = date.toLocaleDateString(LOCAL, {month: "short"})

    return dateNumber + " " + month
}

export const getMonthString = (date) => {
    return date.toLocaleDateString(LOCAL, {month: "long"})
}