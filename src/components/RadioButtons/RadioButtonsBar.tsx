import { Pressable, StyleSheet, View } from "react-native"
import { NormalText } from "../../styles/StyledText"
import { useThemeColor } from "../Themed"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { Dispatch, FC, useContext } from "react"
import React from "react"
import { AppContext } from "../../data/AppContext"

export interface ItemType {
    key: string,
    text: string
}

export interface RadioButtonsBarProps {
    items: ItemType[],
    selectedItem: string,
    setSelectedItem: Dispatch<string>,
}

export const RadioButtonsBar: FC<RadioButtonsBarProps> = ({items, setSelectedItem, selectedItem}) => {
    const {theme} = useContext(AppContext)

    const secondary = useThemeColor(theme, "Secondary")  
    const contrast = useThemeColor(theme, "Contrast")  
    const fontGray = useThemeColor(theme, "FontGray")
    const fontContrast = useThemeColor(theme, "FontContrast")
   
    const LEFT_PERCENTAGE = 100 / items.length

    const indicatorTranslateX = useSharedValue(0)

    const indicatorTranslateXstyle = useAnimatedStyle(() => {
        return {
            left: `${indicatorTranslateX.value}%`
        };
      });
    

    return(
        <View style={[styles.container, {backgroundColor: secondary}]}>
            {
                items.map((item, index) => {
                    const onPress = () => {
                        setSelectedItem(item.key)
                        indicatorTranslateX.value = withTiming(index * LEFT_PERCENTAGE)
                    }

                    const isHighlight = selectedItem === item.key
                    const color = isHighlight ? fontContrast : fontGray

                    return(
                        <Pressable style={styles.itemContainer} onPress={onPress} key={item.key}>
                            <NormalText bold text={item.text} style={{color}}/>
                        </Pressable>
                    )
                })

            }

            <Animated.View style={[
                indicatorTranslateXstyle, 
                styles.animatedViewStaticStyle, 
                { backgroundColor: contrast }
            ]}
            />
        </View>                 
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        borderRadius: 20,
        backgroundColor: "red",
        flex: 1
    },

    itemContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        borderRadius: 20,
        zIndex: 5
    },

    animatedViewStaticStyle: {
        position: "absolute",
        flex: 1, 
        height: "100%", width: "50%", 
        borderRadius: 20,
    }
})