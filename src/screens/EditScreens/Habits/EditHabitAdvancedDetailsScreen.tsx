import HabitAdvancedDetailsForm from "../../../components/Forms/HabitAdvancedDetailsForm"
import { FC, useContext } from "react";
import { BottomSheetModalMethodsContext } from "../../../data/BottomSheetModalContext";
import { Success_Impact } from "../../../constants/Impacts";
import { EditHabitContext } from "./EditHabitContext";
import { FormDetailledHabitValues } from "../../../types/FormHabitTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { EditHabitStackProps } from "./EditHabitNav";
import React from "react"

type EditHabitAdvancedDetailsScreenProps = NativeStackScreenProps<EditHabitStackProps, "EditHabitAdvancedDetailsScreen">

const EditHabitAdvancedDetailsScreen: FC<EditHabitAdvancedDetailsScreenProps> = ({route}) => {

    const {closeModal} = useContext(BottomSheetModalMethodsContext)
    const {validationAdditionnalMethod} = useContext(EditHabitContext)

    const {newValues, oldHabit, isNewGoalHabit} = route.params

    const handleGoNext = async(values: FormDetailledHabitValues) => {
        if(isNewGoalHabit) {
            validationAdditionnalMethod ? validationAdditionnalMethod({...newValues, ...values, habitID: oldHabit.habitID}) : null
            Success_Impact()
            closeModal()
        }
    }

    return(
        <HabitAdvancedDetailsForm
            isForModifyingHabit
            habit={oldHabit}
            isNewGoalHabit
            handleGoNext={handleGoNext}
        />
    )
}

export default EditHabitAdvancedDetailsScreen