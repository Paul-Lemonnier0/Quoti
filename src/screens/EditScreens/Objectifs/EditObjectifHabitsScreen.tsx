import { View } from "react-native"
import React, { FC, useContext } from "react"
import ObjectifHabitsForm from "../../../components/Forms/ObjectifForm/ObjectifHabitsForm"
import { EditObjectifStackProps } from "./EditObjectifNav"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FormDetailledHabit, FormDetailledObjectifHabit } from "../../../types/FormHabitTypes"
import { BottomSheetModalMethodsContext } from "../../../data/BottomSheetModalContext"
import { AppContext } from "../../../data/AppContext"
import { EditHabitContext } from "../Habits/EditHabitContext"
import { HabitsContext } from "../../../data/HabitContext"
import { convertBackSeriazableObjectif } from "../../../primitives/ObjectifMethods"
import { Habit } from "../../../types/HabitTypes"
import { Success_Impact } from "../../../constants/Impacts"
import { useHabitActions } from "../../../hooks/Habits/useHabitActions"
import { useGoalsActions } from "../../../hooks/Habits/useGoalActions"

type EditObjectifHabitsScreenProps = NativeStackScreenProps<EditObjectifStackProps, 'EditObjectifHabitsScreen'>

const EditObjectifHabitsScreen: FC<EditObjectifHabitsScreenProps> = ({route}) => {

    const {closeModal} = useContext(BottomSheetModalMethodsContext)
    const {setIsLoading} = useContext(AppContext)

    const {getHabitsByObjectifID} = useContext(HabitsContext)
    const { updateHabitRelationWithObjectif, addHabit } = useHabitActions()
    const {updateGoal} = useGoalsActions()

    const {newValues, oldObjectif} = route.params

    const baseHabits = getHabitsByObjectifID(oldObjectif.objectifID)

    const handleGoNext = async(newHabits: (FormDetailledObjectifHabit | Habit)[]) => {

        setIsLoading(true)
        
        const addedHabits: FormDetailledObjectifHabit[] = [];
        const removedHabits: Habit[] = [];

        newHabits.map(async (habit) => {
            if(habit as Habit) {
                if (!baseHabits.includes(habit as Habit)) {
                    const updatedHabit = {...habit, objectifID: oldObjectif.objectifID, startingDate}
                    addedHabits.push({...updatedHabit, startingDate: updatedHabit.startingDate.toISOString()} as FormDetailledObjectifHabit)
                }
            }
        });

        baseHabits.map(async (baseHabit) => {
            if(baseHabit as Habit) {
                if (!newHabits.includes(baseHabit)) {
                    removedHabits.push(baseHabit)
                }
            }
        });

        await Promise.all(addedHabits.map(addHabit));
        await Promise.all(removedHabits.map((habit) => updateHabitRelationWithObjectif(habit, null)));

        const deseriazableOldObjectif = convertBackSeriazableObjectif(oldObjectif)

        const startingDate = new Date(newValues.startingDate)
        const endingDate = newValues.endingDate ? new Date(newValues.endingDate) : undefined

        await updateGoal(deseriazableOldObjectif, {...newValues, startingDate, endingDate})
        
        closeModal()

        setIsLoading(false)
        Success_Impact()
    }

    return(
        <ObjectifHabitsForm
            handleGoNext={handleGoNext}
            objectif={{...oldObjectif, ...newValues}}
            baseHabits={baseHabits}  
        />
    )
}

export default EditObjectifHabitsScreen