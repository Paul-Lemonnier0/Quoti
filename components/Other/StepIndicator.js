import { StyleSheet, View } from "react-native"
import { useThemeColor } from "../Themed"
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated"
import { useEffect } from "react"

export default StepIndicator = ({totalSteps, currentStep, color, inactiveColor, height}) => {

    const font = useThemeColor({}, "Font")
    const tertiary = useThemeColor({}, "Tertiary")

    const finalInactiveColor = inactiveColor ? inactiveColor : tertiary

    const highlightColor = color ? color : font
    const finalHeight = height ? height : 5

    return(
        <View style={styles.horizontalContainer}>
            {

                Array.from({ length: totalSteps }).map((item, index) => {
                    return(
                        <View
                            key={index}
                            style={[
                                styles.singleBar,
                                {
                                    backgroundColor: index < currentStep ? highlightColor : finalInactiveColor,
                                    height: finalHeight
                                },
                            ]}
                        />

                    )
                })

            }
        </View>
    )
}

export const VerticalStepIndicator = ({totalSteps, currentStep, color, inactiveColor, width}) => {

    const font = useThemeColor({}, "Font")
    const tertiary = useThemeColor({}, "Tertiary")

    const finalInactiveColor = inactiveColor ? inactiveColor : tertiary

    const highlightColor = color ? color : font
    const finalWidth = width ? width : 5

    return(
        <View style={styles.verticalContainer}>
            {

                Array.from({ length: totalSteps }).map((item, index) => {
                    return(
                        <View
                            key={index}
                            style={[
                                styles.singleBar,
                                {
                                    backgroundColor: index < currentStep ? highlightColor : finalInactiveColor,
                                    width: finalWidth
                                },
                            ]}
                        />

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

    verticalContainer: {
        display: "flex", flexDirection: "column",
        justifyContent: "space-between",
        gap: 4,
    },

    singleBar: {
        borderRadius: 5,
        flex: 1
    }
})