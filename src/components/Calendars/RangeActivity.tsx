import { View } from "react-native";
import { useThemeColor } from "../Themed";
import { LittleNormalText } from "../../styles/StyledText";
import { addDays } from "date-fns";
import { StyleSheet } from "react-native";
import { getHeightResponsive, getWidthResponsive } from "../../styles/UtilsStyles";
import { FC, useContext } from "react";
import React from "react"
import { AppContext } from "../../data/AppContext";
import { Habit } from "../../types/HabitTypes";
import { isHabitScheduledForDate } from "../../primitives/HabitudesReccurence";
import { toISOStringWithoutTimeZone } from "../../primitives/BasicsMethods";


export interface RangeActivityProps {
    start: Date,
    history: string[],
    activityColor: string,
    habit: Habit
}

const RangeActivity: FC<RangeActivityProps> = ({habit, start, history, activityColor}) => {
    const {theme} = useContext(AppContext)
    const secondaryLowOpacity = useThemeColor(theme, "SecondaryLowOpacity");
    const popup = useThemeColor(theme, "Popup");
    const contrast = useThemeColor(theme, "Contrast");
    const contrastLowOpacity = useThemeColor(theme, "ContrastLowOpacity");

    const daysRange: Date[] = [];
    for(let i = 0; i < 7; ++i){
        const new_date = addDays(start, -i)
        daysRange.unshift(new_date)
    }

    const today = new Date().setHours(0,0,0,0)
    const history_string = history.map(hist => toISOStringWithoutTimeZone(new Date(hist)))

    return(
        <View style={styles.container}>
        {
            daysRange.map((day, index) => {
                const isDone = history_string.includes(toISOStringWithoutTimeZone(day));
                const dayName = day.toLocaleDateString("fr", { weekday: 'long' }).substring(0,2);        
                const isStart = toISOStringWithoutTimeZone(day) === toISOStringWithoutTimeZone(start)  
                
                const day_temp = new Date(day)
                const isToday = day_temp.setHours(0,0,0,0) === today
                
                const isPlanned = isHabitScheduledForDate(habit, day)

                const backgroundColor = isDone ? activityColor : isPlanned ? popup : secondaryLowOpacity
                const borderColor = isStart ? contrast : (isToday ? contrastLowOpacity : "transparent")

                return(
                    <View key={index} style={styles.subContainer}>
                        <View style={[styles.day, {backgroundColor, borderColor, borderWidth: 2}]}/>
                        <View style={styles.center}>
                            <LittleNormalText bold text={dayName}/>
                        </View>
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
        gap: getWidthResponsive(15), 
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
        aspectRatio: 1, 
        flex: 1,
        paddingVertical: getHeightResponsive(10), 
        borderRadius: getWidthResponsive(10)
    },
})

export default RangeActivity