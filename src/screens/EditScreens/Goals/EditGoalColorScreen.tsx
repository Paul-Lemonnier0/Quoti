import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { FC } from "react"
import { EditGoalStackProps } from "./EditGoalNav"
import { AddGoalScreenType, getAddGoalStepsDetails } from "../../../constants/BasicConstants"
import { FormColoredHabitValues } from "../../../types/FormHabitTypes"
import ChooseColorForm from "../../../components/Forms/ChooseColorForm"

type EditGoalColorScreenProps = NativeStackScreenProps<EditGoalStackProps, "EditGoalColorScreen">

const EditGoalColorScreen: FC<EditGoalColorScreenProps> = ({route, navigation}) => {
    const {newValues, oldGoal} = route.params

    const handleGoNext = (values: FormColoredHabitValues) => {
        navigation.navigate("EditGoalIconScreen", {
            newValues: {...newValues, ...values}, 
            oldGoal
        })
    }

    const CURRENT_STEP_DETAILS = getAddGoalStepsDetails(AddGoalScreenType.ChooseColorScreenGoal)

    const totalSteps = CURRENT_STEP_DETAILS.TOTAL_STEPS
    const currentStep = CURRENT_STEP_DETAILS.CURRENT_STEP
    
    return(
        <ChooseColorForm
            handleGoNext={handleGoNext}
            defaultColor={oldGoal.color}
            totalSteps={totalSteps}
            currentStep={currentStep}
        />
    )
}

export default EditGoalColorScreen