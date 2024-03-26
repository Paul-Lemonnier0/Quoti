import { FC, ReactNode, createContext } from "react"
import React from "react"

export interface EditHabitContextProps {
    validationAdditionnalMethod?: () => void,
}

export interface EditHabitContextProviderProps {
    validationAdditionnalMethod?: () => void,
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