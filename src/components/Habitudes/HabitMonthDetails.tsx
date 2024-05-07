import { ViewToken } from "react-native"
import { Habit, HabitActivityState } from "../../types/HabitTypes"
import React, { FC, useContext, useRef } from "react"
import { toISOStringWithoutTimeZone } from "../../primitives/BasicsMethods"
import { addDays, addMonths, differenceInDays, isFirstDayOfMonth } from "date-fns"
import { isHabitScheduledForDate } from "../../primitives/HabitudesReccurence"
import StreakDayDetailsBottomScreen from "../../screens/BottomScreens/StreakDayDetailsBottomScreen"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { BottomScreenOpen_Impact } from "../../constants/Impacts"
import { SharedValue } from "react-native-reanimated"
import { VerticalBar } from "../Stats/VerticalBar"
import { AnimatedFlatList } from "../Stats/AnimatedFlatList"
import { AppContext } from "../../data/AppContext"
import { useThemeColor } from "../Themed"
import { getFirstDayOfHabitOccurenceFromDate } from "../../primitives/HabitMethods"

interface HabitMonthDetailsProps {
    habit: Habit,
    history: Date[]
}

interface MonthBarProps {
    item: MonthData,
    viewableItems: SharedValue<ViewToken[]>
}

type MonthData = {
    firstDayOfMonth: Date,
    state: HabitActivityState,
    color: string,
    id: string
}

const RenderMonth: FC<MonthBarProps> = ({item, viewableItems}) => {

    const monthDetails = useRef<BottomSheetModal>(null)

    const onPress = () => {
        BottomScreenOpen_Impact()
        monthDetails.current?.present()
    }

    const currentMonthString = item.firstDayOfMonth.toLocaleDateString("fr", { month: "long", year: "numeric" })

    const today = new Date()
    const isTodayMonth = item.firstDayOfMonth.getMonth() === today.getMonth() && today.getFullYear() === item.firstDayOfMonth.getFullYear()
    
    return (
        <>
            <VerticalBar 
                color={item.color} 
                onPress={onPress}
                viewableItems={viewableItems} 
                text={currentMonthString}
                isSelected={isTodayMonth}
                id={item.id}
            />

            <StreakDayDetailsBottomScreen
                bottomSheetModalRef={monthDetails}
                date={item.firstDayOfMonth}
                firstDayOfMonth={item.firstDayOfMonth}
                state={item.state}
                color={item.color}
            />
        </>
    )
}

const HabitMonthDetails: FC<HabitMonthDetailsProps> = ({habit, history}) => {
    
    const {theme} = useContext(AppContext)
    const missedDayColor = useThemeColor(theme, "MissedDay")
    const scheduledDayColor = useThemeColor(theme, "ScheduledDay")
    const noneDayColor = useThemeColor(theme, "NoneDay")

    const colors = {
        [HabitActivityState.Missed]: missedDayColor,
        [HabitActivityState.Scheduled]: scheduledDayColor,
        [HabitActivityState.None]: noneDayColor,
        [HabitActivityState.Done]: habit.color,
    }

    let monthsData: MonthData[] = []

    const today = new Date()
    
    const firstDayOfStartingMonth = getFirstDayOfHabitOccurenceFromDate(habit.startingDate, habit)

    let postThresholdDate = addMonths(firstDayOfStartingMonth, 6)
    const thresholdMonth =  addMonths(firstDayOfStartingMonth, -6)

    let id = 0
    while(postThresholdDate >= thresholdMonth) {

        const monthData: MonthData = {
            firstDayOfMonth: postThresholdDate,
            state: HabitActivityState.None,
            color: "",
            id: id.toString()
        }

        if(isHabitScheduledForDate(habit, postThresholdDate)) {
            if(postThresholdDate < today) {
                monthData.state = HabitActivityState.Missed
            }

            else monthData.state = HabitActivityState.Scheduled
        }

        monthData.color = colors[monthData.state]
        monthsData.push(monthData)

        postThresholdDate = addMonths(postThresholdDate, -1)
        ++id
    }

    monthsData = monthsData.reverse()

    if(history) {
        history.forEach((date) => {
            monthsData = monthsData.map((data) => {
                if(data.firstDayOfMonth.getFullYear() === date.getFullYear() 
                        && data.firstDayOfMonth.getMonth() === date.getMonth()) {
                    return {...data,  state: HabitActivityState.Done, color: habit.color}
                }

                return {...data}
            })
        })
    }

    const todayIndex = monthsData.findIndex((data) => 
            data.firstDayOfMonth.getFullYear() === today.getFullYear() && data.firstDayOfMonth.getMonth() === today.getMonth())

    return(
        <AnimatedFlatList
            data={monthsData}
            RenderItem={RenderMonth}
            horizontal
            initialIndex={todayIndex}
            containerStyle={{marginTop: 10, marginBottom: 20}}
        />
    )
}

export default HabitMonthDetails