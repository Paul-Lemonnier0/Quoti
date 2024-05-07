import { StyleSheet, TouchableOpacity } from "react-native"
import { useThemeColor } from "../Themed"
import { AntDesign, Feather, MaterialCommunityIcons, MaterialIcons, Ionicons, Octicons, FontAwesome5, Entypo } from '@expo/vector-icons'; 
import { NormalText } from "../../styles/StyledText";
import { useNavigation } from "@react-navigation/native";
import { getWidthResponsive, widthPixel } from "../../styles/UtilsStyles";
import React, { ComponentProps, FC, useContext, useEffect } from "react";
import { AppContext } from "../../data/AppContext";
import { BottomScreenOpen_Impact } from "../../constants/Impacts";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { useAnimatedShake } from "../../hooks/useAnimatedShake";

export type FeatherIconName = ComponentProps<typeof Feather>['name'];
export type MaterialCommunityIconName = ComponentProps<typeof MaterialCommunityIcons>['name'];
export type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];
export type AntDesignName = ComponentProps<typeof AntDesign>['name'];
export type IoniconsIconName = ComponentProps<typeof Ionicons>['name'];
export type OcticonsIconName = ComponentProps<typeof Octicons>['name'];
export type FontAwesome5IconName = ComponentProps<typeof FontAwesome5>['name'];
export type Entypo = ComponentProps<typeof Entypo>['name'];

export enum IconProvider {
    Feather = "Feather",
    MaterialCommunityIcons = "MaterialCommunityIcons",
    MaterialIcons = "MaterialIcons",
    AntDesign = "AntDesign",
    IonIcons = "IonIcons",
    Octicons = "Octicons",
    FontAwesome5 = "FontAwesome5",
    Entypo = "Entypo",
}

export interface IconProps {
    name: string,
    provider: IconProvider,
    color?: string,
    size?: number,
}
export const Icon: FC<IconProps> = ({name, provider, color, size}) => {
    const {theme} = useContext(AppContext)
    const font = useThemeColor(theme, "Font")
    const iconBaseSize = size ? getWidthResponsive(size) : getWidthResponsive(24)
    
    const iconProps = { color : color ?? font, size: iconBaseSize };

    switch (provider){
        case IconProvider.Feather:
            return <Feather style={{padding: 0}} name={name as FeatherIconName} {...iconProps}/>

        case IconProvider.MaterialCommunityIcons:
            return <MaterialCommunityIcons name={name as MaterialCommunityIconName} {...iconProps}/>

        case IconProvider.MaterialIcons:
            return <MaterialIcons name={name as MaterialIconName} {...iconProps}/>

        case IconProvider.AntDesign:
            return <AntDesign name={name as AntDesignName} {...iconProps}/>

        case IconProvider.IonIcons:
            return <Ionicons name={name as IoniconsIconName} {...iconProps}/>
        
        case IconProvider.Octicons:
            return <Octicons name={name as OcticonsIconName} {...iconProps}/>

        case IconProvider.FontAwesome5:
            return <FontAwesome5 name={name as FontAwesome5IconName} {...iconProps}/>

        case IconProvider.Entypo:
            return <Entypo name={name as FontAwesome5IconName} {...iconProps}/>
    
        default: {
            return <NormalText text="?"/>
        }
    }
}

export interface BasicIconButtonProps extends IconProps {
    onPress(): void,
    disabled?: boolean,
}

export interface IconButtonProps extends BasicIconButtonProps {
    noPadding?: boolean,
    isShaking?: boolean
}

export const IconButton: FC<IconButtonProps> = ({onPress, name, provider, color, size, disabled, noPadding, isShaking}) => {
    const {theme} = useContext(AppContext)

    const font = useThemeColor(theme, "Font")
    const secondary = useThemeColor(theme, "Secondary")
    const disabledButtonText = useThemeColor(theme, "DisabledButtonText")

    const colorIconBase =  disabled ? disabledButtonText : (color ?? font)

    const {shake, rStyle} = useAnimatedShake()

    useEffect(() => {
        if(isShaking) shake()
    }, [])

    return(
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.iconButton, {padding: noPadding ? 0 : 15, borderWidth: 0}]}>
            <Animated.View style={rStyle}>
                <Icon name={name} provider={provider} size={size} color={colorIconBase}/>
            </Animated.View>
        </TouchableOpacity>
    );
}

export interface BorderIconButtonProps extends BasicIconButtonProps {
    isTransparent?: boolean,
    isRound?: boolean,
    borderColor?: string,
    isBorderGray?: boolean
}

export const BorderIconButton: FC<BorderIconButtonProps> = ({onPress, name, provider, borderColor, isBorderGray, color, size, isTransparent, disabled, isRound}) => {
    const {theme} = useContext(AppContext)

    const secondary = useThemeColor(theme, "Secondary")
    const contrast = useThemeColor(theme, "Contrast")
    const disabledButtonText = useThemeColor(theme, "DisabledButtonText")

    const borderColorIconBase =  disabled ? disabledButtonText : (isBorderGray ? secondary : borderColor ?? contrast)
    const colorIconBase =  disabled ? disabledButtonText : (color ?? contrast)
    const backgroundColor = isTransparent ? "transparent" : secondary

    return(
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.iconButton, {backgroundColor, borderColor: borderColorIconBase, borderRadius: isRound ? 500 : 18}]}>
            <Icon name={name} provider={provider} size={size} color={colorIconBase}/>
        </TouchableOpacity>
    );
}

export const BackgroundIconButton: FC<BasicIconButtonProps> = ({onPress, name, provider, color, size, disabled}) => {
    const {theme} = useContext(AppContext)

    const font = useThemeColor(theme, "Font")
    const fontContrast = useThemeColor(theme, "FontContrast")
    const contrast = useThemeColor(theme, "Contrast")
    const disabledBackground = useThemeColor(theme, "DisabledButtonBackground")

    const colorIconBase = color ? color : fontContrast
    const backgroundColor = disabled ? disabledBackground : contrast

    return(
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[{backgroundColor, borderColor: backgroundColor}, styles.iconButton]}>
            <Icon name={name} provider={provider} size={size} color={colorIconBase}/>
        </TouchableOpacity>
    );
}

export interface BasicNavigationButtonProps {
    methode?: () => void,
    customProvider?: IconProvider,
    disabled?: boolean,
    noPadding?: boolean
}

export enum NavigationActions {
    goBack = "goBack",
    close = "close",
    goNext = "goNext",
    validation = "validation"
}

export interface NavigationButtonProps extends BasicNavigationButtonProps {
    action: NavigationActions,
    customIconName?: string,
}

export const NavigationButton: FC<NavigationButtonProps> = ({action, methode, customProvider, customIconName, disabled, noPadding}) =>
{
    const {theme} = useContext(AppContext)

    const secondary = useThemeColor(theme, "Secondary")
    const contrast = useThemeColor(theme, "Contrast")
    const disabledButtonText = useThemeColor(theme, "DisabledButtonText")
    
    const colorBase = disabled ? disabledButtonText : contrast

    const navigation = useNavigation()

    const iconNames = {
        goBack: "arrow-left",
        close: "x",
        goNext: "arrow-right",
        validation: "check",
    };

    const iconName = (iconNames[action] || customIconName) ?? "x"

    const handlePress = () => {
        if(methode) methode()
        
        if(action === "goBack"){
            BottomScreenOpen_Impact()
            navigation.goBack()
        } 
    }

    return(
        <TouchableOpacity disabled={disabled} 
            style={[styles.navButton, {paddingVertical: noPadding ? 0 : 0, borderColor: secondary}]}
            onPress={handlePress}>
            <Icon name={iconName} provider={customProvider ?? IconProvider.Feather} color={colorBase}/>
        </TouchableOpacity>);
}

export const CloseButton: FC<BasicNavigationButtonProps> = ({methode, customProvider, disabled, noPadding}) =>
{
    const {theme} = useContext(AppContext)

    const contrast = useThemeColor(theme, "Contrast")
    const secondary = useThemeColor(theme, "Secondary")

    const disabledButtonText = useThemeColor(theme, "DisabledButtonText")
    
    const colorBase = disabled ? disabledButtonText : contrast

    const iconName = "x"

    const handlePress = () => {
        if(methode) methode()
    }

    return(
        <TouchableOpacity disabled={disabled} 
            style={[styles.navButton, {paddingVertical: noPadding ? 0 : 0, borderColor: secondary}]}
            onPress={handlePress}>
            <Icon name={iconName} provider={customProvider ?? IconProvider.Feather} color={colorBase}/>
        </TouchableOpacity>);
}

interface BottomSheetCloseButton {
    methode: () => void,
    disabled?: boolean
}

export const BottomSheetCloseButton: FC<BottomSheetCloseButton> = ({ methode, disabled }) => {
    return(
        <TouchableOpacity disabled={disabled} onPress={methode}
            style={[styles.navButton, {borderWidth: 0, padding: 0}]}>
            <Icon name={"x"} provider={IconProvider.Feather}/>
        </TouchableOpacity>
    )
} 

const styles = StyleSheet.create({

    navButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",        
        padding: 15,
        aspectRatio: 1,
        borderRadius: 15,
        borderWidth: 2,
    },

    iconButton: {
        borderRadius: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        aspectRatio: 1,
        borderWidth: 2,
        borderColor: "transparent"
    }
})
