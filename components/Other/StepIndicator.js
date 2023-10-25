import { StyleSheet, View } from "react-native"
import { useThemeColor } from "../Themed"
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated"
import { useEffect } from "react"

export default StepIndicator = ({totalSteps, currentStep, color, animated}) => {

    const font = useThemeColor({}, "Font")
    const tertiary = useThemeColor({}, "Tertiary")

    const highlightColor = color ? color : font

    return(
        <View style={styles.container}>
            {

                Array.from({ length: totalSteps }).map((item, index) => {
                    return(
                        <View
                            key={index}
                            style={[
                                styles.singleBar,
                                {
                                    backgroundColor: index < currentStep ? highlightColor : tertiary,
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

    container: {
        display: "flex", flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },

    singleBar: {
        height: 5,
        borderRadius: 5,
        flex: 1
    }
})