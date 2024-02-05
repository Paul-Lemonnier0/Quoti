import { Pressable, StyleSheet, View } from "react-native";
import { useThemeColor } from "../Themed";
import { NormalText } from "../../styles/StyledText";
import React, { memo, useCallback } from "react";
import { BottomScreenOpen_Impact } from "../../constants/Impacts";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { format, isFirstDayOfMonth, lastDayOfMonth } from "date-fns";

const MemoizedMultiSelectionDayComponent = memo(({ date, state, marking, onDayPress }) => {

    const contrast = useThemeColor({}, "Contrast");
    const fontContrast = useThemeColor({}, "FontContrast");
    const font = useThemeColor({}, "Font");
    const selection = useThemeColor({}, "Selection");

    const isToday = state === "today";
    const isSelected = marking && marking.selected
    const isFirstDaySelected = marking && marking.startingDate
    const isLastDaySelected = marking && marking.endingDate

    const isTodayStyle = {
        borderRadius: 50,
        borderColor: contrast
    }

    const firstDaySelectedStyle = {
        borderBottomLeftRadius: 50,
        borderTopLeftRadius: 50,
        backgroundColor: selection,
    }

    const lastDaySelectedStyle = {
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: selection,
    }

    const selectedDaySelectedStyle = {
        borderRadius: 0,
        backgroundColor: selection
    }

    const firstDayAndOnlySelectedStyle = {
        borderRadius: 50,
        backgroundColor: 'transparent'
    }
    
    
    const actualStyle = 
    isSelected && isFirstDaySelected ? firstDayAndOnlySelectedStyle :
        isFirstDaySelected ? firstDaySelectedStyle : 
            (isLastDaySelected ? lastDaySelectedStyle : 
                isSelected ? selectedDaySelectedStyle : null)

    const backgroundColor = isSelected ? contrast : null;
    const color = (isFirstDaySelected || isLastDaySelected) ? fontContrast : font;

    const isPastilleDisplayed = (isFirstDaySelected || isLastDaySelected)

    const pastilleSelectedStyle = {
        backgroundColor: contrast,
        borderColor: contrast,
        borderWidth: 2
    }

    const pastilleIsTodayStyle = {
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

    const additionnalStyle = {
        borderBottomLeftRadius:  isFirstDaySelected ? 50 : (isFirstOfWeekAndSelected || isFirstOfMonthAndSelected) ? 10 : null,
        borderTopLeftRadius: isFirstDaySelected ? 50 : (isFirstOfWeekAndSelected || isFirstOfMonthAndSelected) ? 10 : null,
        borderBottomRightRadius: isLastDaySelected ? 50 : (isLastDayOfWeekAndSelected || isLastOfMonthAndSelected) ? 10 : null,
        borderTopRightRadius: isLastDaySelected ? 50 : (isLastDayOfWeekAndSelected || isLastOfMonthAndSelected) ? 10 : null,
    }

    return (
        <Pressable 
            onPress={() => onDayPress(date.dateString)} 
            style={[styles.dayContainer, {}]}>

            <View 
                style={[
                    styles.daySubContainer, { },
                    { backgroundColor },
                    actualStyle,
                    additionnalStyle
                ]}>
                                
                <View style={[styles.pastille, isPastilleDisplayed ? pastilleSelectedStyle : isToday ? pastilleIsTodayStyle : null]}>                
                    <NormalText semiBold text={date.day} style={{ color, fontSize: 14 }} bold={true} />
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