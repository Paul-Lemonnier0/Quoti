import HabitStepsForm from "../../../components/Forms/HabitStepsForm";
import { EditHabitStackProps } from "./EditHabitNav";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useContext } from "react";
import { FormFullStep, FormStepsHabit, FormStepsHabitValues } from "../../../types/FormHabitTypes";
import { SeriazableHabit, Step } from "../../../types/HabitTypes";
import React from "react"
import { convertBackSeriazableHabit, notSameHabit } from "../../../primitives/HabitMethods";
import { AppContext } from "../../../data/AppContext";
import { BottomScreenOpen_Impact, Success_Impact } from "../../../constants/Impacts";
import { HabitsContext } from "../../../data/HabitContext";
import { EditHabitContext } from "./EditHabitContext";
import { BottomSheetModalMethodsContext } from "../../../data/BottomSheetModalContext";
import { setNewSteps } from "../../../primitives/StepMethods";
import { useHabitActions } from "../../../hooks/Habits/useHabitActions";

type EditHabitStepsScreenProps = NativeStackScreenProps<EditHabitStackProps, "EditHabitStepsScreen">

const EditHabitStepsScreen: FC<EditHabitStepsScreenProps> = ({route, navigation}) => {

    const {closeModal} = useContext(BottomSheetModalMethodsContext)
    const {setIsLoading} = useContext(AppContext)
    const {validationAdditionnalMethod} = useContext(EditHabitContext)

    const {updateHabit} = useHabitActions()
    
    const {newValues, oldHabit, isNewObjectifHabit} = route.params

    const handleGoNext = async(values: FormStepsHabitValues) => {
        const updatedStepsArray = setNewSteps(values, oldHabit)
        const finalNewValues: FormStepsHabit = {...newValues, steps: updatedStepsArray}

        if(!isNewObjectifHabit) {
            const updatedHabit = {...oldHabit, ...values, ...newValues, steps: {}} as SeriazableHabit

            if(notSameHabit(finalNewValues, updatedHabit, oldHabit)){
                setIsLoading(true)

                const convertedOldHabit = convertBackSeriazableHabit(oldHabit as SeriazableHabit)

                try{
                    const steps = {}

                    finalNewValues.steps.forEach((step) => {
                        if(step.numero === -1){
                            steps[oldHabit.habitID] = {...step}
                        }
            
                        else {
                            steps[(step as Step | FormFullStep).stepID] = {...step}
                        }
                    })

                    let objectifID: string | null = null
                    if("objectifID" in finalNewValues) {
                        objectifID = finalNewValues.objectifID ?? null
                    }

                    closeModal()
                    validationAdditionnalMethod ? validationAdditionnalMethod({
                        ...oldHabit, 
                        ...values, 
                        ...finalNewValues,
                        habitID: oldHabit.habitID,
                        notificationEnabled: false,
                        alertTime: ""
                    }) : null

                    let newStartingDate = oldHabit.startingDate ?? new Date()
                    if(finalNewValues.startingDate) {
                        newStartingDate = new Date(finalNewValues.startingDate)
                    }

                    await updateHabit(convertedOldHabit, {
                        ...finalNewValues, 
                        ...values, 
                        startingDate: newStartingDate, 
                        objectifID, 
                        steps
                    })

                    setIsLoading(false)
                    Success_Impact()
                    
                    console.log("Habit well updated !")
                }
        
                catch(e){
                    console.log("Error while editing habit : ", e)
                }
        
                setIsLoading(false)
            }

            else{
                validationAdditionnalMethod ? validationAdditionnalMethod({
                    ...oldHabit, 
                    ...newValues,
                    ...values, 
                    habitID: oldHabit.habitID,
                    notificationEnabled: false,
                    alertTime: ""
                }) : null

                Success_Impact()
                closeModal()
            }
        }

        else {
            BottomScreenOpen_Impact()
            
            navigation.navigate("EditHabitAdvancedDetailsScreen", {
                newValues: finalNewValues, 
                oldHabit,
                isNewObjectifHabit
            })
        }
    }

    return(
        <HabitStepsForm
            isNewObjectifHabit={isNewObjectifHabit}
            isForModifyingHabit
            habit={{...oldHabit, ...newValues}}
            handleGoNext={handleGoNext}
        />
    )
}

export default EditHabitStepsScreen
