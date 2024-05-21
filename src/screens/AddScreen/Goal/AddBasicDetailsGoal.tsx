import { FC } from "react"
import { GoalBasicForm } from "../../../components/Forms/GoalForm/GoalBasicForm"
import { FormBasicGoal } from "../../../types/FormGoalTypes"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AddGoalScreenType, getAddGoalStepsDetails } from "../../../constants/BasicConstants"
import React from "react"
import { AddScreenStackType } from "../../../navigation/AddScreenNavigator"
import { BottomScreenOpen_Impact } from "../../../constants/Impacts"

type AddBasicDetailsGoalProps = NativeStackScreenProps<AddScreenStackType, "AddBasicDetailsGoal">

const AddBasicDetailsGoal: FC<AddBasicDetailsGoalProps> = ({navigation}) => {

    const handleGoNext = (detailledGoal: FormBasicGoal) => {
        navigation.navigate("ChooseColorScreenGoal", {goal: {...detailledGoal}})
        BottomScreenOpen_Impact()
    }

    const CURRENT_STEP_DETAILS = getAddGoalStepsDetails(AddGoalScreenType.AddBasicGoalDetails)

    const totalSteps = CURRENT_STEP_DETAILS.TOTAL_STEPS
    const currentStep = CURRENT_STEP_DETAILS.CURRENT_STEP

    return <GoalBasicForm 
                handleGoNext={handleGoNext}
                totalSteps={totalSteps}
                currentStep={currentStep}
            />
}

export default AddBasicDetailsGoal