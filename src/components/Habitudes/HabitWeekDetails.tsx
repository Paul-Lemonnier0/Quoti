import { ViewToken } from "react-native"
import { Habit, HabitActivityState } from "../../types/HabitTypes"
import React, { FC, useContext, useRef } from "react"
import { toISOStringWithoutTimeZone } from "../../primitives/BasicsMethods"
import { addDays, addMonths, differenceInDays } from "date-fns"
import { isHabitScheduledForDate } from "../../primitives/HabitudesReccurence"
import StreakDayDetailsBottomScreen from "../../screens/BottomScreens/StreakDayDetailsBottomScreen"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { BottomScreenOpen_Impact } from "../../constants/Impacts"
import { SharedValue } from "react-native-reanimated"
import { VerticalBar } from "../Stats/VerticalBar"
import { AnimatedFlatList } from "../Stats/AnimatedFlatList"
import { useThemeColor } from "../Themed"
import { AppContext } from "../../data/AppContext"
import { getFirstDayOfHabitOccurenceFromDate } from "../../primitives/HabitMethods"

interface HabitWeekDetailsProps {
    habit: Habit,
    history: Date[]
}

interface WeekBarProps {
    item: WeekData,
    viewableItems: SharedValue<ViewToken[]>
}

type WeekData = {
    start: Date,
    end: Date,
    state: HabitActivityState,
    color: string,
    id: string
}

const RenderWeek: FC<WeekBarProps> = ({item, viewableItems}) => {

    const weekDetailsBottomSheetRef = useRef<BottomSheetModal>(null)

    const onPress = () => {
        BottomScreenOpen_Impact()
        weekDetailsBottomSheetRef.current?.present()
    }

    const currentWeekString =
        item.start.toLocaleDateString("fr", { day: "numeric" }) + " - " +
        item.end.toLocaleDateString("fr", { day: "numeric", month: "short", year: "numeric" })

    const today = new Date()
    const isTodayinWeek = today >= item.start && today <= item.end

    return (
        <>
            <VerticalBar 
                color={item.color} 
                onPress={onPress}
                viewableItems={viewableItems} 
                text={currentWeekString}
                isSelected={isTodayinWeek}
                id={item.id}
            />

            <StreakDayDetailsBottomScreen
                bottomSheetModalRef={weekDetailsBottomSheetRef}
                date={item.start}
                endDate={item.end}
                state={item.state}
                color={item.color}
                />
        </>
    )
}

const HabitWeekDetails: FC<HabitWeekDetailsProps> = ({habit, history}) => {
    
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
    
    let weeksData: WeekData[] = []

    const today = new Date()

    const firstDayOfCurrentWeek = getFirstDayOfHabitOccurenceFromDate(today, habit)
    
    let postThresholdDate = addDays(firstDayOfCurrentWeek, 7*3)

    const thresholdMonth =  addMonths(new Date(habit.startingDate), -1)
    const thresholdDate =  new Date(thresholdMonth.getFullYear(), thresholdMonth.getMonth(), 1)

    let id = 0
    while(postThresholdDate >= thresholdDate) {

        const weekStartDate = postThresholdDate
        const weekEndDate = addDays(postThresholdDate, 7)

        const weekData: WeekData = {
            start: weekStartDate,
            end: weekEndDate,
            state: HabitActivityState.None,
            id: id.toString(),
            color: ""
        }

        if(isHabitScheduledForDate(habit, weekStartDate)) {
            if(weekEndDate < today) {
                weekData.state = HabitActivityState.Missed
            }

            else weekData.state = HabitActivityState.Scheduled
        }

        weekData.color = colors[weekData.state]
        weeksData.push(weekData)

        postThresholdDate = addDays(postThresholdDate, -7)
        ++id
    }

    weeksData = weeksData.reverse()

    if(history) {
        history.forEach((date) => {
            const diffDays = differenceInDays(new Date(toISOStringWithoutTimeZone(habit.startingDate)), date)
            const firstDayOfWeek = addDays(date, diffDays % 7)
            
            weeksData = weeksData.map((data) => {
                if(toISOStringWithoutTimeZone(data.start) === toISOStringWithoutTimeZone(firstDayOfWeek)) {
                    return {...data,  state: HabitActivityState.Done, color: habit.color}
                }

                return {...data}
            })
        })
    }

    const todayIndex = weeksData.findIndex((data) => (data.start <= today && data.end >= today))

    return(
        <AnimatedFlatList
            initialIndex={todayIndex}
            data={weeksData}
            RenderItem={RenderWeek}
            horizontal
            containerStyle={{marginTop: 10, marginBottom: 20}}/>
    )
}

export default HabitWeekDetails


//TODO : faire la bordure