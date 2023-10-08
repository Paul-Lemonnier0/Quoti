import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native"
import { useThemeColor } from "../Themed";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export const SimpleButton = (props) =>
{
    return(
        <TouchableOpacity 
        onPress={props.onClick}>

                {props.children}

        </TouchableOpacity>);
}

export const GoBackButton = ({isCloseButton, additionalMethod}) =>
{
    const isClosingButton = isCloseButton

    const font = useThemeColor({}, "Font")

    const navigation = useNavigation()
    const handleBack = () => {
        if(additionalMethod) additionalMethod()
        
        navigation.goBack()
    }

    const fontGray = useThemeColor({}, "FontGray")

    return(
        <TouchableOpacity style={[styles.circleBorderButton, {borderColor: fontGray}]}
        onPress={handleBack}>
            <Feather name={isClosingButton ? "x" : "chevron-left"} size={20} color={font} />                
        </TouchableOpacity>);
}

export const GoNextButton = ({handleGoNext}) =>
{
    const font = useThemeColor({}, "Font")

    const fontGray = useThemeColor({}, "FontGray")

    return(
        <TouchableOpacity style={[styles.circleBorderButton, {borderColor: fontGray}]}
        onPress={handleGoNext}>
            <Feather name="chevron-right" size={20} color={font} />                
        </TouchableOpacity>);
}

export const SimpleButtonBackground = (props) =>
{
    const {onPress, backgroundColor} = props
    return(
        <TouchableOpacity style={[styles.simpleBgButton, {backgroundColor: backgroundColor, borderColor: backgroundColor}]}
        onPress={props.onPress}>
                {props.children}
        </TouchableOpacity>);
}

export const SimpleSquareButtonBackground = (props) =>
{
    const {onPress, backgroundColor} = props
    return(
        <TouchableOpacity style={[styles.simpleBgButton, {backgroundColor: backgroundColor, borderColor: backgroundColor, aspectRatio: 1}]}
        onPress={props.onPress}>
                {props.children}
        </TouchableOpacity>);
}

export const RoundBorderButton = (props) =>
{
    const fontGray = useThemeColor({}, "FontGray")

    return(
        <TouchableOpacity style={[styles.roundBorderButton, {borderColor: fontGray}]}
        onPress={props.onPress}>
                {props.children}
        </TouchableOpacity>);
}

export const CircleBorderButton = (props) =>
{
    const fontGray = useThemeColor({}, "FontGray")

    return(
        <TouchableOpacity style={[styles.circleBorderButton, {borderColor: fontGray}]}
        onPress={props.onPress}>
                {props.children}
        </TouchableOpacity>);
}

export const BigCircleBorderButton = (props) =>
{
    const fontGray = useThemeColor({}, "FontGray")

    const borderColor = props.borderColor ? props.borderColor : fontGray

    return(
        <TouchableOpacity style={[styles.circleBorderButton, {borderColor: borderColor, padding: 20}]}
        onPress={props.onPress}>
                {props.children}
        </TouchableOpacity>);
}

const styles = StyleSheet.create(
    {
        usualBackgroundButton: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            aspectRatio: 1,
        },

        simpleBgButton: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            display: "flex",
            padding: 15,
            borderWidth: 2, 
        },

        roundBorderButton: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            display: "flex",
            padding: 15,
            borderWidth: 2, aspectRatio: 1
        },

        circleBorderButton: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
            display: "flex",
            padding: 15,
            borderWidth: 2, aspectRatio: 1
        },
    }
)