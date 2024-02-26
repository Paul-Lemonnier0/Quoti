import * as Progress from "react-native-progress";
import { useThemeColor } from "../Themed";
import { View } from "react-native";
import { NormalText } from "../../styles/StyledText";
import { StyleSheet } from "react-native";
import { FC } from "react";

interface ProgressBarProps {
    progress: number,
    color?: string,
    inactiveColor?: string,
    withPourcentage?: boolean
}

const ProgressBar: FC<ProgressBarProps> = ({progress, color, inactiveColor, withPourcentage}) => {

    const font = useThemeColor({}, "Font")
    const primary = useThemeColor({}, "Primary")
    
    const unfilledColor = inactiveColor ?? primary
    const finalColor = color ?? font

    const final_progress = progress ?? 1
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

export default ProgressBar