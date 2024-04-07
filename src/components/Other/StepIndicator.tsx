import { ImageStyle, StyleSheet, TextStyle, View, ViewStyle } from "react-native"
import { useThemeColor } from "../Themed"
import Animated, { AnimatedStyleProp, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { FC, useContext } from "react"
import React from "react"
import { AppContext } from "../../data/AppContext"

export interface StepIndicatorProps {
    totalSteps: number,
    currentStep: number,
    color?: string,
    inactiveColor?: string,
    height?: number
}

const StepIndicator: FC<StepIndicatorProps> = ({totalSteps, currentStep, color, inactiveColor, height}) => {
    const {theme} = useContext(AppContext)

    const font = useThemeColor(theme, "Font")
    const tertiary = useThemeColor(theme, "Tertiary")

    const finalInactiveColor = inactiveColor ? inactiveColor : tertiary

    const highlightColor = color ?? font
    const finalHeight = height ? height : 4

    return(
        <View style={styles.horizontalContainer}>
            {

                Array.from({ length: totalSteps }).map((item, index) => {

                    const isJustDoneStep = index === currentStep - 1

                    return(
                        <View key={index} style={[styles.singleBar, {height: finalHeight}]}>
                            <View
                                style={[
                                    styles.singleBar,
                                    {
                                        backgroundColor: index < currentStep ? highlightColor : finalInactiveColor,
                                        height: finalHeight
                                    },
                                ]}
                            />

                            {isJustDoneStep && <View style={[
                                    styles.singleBar,
                                    {
                                        position: "absolute",
                                        backgroundColor: highlightColor,
                                        height: finalHeight
                                    },
                                ]}
                            />}
                        </View>

                    )
                })

            }
        </View>
    )
}


const styles = StyleSheet.create({
    horizontalContainer: {
        display: "flex", flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },

    singleBar: {
        borderRadius: 5,
        flex: 1
    }
})

export default StepIndicator