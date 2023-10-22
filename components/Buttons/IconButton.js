import { Pressable, StyleSheet, TouchableOpacity } from "react-native"
import { useThemeColor } from "../Themed"
import { View } from "react-native";
import { TouchableWithoutFeedback } from "react-native";

export const IconButton = (props) =>
{
    const secondary = useThemeColor({}, "Secondary");

    return(
        <TouchableOpacity onPress={props.onClick}
            style={[
                {
                    backgroundColor: secondary
                }, 
                styles.IconButton]}>
                {props.children}
        </TouchableOpacity>);
}

export const SimpleIconButton = (props) =>
{
    return(
    <TouchableOpacity onPress={props.onClick} style={styles.IconButton}>
        {props.children}
    </TouchableOpacity>);
}

export const ContrastButton = (props) =>
{
    const font = useThemeColor({}, "Font")
    const secondary = useThemeColor({}, "Secondary")

    return(
    <TouchableOpacity onPress={props.onClick}
    style={[
        {
            backgroundColor: secondary,
            borderWidth: 2,
            borderColor: font
        }, 
        styles.contrastButton]}>
        {props.children}
    </TouchableOpacity>);
}

export const BottomNavigationButtonAdd = ({ children }) => {
    const contrast = useThemeColor({}, "Contrast");
  
    return (
        <View style={styles.BottomNavigationButtonAdd}>
            <TouchableOpacity onPress={null} style={{ backgroundColor: contrast, padding: 20, borderRadius: 50}} >
                {children}
            </TouchableOpacity>
        </View>
    );
  };

const styles = StyleSheet.create(
    {
        IconButton: {
            borderRadius: 10,
            padding: 8,
        },

        BottomNavigationButtonAdd: {
            position: "absolute",
            bottom: 0,
        },

        contrastButton: {
            borderRadius: 15,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
            aspectRatio: 1
        }
        
    }
)
