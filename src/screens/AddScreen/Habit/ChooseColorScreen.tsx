import ChooseColorForm from "../../../components/Forms/ChooseColorForm"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FC } from "react"
import {  FormColoredHabitValues } from "../../../types/FormHabitTypes"
import { AddHabitScreenType, getAddHabitStepsDetails } from "../../../constants/BasicConstants"
import React from "react"
import { AddScreenStackType } from "../../../navigation/AddScreenNavigator"
import { BottomScreenOpen_Impact } from "../../../constants/Impacts"

type ChooseColorScreenProps = NativeStackScreenProps<AddScreenStackType, "ChooseColorScreen">

export const ChooseColorScreen: FC<ChooseColorScreenProps> = ({navigation, route}) => {

    const {habit} = route.params

    const handleGoNext = (values: FormColoredHabitValues) => {
        navigation.navigate("ChooseIconScreen", {habit: {...habit, ...values}})
        BottomScreenOpen_Impact()
    }

    const CURRENT_STEP_DETAILS = getAddHabitStepsDetails(habit.objectifID ?? null, AddHabitScreenType.ChooseColorScreen)

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