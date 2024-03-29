import { FC, useContext } from "react"
import { BottomSheetModalMethodsContext } from "../../../data/BottomSheetModalContext"
import HabitForm from "../../../components/Forms/HabitForm"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FormBasicHabit, FormIconedHabitValues } from "../../../types/FormHabitTypes"
import { AddHabitToObjectifStackType } from "./AddHabitToObjectifNav"
import React from "react"
import ChooseIconForm from "../../../components/Forms/ChooseIconForm"
import { AddHabitScreenType, getAddHabitStepsDetails } from "../../../constants/BasicConstants"

type ChooseIconScreenObjProps = NativeStackScreenProps<AddHabitToObjectifStackType, "ChooseIconScreenObj">

export const ChooseIconScreenObj: FC<ChooseIconScreenObjProps> = ({route, navigation}) => {
    const {habit} = route.params
    const {closeModal} = useContext(BottomSheetModalMethodsContext)

    const handleGoNext = (icon: FormIconedHabitValues) => {
        navigation.navigate("AddHabitStepsObj", {habit: {...habit, ...icon}})
    }

    const CURRENT_STEP_DETAILS = getAddHabitStepsDetails(habit.objectifID ?? null, AddHabitScreenType.ChooseIconScreen)

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
