import { View, StyleSheet } from "react-native"
import { FC, useContext, useState } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { AddHabitToObjContext } from "./AddHabitToObjContext"
import { BottomSheetModalMethodsContext } from "../../../data/BottomSheetModalContext"
import HabitAdvancedDetailsForm from "../../../components/Forms/HabitAdvancedDetailsForm"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AddHabitToObjectifStackType } from "./AddHabitToObjectifNav"
import { FormDetailledHabitValues } from "../../../types/FormHabitTypes"

type CreateObjectifHabitDetailsProps = NativeStackScreenProps<AddHabitToObjectifStackType, "CreateObjectifHabitDetails">

export const CreateObjectifHabitDetails: FC<CreateObjectifHabitDetailsProps> = ({navigation, route}) => {

    const {habit} = route.params
    
    const {addHabitForObjectif} = useContext(AddHabitToObjContext)
    const {closeModal} = useContext(BottomSheetModalMethodsContext)

    const handleGoNext = (values: FormDetailledHabitValues) => {

        const detailledHabit = {
            ...habit,
            ...values,
            notificationEnabled: true,
            alertTime: ""
          };
        
        addHabitForObjectif(detailledHabit)
        closeModal()
    }

    return <HabitAdvancedDetailsForm 
                habit={habit}
                handleGoNext={handleGoNext}/>
}