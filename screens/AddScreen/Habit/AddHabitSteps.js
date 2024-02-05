import { useNavigation, useRoute } from "@react-navigation/native"
import HabitStepsForm from "../../../components/Forms/HabitStepsForm"

export default AddHabitSteps = () =>  {
    
    const navigation = useNavigation()

    const route = useRoute()
    const {habit} = route.params

    const handleGoNext = (values) => {
        navigation.navigate("CreateHabitDetails", {habit: {...habit, ...values}})
    }

    return <HabitStepsForm
                habit={habit} 
                handleGoNext={handleGoNext}/>
}