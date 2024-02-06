import { Pressable, StyleSheet, View } from "react-native";
import { useThemeColor } from "../Themed";
import { NormalText } from "../../styles/StyledText";
import React, { FC, memo, useCallback } from "react";
import { BottomScreenOpen_Impact } from "../../constants/Impacts";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { format, isFirstDayOfMonth, lastDayOfMonth } from "date-fns";
import { DateData } from "react-native-calendars";
import { DayState } from "react-native-calendars/src/types";
import { MarkingProps } from "react-native-calendars/src/calendar/day/marking";
import { DayProps } from "react-native-calendars/src/calendar/day";
import { BasicDayProps } from "react-native-calendars/src/calendar/day/basic";


  

interface MemoizedDayContainerProps extends Omit<DayProps, 'date'> {
    date: DateData,
    onDayPress: (day: string) => void
} 

const MemoizedDayContainer: FC<MemoizedDayContainerProps> = memo(({ date, state, marking, onDayPress }) => {

    const contrast = useThemeColor({}, "Contrast");
    const fontContrast = useThemeColor({}, "FontContrast");
    const font = useThemeColor({}, "Font");
    const selection = useThemeColor({}, "Selection");

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
                    <NormalText semiBold text={date.day} style={{ color, fontSize: 14 }} bold={true} />
                </View>
            </View>
        </Pressable>
    );
});

export {MemoizedDayContainer}

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