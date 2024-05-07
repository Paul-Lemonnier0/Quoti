import { FC, useContext } from "react"
import { StyleSheet, View } from "react-native"
import { TouchableOpacity, ViewToken } from "react-native"
import Animated, { SharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated"
import { NormalText } from "../../styles/StyledText"
import React from "react"
import { AppContext } from "../../data/AppContext"
import { useThemeColor } from "../Themed"

export const VERTICAL_BAR_WIDTH = 75

interface VerticalBarProps {
    width?: number
    color: string,
    text?: string,
    id?: string,
    viewableItems: SharedValue<ViewToken[]>,
    onPress?: () => void,
    isSelected?: boolean
}

export const VerticalBar: FC<VerticalBarProps> = ({
    width,
    color,
    text,
    id,
    viewableItems,
    onPress,
    isSelected
}) => {
    
    const {theme} = useContext(AppContext)
    const contrast = useThemeColor(theme, "Contrast")

    const rStyle = useAnimatedStyle(() => {
        const isVisible = id ? viewableItems.value.some((viewableItem) => viewableItem.item.id === id && viewableItem.isViewable) : true;

        return {
            transform: [{
                scale: withTiming(isVisible ? 1 : 0.9) 
            }]
        }
    }, [])

    return(
        <Animated.View style={[rStyle, {height: "100%", paddingHorizontal: 5}]}>
            <TouchableOpacity onPress={onPress} style={[
                styles.weekbar, 
                {
                    backgroundColor: color, 
                    borderColor: isSelected ? contrast : color,
                    width: width ?? VERTICAL_BAR_WIDTH
                }]}>
                <View style={styles.weekString}>
                    {text && <NormalText bold text={text}/>}
                </View>
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    weekbar: {
        borderRadius: 25,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        minHeight: 500,
        flexDirection: "column-reverse", 
        alignItems: "center",
        flex: 1,
        borderWidth: 2,
        // marginHorizontal: 5
    },

    yearContainer: {
        position: "absolute",
        top: 0,
        width: 300,
        height: 50,
        marginLeft: 2
    },

    weekString: {
        transform: [{rotate: '-90deg'}],
        marginBottom: (250 / 2) + 15,
        width: 250,
    }
})