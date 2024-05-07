import { View } from "react-native"
import { LittleNormalText, NormalGrayText, NormalText, SubTitleText } from "../../../styles/StyledText"
import CustomCheckBox from "../../CheckBox/CustomCheckBox"
import { StyleSheet } from "react-native"
import { durationToTimeString } from "../../../primitives/BasicsMethods"
import { getWidthResponsive } from "../../../styles/UtilsStyles"
import { Step } from "../../../types/HabitTypes"
import { FC, useContext, useRef } from "react"
import { FormFullStep, FormStep } from "../../../types/FormHabitTypes"
import React from "react"
import { useThemeColor } from "../../Themed"
import { Icon, IconButton, IconProvider } from "../../Buttons/IconButtons"
import { getPriorityDetails } from "../../../primitives/StepMethods"
import { AppContext } from "../../../data/AppContext"

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
    isPriorityBadgeHidden?: boolean,
    areAllStepsChecked?: boolean,
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
    onDelete,
    areAllStepsChecked
}) => {

    const isChecked = isEditable ? false : ("isChecked" in step ? step.isChecked : false)
    const hasDuration = "duration" in step

    const {theme} = useContext(AppContext)
    const secondary = useThemeColor(theme, "Secondary")
    const fontGray = useThemeColor(theme, "FontGray")

    const borderHidden = !isChecked && !isNextToBeChecked && !isHighlight
    let duration = hasDuration ? durationToTimeString((step as Step).duration) :  "--"
    duration = duration === "0min" ? "--" : duration

    const priorityDetails = getPriorityDetails((step as Step | FormFullStep).priority ?? undefined)

    return( 
        <View style={[styles.renderStepContainer, {opacity: disabled ? 0.5 : 1, 
            backgroundColor: secondary
        }]}>

            <View style={{flexDirection: "row", gap: 20, alignItems: "center", flex: 1}}>
                <CustomCheckBox isPrimary disabled={(disabled || areAllStepsChecked)} color={color} isChecked={isChecked} isBorderHidden={borderHidden} number={index+1} noPress={noPress} 
                    onPress={onPress}/>

                <View style={styles.titreEtDescriptionContainer}>
                    <SubTitleText text={(step as FormFullStep | Step).titre ?? ""}/>
                    <LittleNormalText style={{color: fontGray}} bold text={duration}/>
                </View>
            </View>
            {
                priorityDetails && priorityDetails.icon != "" &&
                <Icon provider={IconProvider.Feather} name={priorityDetails.icon} color={priorityDetails.color}/>
            }

            {
                (isEditable && onDelete) && 
                <IconButton name={"x"} provider={IconProvider.Feather} onPress={onDelete} noPadding/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    renderStepContainer: {
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        gap: getWidthResponsive(20),
        padding: 15,
        paddingRight: 20,
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