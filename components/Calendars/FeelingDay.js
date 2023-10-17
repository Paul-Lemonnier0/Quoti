import { Image, StyleSheet, View } from "react-native"
import { StepCircularBar } from "../Habitudes/StepCircularBar"
import { NormalText, SubText } from "../../styles/StyledText"
import { useThemeColor } from "../Themed"
import { TouchableOpacity } from "react-native-gesture-handler"

export const FeelingDay = ({feelingDay, onPress}) => {

    let {habit} = feelingDay
    habit.doneSteps = feelingDay.doneSteps

    const today = new Date()

    let isToday = false
    if (feelingDay.date.getDate() === today.getDate() && feelingDay.date.getMonth() === today.getMonth() && feelingDay.date.getFullYear() === today.getFullYear())    
    {
        isToday = true
    }

    const dayNumber = feelingDay.date.getDate() + " " + feelingDay.date.toLocaleString("fr", {month: "short"})
    const secondary = useThemeColor({}, "Secondary")
    const font = useThemeColor({}, "Font")
    const fontGray = useThemeColor({}, "FontGray")

    console.log(feelingDay.id)

    const isDone = Math.floor(Math.random() * 2);
    console.log(isDone)
    habit.color = isDone === 0 ? secondary : habit.color

    return(
        <TouchableOpacity onPress={onPress} style={[styles.container]}>            

                <StepCircularBar habit={{...habit, color: isDone === 0 ? habit.color : habit.color}} otherImage={feelingDay.image} secondaryInactiveColor={true}/>
                <Image/>

                <SubText text={dayNumber} style={{fontFamily: "poppinsSemiBold", color: isToday ? font : fontGray}}/>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex", 
        flexDirection:"column", 
        justifyContent: "space-between", 
        alignItems: "center", 
        gap: 5, 
        borderRadius: 32, 
        paddingHorizontal: 7.5,
        paddingTop: 10,
    }
})