import { Pressable, StyleSheet, View } from "react-native";
import { useThemeColor } from "../Themed";
import { NormalText } from "../../styles/StyledText";
import React, { FC, memo, useContext } from "react";
import { DateData } from "react-native-calendars";
import { DayProps } from "react-native-calendars/src/calendar/day";
import { AppContext } from "../../data/AppContext";
import { Habit } from "../../types/HabitTypes";
import { isHabitScheduledForDate } from "../../primitives/HabitudesReccurence";

export interface MemoizedDayContainerProps extends Omit<DayProps, 'date'> {
    date: DateData,
    onDayPress: (day: string) => void
} 

export interface StreakMemoizedDayContainerProps extends Omit<DayProps, 'date'> {
    date: DateData,
    habit: Habit
} 

const MemoizedDayContainer: FC<MemoizedDayContainerProps> = memo(({ date, state, marking, onDayPress }) => {
    const {theme} = useContext(AppContext)

    const contrast = useThemeColor(theme, "Contrast");
    const fontContrast = useThemeColor(theme, "FontContrast");
    const font = useThemeColor(theme, "Font");

    const isToday = state === "today";
    const isSelected = marking && marking.selected

    const color = isSelected ? fontContrast : font

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

const StreakMemoizedDayContainer: FC<StreakMemoizedDayContainerProps> = memo(({ date, state, marking, habit }) => {
    const {theme} = useContext(AppContext)

    const contrast = useThemeColor(theme, "Contrast");
    const secondary = useThemeColor(theme, "Secondary");
    const secondaryLowOpacity = useThemeColor(theme, "SecondaryLowOpacity");
    const popup = useThemeColor(theme, "Popup");
    const contrastLowOpacity = useThemeColor(theme, "ContrastLowOpacity");

    const isSelected = marking && marking.selected
    const isCurrentDate = marking && marking.marked
    const isToday = state === "today"

    const today = new Date();

    const isScheduleForDate = isHabitScheduledForDate(habit, new Date(date.dateString))
    const isSameDayOrBeforeToday = new Date(date.dateString).setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0);

    const color = isSelected ? habit.color : ((isScheduleForDate && isSameDayOrBeforeToday) ? popup : secondaryLowOpacity)

    return (
            <View style={[streakStyles.dayContainer]}>        
                <View style={[streakStyles.daySubContainer, {
                    backgroundColor: color,
                    borderColor: isCurrentDate ? "white" : (isToday ? contrastLowOpacity : "transparent"),
                    borderWidth: 2}]}/>        
            </View>
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
        height: "100%", 
        width: "100%", 
        borderRadius: 10,
    }
});