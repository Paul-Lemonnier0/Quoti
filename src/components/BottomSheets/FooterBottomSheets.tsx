import { View, ViewStyle } from "react-native"
import Separator from "../Other/Separator"
import { TextButton } from "../Buttons/UsualButton"
import { StyleSheet } from "react-native"
import React, { Dispatch, FC, useContext, useEffect } from "react"
import { useThemeColor } from "../Themed"
import { AppContext } from "../../data/AppContext"
import { BottomSheetFooter, BottomSheetFooterProps } from "@gorhom/bottom-sheet"
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated"
import { hexToRGB } from "../../primitives/BasicsMethods"
import { useAnimatedShake } from "../../hooks/useAnimatedShake"
import { Error_Impact } from "../../constants/Impacts"

interface CustomFooterComponentProps {
    props: BottomSheetFooterProps,
    footerMethod: () => void,
    checkError?: () => boolean,
    footerText: string,
    isPrimary?: boolean
}

export const CustomFooterComponent: FC<CustomFooterComponentProps> = ({
    footerMethod, 
    footerText, 
    checkError,
    isPrimary,
    props
}) => {
    
    const {theme} = useContext(AppContext)
    const tertiary = useThemeColor(theme, "Tertiary")
    const primary = useThemeColor(theme, "Primary")

    const {shake, rStyle} = useAnimatedShake()

    const onPress = () => {
      if(checkError && checkError()) {
        Error_Impact()
        shake()
      }

      else footerMethod()
    }

    const backgroundColor = isPrimary ? primary : tertiary

    return(
        <BottomSheetFooter {...props} bottomInset={0} style={{borderTopColor: tertiary, borderTopWidth: 2}}>
            <View style={[styles.footer, {backgroundColor, paddingBottom: 25, paddingTop: 5}]}>
                <Animated.View style={[rStyle]}>
                    <TextButton bold extend onPress={onPress} text={footerText}/>
                </Animated.View>
            </View>
        </BottomSheetFooter>
    )
}

const styles = StyleSheet.create({
    footer: {
        justifyContent: "center", 
        alignItems: "center"
    }
})