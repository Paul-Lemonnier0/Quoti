import { Pressable, StyleSheet, View } from "react-native";
import { useThemeColor } from "../Themed";
import { NormalText } from "../../styles/StyledText";
import React, { FC, memo } from "react";
import { DateData } from "react-native-calendars";
import { DayProps } from "react-native-calendars/src/calendar/day";

export interface MemoizedDayContainerProps extends Omit<DayProps, 'date'> {
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
                    <NormalText bold text={date.day} style={{ color, fontSize: 14 }}/>
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