import HabitAdvancedDetailsForm from "../../../components/Forms/HabitAdvancedDetailsForm"
import { FC, useContext, useState } from "react";
import { BottomSheetModalMethodsContext } from "../../../data/BottomSheetModalContext";
import { Error_Impact, Success_Impact } from "../../../constants/Impacts";
import { EditHabitContext } from "./EditHabitContext";
import { FormDetailledHabitValues } from "../../../types/FormHabitTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { EditHabitStackProps } from "./EditHabitNav";
import React from "react"
import { EditHabitFrequencyStackProps } from "./EditHabitFrequencyNav";
import Toast from "react-native-toast-message";
import { Habit, SeriazableHabit } from "../../../types/HabitTypes";

type EditHabitFrequencyScreenProps = NativeStackScreenProps<EditHabitFrequencyStackProps, "EditHabitFrequencyScreen">

const EditHabitFrequencyScreen: FC<EditHabitFrequencyScreenProps> = ({route, navigation}) => {

    const {closeModal} = useContext(BottomSheetModalMethodsContext)

    const {oldHabit} = route.params
    const [habit, setHabit] = useState<SeriazableHabit>({...oldHabit})

    const handleGoNext = async(values: FormDetailledHabitValues) => {
        const daysOfWeekEquals = JSON.stringify(values.daysOfWeek)==JSON.stringify(oldHabit.daysOfWeek);

        if(daysOfWeekEquals &&
            values.frequency === habit.frequency &&
            values.occurence === habit.occurence &&
            values.reccurence === habit.reccurence) 
        {
            Toast.show({
                type: "info",
                text1: "Aucune modification !"
            })

            Error_Impact()
        }

        else {
            navigation.navigate("InformationEditFrequencyHabit", {oldHabit, newHabit: {...oldHabit, ...values}})
        }
    }

    return(
        <HabitAdvancedDetailsForm
            closeModal={closeModal}
            customCurrentStep={0}
            customTotalStep={2}
            notFinalStep
            isForModifyingHabit
            habit={oldHabit}
            isNewGoalHabit
            handleGoNext={handleGoNext}
        />
    )
}

export default EditHabitFrequencyScreen