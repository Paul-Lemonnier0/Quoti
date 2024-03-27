import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { FC } from "react"
import { EditObjectifStackProps } from "./EditObjectifNav"
import { AddObjectifScreenType, getAddObjectifStepsDetails } from "../../../constants/BasicConstants"
import { FormColoredHabitValues } from "../../../types/FormHabitTypes"
import ChooseColorForm from "../../../components/Forms/ChooseColorForm"

type EditObjectifColorScreenProps = NativeStackScreenProps<EditObjectifStackProps, "EditObjectifColorScreen">

const EditObjectifColorScreen: FC<EditObjectifColorScreenProps> = ({route, navigation}) => {
    const {newValues, oldObjectif} = route.params

    const handleGoNext = (values: FormColoredHabitValues) => {
        navigation.navigate("EditObjectifIconScreen", {
            newValues: {...newValues, ...values}, 
            oldObjectif
        })
    }

    const CURRENT_STEP_DETAILS = getAddObjectifStepsDetails(AddObjectifScreenType.ChooseColorScreenObjectif)

    const totalSteps = CURRENT_STEP_DETAILS.TOTAL_STEPS
    const currentStep = CURRENT_STEP_DETAILS.CURRENT_STEP
    
    return(
        <ChooseColorForm
            handleGoNext={handleGoNext}
            defaultColor={oldObjectif.color}
            totalSteps={totalSteps}
            currentStep={currentStep}
        />
    )
}

export default EditObjectifColorScreen