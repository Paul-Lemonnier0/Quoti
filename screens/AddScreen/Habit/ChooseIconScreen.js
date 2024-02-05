import { useNavigation, useRoute } from "@react-navigation/native"
import ChooseColorForm from "../../../components/Forms/ChooseColorForm.js"
import ChooseIconForm from "../../../components/Forms/ChooseIconForm.js"

export const ChooseIconScreen = () => {

    const navigation = useNavigation()

    const route = useRoute()
    const {habit} = route.params

    const handleGoNext = (values) => {
        navigation.navigate("AddHabitSteps", {habit: {...habit, ...values}})
    }

    return(
        <ChooseIconForm
            habit={habit}
            handleGoNext={handleGoNext}/>
    )
}