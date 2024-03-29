import { FC, useContext } from "react"
import { BottomSheetModalMethodsContext } from "../../../data/BottomSheetModalContext"
import HabitForm from "../../../components/Forms/HabitForm"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FormBasicHabit } from "../../../types/FormHabitTypes"
import { AddHabitToObjectifStackType } from "./AddHabitToObjectifNav"
import React from "react"

type AddBasicDetailsHabitObjectifProps = NativeStackScreenProps<AddHabitToObjectifStackType, "AddBasicsHabitDetailsObj">

export const AddBasicDetailsHabitObjectif: FC<AddBasicDetailsHabitObjectifProps> = ({route, navigation}) => {
    const {color, objectifID} = route.params
    const {closeModal} = useContext(BottomSheetModalMethodsContext)

    const handleGoNext = (values: FormBasicHabit) => {
        navigation.navigate("ChooseIconScreenObj", {habit: {...values, color}})
    }

    return(
        <HabitForm
            isForCreateObjectiveHabit
            handleGoNext={handleGoNext}
            closeModal={closeModal}
            constObjectifID={objectifID}
        />
    )
}
