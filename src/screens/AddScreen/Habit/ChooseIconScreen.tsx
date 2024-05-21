import ChooseIconForm from "../../../components/Forms/ChooseIconForm"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FC } from "react"
import { FormIconedHabitValues } from "../../../types/FormHabitTypes"
import { AddHabitScreenType, getAddHabitStepsDetails } from "../../../constants/BasicConstants"
import React from "react"
import { AddScreenStackType } from "../../../navigation/AddScreenNavigator"
import { BottomScreenOpen_Impact } from "../../../constants/Impacts"

type ChooseIconScreenProps = NativeStackScreenProps<AddScreenStackType, "ChooseIconScreen">

export const ChooseIconScreen: FC<ChooseIconScreenProps> = ({navigation, route}) => {

    const {habit} = route.params

    const handleGoNext = (values: FormIconedHabitValues) => {
        navigation.navigate("AddHabitSteps", {
            habit: {...habit, ...values}
        })

        BottomScreenOpen_Impact()
    }

    const CURRENT_STEP_DETAILS = getAddHabitStepsDetails(habit.goalID ?? null, AddHabitScreenType.ChooseIconScreen)

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