import React, { FC, ReactNode, createContext } from "react";

export interface EditGoalContextProps {
    validationAdditionnalMethod?: () => void
}

export interface EditGoalContextProviderProps extends EditGoalContextProps {
    children: ReactNode
}

export const EditGoalContext = createContext<EditGoalContextProps>({
    validationAdditionnalMethod: () => {}
})

export const EditGoalContextProvider: FC<EditGoalContextProviderProps> = ({validationAdditionnalMethod, children}) => {
    return(
        <EditGoalContext.Provider value={{validationAdditionnalMethod}}>
            {children}
        </EditGoalContext.Provider>
    )
}