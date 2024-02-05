import { createContext } from "react"

export const EditHabitContext = createContext()

export const EditHabitContextProvider = ({validationAdditionnalMethod, children}) => {
    return(
        <EditHabitContext.Provider value={{validationAdditionnalMethod}}>
            {children}
        </EditHabitContext.Provider>
    )
}