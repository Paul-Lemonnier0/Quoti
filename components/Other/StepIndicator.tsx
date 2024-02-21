import { ImageStyle, StyleSheet, TextStyle, View, ViewStyle } from "react-native"
import { useThemeColor } from "../Themed"
import Animated, { AnimatedStyleProp, SharedValue, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from "react-native-reanimated"
import { FC, useEffect } from "react"

interface StepIndicatorProps {
    totalSteps: number,
    currentStep: number,
    color?: string,
    inactiveColor?: string,
    height?: number
}


const StepIndicator: FC<StepIndicatorProps> = ({totalSteps, currentStep, color, inactiveColor, height}) => {

    const font = useThemeColor({}, "Font")
    const tertiary = useThemeColor({}, "Tertiary")

    const finalInactiveColor = inactiveColor ? inactiveColor : tertiary

    const highlightColor = color ?? font
    const finalHeight = height ? height : 4

    const justDoneStepWidth = useSharedValue(0)

    const justDoneStepWidthString = useDerivedValue(() => {
        return justDoneStepWidth.value.toString() + "%";
    });


    const justDoneStepWidthAnimatedStyle = useAnimatedStyle(() => {
        return {
            width: justDoneStepWidthString
        }
    })

    return(
        <View style={styles.horizontalContainer}>
            {

                Array.from({ length: totalSteps }).map((item, index) => {

                    const isJustDoneStep = index === currentStep -1
                    if(isJustDoneStep){
                        justDoneStepWidth.value = withTiming(100, {duration: 400})
                    }

                    return(
                        <View key={index} style={[styles.singleBar, {height: finalHeight}]}>
                            <Animated.View
                                style={[
                                    styles.singleBar,
                                    {
                                        backgroundColor: index < currentStep -1 ? highlightColor : finalInactiveColor,
                                        height: finalHeight
                                    },
                                ]}
                            />

                            {isJustDoneStep && <Animated.View style={[
                                    styles.singleBar,
                                    {
                                        position: "absolute",
                                        backgroundColor: highlightColor,
                                        height: finalHeight
                                    },
                                    justDoneStepWidthAnimatedStyle
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