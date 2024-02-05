import { useNavigation, useRoute } from "@react-navigation/native";
import ChooseIconForm from "../../../components/Forms/ChooseIconForm";

export default EditIconHabitScreen = () => {
    const navigation = useNavigation();

    const route = useRoute()
    const {newValues, oldHabit} = route.params

    const handleGoNext = (values) => {
        navigation.navigate("EditHabitStepsScreen", {newValues: {...newValues, ...values}, oldHabit})
    }


    return(
        <ChooseIconForm
            isForModifyingHabit
            handleGoNext={handleGoNext}
            habit={oldHabit}
        />
    )
}