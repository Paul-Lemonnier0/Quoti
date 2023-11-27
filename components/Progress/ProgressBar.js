import * as Progress from "react-native-progress";
import { useThemeColor } from "../Themed";
import { View } from "react-native";
import { LittleNormalText, NormalText } from "../../styles/StyledText";
import { StyleSheet } from "react-native";

export default ProgressBar = ({progress, color, inactiveColor, withPourcentage}) => {

    const font = useThemeColor({}, "Font")
    const fontGray = useThemeColor({}, "FontGray")
    const tertiary = useThemeColor({}, "Tertiary")
    const unfilledColor = inactiveColor ? tertiary : tertiary
    const finalColor = color ? color : font

    const final_progress = progress === undefined || progress === null || isNaN(progress) ? 1 : progress
    const pourcentage = Math.round(final_progress*100)
    
    if(withPourcentage){
        return(
            <View style={styles.progressBarContainer}>
                <View style={{flex: 1}}>
                    <Progress.Bar progress={final_progress} color={finalColor} unfilledColor={unfilledColor} 
                        width={null} borderWidth={0} height={3}/>
                </View>

                <NormalText text={pourcentage + "%"} bold/>
            </View>
        )
    }
    return(
        <Progress.Bar progress={final_progress} color={color ? color : font} width={null} borderWidth={0} unfilledColor={unfilledColor} height={3}/>
    )
}

const styles = StyleSheet.create({
    progressBarContainer: {
        display: "flex", 
        flexDirection: "row", 
        alignItems: "center", 
        gap: 15
    }
})