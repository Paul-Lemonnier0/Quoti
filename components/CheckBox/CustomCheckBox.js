import { StyleSheet, TouchableOpacity } from "react-native"
import { SubTitleText } from "../../styles/StyledText"
import { useThemeColor } from "../Themed"
import { Feather } from "@expo/vector-icons"
import { getHeightResponsive, getWidthResponsive } from "../../styles/UtilsStyles"

export default CustomCheckBox = ({color, number, isChecked, isBorderHidden, onPress, disabled, noPress}) => {

    const secondary = useThemeColor({}, "Secondary")
    const borderWidth = 2
    const borderColor = isBorderHidden ? secondary : color

    return(
        <TouchableOpacity onPress={onPress} disabled={noPress || disabled}
            style={[styles.stepCheckBox,
            { 
                backgroundColor: secondary,
                borderColor, 
                borderWidth
            }]}>

            {isChecked ? <Feather name="check" size={20} color={color}/> :  <SubTitleText text={number}/>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    stepCheckBox: {
        borderRadius: getWidthResponsive(15),
        aspectRatio: 1/1,
        alignItems:"center", 
        justifyContent: "center",
        height: getHeightResponsive(50)
    },
})