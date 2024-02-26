import ChooseIconForm from "../../../components/Forms/ChooseIconForm"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AddScreenStackType } from "../../../navigation/BottomTabNavigator"
import { FC } from "react"
import { FormIconedHabitValues } from "../../../types/FormHabitTypes"
import { AddHabitScreenType, getAddHabitStepsDetails } from "../../../constants/BasicConstants"

type ChooseIconScreenProps = NativeStackScreenProps<AddScreenStackType, "ChooseIconScreen">

export const ChooseIconScreen: FC<ChooseIconScreenProps> = ({navigation, route}) => {

    const {habit} = route.params

    const handleGoNext = (values: FormIconedHabitValues) => {
        navigation.navigate("AddHabitSteps", {
                habit: {...habit, ...values}
            })
    }

    const CURRENT_STEP_DETAILS = getAddHabitStepsDetails(habit.objectifID ?? null, AddHabitScreenType.ChooseIconScreen)

    const totalSteps = CURRENT_STEP_DETAILS.TOTAL_STEPS
    const currentStep = CURRENT_STEP_DETAILS.CURRENT_STEP

    return(
        <ChooseIconForm
            handleGoNext={handleGoNext}
            totalSteps={totalSteps}
            currentStep={currentStep}
        />
    )
}