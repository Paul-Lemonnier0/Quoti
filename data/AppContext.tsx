import React, { Dispatch, createContext, useState } from "react";
import { CustomSpinnerView } from "../components/Spinners/CustomSpinnerView";

interface AppContextType {
    setIsLoading: Dispatch<React.SetStateAction<boolean>>
}

const AppContext = createContext<AppContextType>({
    setIsLoading: () => {}
})

const AppContextProvider = ({children}) => {

    const [isLoading, setIsLoading] = useState(false)

    return(
        <AppContext.Provider value={{setIsLoading}}>
            <>
            {children}
            {isLoading && <CustomSpinnerView/>}
            </>
        </AppContext.Provider>
    )
}

export {AppContext, AppContextProvider}