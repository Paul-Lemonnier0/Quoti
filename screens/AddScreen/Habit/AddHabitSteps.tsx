import { useNavigation, useRoute } from "@react-navigation/native"
import HabitStepsForm from "../../../components/Forms/HabitStepsForm"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AddScreenStackType } from "../../../navigation/BottomTabNavigator"
import { FC } from "react"
import { FormStepsHabitValues } from "../../../types/FormHabitTypes"

type AddHabitStepsProps = NativeStackScreenProps<AddScreenStackType, "AddHabitSteps">

const AddHabitSteps: FC<AddHabitStepsProps> = ({navigation, route}) =>  {
    
    const {habit} = route.params

    const handleGoNext = (values: FormStepsHabitValues) => {
        navigation.navigate("CreateHabitDetails", {habit: {...habit, ...values}})
    }

    return <HabitStepsForm
                habit={habit} 
                handleGoNext={handleGoNext}/>
}

export default AddHabitSteps