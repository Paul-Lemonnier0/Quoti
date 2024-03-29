import { StyleSheet, TouchableOpacity } from "react-native"
import { SubTitleText } from "../../styles/StyledText"
import { useThemeColor } from "../Themed"
import { Feather } from "@expo/vector-icons"
import { getHeightResponsive, getWidthResponsive } from "../../styles/UtilsStyles"
import { FC } from "react"
import React from "react"

export interface CustomCheckBoxProps {
    onPress?: () => void,
    color: string,
    number: number,
    isChecked: boolean | undefined,
    isBorderHidden: boolean | undefined,
    disabled: boolean | undefined,
    noPress: boolean | undefined,
    isPrimary?: boolean,
    borderPrimary?: boolean
}

const CustomCheckBox: FC<CustomCheckBoxProps> = ({
    color, 
    number, 
    isChecked, 
    isBorderHidden, 
    onPress, 
    disabled, 
    noPress, 
    isPrimary, 
    borderPrimary
}) => {

    const secondary = useThemeColor({}, "Secondary")
    const primary = useThemeColor({}, "Primary")
    const borderWidth = 2
    const borderColor = isBorderHidden ? (borderPrimary ? primary : secondary) : color

    return(
        <TouchableOpacity onPress={onPress} disabled={noPress || disabled}
            style={[styles.stepCheckBox,
            { 
                backgroundColor: isPrimary ? primary :secondary,
                borderColor, 
                borderWidth
            }]}>

            {isChecked ? <Feather name="check" size={20} color={color}/> :  <SubTitleText text={number}/>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    stepCheckBox: {
        borderRadius: getWidthResponsive(15),
        aspectRatio: 1/1,
        alignItems:"center", 
        justifyContent: "center",
        height: getHeightResponsive(50)
    },
})

export default CustomCheckBox