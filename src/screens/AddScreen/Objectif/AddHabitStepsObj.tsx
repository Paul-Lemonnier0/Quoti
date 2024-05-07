import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AddHabitToObjectifStackType } from "./AddHabitToObjectifNav"
import { FC } from "react"
import { FormStepsHabitValues } from "../../../types/FormHabitTypes"
import HabitStepsForm from "../../../components/Forms/HabitStepsForm"
import React from "react"
import { BottomScreenOpen_Impact } from "../../../constants/Impacts"

type AddHabitStepsProps = NativeStackScreenProps<AddHabitToObjectifStackType, "AddHabitStepsObj">

export const AddHabitStepsObj: FC<AddHabitStepsProps> = ({route, navigation}) => {

    const {habit} = route.params

    const handleGoNext = (values: FormStepsHabitValues) => {
        navigation.navigate("CreateObjectifHabitDetails", {habit: {...habit, ...values}})
        BottomScreenOpen_Impact()
    }

    return <HabitStepsForm
                habit={habit} 
                handleGoNext={handleGoNext}/>
}

export default AddHabitStepsObj