import { View } from "react-native"
import React, { FC, useContext } from "react"
import ObjectifHabitsForm from "../../../components/Forms/ObjectifForm/ObjectifHabitsForm"
import { EditObjectifStackProps } from "./EditObjectifNav"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FormDetailledHabit } from "../../../types/FormHabitTypes"
import { BottomSheetModalMethodsContext } from "../../../data/BottomSheetModalContext"
import { AppContext } from "../../../data/AppContext"
import { EditHabitContext } from "../Habits/EditHabitContext"
import { HabitsContext } from "../../../data/HabitContext"
import { convertBackSeriazableObjectif } from "../../../primitives/ObjectifMethods"
import { Habit } from "../../../types/HabitTypes"
import { Success_Impact } from "../../../constants/Impacts"

type EditObjectifHabitsScreenProps = NativeStackScreenProps<EditObjectifStackProps, 'EditObjectifHabitsScreen'>

const EditObjectifHabitsScreen: FC<EditObjectifHabitsScreenProps> = ({route}) => {

    const {closeModal} = useContext(BottomSheetModalMethodsContext)
    const {setIsLoading} = useContext(AppContext)
    const {validationAdditionnalMethod} = useContext(EditHabitContext)

    const {updateObjectif, retrieveHabitsLinkToObjectif, updateHabitRelationWithObjectif} = useContext(HabitsContext)

    const {newValues, oldObjectif} = route.params

    const baseHabits = retrieveHabitsLinkToObjectif(oldObjectif.objectifID)

    const handleGoNext = async(newHabits: (FormDetailledHabit | Habit)[]) => {

        console.log(newValues)

        setIsLoading(true)

        // NOTE : Pour l'instant on ne pourra pas ajouter de nouvelle habitude directement de ce screen

        const promises = newHabits.map(async (habit) => {
            if(habit as Habit) {
                if (!baseHabits.includes(habit as Habit)) {
                    //On retire la relation de celles qui sont enlevées
                    await updateHabitRelationWithObjectif(habit as Habit, null);
                }
            }
        });
        
        await Promise.all(promises);

        const unseriazableOldObjectif = convertBackSeriazableObjectif(oldObjectif)

        console.log()

        const startingDate = new Date(newValues.startingDate)
        const endingDate = new Date(newValues.endingDate)

        await updateObjectif(unseriazableOldObjectif, {...newValues, startingDate, endingDate})
        
        closeModal()

        if(validationAdditionnalMethod) {
            validationAdditionnalMethod()
        }

        setIsLoading(false)
        Success_Impact()
    }

    return(
        <ObjectifHabitsForm
            handleGoNext={handleGoNext}
            objectif={oldObjectif}
            baseHabits={baseHabits}
        />
    )
}

export default EditObjectifHabitsScreen