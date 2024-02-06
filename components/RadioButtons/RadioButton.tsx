import { StyleSheet, TouchableOpacity, View } from "react-native"
import { useThemeColor } from "../Themed"
import { NormalGrayText, NormalText, SubTitleGrayText, SubTitleText } from "../../styles/StyledText"
import { Platform } from "react-native"
import { androidPadding, getHeightResponsive, getWidthResponsive } from "../../styles/UtilsStyles"
import { FC } from "react"

interface BasicRadioButtonProps {
    text: string, 
    handleOnClick(): void, 
    number?: number,
    isHighlight?: boolean, 
    bold?: boolean, 
    small?: boolean,  
    extend?: boolean, 
    disabled?: boolean,
}

export const BackgroundRadioButton: FC<BasicRadioButtonProps> = ({isHighlight, handleOnClick, text, number, bold, small, extend, disabled}) => {
   
    const secondary = useThemeColor({}, "Secondary")  
    const contrast = useThemeColor({}, "Contrast")  
    const font = useThemeColor({}, "Font")
    const fontGray = useThemeColor({}, "FontGray")
    const fontContrast = useThemeColor({}, "FontContrast")
    const disabledBackground = useThemeColor({}, "DisabledButtonBackground")
   
    const color = isHighlight ? fontContrast : (disabled ? fontGray : font)
    const backgroundColor = disabled ? (isHighlight ? disabledBackground : secondary) : (isHighlight ? contrast : secondary)

    const paddingAndRadius = small ? 15 : 18
    const normalizedPadding = {
        paddingVertical: getHeightResponsive(paddingAndRadius), 
        paddingHorizontal: getWidthResponsive(paddingAndRadius)
    }

    return(
        <TouchableOpacity disabled={disabled}
            onPress={handleOnClick} 
            style={[styles.radioButton, {borderColor: backgroundColor, backgroundColor, flex: extend ? 1 : undefined, ...normalizedPadding, borderRadius: 15}]}>

            <View style={{gap: 10, display: "flex", flexDirection: "row"}}>

               {bold ? <SubTitleText text={text} style={{color}}/> : <NormalText text={text} style={{color}}/>}
               {number !== undefined ? (bold ? <SubTitleGrayText text={number}/> : (disabled && isHighlight ? <NormalText text={number} style={{color: fontContrast}}/> : <NormalGrayText  text={number}/>)) : null}

            </View>
        </TouchableOpacity>                 
    )
}

interface BorderRadioButtonProps extends BasicRadioButtonProps {
    isTransparent?: boolean,
    hideInactiveBorder?: boolean
}

export const BorderRadioButton: FC<BorderRadioButtonProps> = ({isHighlight, handleOnClick, text, number, bold, small, extend, disabled, isTransparent, hideInactiveBorder}) => {

    const secondary = useThemeColor({}, "Secondary")  
    const contrast = useThemeColor({}, "Contrast")  
    const font = useThemeColor({}, "Font")
    const fontGray = useThemeColor({}, "FontGray")
    const fontContrast = useThemeColor({}, "FontContrast")

    const disabledButtonText = useThemeColor({}, "DisabledButtonText")
   
    const backgroundColor = isTransparent ? "transparent" : secondary 
    const color = disabled ? disabledButtonText : (isHighlight ? contrast : font)
    const borderColor =  isHighlight ? (disabled ? disabledButtonText : contrast) : (hideInactiveBorder ? secondary : fontGray)

    const paddingAndRadius = small ? 15 : 18

    const androidStyle = Platform.OS === "android" ? {...androidPadding(paddingAndRadius)} : null

    return(
        <TouchableOpacity disabled={disabled}
            onPress={handleOnClick} 
            style={[androidStyle, styles.radioButton, {borderColor, backgroundColor, flex: extend ? 1 : undefined, padding: paddingAndRadius, borderRadius: 15}]}>
                <View style={{gap: 10, display: "flex", flexDirection: "row"}}>
                    {bold ? <SubTitleText text={text} style={{color}}/> : <NormalText text={text} style={{color}}/>}
                    {number ? (bold ? <SubTitleGrayText text={number}/> : (disabled && isHighlight ? <NormalText text={number} style={{color: fontContrast}}/> : <NormalGrayText  text={number}/>)) : null}
                </View>
        </TouchableOpacity>                 
    )
}

const styles = StyleSheet.create({
    radioButton: {
        borderWidth: 2, 
        justifyContent: "center", 
        alignItems: "center",
    },
})