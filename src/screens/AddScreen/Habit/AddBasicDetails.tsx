import { FC, useContext } from "react"
import { HabitsContext } from "../../../data/HabitContext"
import HabitForm from "../../../components/Forms/HabitForm"
import { AddScreenStackType } from "../../../navigation/BottomTabNavigator"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FormBasicHabit } from "../../../types/FormHabitTypes"
import React from "react"

type AddBasicDetailsProps = NativeStackScreenProps<AddScreenStackType, "AddBasicDetails">

export const AddBasicDetails: FC<AddBasicDetailsProps> = ({navigation}) => {

    const {Objectifs} = useContext(HabitsContext)    

    const handleGoNext = (values: FormBasicHabit) => {

        if(values.objectifID){
            const objectif = Objectifs[values.objectifID]
            navigation.navigate("ChooseIconScreen", {habit: {...values, color: objectif.color}})
        }

        else{
            navigation.navigate("ChooseColorScreen", {habit: {...values}})

        }
    }

    return(
        <HabitForm handleGoNext={handleGoNext}/>
    )
}