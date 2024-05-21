import { FC, useContext } from "react"
import { BottomSheetModalMethodsContext } from "../../../data/BottomSheetModalContext"
import HabitForm from "../../../components/Forms/HabitForm"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FormBasicHabit, FormIconedHabitValues } from "../../../types/FormHabitTypes"
import { AddHabitToGoalStackType } from "./AddHabitToGoalNav"
import React from "react"
import ChooseIconForm from "../../../components/Forms/ChooseIconForm"
import { AddHabitScreenType, getAddHabitStepsDetails } from "../../../constants/BasicConstants"
import { BottomScreenOpen_Impact } from "../../../constants/Impacts"

type ChooseGoalHabitIconProps = NativeStackScreenProps<AddHabitToGoalStackType, "ChooseGoalHabitIcon">

export const ChooseGoalHabitIcon: FC<ChooseGoalHabitIconProps> = ({route, navigation}) => {
    const {habit} = route.params

    const handleGoNext = (icon: FormIconedHabitValues) => {
        navigation.navigate("AddGoalHabitSteps", {habit: {...habit, ...icon}})
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
