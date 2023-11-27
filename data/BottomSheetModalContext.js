import { useCallback } from "react";
import { createContext } from "react";

export const BottomSheetModalMethodsContext = createContext();

export const BottomSheetModalMethodsContextProvider = ({bottomSheetModalRef, children}) => {

    const openModal = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const closeModal = () => bottomSheetModalRef.current?.close()
    
    return(
        <BottomSheetModalMethodsContext.Provider value={{openModal, closeModal}}>
            {children}
        </BottomSheetModalMethodsContext.Provider>
    )
}
