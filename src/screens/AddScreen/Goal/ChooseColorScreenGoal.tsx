import React, { FC } from "react"
import ChooseColorForm from "../../../components/Forms/ChooseColorForm"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FormColoredHabitValues } from "../../../types/FormHabitTypes"
import { AddGoalScreenType, getAddGoalStepsDetails } from "../../../constants/BasicConstants"
import { AddScreenStackType } from "../../../navigation/AddScreenNavigator"
import { BottomScreenOpen_Impact } from "../../../constants/Impacts"

type ChooseColorScreenGoalProps = NativeStackScreenProps<AddScreenStackType, "ChooseColorScreenGoal">

export const ChooseColorScreenGoal: FC<ChooseColorScreenGoalProps> = ({route, navigation}) => {

    const {goal} = route.params

    const handleGoNext = (values: FormColoredHabitValues) => {
        navigation.navigate("ChooseIconScreenGoal", {goal: {...goal, ...values}})
        BottomScreenOpen_Impact()
    } 
    
    const CURRENT_STEP_DETAILS = getAddGoalStepsDetails(AddGoalScreenType.ChooseColorScreenGoal)

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