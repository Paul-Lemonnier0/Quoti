import { FC, ReactNode, createContext } from "react";
import { FormDetailledHabit } from "../../../types/FormHabitTypes";
import React from "react"

export interface AddHabitToObjContext {
    addHabitForObjectif: (habit: FormDetailledHabit) => void
}

export const AddHabitToObjContext = createContext<AddHabitToObjContext>({
    addHabitForObjectif: (habit) => {}
});

export interface AddHabitToObjProviderProps {
    addHabitForObjectif: (habit: FormDetailledHabit) => void,
    children: ReactNode
}

export const AddHabitToObjProvider: FC<AddHabitToObjProviderProps> = ({addHabitForObjectif, children}) => {
    
    return(
        <AddHabitToObjContext.Provider value={{addHabitForObjectif}}>
            {children}
        </AddHabitToObjContext.Provider>
    )
}
