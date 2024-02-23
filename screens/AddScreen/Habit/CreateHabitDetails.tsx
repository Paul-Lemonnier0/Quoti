import { FC, useContext } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { getSeriazableHabit } from "../../../primitives/HabitMethods"
import { HabitsContext } from "../../../data/HabitContext"
import { AppContext } from "../../../data/AppContext"
import HabitAdvancedDetailsForm from "../../../components/Forms/HabitAdvancedDetailsForm"
import { Success_Impact } from "../../../constants/Impacts"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AddScreenStackType } from "../../../navigation/BottomTabNavigator"
import { FormDetailledHabitValues } from "../../../types/FormHabitTypes"

type CreateHabitDetailsProps = NativeStackScreenProps<AddScreenStackType, "CreateHabitDetails">

const CreateHabitDetails: FC<CreateHabitDetailsProps> = ({navigation, route}) => {

    const {setIsLoading} = useContext(AppContext)
    const {addHabit} = useContext(HabitsContext)

    const {habit} = route.params

    const handleGoNext = async(values: FormDetailledHabitValues) => {

        const detailledHabit = {
            ...habit,
            ...values,
            notificationEnabled: true,
            alertTime: "",
          };

        try{
            setIsLoading(true)

            const fullHabit = await addHabit(detailledHabit)
            if(fullHabit) {
                const seriazableHabit = getSeriazableHabit(fullHabit)

                Success_Impact()
    
                navigation.navigate("ValidationScreenHabit", {habit: {...seriazableHabit}})    
            }

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

export default CreateHabitDetails