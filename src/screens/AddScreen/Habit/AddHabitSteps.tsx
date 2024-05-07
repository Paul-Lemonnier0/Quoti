import HabitStepsForm from "../../../components/Forms/HabitStepsForm"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FC } from "react"
import { FormStepsHabitValues } from "../../../types/FormHabitTypes"
import React from "react"
import { AddScreenStackType } from "../../../navigation/AddScreenNavigator"
import { BottomScreenOpen_Impact } from "../../../constants/Impacts"

type AddHabitStepsProps = NativeStackScreenProps<AddScreenStackType, "AddHabitSteps">

const AddHabitSteps: FC<AddHabitStepsProps> = ({navigation, route}) =>  {
    
    const {habit} = route.params

    const handleGoNext = (values: FormStepsHabitValues) => {
        navigation.navigate("CreateHabitDetails", {habit: {...habit, ...values}})
        BottomScreenOpen_Impact()
    }

    return <HabitStepsForm
                habit={habit} 
                handleGoNext={handleGoNext}/>
}

export default AddHabitSteps