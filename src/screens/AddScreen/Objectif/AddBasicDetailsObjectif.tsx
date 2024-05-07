import { FC } from "react"
import { ObjectifBasicForm } from "../../../components/Forms/ObjectifForm/ObjectifBasicForm"
import { FormBasicObjectif } from "../../../types/FormObjectifTypes"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AddObjectifScreenType, getAddObjectifStepsDetails } from "../../../constants/BasicConstants"
import React from "react"
import { AddScreenStackType } from "../../../navigation/AddScreenNavigator"
import { BottomScreenOpen_Impact } from "../../../constants/Impacts"

type AddBasicDetailsObjectifProps = NativeStackScreenProps<AddScreenStackType, "AddBasicDetailsObjectif">

const AddBasicDetailsObjectif: FC<AddBasicDetailsObjectifProps> = ({navigation}) => {

    const handleGoNext = (detailledObjectif: FormBasicObjectif) => {
        navigation.navigate("ChooseColorScreenObjectif", {objectif: {...detailledObjectif}})
        BottomScreenOpen_Impact()
    }

    const CURRENT_STEP_DETAILS = getAddObjectifStepsDetails(AddObjectifScreenType.AddBasicObjectifDetails)

    const totalSteps = CURRENT_STEP_DETAILS.TOTAL_STEPS
    const currentStep = CURRENT_STEP_DETAILS.CURRENT_STEP

    return <ObjectifBasicForm 
                handleGoNext={handleGoNext}
                totalSteps={totalSteps}
                currentStep={currentStep}
            />
}

export default AddBasicDetailsObjectif