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

export const ContrastRoundButton = (props) =>
{
    const contrast = useThemeColor({}, "Contrast")
    const secondary = useThemeColor({}, "Secondary")

    return(
    <TouchableOpacity onPress={props.onClick}
    style={[
        {
            backgroundColor: contrast,
        }, 
        styles.ContrastRoundButton]}>
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
        }
        
    }
)
