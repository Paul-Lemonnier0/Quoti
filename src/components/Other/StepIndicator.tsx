import { ImageStyle, StyleSheet, TextStyle, View, ViewStyle } from "react-native"
import { useThemeColor } from "../Themed"
import Animated, { AnimatedStyleProp, Easing, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated"
import { FC, useContext, useEffect } from "react"
import React from "react"
import { AppContext } from "../../data/AppContext"
import { useAnimatedFill } from "../../hooks/useAnimatedFill"

export interface StepIndicatorProps {
    totalSteps: number,
    currentStep: number,
    color?: string,
    inactiveColor?: string,
    height?: number
    customAnimDuration?: number
}

// const RenderStep = () => {
//     return(

//     )
// }

const StepIndicator: FC<StepIndicatorProps> = ({totalSteps, currentStep, color, inactiveColor, height, customAnimDuration}) => {
    const {theme} = useContext(AppContext)

    const font = useThemeColor(theme, "Font")
    const tertiary = useThemeColor(theme, "Tertiary")

    // const {rStyle, fill} = useAnimatedFill()

    const finalInactiveColor = inactiveColor ? inactiveColor : tertiary

    const highlightColor = color ?? font
    const finalHeight = height ?? 4

    // useEffect(() => {
    //     fill(customAnimDuration)
    // }, [currentStep, totalSteps])


    return(
        <View style={styles.horizontalContainer}>
            {
                Array.from({ length: totalSteps }).map((item, index) => {

                    const isJustDoneStep = index === currentStep - 1
                    const { rStyle, fill, reset } = useAnimatedFill();

                    useEffect(() => {
                        if (index === currentStep - 1) {
                            fill(customAnimDuration);
                        } 

                        else reset()
                    }, [currentStep]);

                    return(
                        <View key={index} style={[styles.singleBar, {height: finalHeight}]}>
                            <View
                                style={[
                                    styles.singleBar,
                                    {
                                        backgroundColor: index < currentStep - 1 ? highlightColor : finalInactiveColor,
                                        height: finalHeight
                                    },
                                ]}
                            />

                            {isJustDoneStep && <Animated.View style={[
                                    rStyle,
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
        display: "flex", 
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },

    singleBar: {
        borderRadius: 5,
        flex: 1
    }
})

export default StepIndicator