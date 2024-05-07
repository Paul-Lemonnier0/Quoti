import { View } from "react-native";
import { useThemeColor } from "../Themed";
import { LittleNormalText } from "../../styles/StyledText";
import { addDays, addMonths, differenceInDays } from "date-fns";
import { StyleSheet } from "react-native";
import { getHeightResponsive, getWidthResponsive } from "../../styles/UtilsStyles";
import { FC, useContext, useRef } from "react";
import React from "react"
import { AppContext } from "../../data/AppContext";
import { Habit, HabitActivityState } from "../../types/HabitTypes";
import { isHabitScheduledForDate } from "../../primitives/HabitudesReccurence";
import { toISOStringWithoutTimeZone } from "../../primitives/BasicsMethods";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import StreakDayDetailsBottomScreen from "../../screens/BottomScreens/StreakDayDetailsBottomScreen";
import { BottomScreenOpen_Impact } from "../../constants/Impacts";


export interface RangeActivityProps {
    start: Date,
    history: string[],
    activityColor: string,
    habit: Habit
}

const RangeActivity: FC<RangeActivityProps> = ({habit, start, history}) => {

    const daysRange: Date[] = [];
    for(let i = 0; i < 7; ++i){
        const new_date = addDays(start, -i)
        daysRange.unshift(new_date)
    }

    const history_string = history.map(hist => toISOStringWithoutTimeZone(new Date(hist)))

    const activities: RangeActivityListItem[] = daysRange.map(day => {

        const isDone = history_string.includes(toISOStringWithoutTimeZone(day));
        const isPlanned = isHabitScheduledForDate(habit, day)
        const isMissed = isPlanned && new Date(toISOStringWithoutTimeZone(new Date(day))) <= new Date(toISOStringWithoutTimeZone(new Date())) 

        const dayName = day.toLocaleDateString("fr", { weekday: 'long' }).substring(0,2);        

        const state = isDone ? HabitActivityState.Done :
                        isMissed ? HabitActivityState.Missed :
                            isPlanned ? HabitActivityState.Scheduled : HabitActivityState.None

        const activity: RangeActivityListItem = {
            activityState: state,
            date: day,
            label: dayName
        }

        return activity
    })

    return(
        <View style={styles.container}>
            <RangeActivityList activities={activities} highlightColor={habit.color}/>
        </View>
    )
}

type Week = {
    start: Date,
    end: Date
}

export const WeekRangeActivity: FC<RangeActivityProps> = ({habit, start, history}) => {

    const diffDays = differenceInDays(new Date(toISOStringWithoutTimeZone(habit.startingDate)), start)
    const firstDayOfWeek_habitStartingDateBased = addDays(start, diffDays % 7)

    const weeksRange: Week[] = [];

    for(let i = 0; i < 7; ++i){
        const newWeekStart = addDays(firstDayOfWeek_habitStartingDateBased, -(7*i))
        const newWeekEnd = addDays(newWeekStart, 7)

        weeksRange.unshift({start: newWeekStart, end: newWeekEnd})
    }

    const history_string = history.map(hist => toISOStringWithoutTimeZone(new Date(hist)))

    const activities: RangeActivityListItem[] = weeksRange.map(week => {

        const isDone =  history_string.find(stringDate => week.start <= new Date(stringDate) && week.end >= new Date(stringDate))
        const isPlanned = isHabitScheduledForDate(habit, week.start)
        const isMissed = isPlanned && new Date(toISOStringWithoutTimeZone(new Date(week.end))) <= new Date(toISOStringWithoutTimeZone(new Date())) 

        const weekLabel = week.start.getDate() + "-" +  week.end.getDate()       

        const state = isDone ? HabitActivityState.Done :
                        isMissed ? HabitActivityState.Missed :
                            isPlanned ? HabitActivityState.Scheduled : HabitActivityState.None

        const activity: RangeActivityListItem = {
            activityState: state,
            date: week.start,
            end: week.end,
            label: weekLabel
        }

        return activity
    })

    return(
        <View style={styles.container}>
            <RangeActivityList activities={activities} highlightColor={habit.color}/>
        </View>
    )
}

export const MonthRangeActivity: FC<RangeActivityProps> = ({habit, start, history}) => {

    const firstMonthsDayRange: Date[] = [];

    const firstDayOfStartMonth = new Date(start.getFullYear(), start.getMonth(), 1)

    for(let i = 0; i < 7; ++i){
        const newFirstDayMonthMonth = addMonths(firstDayOfStartMonth, -i)

        firstMonthsDayRange.unshift(newFirstDayMonthMonth)
    }

    const history_string = history.map(hist => toISOStringWithoutTimeZone(new Date(hist)))

    const activities: RangeActivityListItem[] = firstMonthsDayRange.map(firstDayOfMonth => {

        const isDone =  history_string.find(stringDate => 
            firstDayOfMonth.getFullYear() === new Date(stringDate).getFullYear() 
            && firstDayOfMonth.getMonth() === new Date(stringDate).getMonth())

        const isPlanned = isHabitScheduledForDate(habit, firstDayOfMonth)

        const lastDayOfMonth =  new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth(), 0)
        const isMissed = isPlanned && new Date(toISOStringWithoutTimeZone(lastDayOfMonth)) <= new Date(toISOStringWithoutTimeZone(new Date())) 

        const monthLabel = firstDayOfMonth.toLocaleDateString("fr", {month: "short"})    

        const state = isDone ? HabitActivityState.Done :
                        isMissed ? HabitActivityState.Missed :
                            isPlanned ? HabitActivityState.Scheduled : HabitActivityState.None

        const activity: RangeActivityListItem = {
            activityState: state,
            date: firstDayOfMonth,
            firstDayOfMonth: firstDayOfMonth,
            label: monthLabel
        }

        return activity
    })

    return(
        <View style={styles.container}>
            <RangeActivityList activities={activities} highlightColor={habit.color}/>
        </View>
    )
}

interface RangeActivityListItem {
    activityState: HabitActivityState,
    date: Date,
    label: string,
    end?: Date,
    firstDayOfMonth?: Date
}

interface RangeActivityListProps {
    activities: RangeActivityListItem[],
    highlightColor: string
}

const RangeActivityList: FC<RangeActivityListProps> = ({activities, highlightColor}) => {

    const {theme} = useContext(AppContext)
    const contrast = useThemeColor(theme, "Contrast");
    const contrastLowOpacity = useThemeColor(theme, "ContrastLowOpacity");

    const missedDayColor = useThemeColor(theme, "MissedDay")
    const scheduledDayColor = useThemeColor(theme, "ScheduledDay")
    const noneDayColor = useThemeColor(theme, "NoneDay")

    const colors = {
        [HabitActivityState.Missed]: missedDayColor,
        [HabitActivityState.Scheduled]: scheduledDayColor,
        [HabitActivityState.None]: noneDayColor,
        [HabitActivityState.Done]: highlightColor,
    }

    const streakDayDetails_bottomSheetRef = useRef<BottomSheetModal>(null)
    const handleOpenStreakDayDetails = () => {
        BottomScreenOpen_Impact()
        streakDayDetails_bottomSheetRef.current?.present()
    }
    
    const today = toISOStringWithoutTimeZone(new Date())

    return(
        <View style={styles.container}>
            {
                activities.map((day, index) => {
                    const color = colors[day.activityState]
                    
                    const isToday = today === toISOStringWithoutTimeZone(day.date)

                    const borderColor = index === activities.length - 1 ? contrast : (isToday ? contrastLowOpacity : "transparent")
                    return (
                        <View key={index} style={styles.subContainer}>
                            <TouchableOpacity onPress={handleOpenStreakDayDetails} style={[styles.day, {backgroundColor: color, borderColor, borderWidth: 2}]}/>
                            <View style={styles.center}>
                                <LittleNormalText bold text={day.label}/>
                            </View>

                            <StreakDayDetailsBottomScreen
                                bottomSheetModalRef={streakDayDetails_bottomSheetRef}
                                date={day.date}
                                endDate={day.end}
                                state={day.activityState}
                                color={highlightColor}
                            />
                        </View>
                    )
                })
            }     
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex", 
        flexDirection: "row", 
        flex: 1, 
        justifyContent: "space-between", 
        alignItems: "flex-end"
    },

    subContainer: {
        display: "flex",
        flexDirection: "column",
        flex: 1, gap: getHeightResponsive(10)
    },

    center: {
        justifyContent: "center",
        alignItems: "center"
    },

    day: {
        marginHorizontal: 8,
        aspectRatio: 1, 
        flex: 1,
        paddingVertical: getHeightResponsive(10), 
        borderRadius: getWidthResponsive(10)
    },
})

export default RangeActivity