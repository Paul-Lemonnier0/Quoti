import HabitAdvancedDetailsForm from "../../../components/Forms/HabitAdvancedDetailsForm"
import { FC, useContext } from "react";
import { BottomSheetModalMethodsContext } from "../../../data/BottomSheetModalContext";
import { HabitsContext } from "../../../data/HabitContext";
import { convertBackSeriazableHabit } from "../../../primitives/HabitMethods";
import { AppContext } from "../../../data/AppContext";
import { Success_Impact } from "../../../constants/Impacts";
import { EditHabitContext } from "./EditHabitContext";
import { FormDetailledHabitValues, FormFullStep, FormPlaceholderStep, FormStep } from "../../../types/FormHabitTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { EditHabitStackProps } from "./EditHabitNav";
import { SeriazableHabit, Step } from "../../../types/HabitTypes";
import React from "react"

type EditHabitAdvancedDetailsScreenProps = NativeStackScreenProps<EditHabitStackProps, "EditHabitAdvancedDetailsScreen">

const EditHabitAdvancedDetailsScreen: FC<EditHabitAdvancedDetailsScreenProps> = ({route, navigation}) => {

    const {closeModal} = useContext(BottomSheetModalMethodsContext)
    const {setIsLoading} = useContext(AppContext)
    const {validationAdditionnalMethod} = useContext(EditHabitContext)

    const {updateHabit} = useContext(HabitsContext)

    const {newValues, oldHabit, isNewObjectifHabit} = route.params

    const notSameHabit = (newHabit: SeriazableHabit) => {
        for(let oldKey of Object.keys(oldHabit)){
            if(oldKey !== "steps" && (!newHabit.hasOwnProperty(oldKey) || newHabit[oldKey] !== oldHabit[oldKey])){
                return true
            }
        }

        if(newValues.steps) {

            let oldSteps = Object.values((oldHabit as SeriazableHabit).steps)

            const isOldStepPlaceholder = oldSteps.length === 1 && oldSteps[0].stepID === oldHabit.habitID

            const isNewStepPlaceholder = newValues.steps.filter((step) => (step.numero === -1)).length > 0

            if(isOldStepPlaceholder || isNewStepPlaceholder) {
                return !(isOldStepPlaceholder && isNewStepPlaceholder)
            }

            oldSteps = oldSteps.map((step) => {
                if(step.created){
                    const createdDate = new Date(step.created)
                    return {...step, created: createdDate.toISOString()}
                }

                if(step.deleted){
                    const deletedDate = new Date(step.deleted)
                    return {...step, deleted: deletedDate.toISOString()}
                }

                return {...step}
            })
            

            if(oldSteps.length !== newValues.steps.length){
                return true
            }

            for(let i = 0; i < oldSteps.length; ++i){
                for(let oldStepKey of Object.keys(newValues.steps[i])){
                    if(!oldSteps[i].hasOwnProperty(oldStepKey)){
                        return true
                    }
        
                    if(newValues.steps[i][oldStepKey] !== oldSteps[i][oldStepKey]){
                        return true
                    }
                }
            }
        }

        return false
    }

    const handleGoNext = async(values: FormDetailledHabitValues) => {
        if(!isNewObjectifHabit) {
            const updatedHabit = {...oldHabit, ...values, ...newValues, steps: {}} as SeriazableHabit

            if(notSameHabit(updatedHabit)){
                setIsLoading(true)

                const convertedOldHabit = convertBackSeriazableHabit(oldHabit as SeriazableHabit)

                try{
                    const steps = {}

                    newValues.steps.forEach((step) => {
                        if(step.numero === -1){
                            steps[oldHabit.habitID] = {...step}
                        }
            
                        else {
                            steps[(step as Step | FormFullStep).stepID] = {...step}
                        }
                    })

                    let objectifID: string | null = null
                    if("objectifID" in newValues) {
                        objectifID = newValues.objectifID ?? null
                    }

                    closeModal()
                    validationAdditionnalMethod ? validationAdditionnalMethod({...oldHabit, ...values, ...newValues}) : null
                    await updateHabit(convertedOldHabit, {...newValues, ...values, objectifID, steps})
                    setIsLoading(false)
                    Success_Impact()
                    
                    console.log("habit updated")
                }
        
                catch(e){
                    console.log("Error while editing habit : ", e)
                }
        
                setIsLoading(false)
            }

            else{
                validationAdditionnalMethod ? validationAdditionnalMethod({...newValues, ...values, habitID: oldHabit.habitID}) : null
                Success_Impact()
                closeModal()
            }
        }

        else {

            validationAdditionnalMethod ? validationAdditionnalMethod({...newValues, ...values, habitID: oldHabit.habitID}) : null
            Success_Impact()
            closeModal()
        }
    }

    return(
        <HabitAdvancedDetailsForm
            isForModifyingHabit
            habit={oldHabit}
            isNewObjectifHabit
            handleGoNext={handleGoNext}
        />
    )
}

export default EditHabitAdvancedDetailsScreen