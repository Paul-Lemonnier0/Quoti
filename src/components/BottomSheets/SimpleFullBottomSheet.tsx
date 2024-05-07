import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetFooterProps, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import { useThemeColor } from "../Themed"
import React, { useState, useCallback, useMemo, ReactNode, FC, useContext } from "react";
import { StyleSheet } from "react-native";
import { BackdropBehaviorType, BasicCustomBottomSheetProps } from "../../types/BottomScreenTypes";
import { AppContext } from "../../data/AppContext";
import { CustomFooterComponent } from "./FooterBottomSheets";

export interface SimpleFullBottomSheetProps extends BasicCustomBottomSheetProps {
  footerText?: string,
  footerMethod?: () => void,
  customFooterComponent?: ReactNode,
  isError?: boolean,
  setIsError?: (isError: boolean) => void,
  isPrimary?: boolean,
  onDismiss?: () => void,
}

const SimpleFullBottomSheet: FC<SimpleFullBottomSheetProps> = 
  ({bottomSheetModalRef, snapPoints, footerMethod, footerText, customFooterComponent, isPrimary, isError, setIsError, onDismiss, children}) => {
    
    const {theme} = useContext(AppContext)
    
    const primary = useThemeColor(theme, "Primary")
    const secondary = useThemeColor(theme, "Secondary")

    const backgroundColor = isPrimary ? primary : primary

    const [backdropPressBehavior, setBackdropPressBehavior] = useState<BackdropBehaviorType>('close');

    const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior={backdropPressBehavior} />
      ),
      [backdropPressBehavior]
    );
  
    const snapPoints_Default = useMemo(() => ['100%'], []);

    const FooterComponent = (props: BottomSheetFooterProps) => (
      (footerText && footerMethod) && (
        customFooterComponent || (
          <CustomFooterComponent 
            footerMethod={footerMethod} 
            footerText={footerText} 
            isPrimary
            setIsError={setIsError} 
            props={props}
          />
        )
      )
    );

    // renders
    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            enableHandlePanningGesture={false}
            enableContentPanningGesture={false}
            backgroundStyle={{backgroundColor}}
            footerComponent={FooterComponent}
            handleIndicatorStyle={{backgroundColor}}
            handleComponent={null}
            index={0}
            enablePanDownToClose={true}
            enableDynamicSizing
            onDismiss={onDismiss ?? undefined}
            snapPoints={snapPoints ?? snapPoints_Default}
            backdropComponent={renderBackdrop}>

                    <BottomSheetView style={[styles.container, {
                      backgroundColor, 
                      paddingBottom: footerText ? 60 : 0
                    }]}>
                      {children}
                    </BottomSheetView>

      </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
    container: { 
      flex: 1,
    },

    footer: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },
});
  
export default SimpleFullBottomSheet;