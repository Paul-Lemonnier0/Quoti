import { useNavigation, useRoute } from "@react-navigation/native";
import HabitStepsForm from "../../../components/Forms/HabitStepsForm";

export default EditHabitStepsScreen = () => {
    const navigation = useNavigation();

    const route = useRoute()
    const {newValues, oldHabit} = route.params

    
    const handleGoNext = (values) => {

        let oldStepsArray = Object.values(oldHabit.steps)

        let updatedStepsArray = oldStepsArray.filter((step) => step.stepID !== oldHabit.habitID)

        updatedStepsArray = updatedStepsArray.map((step) => {
            const createdDate = new Date(step.created)
            return {...step, created: createdDate.toDateString()}
        })

        

        if(values.steps){
            const today = new Date().toDateString()

            const stepsID = values.steps.map((step) => (step.stepID))
            
            //les deleted et les intacts
            updatedStepsArray = updatedStepsArray.map((step) => {
                if(!stepsID.includes(step.stepID)) {
                    return step = {...step, deleted: today}
                }

                return {...step}
            })

            //les added
            values.steps.forEach(step => {
                if(!step.stepID){
                    updatedStepsArray.push({...step, created: today})
                }

                else if(!oldHabit.steps.hasOwnProperty(step.stepID)) {
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