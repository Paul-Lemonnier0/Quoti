import { createContext, ReactNode, RefObject, useCallback } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

interface BottomSheetModalMethodsContextType {
  openModal: () => void;
  closeModal: () => void;
}

export const BottomSheetModalMethodsContext = createContext<BottomSheetModalMethodsContextType>({
  openModal: () => {},
  closeModal: () => {}
});

interface BottomSheetModalMethodsContextProviderProps {
  bottomSheetModalRef: RefObject<BottomSheetModal>;
  children: ReactNode;
}

export const BottomSheetModalMethodsContextProvider = ({ bottomSheetModalRef, children }: BottomSheetModalMethodsContextProviderProps) => {

  const openModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, [bottomSheetModalRef]);

  const closeModal = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, [bottomSheetModalRef]);

  return (
    <BottomSheetModalMethodsContext.Provider value={{ openModal, closeModal }}>
      {children}
    </BottomSheetModalMethodsContext.Provider>
  );
};
