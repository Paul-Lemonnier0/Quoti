import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext } from "react";
import { BottomSheetModalMethodsContext } from "../../../data/BottomSheetModalContext";
import HabitForm from "../../../components/Forms/HabitForm";

export default EditHabitDetailsScreen = () => {

    const navigation = useNavigation();
    const {closeModal} = useContext(BottomSheetModalMethodsContext)

    const route = useRoute()
    const {habit} = route.params

    const handleGoNext = (values) => {
        navigation.navigate("EditColorHabitScreen", {newValues: {...values}, oldHabit: {...habit}})
    }

    return(
        <HabitForm
            isForModifyingHabit
            baseHabit={habit}
            handleGoNext={handleGoNext}
            closeModal={closeModal}
        />
    )
}