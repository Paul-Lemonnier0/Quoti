import { StyleSheet, TouchableOpacity } from "react-native"
import { useThemeColor } from "../Themed"

export const RadioButton = ({isHighlight, handleOnClick, isColorReverse, children}) => {
   
    const secondary = useThemeColor({}, "Secondary")
    const primary = useThemeColor({}, "Primary")
    const font = useThemeColor({}, "Font")
   
    return(
        <TouchableOpacity 
            onPress={handleOnClick} 
            style={[styles.radioButton, 
                    {        
                        borderColor: isHighlight ? font : (isColorReverse ? primary : secondary),
                        backgroundColor: isHighlight ? font : (isColorReverse ? primary : secondary),
                    }]}>

            {children}

        </TouchableOpacity>                 
    )
}

export const CircleSimpleRadioButton = ({isSelected, handleOnPress, children}) => {
    const font = useThemeColor({}, "Font")

    return(
        <TouchableOpacity onPress={handleOnPress}
        style={[styles.CircleSimpleRadioButton, 
            {        
                borderColor: isSelected ? font : "transparent",
                backgroundColor: "transparent"  
            }]}>

                {children}
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    radioButton: {
        padding: 15, 
        borderRadius: 15, 
        flex: 1, 
        borderWidth: 2, 
        justifyContent: "center", 
        alignItems: "center"
    },

    CircleSimpleRadioButton: {
        padding: 10, 
        borderRadius: 50, 
        borderWidth: 2, 
        justifyContent: "center", 
        alignItems: "center"
    }
})