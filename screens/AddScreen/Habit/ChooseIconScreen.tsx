import ChooseIconForm from "../../../components/Forms/ChooseIconForm"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AddScreenStackType } from "../../../navigation/BottomTabNavigator"
import { FC } from "react"
import { FormIconedHabitValues } from "../../../types/FormHabitTypes"

type ChooseIconScreenProps = NativeStackScreenProps<AddScreenStackType, "ChooseIconScreen">

export const ChooseIconScreen: FC<ChooseIconScreenProps> = ({navigation, route}) => {

    const {habit} = route.params

    const handleGoNext = (values: FormIconedHabitValues) => {
        navigation.navigate("AddHabitSteps", {
                habit: {...habit, ...values}
            })
    }

    return(
        <ChooseIconForm
            habit={habit}
            handleGoNext={handleGoNext}/>
    )
}