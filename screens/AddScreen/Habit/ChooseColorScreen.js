import { useNavigation, useRoute } from "@react-navigation/native"
import ChooseColorForm from "../../../components/Forms/ChooseColorForm.js"

export const ChooseColorScreen = () => {

    const navigation = useNavigation()

    const route = useRoute()
    const {habit} = route.params

    const handleGoNext = (values) => {
        navigation.navigate("ChooseIconScreen", {habit: {...habit, ...values}})
    }

    return(
        <ChooseColorForm 
            habit={habit}
            handleGoNext={handleGoNext}/>
    )
}