import { FC, Ref, forwardRef, useContext, useImperativeHandle, useState } from "react"
import { useThemeColor } from "../Themed"
import { TextInput, View } from "react-native"
import { StyleSheet } from "react-native";
import { NormalText, SubText, SubTitleText } from "../../styles/StyledText";
import { Icon, IconButton, IconProvider } from "../Buttons/IconButtons";
import { fontPixel, getHeightResponsive, getWidthResponsive } from "../../styles/UtilsStyles";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React from "react"
import { AppContext } from "../../data/AppContext";

export interface TextInputCustomProps {
    startingValue?: string,
    labelName?: string,
    boldLabel?: boolean,
    semiBold?: boolean,
    onFocus?: () => void,
    onBlur?: () => void,
    disabled?: boolean,
    isWrong?: boolean,
    errorMessage?: string,
    placeholder?: string,
}

export interface CustomTextInputRefType {
    getValue: () => string
}


export const TextInputCustom = forwardRef<CustomTextInputRefType, TextInputCustomProps>(({ startingValue, labelName, boldLabel, semiBold, onFocus, disabled, onBlur, isWrong, errorMessage, placeholder}, ref) => {
    const {theme} = useContext(AppContext)

    const [isFieldFocus, setIsFieldFocus] = useState<boolean>(false)

    const contrast = useThemeColor(theme, "Contrast") 
    const secondary = useThemeColor(theme, "Secondary") 
    const font = useThemeColor(theme, "Font") 
    const fontGray = useThemeColor(theme, "FontGray") 
    const errorColor = useThemeColor(theme, "Error") 
    const inputDisabledBackground = useThemeColor(theme, "InputDisabledBackground") 

    const backgroundColor = disabled ? inputDisabledBackground : secondary
    const borderColor = disabled ? inputDisabledBackground : isFieldFocus ? contrast : (isWrong ? errorColor : "transparent")

    const [value, setValue] = useState<string>(startingValue ? startingValue : "");

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
            
            <View style={[styles.textInputContainer, {borderColor, backgroundColor}]}>
                <TextInput editable={!disabled} placeholder={placeholder ?? ""} placeholderTextColor={fontGray} selectionColor={font}
                    value={value} onChangeText={setValue} autoCorrect={false}
                    
                    onFocus={() => {setIsFieldFocus(true); onFocus && onFocus()}}
                    onBlur={() => {setIsFieldFocus(false); onBlur && onBlur()}}

                    style={[styles.textInput, {paddingRight: isWrong ? 0 : getWidthResponsive(18), color: font,}]}
                />

                {isWrong && <IconButton onPress={() => {}} provider={IconProvider.Feather} name={"x-circle"} color={errorColor} noPadding/>}
            </View>

            {errorMessage && <SubText text={errorMessage} style={{color: isWrong ? errorColor : "transparent"}}/>}
        </View>
    )
})

export const BottomTextInputCustom = forwardRef<CustomTextInputRefType, TextInputCustomProps>(({ startingValue, labelName, boldLabel, semiBold, onFocus, disabled, onBlur, isWrong, errorMessage, placeholder }, ref) => {
    const {theme} = useContext(AppContext)

    const [isFieldFocus, setIsFieldFocus] = useState<boolean>(false)

    const contrast = useThemeColor(theme, "Contrast") 
    const secondary = useThemeColor(theme, "Secondary") 
    const font = useThemeColor(theme, "Font") 
    const fontGray = useThemeColor(theme, "FontGray") 
    const errorColor = useThemeColor(theme, "Error") 
    const inputDisabledBackground = useThemeColor(theme, "InputDisabledBackground") 

    const backgroundColor = disabled ? inputDisabledBackground : secondary
    const borderColor = disabled ? inputDisabledBackground : isFieldFocus ? contrast : (isWrong ? errorColor : "transparent")

    const [value, setValue] = useState<string>(startingValue ? startingValue : "");

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
            
            <View style={[styles.textInputContainer, {borderColor, backgroundColor}]}>
                <BottomSheetTextInput
                    placeholder={placeholder}
                    editable={!disabled} placeholderTextColor={fontGray} selectionColor={font}
                    value={value} onChangeText={setValue} autoCorrect={false}
                    
                    onFocus={() => {setIsFieldFocus(true); onFocus && onFocus()}}
                    onBlur={() => {setIsFieldFocus(false); onBlur && onBlur()}}

                    style={[styles.textInput, {paddingRight: isWrong ? 0 : getWidthResponsive(18), color: font,}]}
                />

                {isWrong && <IconButton onPress={() => {}} provider={IconProvider.Feather} name={"x-circle"} color={errorColor} noPadding/>}
            </View>

            {errorMessage && <SubText text={errorMessage} style={{color: isWrong ? errorColor : "transparent"}}/>}
        </View>
    )
})


export const PasswordInputCustom = forwardRef<CustomTextInputRefType, TextInputCustomProps>(({ startingValue, labelName, boldLabel, semiBold, onFocus, disabled, onBlur, isWrong, errorMessage, placeholder }, ref) => {
    const {theme} = useContext(AppContext)

    const [isFieldFocus, setIsFieldFocus] = useState(false)

    const contrast = useThemeColor(theme, "Contrast") 
    const secondary = useThemeColor(theme, "Secondary") 
    const font = useThemeColor(theme, "Font") 
    const fontGray = useThemeColor(theme, "FontGray")  
    const errorColor = useThemeColor(theme, "Error") 
    const inputDisabledBackground = useThemeColor(theme, "InputDisabledBackground") 

    const backgroundColor = disabled ? inputDisabledBackground : secondary
    const borderColor = disabled ? inputDisabledBackground : isFieldFocus ? contrast : (isWrong ? errorColor : "transparent")

    const [value, setValue] = useState<string>(startingValue ?? "");

    useImperativeHandle(ref, () => ({
        getValue: () => value,
    }));

    const togglePasswordVisibility = () => {
        setIsPasswordHidden(!isPasswordHidden);
    };

    const handlePasswordChange = (text: string) => {
        setValue(text);
    };

    const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(false)

    return(
        <View style={styles.container}>

            {labelName !== undefined ? 
                <View style={{marginLeft: 50}}>
                    {boldLabel ? <SubTitleText text={labelName}/> : 
                        <NormalText bold={semiBold ?? false} text={labelName}/>}
                </View> 
            : null}

            <View style={[styles.textInputContainer, {borderColor, backgroundColor}]}>
                <TextInput value={value} onChangeText={handlePasswordChange}
                    secureTextEntry={!isPasswordHidden} 
                    editable={!disabled}
                    placeholder={placeholder}
                    placeholderTextColor={fontGray} 
                    selectionColor={font}
                    autoCorrect={false}
                    onFocus={() => {setIsFieldFocus(true); onFocus && onFocus()}}
                    onBlur={() => {setIsFieldFocus(false); onBlur && onBlur()}}
                    style={[styles.textInput, {paddingRight: 0, color: font}]}
                />

                <IconButton onPress={togglePasswordVisibility} provider={IconProvider.Feather} name={isPasswordHidden ? "eye" : "eye-off"}/>
            </View>            
    
            {errorMessage && <SubText text={errorMessage} style={{color: isWrong ? errorColor : "transparent"}}/>}
        </View>
    )
})
 

export interface SearchBarCustomProps {
    onChangeText: (text: string) => void,
    startingValue?: string,
    labelName?: string,
    boldLabel?: string,
    onFocus?: () => void,
    onBlur?: () => void,
    disabled?: boolean,
    placeholder?: string
}

export const SearchBarCustom = forwardRef<CustomTextInputRefType, SearchBarCustomProps>(({ onChangeText, startingValue, labelName, boldLabel, onFocus, disabled, onBlur, placeholder }, ref) => {
    const {theme} = useContext(AppContext)

    const [isFieldFocus, setIsFieldFocus] = useState<boolean>(false)

    const contrast = useThemeColor(theme, "Contrast") 
    const secondary = useThemeColor(theme, "Secondary") 
    const font = useThemeColor(theme, "Font") 
    const fontGray = useThemeColor(theme, "FontGray") 
    const errorColor = useThemeColor(theme, "Error") 
    const inputDisabledBackground = useThemeColor(theme, "InputDisabledBackground") 

    const backgroundColor = disabled ? inputDisabledBackground : secondary
    const borderColor = disabled ? inputDisabledBackground : isFieldFocus ? contrast : "transparent"

    const [value, setValue] = useState<string>(startingValue ? startingValue : "");
    const getValue = () => {
        return value;
    };

    useImperativeHandle(ref, () => ({
        getValue,
    }));

    const handleChangeText = (text: string) => {
        onChangeText(text)
        setValue(text)
    }


    return(
        <View style={styles.container}>
            {labelName !== undefined ? (boldLabel ? <SubTitleText text={labelName}/> : <NormalText text={labelName}/>) : null}
            <View style={[styles.searchInputContainer, {borderColor, backgroundColor}]}>

                <Icon name={"search"} provider={IconProvider.Feather} size={20} color={fontGray}/>

                <TextInput placeholder={placeholder ?? ""} editable={!disabled} placeholderTextColor={fontGray} selectionColor={font}
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
