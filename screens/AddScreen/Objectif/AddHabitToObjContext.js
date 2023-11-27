import { createContext } from "react";

export const AddHabitToObjContext = createContext();

export const AddHabitToObjProvider = ({addHabitForObjectif, children}) => {
    
    return(
        <AddHabitToObjContext.Provider value={{addHabitForObjectif}}>
            {children}
        </AddHabitToObjContext.Provider>
    )
}
