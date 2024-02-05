import HabitAdvancedDetailsForm from "../../../components/Forms/HabitAdvancedDetailsForm"
import { useRoute } from "@react-navigation/native";
import { useContext } from "react";
import { BottomSheetModalMethodsContext } from "../../../data/BottomSheetModalContext";
import { HabitsContext } from "../../../data/HabitContext";
import { convertBackSeriazableHabit } from "../../../primitives/HabitMethods";
import { AppContext } from "../../../data/AppContext";
import { Success_Impact } from "../../../constants/Impacts";
import { EditHabitContext } from "./EditHabitContext";

export default EditHabitAdvancedDetailsScreen = () => {

    const {closeModal} = useContext(BottomSheetModalMethodsContext)
    const {setIsLoading} = useContext(AppContext)
    const {validationAdditionnalMethod} = useContext(EditHabitContext)

    const {updateHabit} = useContext(HabitsContext)

    const route = useRoute()
    const {newValues, oldHabit} = route.params

    const notSameHabit = (newHabit) => {

        for(let oldKey of Object.keys(oldHabit)){
            if(oldKey !== "steps" && (!newHabit.hasOwnProperty(oldKey) || newHabit[oldKey] !== oldHabit[oldKey])){
                return true
            }
        }

        if(newValues.steps) {
            let oldSteps = Object.values(oldHabit.steps)

            const isOldStepPlaceholder = oldSteps.length === 1 && oldSteps[0].stepID === oldHabit.habitID

            const isNewStepPlaceholder = newValues.steps.filter((step) => (step.numero === -1)).length > 0

            if(isOldStepPlaceholder || isNewStepPlaceholder) {
                return !(isOldStepPlaceholder && isNewStepPlaceholder)
            }

            oldSteps = oldSteps.map((step) => {
                if(step.created){
                    const createdDate = new Date(step.created)
                    return {...step, created: createdDate.toDateString()}
                }

                if(step.deleted){
                    const deletedDate = new Date(step.deleted)
                    return {...step, deleted: deletedDate.toDateString()}
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

    const handleGoNext = async(values) => {
        const updatedHabit = {...oldHabit, ...values, ...newValues}

        if(notSameHabit(updatedHabit)){
            setIsLoading(true)

            const convertedOldHabit = convertBackSeriazableHabit(oldHabit)

            try{
                closeModal()
                validationAdditionnalMethod ? validationAdditionnalMethod() : null

                const steps = {}

                updatedHabit.steps.forEach((step) => {
                    if(!step.stepID){
                        steps[oldHabit.habitID] = {...step}
                    }
        
                    else {
                        steps[step.stepID] = {...step}
                    }
                })

                await updateHabit(convertedOldHabit, {...newValues, ...values, steps})
                setIsLoading(false)
                Success_Impact()
            }
    
            catch(e){
                console.log("Error while editing habit : ", e)
            }
    
            setIsLoading(false)
        }

        else{
            closeModal()
            validationAdditionnalMethod ? validationAdditionnalMethod() : null
            Success_Impact()
        }

    }

    return(
        <HabitAdvancedDetailsForm
            isForModifyingHabit
            habit={oldHabit}
            handleGoNext={handleGoNext}
        />
    )
}