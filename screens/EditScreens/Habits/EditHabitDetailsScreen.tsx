import { FC, useContext } from "react";
import { BottomSheetModalMethodsContext } from "../../../data/BottomSheetModalContext";
import HabitForm from "../../../components/Forms/HabitForm";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { EditHabitStackProps } from "./EditHabitNav";
import { Habit } from "../../../types/HabitTypes";
import { FormBasicHabit } from "../../../types/FormHabitTypes";

type EditHabitDetailsScreenProps = NativeStackScreenProps<EditHabitStackProps, "EditHabitDetailsScreen">

const EditHabitDetailsScreen: FC<EditHabitDetailsScreenProps> = ({route, navigation}) => {

    const {closeModal} = useContext(BottomSheetModalMethodsContext)
    const {habit} = route.params

    const handleGoNext = (values: FormBasicHabit | Habit) => {
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

export default EditHabitDetailsScreen