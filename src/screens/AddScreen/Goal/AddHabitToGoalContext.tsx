import { FC, ReactNode, createContext } from "react";
import { FormDetailledHabit } from "../../../types/FormHabitTypes";
import React from "react"

export interface AddHabitToGoalContext {
    addHabitForGoal: (habit: FormDetailledHabit) => void
}

export const AddHabitToGoalContext = createContext<AddHabitToGoalContext>({
    addHabitForGoal: (habit) => {}
});

export interface AddHabitToGoalProviderProps {
    addHabitForGoal: (habit: FormDetailledHabit) => void,
    children: ReactNode
}

export const AddHabitToGoalProvider: FC<AddHabitToGoalProviderProps> = ({addHabitForGoal, children}) => {
    
    return(
        <AddHabitToGoalContext.Provider value={{addHabitForGoal}}>
            {children}
        </AddHabitToGoalContext.Provider>
    )
}
