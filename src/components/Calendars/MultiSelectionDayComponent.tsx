import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { useThemeColor } from "../Themed";
import { NormalText } from "../../styles/StyledText";
import React, { FC, memo, useContext } from "react";
import { format, lastDayOfMonth } from "date-fns";
import { DayProps } from "react-native-calendars/src/calendar/day";
import { DateData } from "react-native-calendars";
import { MarkedMultipleDateType } from "./MultipleSelectionCalendarListCustom";
import { AppContext } from "../../data/AppContext";

export interface MemoizedMultiSelectionDayComponentProps extends Omit<DayProps, 'date' | 'marking'> {
    date: DateData,
    onDayPress: (day: string) => void,
    marking: MarkedMultipleDateType,
    disablePastDays?: boolean
} 

const MemoizedMultiSelectionDayComponent: FC<MemoizedMultiSelectionDayComponentProps> = memo(({ 
    date,
    state,
    marking,
    onDayPress,
    disablePastDays 
}) => {
    const {theme} = useContext(AppContext)

    const contrast = useThemeColor(theme, "Contrast");
    const fontContrast = useThemeColor(theme, "FontContrast");
    const font = useThemeColor(theme, "Font");
    const fontGray = useThemeColor(theme, "FontGray");

    const selection = useThemeColor(theme, "Selection");

    const isToday = state === "today";
    const isSelected = marking && marking.selected
    const isFirstDaySelected = marking && marking.startingDate
    const isLastDaySelected = marking && marking.endingDate
    const isOnlyDaySelected = marking && marking.onlyDaySelected

    const today = new Date()
    
    let isDisabled = false
    if(disablePastDays) {
        isDisabled = new Date(date.dateString).setHours(0,0,0,0) < today.setHours(0,0,0,0)
    }

    const backgroundColor = isSelected ? contrast : null;
    const color = (isFirstDaySelected || isLastDaySelected) ? fontContrast : (isDisabled ? fontGray : font);

    const firstDaySelectedStyle: ViewStyle = {
        borderBottomLeftRadius: 500,
        borderTopLeftRadius: 500,
        backgroundColor: selection,
    }

    const lastDaySelectedStyle: ViewStyle = {
        borderBottomRightRadius: 500,
        borderTopRightRadius: 500,
        backgroundColor: selection,
    }

    const selectedDaySelectedStyle: ViewStyle = {
        borderRadius: 0,
        backgroundColor: selection
    }

    const firstDayAndOnlySelectedStyle: ViewStyle = {
        borderRadius: 500,
        backgroundColor: 'transparent'
    }
    
    const actualStyle = isOnlyDaySelected ? firstDayAndOnlySelectedStyle :
    (isSelected && isFirstDaySelected ? firstDayAndOnlySelectedStyle :
        isFirstDaySelected ? firstDaySelectedStyle : 
            (isLastDaySelected ? lastDaySelectedStyle : 
                isSelected ? selectedDaySelectedStyle : null))

    const isPastilleDisplayed = (isFirstDaySelected || isLastDaySelected)

    const pastilleSelectedStyle: ViewStyle = {
        backgroundColor: contrast,
        borderColor: contrast,
        borderWidth: 2
    }

    const pastilleIsTodayStyle: ViewStyle = {
        borderColor: contrast,
        borderWidth: 2,
        backgroundColor: "transparent"
    }

    const date_object = new Date(date.dateString)
    const day = date_object.getDay()

    const isFirstOfWeekAndSelected = day === 1 && (isSelected || (isFirstDaySelected || isLastDaySelected))
    const isLastDayOfWeekAndSelected = day === 0 && (isSelected || (isFirstDaySelected || isLastDaySelected))
    const isLastOfMonthAndSelected = date.dateString === format(lastDayOfMonth(date_object), 'yyyy-MM-dd') && (isSelected || (isFirstDaySelected || isLastDaySelected))
    const isFirstOfMonthAndSelected = date.dateString === format(date_object, 'yyyy-MM-01') && (isSelected || (isFirstDaySelected || isLastDaySelected))

    const additionnalStyle: ViewStyle = {
        borderBottomLeftRadius:  isFirstDaySelected ? 50 : (isFirstOfWeekAndSelected || isFirstOfMonthAndSelected) ? 10 : undefined,
        borderTopLeftRadius: isFirstDaySelected ? 50 : (isFirstOfWeekAndSelected || isFirstOfMonthAndSelected) ? 10 : undefined,
        borderBottomRightRadius: isLastDaySelected ? 50 : (isLastDayOfWeekAndSelected || isLastOfMonthAndSelected) ? 10 : undefined,
        borderTopRightRadius: isLastDaySelected ? 50 : (isLastDayOfWeekAndSelected || isLastOfMonthAndSelected) ? 10 : undefined,
    }

    return (
        <Pressable 
            disabled={isDisabled}
            onPress={() => onDayPress(date.dateString)} 
            style={[styles.dayContainer, {}]}>

            <View 
                style={[
                    styles.daySubContainer, { },
                    { backgroundColor: backgroundColor ?? 'transparent' },
                    actualStyle,
                    additionnalStyle
                ]}>
                                
                <View style={[styles.pastille, isPastilleDisplayed ? pastilleSelectedStyle : isToday ? pastilleIsTodayStyle : null]}>                
                    <NormalText text={date.day} style={{ color, fontSize: 14 }} bold />
                </View>
            </View>



        </Pressable>
    );
});

export {MemoizedMultiSelectionDayComponent}

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