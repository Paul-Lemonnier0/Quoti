import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetFooterProps, BottomSheetModal, BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet"
import { useThemeColor } from "../Themed"
import { useState, useCallback, ReactNode, FC, useContext } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { BackdropBehaviorType, BasicCustomBottomSheetProps } from "../../types/BottomScreenTypes";
import React from "react"
import { AppContext } from "../../data/AppContext";
import { CustomFooterComponent } from "./FooterBottomSheets";

export  interface CustomBottomSheetProps extends BasicCustomBottomSheetProps {
  noBackdrop?: boolean,
  onDismiss?: () => void,
  footerText?: string,
  footerMethod?: () => void,
  checkError?: () => boolean
  customFooterComponent?: ReactNode,
  isPrimary?: boolean,
  noPressBackdrop?: boolean,
  hideHandle?: boolean,
  noPanDownToClose?: boolean
}

const CustomBottomSheet: FC<CustomBottomSheetProps> = ({
  bottomSheetModalRef, 
  snapPoints, 
  noBackdrop, 
  onDismiss,
  footerMethod,
  checkError,
  footerText,
  customFooterComponent, 
  isPrimary,
  hideHandle,
  children
}) => {
    const {theme} = useContext(AppContext)

    const fontGray = useThemeColor(theme, "FontGray")
    const primary = useThemeColor(theme, "Primary")

    const backgroundColor = isPrimary ? primary : primary

    const [backdropPressBehavior, setBackdropPressBehavior] = useState<BackdropBehaviorType>('close');

    const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior={backdropPressBehavior} />
      ),
      [backdropPressBehavior]
    );

      
    const FooterComponent = (props: BottomSheetFooterProps) => (
      (footerText && footerMethod) && (
        customFooterComponent || (
          <CustomFooterComponent 
            footerMethod={footerMethod} 
            footerText={footerText} 
            checkError={checkError}
            props={props}
            isPrimary
          />
        )
      )
    );
  
    // renders
    return (
        <BottomSheetModal
            keyboardBlurBehavior="restore"
            ref={bottomSheetModalRef}
            style={{flex: 1}}
            backgroundStyle={{backgroundColor: backgroundColor}}
            handleIndicatorStyle={{backgroundColor: hideHandle ? "transparent" : fontGray}}
            index={0}
            snapPoints={snapPoints}
            footerComponent={FooterComponent}
            enablePanDownToClose={true}
            onDismiss={onDismiss ?? undefined}
            enableDynamicSizing={snapPoints === undefined}
            backdropComponent={noBackdrop ? null : renderBackdrop}>

                <BottomSheetScrollView scrollEnabled={false} style={styles.container}>
                    <View style={{flex: 1, marginBottom: footerMethod && footerText ? 30 : 0}}>
                      
                      {children}
                    </View>
                </BottomSheetScrollView>

      </BottomSheetModal>
  );
};

export const CustomStaticBottomSheet: FC<CustomBottomSheetProps> = ({
  bottomSheetModalRef, 
  snapPoints, 
  noBackdrop, 
  onDismiss,
  footerMethod,
  footerText,
  checkError,
  customFooterComponent, 
  noPressBackdrop,
  noPanDownToClose,
  children
}) => {
  
  const {theme} = useContext(AppContext)

  const secondary = useThemeColor(theme, "Secondary")
  const primary = useThemeColor(theme, "Primary")


  const [backdropPressBehavior, setBackdropPressBehavior] = useState<BackdropBehaviorType>('close');

  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop 
        {...props} 
        appearsOnIndex={0} 
        disappearsOnIndex={-1} 
        pressBehavior={noPressBackdrop ? "none" : backdropPressBehavior} 
      />
    ),
    [backdropPressBehavior]
  );

  const backgroundColor = primary

  
  const FooterComponent = (props: BottomSheetFooterProps) => (
    (footerText && footerMethod) && (
      customFooterComponent || (
        <CustomFooterComponent 
          footerMethod={footerMethod} 
          footerText={footerText} 
          checkError={checkError} 
          props={props}
          isPrimary
        />
      )
    )
  );

  // renders
  return (
      <BottomSheetModal
          ref={bottomSheetModalRef}
          style={{flex: 1}}
          backgroundStyle={{backgroundColor}}
          handleIndicatorStyle={{backgroundColor}}
          index={0}
          snapPoints={snapPoints}
          onDismiss={onDismiss ?? undefined}
          enablePanDownToClose={!noPanDownToClose}
          footerComponent={FooterComponent}
          keyboardBehavior="interactive"
          
          enableHandlePanningGesture={false}
          enableDynamicSizing={snapPoints === undefined}
          backdropComponent={noBackdrop ? null : renderBackdrop}>

              <BottomSheetView style={[styles.container, {
                flex: snapPoints ? 1 : undefined,
                paddingBottom: footerMethod && footerText ? 80 : 0}]}>
                    {children}
              </BottomSheetView>

    </BottomSheetModal>
);
};

const styles = StyleSheet.create({
    container: { 
      gap: 20, 
      padding:15,
      paddingHorizontal:30, 
      paddingTop: 0,
      display:"flex",
    },
    footerContainer: {
      padding: 12,
      margin: 0,
      backgroundColor: '#80f',
    },
});
  
  export default CustomBottomSheet;