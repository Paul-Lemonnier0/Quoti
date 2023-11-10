import { StyleSheet, TouchableOpacity } from "react-native"
import { useThemeColor } from "../Themed";
import { NormalText, SubTitleText } from "../../styles/StyledText";

export const BorderTextButton = ({onPress, text, isTransparent, disabled, extend, bold}) => {
    
    const font = useThemeColor({}, "Font")
    const contrast = useThemeColor({}, "Contrast")
    const secondary = useThemeColor({}, "Secondary")
    const disabledButtonText = useThemeColor({}, "DisabledButtonText")

    const backgroundColor = isTransparent ? "transparent" : secondary
    const width = extend ? "100%" : null

    const color = disabled ? disabledButtonText : font
    const borderColor = disabled ? disabledButtonText : contrast

    return(
    <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.borderButton, {backgroundColor, width, borderColor}]}>
        { bold ? <SubTitleText text={text} style={{color}}/> : <NormalText text={text} style={{color}}/> }
    </TouchableOpacity>);
}

export const BackgroundTextButton = ({onPress, text, color, bold, disabled, extend}) => {
    
    const font = useThemeColor({}, "Font")
    const fontContrast = useThemeColor({}, "FontContrast")
    const contrast = useThemeColor({}, "Contrast")
    const disabledBackground = useThemeColor({}, "DisabledButtonBackground")

    const backgroundColor = disabled ? disabledBackground : contrast
    const colorBase = color ? color : fontContrast

    const width = extend ? "100%" : null

    return(
    <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.borderButton, {backgroundColor, width, borderColor: backgroundColor}]}>
        {bold ? <SubTitleText text={text} style={{color: colorBase}}/> : <NormalText text={text} style={{color: colorBase}}/>}
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
    }
)