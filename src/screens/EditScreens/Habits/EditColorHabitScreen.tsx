import { FC } from "react";
import ChooseColorForm from "../../../components/Forms/ChooseColorForm"
import { useNavigation, useRoute } from "@react-navigation/native";
import { FormColoredHabitValues } from "../../../types/FormHabitTypes";
import { EditHabitStackProps } from "./EditHabitNav";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AddHabitScreenType, getAddHabitStepsDetails } from "../../../constants/BasicConstants";
import React from "react"
import { BottomScreenOpen_Impact } from "../../../constants/Impacts";

type EditColorHabitScreenProps = NativeStackScreenProps<EditHabitStackProps, "EditColorHabitScreen">

const EditColorHabitScreen: FC<EditColorHabitScreenProps> = ({route, navigation}) => {
    const {newValues, oldHabit, isNewObjectifHabit} = route.params

    const handleGoNext = (values: FormColoredHabitValues) => {
        BottomScreenOpen_Impact()
        navigation.navigate("EditIconHabitScreen", {
            newValues: {...newValues, ...values}, 
            oldHabit,
            isNewObjectifHabit
        })
    }

    const CURRENT_STEP_DETAILS = getAddHabitStepsDetails(oldHabit.objectifID ?? null, AddHabitScreenType.ChooseColorScreen)

    const totalSteps = CURRENT_STEP_DETAILS.TOTAL_STEPS + (isNewObjectifHabit ? 0 : -1)
    const currentStep = CURRENT_STEP_DETAILS.CURRENT_STEP

    return(

        <ChooseColorForm
            handleGoNext={handleGoNext}
            defaultColor={oldHabit.color}
            totalSteps={totalSteps}
            currentStep={currentStep}
        />
    )
}

export default EditColorHabitScreen