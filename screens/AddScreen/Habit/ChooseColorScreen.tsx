import ChooseColorForm from "../../../components/Forms/ChooseColorForm"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AddScreenStackType } from "../../../navigation/BottomTabNavigator"
import { FC } from "react"
import {  FormColoredHabitValues } from "../../../types/FormHabitTypes"

type ChooseColorScreenProps = NativeStackScreenProps<AddScreenStackType, "ChooseColorScreen">

export const ChooseColorScreen: FC<ChooseColorScreenProps> = ({navigation, route}) => {

    const {habit} = route.params

    const handleGoNext = (values: FormColoredHabitValues) => {
        navigation.navigate("ChooseIconScreen", {habit: {...habit, ...values}})
    }

    return(
        <ChooseColorForm 
            habit={habit}
            handleGoNext={handleGoNext}/>
    )
}