import React, { FC } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import ChooseIconForm from "../../../components/Forms/ChooseIconForm"
import { AddGoalScreenType, getAddGoalStepsDetails } from "../../../constants/BasicConstants"
import { FormIconedHabitValues } from "../../../types/FormHabitTypes"
import { AddScreenStackType } from "../../../navigation/AddScreenNavigator"
import { BottomScreenOpen_Impact } from "../../../constants/Impacts"

type ChooseColorScreenGoalProps = NativeStackScreenProps<AddScreenStackType, "ChooseIconScreenGoal">

export const ChooseIconScreenGoal: FC<ChooseColorScreenGoalProps> = ({navigation, route}) => {

    const {goal} = route.params
    
    const handleGoNext = (values: FormIconedHabitValues) => {
        navigation.navigate("AddHabitsToGoal", {goal: {...goal, ...values}})
        BottomScreenOpen_Impact()
    } 
    
    const CURRENT_STEP_DETAILS = getAddGoalStepsDetails(AddGoalScreenType.ChooseIconScreenGoal)

    const totalSteps = CURRENT_STEP_DETAILS.TOTAL_STEPS
    const currentStep = CURRENT_STEP_DETAILS.CURRENT_STEP

    return(
        <ChooseIconForm 
            handleGoNext={handleGoNext}
            totalSteps={totalSteps}
            currentStep={currentStep}
        />
    )
}