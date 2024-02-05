import { createContext } from "react";

const AuthContext = createContext()

const AuthContextProvider = ({setUserAuthState, children}) => {
    return(
        <AuthContext.Provider value={{setUserAuthState}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthContextProvider}