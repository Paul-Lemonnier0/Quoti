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
    const {habit, isNewGoalHabit, goalColor, constGoalID} = route.params

    const handleGoNext = (values: FormBasicHabit | Habit) => {
        BottomScreenOpen_Impact()

        if(!isNewGoalHabit) {
            navigation.navigate("EditColorHabitScreen", {newValues: {...values as FormBasicHabit}, oldHabit: {...habit}, isNewGoalHabit})
        }

        else if (goalColor) {
            navigation.navigate("EditIconHabitScreen", {newValues: {...values as FormBasicHabit, color: goalColor} , oldHabit: {...habit}, isNewGoalHabit})
        }

        else console.log("Edit goal without goal color")
    }

    console.log(isNewGoalHabit)

    return(
        <HabitForm
            isForModifyingHabit
            isForCreateObjectiveHabit={isNewGoalHabit}
            baseHabit={habit}
            handleGoNext={handleGoNext}
            closeModal={closeModal}
            constGoalID={constGoalID}
        />
    )
}

export default EditHabitDetailsScreen