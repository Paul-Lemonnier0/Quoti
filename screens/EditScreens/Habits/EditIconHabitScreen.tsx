import { useNavigation, useRoute } from "@react-navigation/native";
import ChooseIconForm from "../../../components/Forms/ChooseIconForm";
import { EditHabitStackProps } from "./EditHabitNav";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { FormIconedHabitValues } from "../../../types/FormHabitTypes";

type EditIconHabitScreenProps = NativeStackScreenProps<EditHabitStackProps, "EditIconHabitScreen">

const EditIconHabitScreen: FC<EditIconHabitScreenProps> = ({route, navigation}) => {
    const {newValues, oldHabit} = route.params

    const handleGoNext = (values: FormIconedHabitValues) => {
        navigation.navigate("EditHabitStepsScreen", {
            newValues: {...newValues, ...values}, 
            oldHabit
        })
    }

    return(
        <ChooseIconForm
            isForModifyingHabit
            handleGoNext={handleGoNext}
            habit={{...oldHabit, ...newValues}}
        />
    )
}

export default EditIconHabitScreen