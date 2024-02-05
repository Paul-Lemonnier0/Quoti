import { forwardRef, useImperativeHandle, useState } from "react"
import { useThemeColor } from "../Themed"
import { TextInput, View } from "react-native"
import { StyleSheet } from "react-native";
import { NormalText, SubText, SubTitleText } from "../../styles/StyledText";
import { Icon, IconButton } from "../Buttons/IconButtons";
import { fontPixel, getHeightResponsive, getWidthResponsive } from "../../styles/UtilsStyles";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

export const TextInputCustom = forwardRef(({ startingValue, labelName, boldLabel, semiBold, onFocus, disabled, onBlur, isWrong, errorMessage, ...props }, ref) => {

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
            {labelName !== undefined ? 
                <View style={{marginLeft: 5}}>
                    {boldLabel ? <SubTitleText text={labelName}/> : 
                        <NormalText bold={semiBold} text={labelName}/>}
                </View>
            : null}
            
            <View style={[styles.textInputContainer, {borderColor, backgroundColor, color: font}]}>
                <TextInput {...props} editable={!disabled} placeholderTextColor={fontGray} selectionColor={font}
                    value={value} onChangeText={setValue} autoCorrect={false}
                    
                    onFocus={() => {setIsFieldFocus(true); onFocus && onFocus()}}
                    onBlur={() => {setIsFieldFocus(false); onBlur && onBlur()}}

                    style={[styles.textInput, {paddingRight: isWrong ? 0 : getWidthResponsive(18), color: font,}]}
                />

                {isWrong && <IconButton onPress={() => {}} provider={"Feather"} name={"x-circle"} color={errorColor} noPadding/>}
            </View>

            {errorMessage && <SubText text={errorMessage} style={{color: isWrong ? errorColor : "transparent"}}/>}
        </View>
    )
})

export const BottomTextInputCustom = forwardRef(({ startingValue, labelName, boldLabel, semiBold, onFocus, disabled, onBlur, isWrong, errorMessage, ...props }, ref) => {

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
            {labelName !== undefined ? 
                <View style={{marginLeft: 5}}>
                    {boldLabel ? <SubTitleText text={labelName}/> : 
                        <NormalText bold={semiBold} text={labelName}/>}
                </View>
            : null}
            
            <View style={[styles.textInputContainer, {borderColor, backgroundColor, color: font}]}>
                {/* <BottomSheetTextInput {...props} editable={!disabled} placeholderTextColor={fontGray} selectionColor={font}
                    value={value} onChangeText={setValue} autoCorrect={false}
                    
                    onFocus={() => {setIsFieldFocus(true); onFocus && onFocus()}}
                    onBlur={() => {setIsFieldFocus(false); onBlur && onBlur()}}

                    style={[styles.textInput, {paddingRight: isWrong ? 0 : getWidthResponsive(18), color: font,}]}
                /> */}

                <BottomSheetTextInput
                    {...props} editable={!disabled} placeholderTextColor={fontGray} selectionColor={font}
                    value={value} onChangeText={setValue} autoCorrect={false}
                    
                    onFocus={() => {setIsFieldFocus(true); onFocus && onFocus()}}
                    onBlur={() => {setIsFieldFocus(false); onBlur && onBlur()}}

                    style={[styles.textInput, {paddingRight: isWrong ? 0 : getWidthResponsive(18), color: font,}]}
                />

                {isWrong && <IconButton onPress={() => {}} provider={"Feather"} name={"x-circle"} color={errorColor} noPadding/>}
            </View>

            {errorMessage && <SubText text={errorMessage} style={{color: isWrong ? errorColor : "transparent"}}/>}
        </View>
    )
})


export const PasswordInputCustom = forwardRef(({ startingValue, labelName, boldLabel, semiBoldLabel, onFocus, disabled, onBlur, isWrong, errorMessage, ...props }, ref) => {

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

    const [isPasswordHidden, setIsPasswordHidden] = useState(false)

    return(
        <View style={styles.container}>

            {labelName !== undefined ? 
                <View style={{marginLeft: 50}}>
                    {boldLabel ? <SubTitleText text={labelName}/> : 
                        <NormalText bold={semiBold} text={labelName}/>}
                </View> 
            : null}

            <View style={[styles.textInputContainer, {borderColor, backgroundColor, color: font}]}>
                <TextInput {...props} value={value} onChangeText={handlePasswordChange}
                    secureTextEntry={!isPasswordHidden} 
                    editable={!disabled}
                    placeholderTextColor={fontGray} 
                    selectionColor={font}
                    autoCorrect={false}
                    onFocus={() => {setIsFieldFocus(true); onFocus && onFocus()}}
                    onBlur={() => {setIsFieldFocus(false); onBlur && onBlur()}}
                    style={[styles.textInput, {paddingRight: 0, color: font}]}
                />

                <IconButton onPress={togglePasswordVisibility} provider={"Feather"} name={isPasswordHidden ? "eye" : "eye-off"}/>
            </View>            
    
            {errorMessage && <SubText text={errorMessage} style={{color: isWrong ? errorColor : "transparent"}}/>}
        </View>
    )
})


export const SearchBarCustom = forwardRef(({ onChangeText, startingValue, labelName, boldLabel, onFocus, disabled, onBlur, ...props }, ref) => {

    const [isFieldFocus, setIsFieldFocus] = useState(false)

    const contrast = useThemeColor({}, "Contrast") 
    const secondary = useThemeColor({}, "Secondary") 
    const font = useThemeColor({}, "Font") 
    const fontGray = useThemeColor({}, "FontGray") 
    const errorColor = useThemeColor({}, "Error") 
    const inputDisabledBackground = useThemeColor({}, "InputDisabledBackground") 

    const backgroundColor = disabled ? inputDisabledBackground : secondary
    const borderColor = disabled ? inputDisabledBackground : isFieldFocus ? contrast : "transparent"

    const [value, setValue] = useState(startingValue ? startingValue : "");

    useImperativeHandle(ref, () => ({
        getValue: () => value,
    }));

    const handleChangeText = (text) => {
        onChangeText(text)
        setValue(text)
    }


    return(
        <View style={styles.container}>
            {labelName !== undefined ? (boldLabel ? <SubTitleText text={labelName}/> : <NormalText text={labelName}/>) : null}
            <View style={[styles.searchInputContainer, {borderColor, backgroundColor, color: font}]}>

                <Icon name={"search"} provider={"Feather"} size={20} color={fontGray}/>

                <TextInput {...props} editable={!disabled} placeholderTextColor={fontGray} selectionColor={font}
                    value={value} onChangeText={handleChangeText} autoCorrect={false}
                    
                    onFocus={() => {setIsFieldFocus(true); onFocus && onFocus()}}
                    onBlur={() => {setIsFieldFocus(false); onBlur && onBlur()}}

                    style={[styles.textInput, {paddingRight: 18, color: font}]}
                />
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {    
        display: 'flex', 
        flexDirection: "column", 
        gap: getHeightResponsive(10),
        width: "100%",
        marginVertical: 0,   
    },

    textInput: {
        flex: 1,
        fontSize: fontPixel(16), 
        paddingHorizontal: getWidthResponsive(20), 
        paddingVertical: getHeightResponsive(20), 
        borderRadius: getWidthResponsive(18), 
        fontFamily: "fontLight", 
    },

    textInputContainer: {
        display: "flex",
        flexDirection: "row",
        borderWidth: 2,        
        borderRadius: getWidthResponsive(18), 
    },

    searchInputContainer: {
        display: "flex",
        flexDirection: "row",
        borderWidth: 2,        
        borderRadius: getWidthResponsive(18), 
        alignItems: "center",
        paddingHorizontal: getWidthResponsive(15)
    }
})
