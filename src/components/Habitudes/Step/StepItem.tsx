import { View } from "react-native"
import { NormalGrayText, SubText, SubTitleText } from "../../../styles/StyledText"
import { TouchableOpacity } from "react-native"
import CustomCheckBox from "../../CheckBox/CustomCheckBox"
import { StyleSheet } from "react-native"
import { durationToTimeString } from "../../../primitives/BasicsMethods"
import { getWidthResponsive } from "../../../styles/UtilsStyles"
import { Step } from "../../../types/HabitTypes"
import { FC } from "react"
import { FormFullStep, FormStep } from "../../../types/FormHabitTypes"
import React from "react"
import { useThemeColor } from "../../Themed"
import { IconButton, IconProvider } from "../../Buttons/IconButtons"

export interface StepItemProps {
    step: Step | FormStep,
    onPress?: () => void,
    color: string,
    index: number,
    isNextToBeChecked: boolean,
    disabled?: boolean,
    noPress?: boolean,
    isHighlight?: boolean,
    isEditable?: boolean,
    onDelete?: () => void
}

const StepItem: FC<StepItemProps> = ({
    color, 
    isNextToBeChecked, 
    step, 
    onPress, 
    index, 
    disabled,
    noPress, 
    isHighlight,
    isEditable,
    onDelete
}) => {

    const isChecked = "isChecked" in step ? step.isChecked : false
    const hasDuration = "duration" in step

    const secondary = useThemeColor({}, "Secondary")

    const borderHidden = !isChecked && !isNextToBeChecked && !isHighlight
    let duration = hasDuration ? durationToTimeString((step as Step).duration) :  "--"
    duration = duration === "0min" ? "--" : duration

    return(
        <View style={[styles.renderStepContainer, {opacity: disabled ? 0.5 : 1, 
            backgroundColor: secondary
        }]}>

            <View style={{flexDirection: "row", gap: 20, alignItems: "center"}}>


                <CustomCheckBox isPrimary disabled={disabled} color={color} isChecked={isChecked} isBorderHidden={borderHidden} number={index+1} noPress={noPress} 
                    onPress={onPress}/>

                <View style={styles.titreEtDescriptionContainer}>
                    <SubTitleText text={(step as FormFullStep | Step).titre ?? ""}/>
                    <NormalGrayText text={duration}/>
                </View>

                {(isEditable && onDelete) && <IconButton name={"x"} provider={IconProvider.Feather} onPress={onDelete}/>}

            </View>

            {/* <SubText text={"L'informatique c'est super chouette, bientot c'est le master"}/> */}

{/* 
            <View style={styles.stepDurationContainer}>
                <SubText text={duration}/>
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    renderStepContainer: {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center", 
        gap: getWidthResponsive(20),
        padding: 15,
        borderRadius: 20
    },

    stepDurationContainer: {
        alignItems: "center", 
        justifyContent: "center"
    },

    titreEtDescriptionContainer:{
        display: "flex", flex: 1,
        gap: 5,
        flexDirection: "column", 
        justifyContent: "center",
    },
})

export default StepItem