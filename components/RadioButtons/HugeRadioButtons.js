import { StyleSheet, TouchableOpacity } from "react-native"
import { useThemeColor } from "../Themed"

export const HugeRadioButton = ({isHighlight, handleOnClick, isColorReverse, children}) => {
   
    const secondary = useThemeColor({}, "Secondary")
    const primary = useThemeColor({}, "Primary")
    const contrast = useThemeColor({}, "Contrast")
   
    return(
        <TouchableOpacity 
            onPress={handleOnClick} 
            style={[styles.hugeRadioButton, 
                    {        
                        borderColor: isHighlight ? contrast : (isColorReverse ? primary : secondary),
                        backgroundColor: (isColorReverse ? primary : secondary),         
                    }]}>

            {children}

        </TouchableOpacity>                 
    )
}

const styles = StyleSheet.create({
    hugeRadioButton: {
        padding: 20, 
        borderRadius: 50, 
        borderWidth: 2, 
        justifyContent: "center", 
        alignItems: "center"
    },
})