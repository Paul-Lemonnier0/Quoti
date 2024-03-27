import React, { FC, ReactNode, createContext } from "react";

export interface EditObjectifContextProps {
    validationAdditionnalMethod?: () => void
}

export interface EditObjectifContextProviderProps extends EditObjectifContextProps {
    children: ReactNode
}

export const EditObjectifContext = createContext<EditObjectifContextProps>({
    validationAdditionnalMethod: () => {}
})

export const EditObjectifContextProvider: FC<EditObjectifContextProviderProps> = ({validationAdditionnalMethod, children}) => {
    return(
        <EditObjectifContext.Provider value={{validationAdditionnalMethod}}>
            {children}
        </EditObjectifContext.Provider>
    )
}