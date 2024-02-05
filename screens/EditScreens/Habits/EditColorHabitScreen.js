import ChooseColorForm from "../../../components/Forms/ChooseColorForm"
import { useNavigation, useRoute } from "@react-navigation/native";

export default EditColorHabitScreen = () => {
    const navigation = useNavigation();

    const route = useRoute()
    const {newValues, oldHabit} = route.params

    const handleGoNext = (values) => {
        navigation.navigate("EditIconHabitScreen", {newValues: {...newValues, ...values}, oldHabit})
    }


    return(
        <ChooseColorForm
            isForModifyingHabit
            handleGoNext={handleGoNext}
            habit={oldHabit}
        />
    )
}