import { Pressable, StyleSheet, View } from "react-native"
import { NormalText } from "../../styles/StyledText"
import { useThemeColor } from "../Themed"
import { TouchableOpacity } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated"

export const RadioButtonsBar = ({items, setSelectedItem, selectedItem, isHighlight, handleOnClick, text, number, bold, small, disabled, isTransparent, hideInactiveBorder, extend}) => {

    const secondary = useThemeColor({}, "Secondary")  
    const contrast = useThemeColor({}, "Contrast")  
    const font = useThemeColor({}, "Font")
    const fontGray = useThemeColor({}, "FontGray")
    const fontContrast = useThemeColor({}, "FontContrast")
    const disabledButtonText = useThemeColor({}, "DisabledButtonText")
   
    const LEFT_PERCENTAGE = 100 / items.length

    const backgroundColor = isTransparent ? "transparent" : secondary 
    const color = disabled ? disabledButtonText : (isHighlight ? contrast : font)
    const borderColor =  isHighlight ? (disabled ? disabledButtonText : contrast) : (hideInactiveBorder ? secondary : fontGray)

    const paddingAndRadius = small ? 15 : 18

    const indicatorTranslateX = useSharedValue(0)

    const indicatorTranslateXstyle = useAnimatedStyle(() => {
        return {
            left: indicatorTranslateX.value + "%"
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
                    // const backgroundColor = isHighlight ? contrast : null
                    const color = isHighlight ? fontContrast : fontGray

                    return(
                        <Pressable style={styles.itemContainer} onPress={onPress} key={item.key}>
                            <NormalText bold text={item.text} style={{color}}/>
                        </Pressable>
                    )
                })

            }

            <Animated.View 
                style={[ indicatorTranslateXstyle,
                    {
                        position: "absolute",
                        flex: 1, height: "100%", width: "50%", borderRadius: 20,
                        backgroundColor: contrast,
                    }
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
    }   
})