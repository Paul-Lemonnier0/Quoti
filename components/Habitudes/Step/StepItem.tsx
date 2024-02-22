import { View } from "react-native"
import { SubText, SubTitleText } from "../../../styles/StyledText"
import { TouchableOpacity } from "react-native"
import CustomCheckBox from "../../CheckBox/CustomCheckBox"
import { StyleSheet } from "react-native"
import { durationToTimeString } from "../../../primitives/BasicsMethods"
import { getWidthResponsive } from "../../../styles/UtilsStyles"
import { Step } from "../../../types/HabitTypes"
import { FC } from "react"
import { FormFullStep, FormStep } from "../../../types/FormHabitTypes"

interface StepItemProps {
    step: Step | FormStep,
    onPress?: () => void,
    color: string,
    index: number,
    isNextToBeChecked: boolean,
    disabled?: boolean,
    noPress?: boolean,
    isHighlight?: boolean,
}

const StepItem: FC<StepItemProps> = ({color, isNextToBeChecked, step, onPress, index, disabled, noPress, isHighlight}) => {

    const isChecked = "isChecked" in step ? step.isChecked : false
    const hasDuration = "duration" in step

    const borderHidden = !isChecked && !isNextToBeChecked && !isHighlight
    const duration = hasDuration ? durationToTimeString((step as Step).duration) :  "--"

    return(
        <View style={[styles.renderStepContainer, {opacity: disabled ? 0.5 : 1}]}>
            <View style={styles.stepDurationContainer}>
                <SubText text={duration}/>
            </View>

            <CustomCheckBox disabled={disabled} color={color} isChecked={isChecked} isBorderHidden={borderHidden} number={index+1} noPress={noPress} 
                onPress={onPress}/>

            <View style={styles.titreEtDescriptionContainer}>
                <SubTitleText text={(step as FormFullStep | Step).titre ?? ""}/>
                <SubText text={(step as FormFullStep | Step).description ?? ""}/>
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

export default StepItem