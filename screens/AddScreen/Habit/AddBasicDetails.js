import { useContext } from "react"
import { useNavigation } from "@react-navigation/native"
import { HabitsContext } from "../../../data/HabitContext"
import HabitForm from "../../../components/Forms/HabitForm"

export const AddBasicDetails = () => {

    const navigation = useNavigation();

    const {Objectifs} = useContext(HabitsContext)    

    const handleGoNext = (values) => {

        if(values.objectifID === null){
            navigation.navigate("ChooseColorScreen", {habit: {...values}})
        }

        else{
            const objectif = Objectifs[values.objectifID]
            navigation.navigate("ChooseIconScreen", {habit: {...values, color: objectif.color}})
        }
    }

    return(
        <HabitForm handleGoNext={handleGoNext}/>
    )
}