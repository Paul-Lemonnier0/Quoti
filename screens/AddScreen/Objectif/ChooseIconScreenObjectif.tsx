import { FC } from "react"
import { AddScreenStackType } from "../../../navigation/BottomTabNavigator"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import ChooseIconForm from "../../../components/Forms/ChooseIconForm"
import { AddObjectifScreenType, getAddObjectifStepsDetails } from "../../../constants/BasicConstants"
import { FormIconedHabitValues } from "../../../types/FormHabitTypes"

type ChooseColorScreenObjectifProps = NativeStackScreenProps<AddScreenStackType , "ChooseIconScreenObjectif">

export const ChooseIconScreenObjectif: FC<ChooseColorScreenObjectifProps> = ({navigation, route}) => {

    const {objectif} = route.params

    
    const handleGoNext = (values: FormIconedHabitValues) => {
        navigation.navigate("AddHabitsToObjectif", {objectif: {...objectif, ...values}})
    } 
    
    const CURRENT_STEP_DETAILS = getAddObjectifStepsDetails(AddObjectifScreenType.ChooseIconScreenObjectif)

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