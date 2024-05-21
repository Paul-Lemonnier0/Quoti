import { Easing, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated"

export const useAnimatedFill = () => {
    const width = useSharedValue(0)

    const reset = () => {
        width.value = 0
    }

    const fill = (customTiming?: number) => {
        width.value = withTiming(100, {duration: customTiming ?? 500, easing: Easing.linear})
    }

    const fillPercentage = useDerivedValue(() => {
        return width.value + "%"
    }, [])

    const rStyle = useAnimatedStyle(() => {
        return {width: fillPercentage.value as any} 
    }, [])

    return {fill, fillPercentage, reset, rStyle}
}