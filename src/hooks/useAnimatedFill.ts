import { Easing, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated"

export const useAnimatedFill = () => {
    const width = useSharedValue(0)

    const timingConfig = {
        duration: 500
    }

    const fill = () => {
        width.value = withTiming(100, timingConfig)
    }

    const fillPercentage = useDerivedValue(() => {
        return width.value + "%"
    }, [])

    const rStyle = useAnimatedStyle(() => {
        return {width: fillPercentage.value as any} 
    }, [])

    return {fill, fillPercentage, rStyle}
}