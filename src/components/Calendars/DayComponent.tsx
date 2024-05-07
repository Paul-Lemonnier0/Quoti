import { Pressable, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { useThemeColor } from "../Themed";
import { NormalGrayText, NormalText } from "../../styles/StyledText";
import React, { Dispatch, FC, memo, useContext, useEffect, useRef, useState } from "react";
import { DateData } from "react-native-calendars";
import { DayProps } from "react-native-calendars/src/calendar/day";
import { AppContext } from "../../data/AppContext";
import { FrequencyTypes, Habit, HabitActivityState } from "../../types/HabitTypes";
import { isHabitScheduledForDate, numberOfDayBetweenDates } from "../../primitives/HabitudesReccurence";
import { addDays, daysInWeek, differenceInDays, format, lastDayOfMonth } from "date-fns";
import { convertToRGBA } from "react-native-reanimated";
import Tooltip from 'react-native-walkthrough-tooltip';
import StreakDayDetailsBottomScreen from "../../screens/BottomScreens/StreakDayDetailsBottomScreen";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { RatioType } from "../../screens/Habitude/HabitStreakDetailsScreen";
import { toISOStringWithoutTimeZone } from "../../primitives/BasicsMethods";
import lastDayOfISOWeek from "date-fns/esm/fp/lastDayOfISOWeek";
import { BottomScreenOpen_Impact } from "../../constants/Impacts";

export interface MemoizedDayContainerProps extends Omit<DayProps, 'date'> {
    date: DateData,
    onDayPress: (day: string) => void,
    disablePastDays?: boolean
} 

const MemoizedDayContainer: FC<MemoizedDayContainerProps> = memo(({ date, state, marking, onDayPress, disablePastDays }) => {
    const {theme} = useContext(AppContext)

    const contrast = useThemeColor(theme, "Contrast");
    const fontContrast = useThemeColor(theme, "FontContrast");
    const fontGray = useThemeColor(theme, "FontGray");
    const font = useThemeColor(theme, "Font");

    const isToday = state === "today";
    const isSelected = marking && marking.selected

    const today = new Date()

    let isDisabled = false
    if(disablePastDays) {
        isDisabled = new Date(date.dateString).setHours(0,0,0,0) < today.setHours(0,0,0,0)
    }

    const color = isSelected ? fontContrast : (isDisabled ? fontGray : font)

    const pastilleSelectedStyle = {
        backgroundColor: contrast,
        borderColor: contrast,
        borderWidth: 2
    }

    const pastilleIsTodayStyle = {
        borderColor: contrast,
        borderWidth: 2,
    }

    return (
        <Pressable 
            disabled={isDisabled}
            onPress={() => onDayPress(date.dateString)} 
            style={[styles.dayContainer, {}]}>

            <View style={[styles.daySubContainer]}>            
                <View style={[styles.pastille, isSelected ? pastilleSelectedStyle : isToday ? pastilleIsTodayStyle : null]}>                
                    <NormalText bold text={date.day} style={{ color, fontSize: 14 }}/>
                </View>
            </View>
        </Pressable>
    );
});

export interface StreakMemoizedDayContainerProps extends Omit<DayProps, 'date'> {
    date: DateData,
    habit: Habit,
} 

const StreakMemoizedDayContainer: FC<StreakMemoizedDayContainerProps> = memo(({ date, state, marking, habit }) => {
    const {theme} = useContext(AppContext)

    const missedDayColor = useThemeColor(theme, "MissedDay")
    const scheduledDayColor = useThemeColor(theme, "ScheduledDay")
    const noneDayColor = useThemeColor(theme, "NoneDay")
    const contrast = useThemeColor(theme, "Contrast")

    const colors = {
        [HabitActivityState.Missed]: missedDayColor,
        [HabitActivityState.Scheduled]: scheduledDayColor,
        [HabitActivityState.None]: noneDayColor,
        [HabitActivityState.Done]: habit.color,
    }

    const contrastLowOpacity = useThemeColor(theme, "ContrastLowOpacity");

    const isSelected = marking && marking.selected
    const isCurrentDate = marking && marking.marked
    const isToday = state === "today"

    const today = new Date();

    const isScheduleForDate = isHabitScheduledForDate(habit, new Date(date.dateString))

    let subDayStyles: ViewStyle = streakStyles.daySubContainer

    if(habit.frequency === FrequencyTypes.Hebdo) {
        const isScheduleForLastDate = isHabitScheduledForDate(habit, addDays(new Date(date.dateString), -1))
        const isScheduleForNextDate = isHabitScheduledForDate(habit, addDays(new Date(date.dateString), 1))

        let style: ViewStyle = {}
        if(isScheduleForLastDate && isScheduleForNextDate) {
            style = { marginHorizontal: -20}
        }

        subDayStyles = {...subDayStyles, ...style}

    }

    const isSameDayOrBeforeToday = new Date(date.dateString).setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0);

    const activityState = isSelected ? HabitActivityState.Done :
        ( 
            (isScheduleForDate && isSameDayOrBeforeToday) ? HabitActivityState.Missed :
            (isScheduleForDate ? HabitActivityState.Scheduled : HabitActivityState.None)
        )

    const color = colors[activityState] 

    const streakDayDetailsBottomSheet_ref = useRef<BottomSheetModal>(null)

    const handleOpenDetails = () => {
        BottomScreenOpen_Impact()
        streakDayDetailsBottomSheet_ref.current?.present()
    }

    subDayStyles = {
        ...subDayStyles,
        backgroundColor: color,
        borderColor: isCurrentDate ? contrast : (isToday ? contrastLowOpacity : "transparent"),
        borderWidth: 2
    }

    return (
        <>
            <TouchableOpacity 
                onPress={handleOpenDetails}
                style={streakStyles.dayContainer}>        
                <View style={subDayStyles}/>        
            </TouchableOpacity>

            <StreakDayDetailsBottomScreen
                bottomSheetModalRef={streakDayDetailsBottomSheet_ref}
                date={new Date(date.dateString)}
                state={activityState}
                color={habit.color}
            />
        </>
    );
});

export const StreakMemoizedWeekContainer: FC<StreakMemoizedDayContainerProps> = memo(({ date, state, marking, habit }) => {
    const {theme} = useContext(AppContext)

    const contrastLowOpacity = useThemeColor(theme, "ContrastLowOpacity");
    const font = useThemeColor(theme, "Font");

    const isSelected = marking && marking.selected
    const isCurrentDate = marking && marking.marked
    const isToday = state === "today"

    const today = new Date(toISOStringWithoutTimeZone(new Date()))

    const currentDate = new Date(date.dateString)
    const isScheduleForDate = isHabitScheduledForDate(habit, currentDate)

    let subDayStyles: ViewStyle = streakStyles.weekSubContainer
    let dayStyles: ViewStyle = styles.dayContainer

    const diffDays = differenceInDays(new Date(toISOStringWithoutTimeZone(habit.startingDate)), currentDate)

    const isStartingDayOfWeek = diffDays % 7 === 0
    const isLastDayOfWeek = diffDays % 7 === 1 || diffDays % 7 === -6

    const todayDiffDays = differenceInDays(new Date(toISOStringWithoutTimeZone(habit.startingDate)), today)

    const todayPlaceInWeek = -(todayDiffDays % 7)
    const todayWeekLastDay = addDays(today, 6 - todayPlaceInWeek)
    const todayWeekFirstDay = addDays(today, -todayPlaceInWeek)

    const isTodayWeekStart = differenceInDays(new Date(date.dateString), todayWeekFirstDay) === 0
    const isInTodayWeek = new Date(date.dateString) < todayWeekLastDay && new Date(date.dateString) > todayWeekFirstDay
    const isTodayWeekLastDay = differenceInDays(new Date(date.dateString), todayWeekLastDay) === 0
    
    if(isTodayWeekStart) {
        subDayStyles = {
            ...subDayStyles,
            borderColor: font,
            borderRightWidth: 0
        }
    }

    else if(isInTodayWeek) {
        subDayStyles = {
            ...subDayStyles,
            borderColor: font,
            borderRightWidth: 0,
            borderLeftWidth: 0
        }
    }

    else if(isTodayWeekLastDay) {
        subDayStyles = {
            ...subDayStyles,
            borderColor: font,
            borderLeftWidth: 0
        }
    }

    if(isStartingDayOfWeek) {
        dayStyles = {
            ...dayStyles,
            marginLeft: 8
        }

        subDayStyles = {
            ...subDayStyles,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
        }
    }
    
    else if(isLastDayOfWeek) {
        dayStyles = {
            ...dayStyles,
            marginRight: 8
        }

        subDayStyles = {
            ...subDayStyles,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
        }
    }

    else {
        subDayStyles = {
            ...subDayStyles,
            borderBottomWidth: 2,
            borderTopWidth: 2,
            borderLeftWidth: 0,
            borderRightWidth: 0,
        }
    }

    const isSameDayOrBeforeToday = new Date(toISOStringWithoutTimeZone(new Date(date.dateString))) <= new Date(toISOStringWithoutTimeZone(new Date())) && !isInTodayWeek && !isTodayWeekStart

    const activityState = isSelected ? HabitActivityState.Done :
        ( 
            (isScheduleForDate && isSameDayOrBeforeToday) ? HabitActivityState.Missed :
            (isScheduleForDate ? HabitActivityState.Scheduled : HabitActivityState.None)
        )

    const colors = {
        [HabitActivityState.Done]: habit.color,
        [HabitActivityState.Missed]: "#131518",
        [HabitActivityState.Scheduled]: "#26292e",
        [HabitActivityState.None]: "#212224",
    }

    const color = colors[activityState] 

    const streakDayDetailsBottomSheet_ref = useRef<BottomSheetModal>(null)

    const handleOpenDetails = () => {
      streakDayDetailsBottomSheet_ref.current?.present()
    }

    subDayStyles = {
        ...subDayStyles,
        backgroundColor: color
    }

    const date_object = new Date(date.dateString)
    const day = date_object.getDay()

    const isFirstOfCalendarWeek = day === 1
    const isLastDayOfCalendarWeek = day === 0
    const isLastOfMonth = date.dateString === format(lastDayOfMonth(date_object), 'yyyy-MM-dd')
    const isFirstOfMonth = date.dateString === format(date_object, 'yyyy-MM-01')

    if(isFirstOfCalendarWeek || isFirstOfMonth) {
        subDayStyles = {
            ...subDayStyles,
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
            borderLeftWidth: 2
        }
    }

    if(isLastDayOfCalendarWeek || isLastOfMonth) {
        subDayStyles = {
            ...subDayStyles,
            borderBottomRightRadius: 10,
            borderTopRightRadius: 10,
            borderRightWidth: 2
        }
    }

    return (
        <>
            <TouchableOpacity 
                onPress={handleOpenDetails}
                style={dayStyles}>        
                <View style={subDayStyles}/>        
            </TouchableOpacity>

            <StreakDayDetailsBottomScreen
                bottomSheetModalRef={streakDayDetailsBottomSheet_ref}
                date={new Date(date.dateString)}
                state={activityState}
                color={habit.color}
            />
        </>
    );
});

export {MemoizedDayContainer, StreakMemoizedDayContainer}

const styles = StyleSheet.create({

    dayContainer: {
      width: "100%",
    },
  
    daySubContainer: {
      aspectRatio: 1,
      borderWidth: 2,
      borderColor: 'transparent',
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent"
    },

    pastille: {
        position: "absolute",
        height: "100%", 
        width: "100%", 
        justifyContent: "center", 
        alignItems: "center",
        borderRadius: 100,
    }
});

const streakStyles = StyleSheet.create({
    dayContainer: {
        width: "100%",
        aspectRatio: 1,
        padding: 2,
        borderWidth: 2,
        borderColor: 'transparent',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent"
    },
  
    daySubContainer: {
        flex: 1,
        borderRadius: 10,
        width: "100%", // a commenter pour les weeks
        height: "100%", // a commenter pour les weeks
    },

    weekSubContainer: {
        aspectRatio: 1,
        borderWidth: 2,
        flex: 1,
        borderColor: 'transparent',
        justifyContent: "center",
        alignItems: "center",
    }
});