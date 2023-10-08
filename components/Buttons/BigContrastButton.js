import { StyleSheet, TouchableOpacity } from "react-native"
import { useThemeColor } from "../Themed"

export default BigContrastButton = (props) => {

    const contrast = useThemeColor({}, "Contrast")

    return(
        <TouchableOpacity onPress={props.onPress}
            style={[styles.bigContrastButton, {backgroundColor: contrast}]}>
            {props.children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    bigContrastButton: {
        padding: 20, 
        borderRadius: 50, 
        borderWidth: 2, 
        justifyContent: "center", 
        alignItems: "center"
    }
})