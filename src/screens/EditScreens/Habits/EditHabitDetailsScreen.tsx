import { FC, useContext } from "react";
import { BottomSheetModalMethodsContext } from "../../../data/BottomSheetModalContext";
import HabitForm from "../../../components/Forms/HabitForm";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { EditHabitStackProps } from "./EditHabitNav";
import { Habit } from "../../../types/HabitTypes";
import { FormBasicHabit } from "../../../types/FormHabitTypes";
import React from "react"
import { BottomScreenOpen_Impact } from "../../../constants/Impacts";

type EditHabitDetailsScreenProps = NativeStackScreenProps<EditHabitStackProps, "EditHabitDetailsScreen">

const EditHabitDetailsScreen: FC<EditHabitDetailsScreenProps> = ({route, navigation}) => {

    const {closeModal} = useContext(BottomSheetModalMethodsContext)
    const {habit, isNewObjectifHabit, objectifColor, constObjectifID} = route.params

    const handleGoNext = (values: FormBasicHabit | Habit) => {
        BottomScreenOpen_Impact()

        if(!isNewObjectifHabit) {
            navigation.navigate("EditColorHabitScreen", {newValues: {...values as FormBasicHabit}, oldHabit: {...habit}, isNewObjectifHabit})
        }

        else if (objectifColor) {
            navigation.navigate("EditIconHabitScreen", {newValues: {...values as FormBasicHabit, color: objectifColor} , oldHabit: {...habit}, isNewObjectifHabit})
        }

        else console.log("Edit objectif without objectif color")
    }

    console.log(isNewObjectifHabit)

    return(
        <HabitForm
            isForModifyingHabit
            isForCreateObjectiveHabit={isNewObjectifHabit}
            baseHabit={habit}
            handleGoNext={handleGoNext}
            closeModal={closeModal}
            constObjectifID={constObjectifID}
        />
    )
}

export default EditHabitDetailsScreen