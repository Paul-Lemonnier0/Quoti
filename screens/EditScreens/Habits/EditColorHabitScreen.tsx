import { FC } from "react";
import ChooseColorForm from "../../../components/Forms/ChooseColorForm"
import { useNavigation, useRoute } from "@react-navigation/native";
import { FormColoredHabitValues } from "../../../types/FormHabitTypes";
import { EditHabitStackProps } from "./EditHabitNav";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type EditColorHabitScreenProps = NativeStackScreenProps<EditHabitStackProps, "EditColorHabitScreen">

const EditColorHabitScreen: FC<EditColorHabitScreenProps> = ({route, navigation}) => {
    const {newValues, oldHabit} = route.params

    const handleGoNext = (values: FormColoredHabitValues) => {
        navigation.navigate("EditIconHabitScreen", {
            newValues: {...newValues, ...values}, 
            oldHabit
        })
    }

    return(
        <ChooseColorForm
            isForModifyingHabit
            handleGoNext={handleGoNext}
            habit={{...oldHabit, ...newValues}}
        />
    )
}

export default EditColorHabitScreen