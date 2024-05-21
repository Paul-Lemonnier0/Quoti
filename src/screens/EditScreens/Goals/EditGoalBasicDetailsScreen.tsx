import React, { FC, useContext } from "react"
import { EditGoalStackProps } from "./EditGoalNav"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { GoalBasicForm } from "../../../components/Forms/GoalForm/GoalBasicForm"
import { BottomSheetModalMethodsContext } from "../../../data/BottomSheetModalContext"
import { FormBasicGoal } from "../../../types/FormGoalTypes"

type EditGoalBasicDetailsScreenProps = NativeStackScreenProps<EditGoalStackProps, "EditGoalBasicDetailsScreen">

const EditGoalBasicDetailsScreen: FC<EditGoalBasicDetailsScreenProps> = ({route, navigation}) => {
    const {closeModal} = useContext(BottomSheetModalMethodsContext)
    const {goal} = route.params

    const handleGoNext = (values: FormBasicGoal) => {
        navigation.navigate("EditGoalColorScreen", {newValues: {...values}, oldGoal: {...goal}})
    }

    return(
        <GoalBasicForm
            handleGoNext={handleGoNext}
            goal={goal}
            closeModal={closeModal}/>
    )
}

export default EditGoalBasicDetailsScreen