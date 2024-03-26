import { FC } from "react"
import { useContext } from "react"
import { HabitsContext } from "../../../data/HabitContext"
import { Success_Impact } from "../../../constants/Impacts"
import { AppContext } from "../../../data/AppContext"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AddScreenStackType } from "../../../navigation/BottomTabNavigator"
import ObjectifHabitsForm from "../../../components/Forms/ObjectifForm/ObjectifHabitsForm"
import { FormDetailledHabit } from "../../../types/FormHabitTypes"
import React from "react"

type AddHabitsToObjectifProps = NativeStackScreenProps<AddScreenStackType, "AddHabitsToObjectif">

const AddHabitsToObjectif: FC<AddHabitsToObjectifProps> = ({route, navigation}) => {

    const {objectif} = route.params

    const {setIsLoading} = useContext(AppContext)
    const {addObjectif, addHabit} = useContext(HabitsContext)
    
    const handleGoNext = async(habitsForObjectif: FormDetailledHabit[]) => {

        const startingDate = objectif.startingDate
        const endingDate = objectif.endingDate

        setIsLoading(true)
        const objectifWithID = await addObjectif(objectif) 
        
        if(objectifWithID){
            const updatedHabitsForObjectif = habitsForObjectif.map(habit => ({...habit, objectifID: objectifWithID.objectifID, startingDate, endingDate}))
            await Promise.all(updatedHabitsForObjectif.map(addHabit));
            setIsLoading(false)
    
            Success_Impact()
            console.log("objectif and habit(s) well added")
    
            navigation.navigate("ValidationScreenObjectif")
        }
    }

    return <ObjectifHabitsForm
                objectif={objectif}
                handleGoNext={handleGoNext}
            />
}

export default AddHabitsToObjectif;