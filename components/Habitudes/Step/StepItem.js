import { View } from "react-native"
import { SubText, SubTitleText } from "../../../styles/StyledText"
import { TouchableOpacity } from "react-native"
import CustomCheckBox from "../../CheckBox/CustomCheckBox"
import { StyleSheet } from "react-native"
import { durationToTimeString } from "../../../primitives/BasicsMethods"

export default StepItem = ({color, isNextToBeChecked, step, onPress, index }) => {

    const borderHidden = !step.isChecked && !isNextToBeChecked
    const duration = step.duration ? durationToTimeString(step.duration) :  "--"

    return(
        <View style={styles.renderStepContainer}>
            <View style={styles.stepDurationContainer}>
                <SubText text={duration}/>
            </View>

            <CustomCheckBox color={color} isChecked={step.isChecked} isBorderHidden={borderHidden} number={index+1} onPress={onPress}/>

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
        gap: 20,
    },

    stepDurationContainer: {
        width: 65, 
        alignItems: "center", 
        justifyContent: "center"
    },

    titreEtDescriptionContainer:{
        display: "flex", flex: 1,
        flexDirection: "column", 
        justifyContent: "center",
    },
})