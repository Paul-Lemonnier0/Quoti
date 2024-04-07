import { Feather } from "@expo/vector-icons"
import { View } from "react-native"
import { useThemeColor } from "../Themed"
import { NormalGrayText, NormalText } from "../../styles/StyledText"
import { TouchableOpacity } from "react-native-gesture-handler"
import { StyleSheet } from "react-native"
import { TextInput } from "react-native"
import { IconButton, IconProvider } from "./IconButtons"
import React, { FC, useContext } from "react"
import { AppContext } from "../../data/AppContext"

export interface BasicProps {
    value: number,
    setValue(value: number): void,
    isBorderHidden?: boolean,
    suffixe?: string,
    customBackgroundColor?: string
}

export const IncrementButtons: FC<BasicProps> = ({value, setValue, isBorderHidden, suffixe, customBackgroundColor}) => {
    const {theme} = useContext(AppContext)

    const font = useThemeColor(theme, "Font")
    const secondary = useThemeColor(theme, "Secondary")

    const displayedValue = suffixe ? value + " " + suffixe : value

    const handleIncrement = () => { if(value < 99) setValue(++value) }
    const handleDecrement = () => { if(value > 1) setValue(--value) }

    return(
        <View style={[styles.container, {backgroundColor: customBackgroundColor ?? secondary, borderColor: isBorderHidden ? secondary : font}]}>
            <IconButton noPadding onPress={handleDecrement} provider={IconProvider.Feather} name={"minus"} size={24}/>

            <View style={[styles.valueContainer]}>
                <NormalText text={displayedValue}/>
            </View>

            <IconButton noPadding onPress={handleIncrement} provider={IconProvider.Feather} name={"plus"} size={24}/>
        </View>
    )
}


export interface IncrementTimeProps extends BasicProps{
    isDisabled?: boolean,
    isMinutes?: boolean
}

export const IncrementTime: FC<IncrementTimeProps> = ({value, setValue, isDisabled, isMinutes, isBorderHidden, customBackgroundColor}) => {
    const {theme} = useContext(AppContext)

    const font = useThemeColor(theme, "Font")
    const secondary = useThemeColor(theme, "Secondary")

    const suffixe = isMinutes ? " min": " h"

    const handleIncrement = () => {
        isMinutes ? setValue((value + 5) % 60) : setValue((value + 1) % 24)
    }

    const handleDecrement = () => {
        isMinutes ? setValue((value - 5) < 0 ? 55 : (value - 5)) : setValue(value-1 < 0 ? 23 : value-1)
    }

    return(
        <View style={[styles.container, {backgroundColor: customBackgroundColor ?? secondary, borderColor: isBorderHidden ? secondary : font}]}>
            <IconButton noPadding onPress={handleDecrement} provider={IconProvider.Feather} name={"minus"} size={20}/>

            <View style={[styles.valueContainer]}>
                {isDisabled ? <NormalGrayText text={value + suffixe}/> : <NormalText text={value + suffixe}/>}
            </View>

            <IconButton noPadding onPress={handleIncrement} provider={IconProvider.Feather} name={"plus"} size={20}/>
        </View>
    )
}

const styles = StyleSheet.create({
    valueContainer: {
        textAlign: "center",
        paddingVertical: 15
    },

    container: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        justifyContent: "space-between", 
        gap: 10, 
        paddingHorizontal: 15,
        borderRadius: 15, 
        borderWidth: 2,
        flex: 1
    },

})