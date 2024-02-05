import { useContext } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { getSeriazableHabit } from "../../../primitives/HabitMethods"
import { HabitsContext } from "../../../data/HabitContext"
import { AppContext } from "../../../data/AppContext"
import HabitAdvancedDetailsForm from "../../../components/Forms/HabitAdvancedDetailsForm"
import { Success_Impact } from "../../../constants/Impacts"

export default CreateHabitDetails = () => {

    const {setIsLoading} = useContext(AppContext)
    const {addHabit} = useContext(HabitsContext)

    const navigation = useNavigation()

    const route = useRoute()
    const {habit} = route.params

    const handleGoNext = async(values) => {

        const detailledHabit = {
            ...habit,
            ...values,
            notificationEnabled: true,
            alertTime: "",
          };

        try{
            setIsLoading(true)

            const fullHabit = await addHabit(detailledHabit)
            const seriazableHabit = getSeriazableHabit(fullHabit)

            Success_Impact()

            navigation.navigate("ValidationScreenHabit", {habit: {...seriazableHabit}})
            
            setIsLoading(false)
        }

        catch (e){
            console.log("Erreur dans l'ajout de l'habitude : ", e)
            setIsLoading(false)
        }
    }

    return <HabitAdvancedDetailsForm 
                habit={habit}
                handleGoNext={handleGoNext}/>
}