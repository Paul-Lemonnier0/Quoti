import { View, StyleSheet } from "react-native"
import { FC, useContext, useState } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { AddHabitToObjContext } from "./AddHabitToGoalContext"
import { BottomSheetModalMethodsContext } from "../../../data/BottomSheetModalContext"
import HabitAdvancedDetailsForm from "../../../components/Forms/HabitAdvancedDetailsForm"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AddHabitToGoalStackType } from "./AddHabitToGoalNav"
import { FormDetailledHabitValues } from "../../../types/FormHabitTypes"
import React from "react"
import { Success_Impact } from "../../../constants/Impacts"

type CreateGoalHabitDetailsProps = NativeStackScreenProps<AddHabitToGoalStackType, "CreateGoalHabitDetails">

export const CreateGoalHabitDetails: FC<CreateGoalHabitDetailsProps> = ({navigation, route}) => {

    const {habit} = route.params
    
    const {addHabitForGoal} = useContext(AddHabitToObjContext)
    const {closeModal} = useContext(BottomSheetModalMethodsContext)

    const handleGoNext = (values: FormDetailledHabitValues) => {

        const detailledHabit = {
            ...habit,
            ...values,
            notificationEnabled: true,
            alertTime: ""
          };
        
        Success_Impact()

        addHabitForGoal(detailledHabit)
        closeModal()
    }

    return <HabitAdvancedDetailsForm 
                habit={habit}
                handleGoNext={handleGoNext}/>
}