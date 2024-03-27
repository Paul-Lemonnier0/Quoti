import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { FC } from "react"
import { EditObjectifStackProps } from "./EditObjectifNav"
import { AddObjectifScreenType, getAddObjectifStepsDetails } from "../../../constants/BasicConstants"
import { FormIconedHabitValues } from "../../../types/FormHabitTypes"
import ChooseIconForm from "../../../components/Forms/ChooseIconForm"

type EditObjectifIconScreenProps = NativeStackScreenProps<EditObjectifStackProps, "EditObjectifIconScreen">

const EditObjectifIconScreen: FC<EditObjectifIconScreenProps> = ({route, navigation}) => {
    const {newValues, oldObjectif} = route.params

    const handleGoNext = (values: FormIconedHabitValues) => {
        navigation.navigate("EditObjectifHabitsScreen", {
            newValues: {...newValues, ...values}, 
            oldObjectif
        })
    }

    const CURRENT_STEP_DETAILS = getAddObjectifStepsDetails(AddObjectifScreenType.ChooseIconScreenObjectif)

    const totalSteps = CURRENT_STEP_DETAILS.TOTAL_STEPS
    const currentStep = CURRENT_STEP_DETAILS.CURRENT_STEP
    
    return(
        <ChooseIconForm
            handleGoNext={handleGoNext}
            defaultIcon={oldObjectif.icon}
            totalSteps={totalSteps}
            currentStep={currentStep}
        />
    )
}

export default EditObjectifIconScreen