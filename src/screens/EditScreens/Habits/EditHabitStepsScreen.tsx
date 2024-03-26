import HabitStepsForm from "../../../components/Forms/HabitStepsForm";
import { EditHabitStackProps } from "./EditHabitNav";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { FormStep, FormStepsHabitValues } from "../../../types/FormHabitTypes";
import { Step } from "../../../types/HabitTypes";
import React from "react"

type EditHabitStepsScreenProps = NativeStackScreenProps<EditHabitStackProps, "EditHabitStepsScreen">

const EditHabitStepsScreen: FC<EditHabitStepsScreenProps> = ({route, navigation}) => {

    const {newValues, oldHabit} = route.params

    const handleGoNext = (values: FormStepsHabitValues) => {

        let oldStepsArray = Object.values(oldHabit.steps)

        let updatedStepsArray: (Step | FormStep)[] = oldStepsArray.filter((step) => step.stepID !== oldHabit.habitID)

        updatedStepsArray = updatedStepsArray.map((step) => {
            if(step as Step){
                const createdDate = new Date((step as Step).created)
                return {...step, created: createdDate.toDateString()}
            }

            return {...step}
        })

        if(values.steps){
            const today = new Date().toDateString()
            const stepsAsSteps: Step[] = values.steps.filter((step): step is Step => 'stepID' in step);

            const stepsID = stepsAsSteps.map((step) => (step.stepID))
            
            //les deleted et les intacts
            updatedStepsArray = updatedStepsArray.map((step) => {
                if(step as Step){
                    if(!stepsID.includes((step as Step).stepID)) {
                        return step = {...step, deleted: today}
                    }
                }

                return {...step}
            })

            //les added
            values.steps.forEach(step => {
                if(step as FormStep){
                    updatedStepsArray.push({...step, created: today})
                }

                else if(step as Step && !oldHabit.steps.hasOwnProperty((step as Step).stepID)) {
                    updatedStepsArray.push({...step, created: today})
                }
            });
        }

        navigation.navigate("EditHabitAdvancedDetailsScreen", {newValues: {...newValues, steps: updatedStepsArray}, oldHabit})
    }

    return(
        <HabitStepsForm
            isForModifyingHabit
            habit={{...oldHabit, ...newValues}}
            handleGoNext={handleGoNext}
        />
    )
}

export default EditHabitStepsScreen
