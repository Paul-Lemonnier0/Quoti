import React, { FC } from "react"
import ChooseColorForm from "../../../components/Forms/ChooseColorForm"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FormColoredHabitValues } from "../../../types/FormHabitTypes"
import { AddObjectifScreenType, getAddObjectifStepsDetails } from "../../../constants/BasicConstants"
import { AddScreenStackType } from "../../../navigation/AddScreenNavigator"
import { BottomScreenOpen_Impact } from "../../../constants/Impacts"

type ChooseColorScreenObjectifProps = NativeStackScreenProps<AddScreenStackType, "ChooseColorScreenObjectif">

export const ChooseColorScreenObjectif: FC<ChooseColorScreenObjectifProps> = ({route, navigation}) => {

    const {objectif} = route.params

    const handleGoNext = (values: FormColoredHabitValues) => {
        navigation.navigate("ChooseIconScreenObjectif", {objectif: {...objectif, ...values}})
        BottomScreenOpen_Impact()
    } 
    
    const CURRENT_STEP_DETAILS = getAddObjectifStepsDetails(AddObjectifScreenType.ChooseColorScreenObjectif)

    const totalSteps = CURRENT_STEP_DETAILS.TOTAL_STEPS
    const currentStep = CURRENT_STEP_DETAILS.CURRENT_STEP

    return(
        <ChooseColorForm 
            handleGoNext={handleGoNext}
            totalSteps={totalSteps}
            currentStep={currentStep}
        />
    )
}