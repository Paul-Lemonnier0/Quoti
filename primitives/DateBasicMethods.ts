import { endOfWeek, startOfWeek } from "date-fns"

const LOCAL: Intl.LocalesArgument = "fr"

export const shortWeekStringFormat = (date: Date): string => {

    const optionsStart: Intl.DateTimeFormatOptions = { day: "numeric" }
    const optionsEnd: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" }

    const _startOfWeek = startOfWeek(date, {weekStartsOn: 1})
    const _endOfWeek = endOfWeek(date, {weekStartsOn: 1})

    return _startOfWeek.toLocaleDateString(LOCAL, optionsStart) + " - " + _endOfWeek.toLocaleDateString(LOCAL, optionsEnd)
}

export const shortDateStringFormat = (date: Date): string => {

    const dateNumber = date.getDate()
    const month = date.toLocaleDateString(LOCAL, {month: "short"})

    return dateNumber + " " + month
}

export const getMonthString = (date: Date): string => {
    return date.toLocaleDateString(LOCAL, {month: "long"})
}