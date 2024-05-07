import React, { createContext, ReactNode, RefObject, useCallback } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomScreenOpen_Impact } from "../constants/Impacts";

export interface BottomSheetModalMethodsContextType {
  openModal: () => void;
  closeModal: () => void;
}

export const BottomSheetModalMethodsContext = createContext<BottomSheetModalMethodsContextType>({
  openModal: () => {},
  closeModal: () => {}
});

export interface BottomSheetModalMethodsContextProviderProps {
  bottomSheetModalRef: RefObject<BottomSheetModal>;
  children: ReactNode;
  additionnalCloseMethod?: () => void
}

export const BottomSheetModalMethodsContextProvider = ({ bottomSheetModalRef, additionnalCloseMethod, children }: BottomSheetModalMethodsContextProviderProps) => {

  const openModal = useCallback(() => {
    BottomScreenOpen_Impact()
    
    bottomSheetModalRef.current?.present();
  }, [bottomSheetModalRef]);

  const closeModal = useCallback(() => {
    BottomScreenOpen_Impact()

    additionnalCloseMethod ? additionnalCloseMethod() : null

    bottomSheetModalRef.current?.close();
  }, [bottomSheetModalRef]);

  return (
    <BottomSheetModalMethodsContext.Provider value={{ openModal, closeModal }}>
      {children}
    </BottomSheetModalMethodsContext.Provider>
  );
};
