import { FC } from "react"
import { useContext } from "react"
import { HabitsContext } from "../../../data/HabitContext"
import { Success_Impact } from "../../../constants/Impacts"
import { AppContext } from "../../../data/AppContext"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import GoalHabitsForm from "../../../components/Forms/GoalForm/GoalHabitsForm"
import { FormDetailledHabit } from "../../../types/FormHabitTypes"
import React from "react"
import { Habit } from "../../../types/HabitTypes"
import { AddScreenStackType } from "../../../navigation/AddScreenNavigator"
import { useHabitActions } from "../../../hooks/Habits/useHabitActions"
import { useGoalsActions } from "../../../hooks/Habits/useGoalActions"

type AddHabitsToGoalProps = NativeStackScreenProps<AddScreenStackType, "AddHabitsToGoal">

const AddHabitsToGoal: FC<AddHabitsToGoalProps> = ({route, navigation}) => {

    const {goal} = route.params

    const {setIsLoading} = useContext(AppContext)
    const {addHabit} = useHabitActions();
    const {addGoal} = useGoalsActions();    

    const handleGoNext = async(habitsForGoal: (Habit | FormDetailledHabit)[]) => {

        // const startingDate = goal.startingDate
        // const endingDate = goal.endingDate

        setIsLoading(true)
        const goalWithID = await addGoal(goal) 
        
        if(goalWithID){
            const updatedHabitsForGoal = habitsForGoal.map(habit => ({...habit, goalID: goalWithID.goalID} as FormDetailledHabit))
                        
            await Promise.all(updatedHabitsForGoal.map(addHabit));
            setIsLoading(false)
    
            Success_Impact()
            console.log("goal and habit(s) well added")
    
            navigation.navigate("ValidationScreenGoal")
        }
    }

    return <GoalHabitsForm
                goal={goal}
                handleGoNext={handleGoNext}
            />
}

export default AddHabitsToGoal;