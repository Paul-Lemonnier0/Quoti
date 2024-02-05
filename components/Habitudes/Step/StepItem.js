import { View } from "react-native"
import { SubText, SubTitleText } from "../../../styles/StyledText"
import { TouchableOpacity } from "react-native"
import CustomCheckBox from "../../CheckBox/CustomCheckBox"
import { StyleSheet } from "react-native"
import { durationToTimeString } from "../../../primitives/BasicsMethods"
import { getWidthResponsive } from "../../../styles/UtilsStyles"

export default StepItem = ({color, isNextToBeChecked, step, onPress, index, disabled, noPress, isHighlight}) => {

    const borderHidden = !step.isChecked && !isNextToBeChecked && !isHighlight
    const duration = step.duration ? durationToTimeString(step.duration) :  "--"

    return(
        <View style={[styles.renderStepContainer, {opacity: disabled ? 0.5 : 1}]}>
            <View style={styles.stepDurationContainer}>
                <SubText text={duration}/>
            </View>

            <CustomCheckBox disabled={disabled} color={color} isChecked={step.isChecked} isBorderHidden={borderHidden} number={index+1} noPress={noPress} onPress={onPress}/>

            <View style={styles.titreEtDescriptionContainer}>
                <SubTitleText text={step.titre}/>
                <SubText text={step.description}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    renderStepContainer: {
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center", 
        gap: getWidthResponsive(20),
    },

    stepDurationContainer: {
        width: getWidthResponsive(65), 
        alignItems: "center", 
        justifyContent: "center"
    },

    titreEtDescriptionContainer:{
        display: "flex", flex: 1,
        flexDirection: "column", 
        justifyContent: "center",
    },
})