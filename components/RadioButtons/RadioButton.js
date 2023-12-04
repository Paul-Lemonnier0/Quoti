import { StyleSheet, TouchableOpacity, View } from "react-native"
import { useThemeColor } from "../Themed"
import { NormalGrayText, NormalText, SubTitleGrayText, SubTitleText } from "../../styles/StyledText"

export const BackgroundRadioButton = ({isHighlight, handleOnClick, text, number, bold, small, extend, disabled}) => {
   
    const secondary = useThemeColor({}, "Secondary")  
    const contrast = useThemeColor({}, "Contrast")  
    const font = useThemeColor({}, "Font")
    const fontGray = useThemeColor({}, "FontGray")
    const fontContrast = useThemeColor({}, "FontContrast")
    const disabledBackground = useThemeColor({}, "DisabledButtonBackground")
   
    const color = isHighlight ? fontContrast : (disabled ? fontGray : font)
    const backgroundColor = disabled ? (isHighlight ? disabledBackground : secondary) : (isHighlight ? contrast : secondary)

    const paddingAndRadius = small ? 15 : 18

    return(
        <TouchableOpacity disabled={disabled}
            onPress={handleOnClick} 
            style={[styles.radioButton, {borderColor: backgroundColor, backgroundColor, flex: extend ? 1 : null, padding: paddingAndRadius, borderRadius: 15}]}>

            <View style={{gap: 10, display: "flex", flexDirection: "row"}}>

               {bold ? <SubTitleText text={text} style={{color}}/> : <NormalText text={text} style={{color}}/>}
               {number !== undefined ? (bold ? <SubTitleGrayText text={number}/> : (disabled && isHighlight ? <NormalText text={number} style={{color: fontContrast}}/> : <NormalGrayText  text={number}/>)) : null}

            </View>
        </TouchableOpacity>                 
    )
}

export const BorderRadioButton = ({isHighlight, handleOnClick, text, number, bold, small, disabled, isTransparent, hideInactiveBorder, extend}) => {

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

    return(
        <TouchableOpacity disabled={disabled}
            onPress={handleOnClick} 
            style={[styles.radioButton, {borderColor, backgroundColor, flex: extend ? 1 : null, padding: paddingAndRadius, borderRadius: 15}]}>
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