import { FC, ReactNode, createContext } from "react"
import React from "react"
import { FormDetailledGoalHabit } from "../../../types/FormHabitTypes"
import { Habit } from "../../../types/HabitTypes"

export interface EditHabitContextProps {
    validationAdditionnalMethod?: (values?: FormDetailledGoalHabit) => void,
}

export interface EditHabitContextProviderProps extends EditHabitContextProps {
    children: ReactNode
}


export const EditHabitContext = createContext<EditHabitContextProps>({
    validationAdditionnalMethod: () => {}
})

export const EditHabitContextProvider: FC<EditHabitContextProviderProps> = ({validationAdditionnalMethod, children}) => {
    return(
        <EditHabitContext.Provider value={{validationAdditionnalMethod}}>
            {children}
        </EditHabitContext.Provider>
    )
}