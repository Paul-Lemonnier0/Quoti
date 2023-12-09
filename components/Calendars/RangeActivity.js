import { View } from "react-native";
import { useThemeColor } from "../Themed";
import { LittleNormalText } from "../../styles/StyledText";
import { addDays } from "date-fns";
import { StyleSheet } from "react-native";


export default RangeActivity = ({start, end, activity, activityColor, steps}) => {
    console.log("Activity : ", activity)
    const secondary = useThemeColor({}, "Secondary")

    const history = [];
    for(let i = 0; i < 7; ++i){
        const new_date = addDays(start, -i)
        history.unshift(new_date)
    }

    const dayWithLogs = Object.keys(activity)
    const totalSteps = Object.keys(steps).length

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
        gap: 15, 
        flex: 1, 
        justifyContent: "space-between", 
        alignItems: "flex-end"
    },

    subContainer: {
        display: "flex",
        flexDirection: "column",
        flex: 1, gap: 10
    },

    center: {
        justifyContent: "center",
        alignItems: "center"
    },

    day: {
        aspectRatio: 1, 
        flex: 1,
        paddingVertical: 10, 
        borderRadius: 10
    },
})