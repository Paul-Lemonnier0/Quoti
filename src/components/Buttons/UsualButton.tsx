import { StyleSheet, TouchableOpacity } from "react-native"
import { useThemeColor } from "../Themed";
import { NormalText, SubTitleText } from "../../styles/StyledText";
import React, { FC, useContext } from "react";
import { AppContext } from "../../data/AppContext";

export interface BasicButtonProps {
    onPress(): void,
    text: string,
    disabled?: boolean,
    extend?: boolean,
    bold?: boolean,
}



export interface BackgroundTextButtonProps extends BasicButtonProps {
    isTransparent?: boolean,
}

export const BorderTextButton: FC<BackgroundTextButtonProps> = ({onPress, text, isTransparent, disabled, extend, bold}) => {
    const {theme} = useContext(AppContext)

    const font = useThemeColor(theme, "Font")
    const contrast = useThemeColor(theme, "Contrast")
    const secondary = useThemeColor(theme, "Secondary")
    const disabledButtonText = useThemeColor(theme, "DisabledButtonText")

    const backgroundColor = isTransparent ? "transparent" : secondary
    const width = extend ? "100%" : null

    const color = disabled ? disabledButtonText : font
    const borderColor = disabled ? disabledButtonText : contrast

    return(
    <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.borderButton, {backgroundColor, width, borderColor}]}>
        { bold ? <SubTitleText text={text} style={{color}}/> : <NormalText text={text} style={{color}}/> }
    </TouchableOpacity>);
}



export interface BackgroundTextButtonProps extends BasicButtonProps {
    color?: string,
    bgColor?: string
}

export const BackgroundTextButton: FC<BackgroundTextButtonProps> = ({onPress, text, bgColor, color, bold, disabled, extend}) => {
    const {theme} = useContext(AppContext)

    const font = useThemeColor(theme, "Font")
    const fontContrast = useThemeColor(theme, "FontContrast")
    const contrast = useThemeColor(theme, "Contrast")


    const backgroundColor = bgColor ?? contrast
    const colorBase = color ? color : fontContrast

    const opacity = disabled ? 0.6 : 1

    const width = extend ? "100%" : null

    return(
    <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.borderButton, {opacity, backgroundColor, width, borderColor: backgroundColor}]}>
        {bold ? <SubTitleText text={text} style={{color: colorBase}}/> : <NormalText text={text} style={{color: colorBase}}/>}
    </TouchableOpacity>);
}


export interface TextButtonProps extends BasicButtonProps {
    semiBold?: boolean,
    isGray?: boolean,
    noPadding?: boolean
}

export const TextButton: FC<TextButtonProps> = ({onPress, text, bold, semiBold, disabled, extend, isGray, noPadding}) => {
    const {theme} = useContext(AppContext)

    const font = useThemeColor(theme, "Font")
    const fontGray = useThemeColor(theme, "FontGray")
    const disabledButtonText = useThemeColor(theme, "DisabledButtonText")

    const color = disabled ? disabledButtonText : (isGray ? fontGray : font)

    const padding = noPadding ? 0 : 18
    const width = extend ? "100%" : null

    return(
    <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.normalButton, {width, padding}]}>
        {bold ? <SubTitleText text={text} style={{color}}/> : <NormalText bold={semiBold} text={text} style={{color}}/>}
    </TouchableOpacity>);
}

const styles = StyleSheet.create(
    {
        borderButton: {
            borderRadius: 18,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 18,
            borderWidth: 2
        },

        normalButton: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 18,
        }
    }
)