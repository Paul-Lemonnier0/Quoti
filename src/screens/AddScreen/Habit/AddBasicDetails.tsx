import { FC, useContext } from "react"
import { HabitsContext } from "../../../data/HabitContext"
import HabitForm from "../../../components/Forms/HabitForm"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FormBasicHabit } from "../../../types/FormHabitTypes"
import React from "react"
import { AddScreenStackType } from "../../../navigation/AddScreenNavigator"
import { BottomScreenOpen_Impact } from "../../../constants/Impacts"

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

        BottomScreenOpen_Impact()
    }

    return(
        <HabitForm handleGoNext={handleGoNext}/>
    )
}