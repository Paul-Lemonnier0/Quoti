import { createContext, useState } from "react";
import { CustomSpinnerView } from "../components/Spinners/SpinnerView";

const AppContext = createContext()

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