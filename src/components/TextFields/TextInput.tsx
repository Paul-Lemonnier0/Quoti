import { FC, Ref, forwardRef, useContext, useImperativeHandle, useState } from "react"
import { useThemeColor } from "../Themed"
import { Animated, TextInput, View } from "react-native"
import { StyleSheet } from "react-native";
import { NormalText, SubText, SubTitleText } from "../../styles/StyledText";
import { Icon, IconButton, IconProvider } from "../Buttons/IconButtons";
import { fontPixel, getHeightResponsive, getWidthResponsive } from "../../styles/UtilsStyles";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React from "react"
import { AppContext } from "../../data/AppContext";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

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
    multiline?: boolean,
    hideErrorIcon?: boolean,
    showAmountOfChars?: boolean
}

export interface CustomTextInputRefType {
    getValue: () => string
}


export const TextInputCustom = forwardRef<CustomTextInputRefType, TextInputCustomProps>(({
    startingValue, 
    labelName, 
    boldLabel, 
    semiBold, 
    onFocus, 
    disabled, 
    onBlur, 
    isWrong, 
    errorMessage, 
    placeholder,
    multiline,
    hideErrorIcon,
    showAmountOfChars
}, ref) => {
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

    const flex = multiline ? 1 : undefined

    const maxChars = 250

    return(
        <View style={[styles.container, {flex}]}>
            {labelName !== undefined ? 
                <View style={{marginLeft: 5}}>
                    {boldLabel ? <SubTitleText text={labelName}/> : 
                        <NormalText bold={semiBold} text={labelName}/>}
                </View>
            : null}

            <View style={[styles.textInputContainer, {borderColor, backgroundColor, flex}]}>
                    <TextInput editable={!disabled} placeholder={placeholder ?? ""} placeholderTextColor={fontGray} selectionColor={font}
                        value={value} onChangeText={setValue} autoCorrect={false}
                        maxLength={maxChars}
                        multiline={multiline}
                        onFocus={() => {setIsFieldFocus(true); onFocus && onFocus()}}
                        onBlur={() => {setIsFieldFocus(false); onBlur && onBlur()}}
                        
                        numberOfLines={10}
                        style={[
                            styles.textInput, 
                            {
                                flex,
                                paddingRight: isWrong ? 0 : getWidthResponsive(18), color: font,
                            },

                        ]}
                    />

                    {isWrong && !hideErrorIcon && <IconButton isShaking onPress={() => {}} provider={IconProvider.Feather} name={"x-circle"} color={errorColor} noPadding/>}
            </View>

            {
                errorMessage && 
                    <SubText text={errorMessage} style={{color: isWrong ? errorColor : "transparent"}}/>
            }
            {
                showAmountOfChars && 
                    <SubText style={{alignSelf: "flex-end"}} bold text={value.length + "/" + maxChars}/>
            }
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
    placeholder?: string,
    isPrimary?: boolean,
    keyboardAvoidingView?: boolean,
    opacity?: Animated.AnimatedInterpolation<string | number>
}

export const SearchBarCustom = forwardRef<CustomTextInputRefType, SearchBarCustomProps>(({ 
    onChangeText, 
    startingValue, 
    labelName, 
    boldLabel, 
    onFocus, 
    disabled, 
    onBlur, 
    placeholder,
    isPrimary,
    keyboardAvoidingView,
    opacity
 }, ref) => {
    const {theme} = useContext(AppContext)

    const [isFieldFocus, setIsFieldFocus] = useState<boolean>(false)

    const contrast = useThemeColor(theme, "Contrast") 
    const secondary = useThemeColor(theme, "Secondary") 
    const primary = useThemeColor(theme, "Primary") 
    const font = useThemeColor(theme, "Font") 
    const fontGray = useThemeColor(theme, "FontGray") 
    const errorColor = useThemeColor(theme, "Error") 
    const inputDisabledBackground = useThemeColor(theme, "InputDisabledBackground") 

    const backgroundColor = disabled ? inputDisabledBackground : (isPrimary ? primary : secondary)
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

    const TextComponent = keyboardAvoidingView ? BottomSheetTextInput : TextInput


    return(
        <Animated.View style={[styles.container, {opacity}]}>
            {labelName !== undefined ? (boldLabel ? <SubTitleText text={labelName}/> : <NormalText text={labelName}/>) : null}
            <View style={[styles.searchInputContainer, {borderColor, backgroundColor}]}>

                <Icon name={"search"} provider={IconProvider.Feather} size={20} color={fontGray}/>

                <TextComponent 
                    value={value} 

                    placeholder={placeholder ?? ""} 
                    placeholderTextColor={fontGray} 
                    
                    editable={!disabled} 
                    selectionColor={font}
                    autoCorrect={false}

                    onChangeText={handleChangeText} 
                    onFocus={() => {setIsFieldFocus(true); onFocus && onFocus()}}
                    onBlur={() => {setIsFieldFocus(false); onBlur && onBlur()}}

                    style={[styles.textInput, {paddingRight: 12, color: font}]}
                />

                <IconButton name={"x"} noPadding onPress={() => {
                        handleChangeText("")
                    }} 
                    provider={IconProvider.Feather} 
                    size={20} 
                    color={fontGray}
                />
            </View>
        </Animated.View>
    )
})

const styles = StyleSheet.create({
    container: {    
        display: 'flex', 
        flexDirection: "column", 
        gap: getHeightResponsive(10),
        width: "100%",
        marginVertical: 0, 
        flex: 1  
    },

    textInput: {
        flex: 1,
        fontSize: fontPixel(16), 
        padding: getWidthResponsive(15), 
        borderRadius: getWidthResponsive(18), 
        fontFamily: "fontSemiBold", 
        margin: 5

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
