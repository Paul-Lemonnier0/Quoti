import { FC, useContext } from "react";
import { BottomSheetModalMethodsContext } from "../../../data/BottomSheetModalContext";
import HabitForm from "../../../components/Forms/HabitForm";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { EditHabitStackProps } from "./EditHabitNav";
import { Habit } from "../../../types/HabitTypes";
import { FormBasicHabit } from "../../../types/FormHabitTypes";
import React from "react"

type EditHabitDetailsScreenProps = NativeStackScreenProps<EditHabitStackProps, "EditHabitDetailsScreen">

const EditHabitDetailsScreen: FC<EditHabitDetailsScreenProps> = ({route, navigation}) => {

    const {closeModal} = useContext(BottomSheetModalMethodsContext)
    const {habit, isNewObjectifHabit, objectifColor, constObjectifID} = route.params

    const handleGoNext = (values: FormBasicHabit | Habit) => {
        if(!isNewObjectifHabit) {
            navigation.navigate("EditColorHabitScreen", {newValues: {...values}, oldHabit: {...habit}, isNewObjectifHabit})
        }

        else if (objectifColor) {
            navigation.navigate("EditIconHabitScreen", {newValues: {...values, color: objectifColor}, oldHabit: {...habit}, isNewObjectifHabit})
        }

        else console.log("Edit objectif without objectif color")
    }

    return(
        <HabitForm
            isForModifyingHabit
            baseHabit={habit}
            handleGoNext={handleGoNext}
            closeModal={closeModal}
            constObjectifID={constObjectifID}
        />
    )
}

export default EditHabitDetailsScreen