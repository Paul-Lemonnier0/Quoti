import { useNavigation, useRoute } from "@react-navigation/native";
import ChooseIconForm from "../../../components/Forms/ChooseIconForm";
import { EditHabitStackProps } from "./EditHabitNav";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { FormIconedHabitValues } from "../../../types/FormHabitTypes";
import { AddHabitScreenType, getAddHabitStepsDetails } from "../../../constants/BasicConstants";
import React from "react"
import { BottomScreenOpen_Impact } from "../../../constants/Impacts";

type EditIconHabitScreenProps = NativeStackScreenProps<EditHabitStackProps, "EditIconHabitScreen">

const EditIconHabitScreen: FC<EditIconHabitScreenProps> = ({route, navigation}) => {
    const {newValues, oldHabit, isNewObjectifHabit} = route.params
    
    const handleGoNext = (values: FormIconedHabitValues) => {
        BottomScreenOpen_Impact()
        navigation.navigate("EditHabitStepsScreen", {
            newValues: {...newValues, ...values}, 
            oldHabit,
            isNewObjectifHabit
        })
    }

    const CURRENT_STEP_DETAILS = getAddHabitStepsDetails(oldHabit.objectifID ?? null, AddHabitScreenType.ChooseIconScreen)

    const totalSteps = CURRENT_STEP_DETAILS.TOTAL_STEPS + (isNewObjectifHabit ? 0 : -1)
    const currentStep = CURRENT_STEP_DETAILS.CURRENT_STEP

    return(
        <ChooseIconForm
            handleGoNext={handleGoNext}
            defaultIcon={oldHabit.icon}
            totalSteps={totalSteps}
            currentStep={currentStep}
        />
    )
}

export default EditIconHabitScreen