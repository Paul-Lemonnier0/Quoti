import { View } from "react-native";
import { useThemeColor } from "../Themed";
import { LittleNormalText } from "../../styles/StyledText";
import { addDays } from "date-fns";
import { StyleSheet } from "react-native";
import { getHeightResponsive, getWidthResponsive } from "../../styles/UtilsStyles";
import { FC, useContext } from "react";
import React from "react"
import { AppContext } from "../../data/AppContext";


export interface RangeActivityProps {
    start: Date,
    activity: {[key: string]: string[]}
    activityColor: string,
    totalSteps: number
}

const RangeActivity: FC<RangeActivityProps> = ({start, activity, activityColor, totalSteps}) => {
    const {theme} = useContext(AppContext)

    const secondary = useThemeColor(theme, "Secondary")

    const history: Date[] = [];
    for(let i = 0; i < 7; ++i){
        const new_date = addDays(start, -i)
        history.unshift(new_date)
    }

    const dayWithLogs = Object.keys(activity)

    return(
        <View style={styles.container}>
        {
            history.map((day, index) => {
                const stringDay = day.toString()
                const isDone = dayWithLogs.includes(stringDay) && activity[stringDay].length === totalSteps;
                const dayName = day.toLocaleDateString("fr", { weekday: 'long' }).substring(0,2);        
                const backgroundColor = isDone ? activityColor : secondary
                
                return(
                    <View key={index} style={styles.subContainer}>
                        <View style={[styles.day, {backgroundColor}]}/>
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