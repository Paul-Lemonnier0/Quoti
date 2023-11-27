import { StyleSheet, TouchableOpacity } from "react-native"
import { useThemeColor } from "../Themed"
import { AntDesign, Feather, MaterialCommunityIcons, MaterialIcons, Ionicons, Octicons } from '@expo/vector-icons'; 
import { NormalText } from "../../styles/StyledText";
import { useNavigation } from "@react-navigation/native";

export const Icon = ({name, provider, color, size}) => {

    const font = useThemeColor({}, "Font")
    const iconBaseSize = size ? size : 24
    const iconProps = { name, color : color ? color : font, size: iconBaseSize };

    switch (provider){
        case "Feather":
            return <Feather {...iconProps}/>

        case "MaterialCommunityIcons":
            return <MaterialCommunityIcons {...iconProps}/>

        case "MaterialIcons":
            return <MaterialIcons {...iconProps}/>

        case "AntDesign":
            return <AntDesign {...iconProps}/>

        case "IonIcons":
            return <Ionicons {...iconProps}/>
        
        case "Octicons":
            return <Octicons {...iconProps}/>

        default: {
            return <NormalText text="?"/>
        }
    }
}

export const IconButton = ({onPress, name, provider, color, size, disabled, noPadding}) => {
    const font = useThemeColor({}, "Font")
    const disabledButtonText = useThemeColor({}, "DisabledButtonText")

    const colorIconBase =  disabled ? disabledButtonText : (color ? color : font)

    return(
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.iconButton, {padding: noPadding ? 0 : 15, borderWidth: 0}]}>
            <Icon name={name} provider={provider} size={size} color={colorIconBase}/>
        </TouchableOpacity>
    );
}

export const BorderIconButton = ({onPress, name, provider, color, size, isTransparent, disabled}) => {

    const secondary = useThemeColor({}, "Secondary")
    const contrast = useThemeColor({}, "Contrast")
    const disabledButtonText = useThemeColor({}, "DisabledButtonText")

    const colorIconBase =  disabled ? disabledButtonText : (color ? color : contrast)
    const backgroundColor = isTransparent ? "transparent" : secondary

    return(
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.iconButton, {backgroundColor, borderColor: colorIconBase}]}>
            <Icon name={name} provider={provider} size={size} color={colorIconBase}/>
        </TouchableOpacity>
    );
}

export const CircleBorderIconButton = ({onPress, name, provider, color, size, disabled}) => {

    const disabledButtonText = useThemeColor({}, "DisabledButtonText")
    const contrast = useThemeColor({}, "Contrast")

    const colorIconBase =  disabled ? disabledButtonText : (color ? color : contrast)
    const borderColor = colorIconBase

    return(
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.circleBorderButton, {borderColor}]}>
            <Icon name={name} provider={provider} size={size} color={colorIconBase}/>
        </TouchableOpacity>
    );
}

export const CircleBackgroundIconButton = ({onPress, name, provider, color, size, disabled}) => {

    const font = useThemeColor({}, "Font")
    const fontContrast = useThemeColor({}, "FontContrast")
    const contrast = useThemeColor({}, "Contrast")
    const disabledBackground = useThemeColor({}, "DisabledButtonBackground")

    const colorIconBase = color ? color : fontContrast
    const backgroundColor = disabled ? disabledBackground : contrast

    return(
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.circleBorderButton, {backgroundColor, borderColor: backgroundColor}]}>
            <Icon name={name} provider={provider} size={size} color={colorIconBase}/>
        </TouchableOpacity>
    );
}

export const BackgroundIconButton = ({onPress, name, provider, color, size, disabled}) => {

    const font = useThemeColor({}, "Font")
    const fontContrast = useThemeColor({}, "FontContrast")
    const contrast = useThemeColor({}, "Contrast")
    const disabledBackground = useThemeColor({}, "DisabledButtonBackground")

    const colorIconBase = color ? color : fontContrast
    const backgroundColor = disabled ? disabledBackground : contrast

    return(
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[{backgroundColor, borderColor: backgroundColor}, styles.iconButton]}>
            <Icon name={name} provider={provider} size={size} color={colorIconBase}/>
        </TouchableOpacity>
    );
}

export const NavigationButton = ({action, methode, customProvider, customIconName, disabled}) =>
{
    const navigation = useNavigation()
    const font = useThemeColor({}, "Font")
    const contrast = useThemeColor({}, "Contrast")
    const disabledButtonText = useThemeColor({}, "DisabledButtonText")
    
    const colorBase = disabled ? disabledButtonText : contrast

    const iconNames = {
        goBack: "chevron-left",
        close: "x",
        goNext: "chevron-right",
        validation: "check",
    };

    const iconName = iconNames[action] || customIconName

    const handlePress = () => {
        if(methode) methode()
        if(action === "goBack") navigation.goBack()
    }

    return(
        <TouchableOpacity disabled={disabled} style={[styles.circleBorderButton, {borderColor: colorBase}]}
            onPress={handlePress}>
            <Icon name={iconName} provider={customProvider ? customProvider : "Feather"} color={colorBase}/>
        </TouchableOpacity>);
}



const styles = StyleSheet.create({

    iconButton: {
        borderRadius: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        aspectRatio: 1,
        borderWidth: 2,
        borderColor: "transparent"
    },

    circleBorderButton: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        display: "flex",
        padding: 15,
        borderWidth: 2,
    },
})
