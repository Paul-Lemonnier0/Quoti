import { forwardRef, useImperativeHandle, useState } from "react"
import { useThemeColor } from "../Themed"
import { TextInput, View } from "react-native"
import { StyleSheet } from "react-native";
import { NormalText, SubText, SubTitleText } from "../../styles/StyledText";
import { IconButton } from "../Buttons/IconButtons";

export const TextInputCustom = forwardRef(({ startingValue, labelName, boldLabel, onFocus, disabled, onBlur, isWrong, errorMessage, ...props }, ref) => {

    const [isFieldFocus, setIsFieldFocus] = useState(false)

    const contrast = useThemeColor({}, "Contrast") 
    const secondary = useThemeColor({}, "Secondary") 
    const font = useThemeColor({}, "Font") 
    const fontGray = useThemeColor({}, "FontGray") 
    const errorColor = useThemeColor({}, "Error") 
    const inputDisabledBackground = useThemeColor({}, "InputDisabledBackground") 

    const backgroundColor = disabled ? inputDisabledBackground : secondary
    const borderColor = disabled ? inputDisabledBackground : isFieldFocus ? contrast : (isWrong ? errorColor : "transparent")

    const [value, setValue] = useState(startingValue ? startingValue : "");

    useImperativeHandle(ref, () => ({
        getValue: () => value,
    }));



    return(
        <View style={styles.container}>
            {boldLabel ? <SubTitleText text={labelName}/> : <NormalText text={labelName}/>}
            <View style={[styles.textInputContainer, {borderColor, backgroundColor, color: font}]}>
                <TextInput {...props} editable={!disabled} placeholderTextColor={fontGray} selectionColor={font}
                    value={value} onChangeText={setValue} autoCorrect={false}
                    
                    onFocus={() => {setIsFieldFocus(true); onFocus && onFocus()}}
                    onBlur={() => {setIsFieldFocus(false); onBlur && onBlur()}}

                    style={[styles.textInput, {paddingRight: isWrong ? 0 : 18, color: font}]}
                />

                {isWrong && <IconButton onPress={() => {}} provider={"Feather"} name={"x-circle"} color={errorColor} noPadding/>}
            </View>

            <SubText text={errorMessage} style={{color: isWrong ? errorColor : "transparent"}}/>
        </View>
    )
})

export const PasswordInputCustom = forwardRef(({ startingValue, labelName, onFocus, disabled, onBlur, isWrong, errorMessage, ...props }, ref) => {

    const [isFieldFocus, setIsFieldFocus] = useState(false)

    const contrast = useThemeColor({}, "Contrast") 
    const secondary = useThemeColor({}, "Secondary") 
    const font = useThemeColor({}, "Font") 
    const fontGray = useThemeColor({}, "FontGray") 
    const errorColor = useThemeColor({}, "Error") 
    const inputDisabledBackground = useThemeColor({}, "InputDisabledBackground") 

    const backgroundColor = disabled ? inputDisabledBackground : secondary
    const borderColor = disabled ? inputDisabledBackground : isFieldFocus ? contrast : (isWrong ? errorColor : "transparent")

    const [value, setValue] = useState(startingValue ? startingValue : "");

    useImperativeHandle(ref, () => ({
        getValue: () => value,
    }));

    const togglePasswordVisibility = () => {
        setIsPasswordHidden(!isPasswordHidden);
    };

    const handlePasswordChange = (text) => {
        setValue(text);
    };

    const [isPasswordHidden, setIsPasswordHidden] = useState(true)

    return(
        <View style={styles.container}>
            <NormalText text={labelName}/>
            <View style={[styles.textInputContainer, {borderColor, backgroundColor, color: font}]}>
                <TextInput {...props} value={value} onChangeText={handlePasswordChange}
                    secureTextEntry={isPasswordHidden} 
                    editable={!disabled} 
                    placeholderTextColor={fontGray} 
                    selectionColor={font}
                    autoCorrect={false}
                    onFocus={() => {setIsFieldFocus(true); onFocus && onFocus()}}
                    onBlur={() => {setIsFieldFocus(false); onBlur && onBlur()}}
                    style={[styles.textInput, {paddingRight: 0, color: font}]}
                />

                <IconButton onPress={togglePasswordVisibility} provider={"Feather"} name={isPasswordHidden ? "eye" : "eye-off"} noPadding/>
            </View>            
    
            <SubText text={errorMessage} style={{color: isWrong ? errorColor : "transparent"}}/>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {    
        display: 'flex', 
        flexDirection: "column", 
        gap: 10,
        width: "100%",
        marginVertical: 0,   
    },

    textInput: {
        flex: 1,
        fontSize: 14, 
        padding: 18, 
        borderRadius: 18, 
        fontFamily: "fontLight", 
    },

    textInputContainer: {
        display: "flex",
        flexDirection: "row",
        borderWidth: 2,
        borderRadius: 18, 
    }
})
