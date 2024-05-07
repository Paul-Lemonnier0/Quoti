import HabitAdvancedDetailsForm from "../../../components/Forms/HabitAdvancedDetailsForm"
import { FC, useContext } from "react";
import { BottomSheetModalMethodsContext } from "../../../data/BottomSheetModalContext";
import { Success_Impact } from "../../../constants/Impacts";
import { EditHabitContext } from "./EditHabitContext";
import { FormDetailledHabitValues } from "../../../types/FormHabitTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { EditHabitStackProps } from "./EditHabitNav";
import React from "react"
import { EditHabitFrequencyStackProps } from "./EditHabitFrequencyNav";

type EditHabitFrequencyScreenProps = NativeStackScreenProps<EditHabitFrequencyStackProps, "EditHabitFrequencyScreen">

const EditHabitFrequencyScreen: FC<EditHabitFrequencyScreenProps> = ({route}) => {

    const {closeModal} = useContext(BottomSheetModalMethodsContext)
    const {validationAdditionnalMethod} = useContext(EditHabitContext)

    const {oldHabit} = route.params

    const handleGoNext = async(values: FormDetailledHabitValues) => {
        
    }

    return(
        <HabitAdvancedDetailsForm
            isForModifyingHabit
            habit={oldHabit}
            isNewObjectifHabit
            handleGoNext={handleGoNext}
        />
    )
}

export default EditHabitFrequencyScreen