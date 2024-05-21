import * as Progress from "react-native-progress";
import { useThemeColor } from "../Themed";
import { View, ViewStyle } from "react-native";
import { NormalText } from "../../styles/StyledText";
import { StyleSheet } from "react-native";
import { FC, useContext, useEffect, useState } from "react";
import React from "react"
import { AppContext } from "../../data/AppContext";
import { LinearGradient } from "expo-linear-gradient";

export interface ProgressBarProps {
    progress: number,
    color?: string,
    inactiveColor?: string,
    withPourcentage?: boolean
}

const ProgressBar: FC<ProgressBarProps> = ({progress, color, inactiveColor, withPourcentage}) => {
    const {theme} = useContext(AppContext)

    const font = useThemeColor(theme, "Font")
    const tertiary = useThemeColor(theme, "Tertiary")

    const [progressValue, setProgressValue] = useState<number>(0)

    useEffect(() => {
        setProgressValue(progress)
    }, [progress])
    
    const unfilledColor = inactiveColor ?? tertiary
    const finalColor = color ?? font

    const pourcentage = Math.round(progressValue*100)
    
    if(withPourcentage){
        return(
            <View style={styles.progressBarContainer}>
                <View style={{flex: 1}}>
                    <Progress.Bar animated animationType={"timing"} progress={progressValue} color={finalColor} unfilledColor={unfilledColor} 
                        width={null} borderWidth={0} height={3}/>
                </View>

                <NormalText text={pourcentage + "%"} bold/>
            </View>
        )
    }
    return(
        <Progress.Bar progress={progressValue} color={finalColor} width={null} borderWidth={0} height={3} unfilledColor={unfilledColor}/>
    )
}

interface CustomHabitStatProgressBarProps {
    total: number,
    skipped: number,
    done: number,
    color: string,
}

interface StripedBackgroundProps {
    style: ViewStyle
}

const StripedBackground: FC<StripedBackgroundProps> = ({style}) => {
    const {theme} = useContext(AppContext)
    const contrast = useThemeColor(theme, "Contrast")
    const secondary = useThemeColor(theme, "Secondary")

    const stripes = Array(15).fill(0)

    return (
      <View style={[style, styles.customStatSingleBar, {backgroundColor: secondary, overflow: "hidden",
            
      }]}>
        {/* {
            stripes.map((_, index) => (
                <View style={[styles.stripe, {
                        backgroundColor: index % 2 !== 0 ? contrast : secondary,
                        transform: [{rotate: "45deg"}]
                    }]} 
                />
            )) 
        } */}
        {/* <LinearGradient colors={[linearGradientOpacityStart, linearGradientOpacityEnd]} style={styles.linearGradient}/> */}
      </View>
    );
  };

export const CustomHabitStatProgressBar: FC<CustomHabitStatProgressBarProps> = ({total, skipped, done, color}) => {
    const {theme} = useContext(AppContext)
    const contrast = useThemeColor(theme, "Contrast")
    const secondary = useThemeColor(theme, "Secondary")
    const fontGray = useThemeColor(theme, "FontGray")

    const doneRatio = done*100/total
    const skippedRatio = skipped*100/total
    const missedRatio = 100 - (doneRatio + skippedRatio)

    return(
        <View style={{flexDirection: "row", width: "100%", gap: 5}}>
            {
                doneRatio > 0 && 
                <View style={[{backgroundColor: color, borderColor: color, flex: doneRatio/100}, styles.customStatSingleBar]}/>
            }
            {
                skippedRatio > 0 && 
                <View style={[{backgroundColor: secondary, borderColor: color, flex: skippedRatio/100}, styles.customStatSingleBar]}/>
            }
            {
                missedRatio > 0 && 
                <View style={[{backgroundColor: secondary, borderColor: fontGray, flex: missedRatio/100}, styles.customStatSingleBar]}/>
            }
        </View>
    )
}

export const ProgressPie: FC<ProgressBarProps> = ({progress, color, inactiveColor, withPourcentage}) => {
    const {theme} = useContext(AppContext)

    const font = useThemeColor(theme, "Font")
    const primary = useThemeColor(theme, "Primary")
    
    const unfilledColor = inactiveColor ?? primary
    const finalColor = color ?? font

    const final_progress = progress ?? 0
    const pourcentage = Math.round(final_progress*100)

    return(
        <Progress.Circle progress={final_progress} color={finalColor} size={undefined} borderWidth={0} unfilledColor={unfilledColor}/>
    )
}

const styles = StyleSheet.create({
    progressBarContainer: {
        display: "flex", 
        flexDirection: "row", 
        alignItems: "center", 
        gap: 15
    },

    customStatSingleBar: {
        borderRadius: 15,
        height: 10,
        borderWidth: 2
    },

    stripe: {
        flex: 1,
    },
})

export default ProgressBar