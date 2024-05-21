import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { FC } from "react"
import { EditGoalStackProps } from "./EditGoalNav"
import { AddGoalScreenType, getAddGoalStepsDetails } from "../../../constants/BasicConstants"
import { FormIconedHabitValues } from "../../../types/FormHabitTypes"
import ChooseIconForm from "../../../components/Forms/ChooseIconForm"

type EditGoalIconScreenProps = NativeStackScreenProps<EditGoalStackProps, "EditGoalIconScreen">

const EditGoalIconScreen: FC<EditGoalIconScreenProps> = ({route, navigation}) => {
    const {newValues, oldGoal} = route.params

    const handleGoNext = (values: FormIconedHabitValues) => {
        navigation.navigate("EditGoalHabitsScreen", {
            newValues: {...newValues, ...values}, 
            oldGoal
        })
    }

    const CURRENT_STEP_DETAILS = getAddGoalStepsDetails(AddGoalScreenType.ChooseIconScreenGoal)

    const totalSteps = CURRENT_STEP_DETAILS.TOTAL_STEPS
    const currentStep = CURRENT_STEP_DETAILS.CURRENT_STEP
    
    return(
        <ChooseIconForm
            handleGoNext={handleGoNext}
            defaultIcon={oldGoal.icon}
            totalSteps={totalSteps}
            currentStep={currentStep}
        />
    )
}

export default EditGoalIconScreen