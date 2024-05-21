import { View } from "react-native"
import React, { FC, useContext } from "react"
import GoalHabitsForm from "../../../components/Forms/GoalForm/GoalHabitsForm"
import { EditGoalStackProps } from "./EditGoalNav"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FormDetailledHabit, FormDetailledGoalHabit } from "../../../types/FormHabitTypes"
import { BottomSheetModalMethodsContext } from "../../../data/BottomSheetModalContext"
import { AppContext } from "../../../data/AppContext"
import { EditHabitContext } from "../Habits/EditHabitContext"
import { HabitsContext } from "../../../data/HabitContext"
import { convertBackSeriazableGoal } from "../../../primitives/GoalMethods"
import { Habit } from "../../../types/HabitTypes"
import { Success_Impact } from "../../../constants/Impacts"
import { useHabitActions } from "../../../hooks/Habits/useHabitActions"
import { useGoalsActions } from "../../../hooks/Habits/useGoalActions"

type EditGoalHabitsScreenProps = NativeStackScreenProps<EditGoalStackProps, 'EditGoalHabitsScreen'>

const EditGoalHabitsScreen: FC<EditGoalHabitsScreenProps> = ({route}) => {

    const {closeModal} = useContext(BottomSheetModalMethodsContext)
    const {setIsLoading} = useContext(AppContext)

    const {getHabitsByGoalID} = useContext(HabitsContext)
    const { updateHabitRelationWithGoal, addHabit } = useHabitActions()
    const {updateGoal} = useGoalsActions()

    const {newValues, oldGoal} = route.params

    const baseHabits = getHabitsByGoalID(oldGoal.goalID)

    const handleGoNext = async(newHabits: (FormDetailledGoalHabit | Habit)[]) => {

        setIsLoading(true)
        
        const addedHabits: FormDetailledGoalHabit[] = [];
        const removedHabits: Habit[] = [];

        newHabits.map(async (habit) => {
            if(habit as Habit) {
                if (!baseHabits.includes(habit as Habit)) {
                    const updatedHabit = {...habit, goalID: oldGoal.goalID, startingDate}
                    addedHabits.push({...updatedHabit, startingDate: updatedHabit.startingDate.toISOString()} as FormDetailledGoalHabit)
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
        await Promise.all(removedHabits.map((habit) => updateHabitRelationWithGoal(habit, null)));

        const deseriazableOldGoal = convertBackSeriazableGoal(oldGoal)

        const startingDate = new Date(newValues.startingDate)
        const endingDate = newValues.endingDate ? new Date(newValues.endingDate) : undefined

        await updateGoal(deseriazableOldGoal, {...newValues, startingDate, endingDate})
        
        closeModal()

        setIsLoading(false)
        Success_Impact()
    }

    return(
        <GoalHabitsForm
            handleGoNext={handleGoNext}
            goal={{...oldGoal, ...newValues}}
            baseHabits={baseHabits}  
        />
    )
}

export default EditGoalHabitsScreen