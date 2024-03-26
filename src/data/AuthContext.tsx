import React, { Dispatch, createContext } from "react";

export enum AuthStates {
    NotConnected = "NotConnected",
    AlreadyConnected = "AlreadyConnected",
    JustConnected = "JustConnected",
    Ready = "Ready"
}

export interface AuthContextType {
    setUserAuthState: Dispatch<React.SetStateAction<AuthStates>>,
}

const AuthContext = createContext<AuthContextType>({
    setUserAuthState: () => {}
})

const AuthContextProvider = ({setUserAuthState, children}) => {
    return(
        <AuthContext.Provider value={{setUserAuthState}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthContextProvider}