import { FC, useContext } from "react"
import { BottomSheetModalMethodsContext } from "../../../data/BottomSheetModalContext"
import HabitForm from "../../../components/Forms/HabitForm"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FormBasicHabit } from "../../../types/FormHabitTypes"
import { AddHabitToGoalStackType } from "./AddHabitToGoalNav"
import React from "react"
import { BottomScreenOpen_Impact } from "../../../constants/Impacts"

type AddBasicsGoalHabitDetailsProps = NativeStackScreenProps<AddHabitToGoalStackType, "AddBasicsGoalHabitDetails">

export const AddBasicsGoalHabitDetails: FC<AddBasicsGoalHabitDetailsProps> = ({route, navigation}) => {
    const {color, goalID} = route.params
    const {closeModal} = useContext(BottomSheetModalMethodsContext)

    const handleGoNext = (values: FormBasicHabit) => {
        navigation.navigate("ChooseGoalHabitIcon", {habit: {...values, color}})
        BottomScreenOpen_Impact()
    }

    return(
        <HabitForm
            isForCreateObjectiveHabit
            handleGoNext={handleGoNext}
            closeModal={closeModal}
            constGoalID={goalID}
        />
    )
}
