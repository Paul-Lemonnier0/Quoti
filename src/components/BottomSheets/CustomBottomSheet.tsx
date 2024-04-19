import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet"
import { useThemeColor } from "../Themed"
import { useState, useCallback, RefObject, ReactNode, FC, useContext } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { SharedValue } from "react-native-reanimated";
import { BackdropBehaviorType, BasicCustomBottomSheetProps } from "../../types/BottomScreenTypes";
import React from "react"
import { AppContext } from "../../data/AppContext";

export  interface CustomBottomSheetProps extends BasicCustomBottomSheetProps {
  noBackdrop?: boolean,
  onDismiss?: () => void,
  isPrimary?: boolean
}

const CustomBottomSheet: FC<CustomBottomSheetProps> = ({bottomSheetModalRef, snapPoints, noBackdrop, children, isPrimary}) => {
    const {theme} = useContext(AppContext)

    const fontGray = useThemeColor(theme, "FontGray")
    const popupColor = useThemeColor(theme, "Popup")
    const secondary = useThemeColor(theme, "Secondary")

    const backgroundColor = isPrimary ? secondary : popupColor

    const [backdropPressBehavior, setBackdropPressBehavior] = useState<BackdropBehaviorType>('close');

    const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior={backdropPressBehavior} />
      ),
      [backdropPressBehavior]
    );
  
    // renders
    return (
        <BottomSheetModal
        keyboardBlurBehavior="restore"
            ref={bottomSheetModalRef}
            style={{flex: 1}}
            backgroundStyle={{backgroundColor: backgroundColor}}
            handleIndicatorStyle={{backgroundColor: fontGray}}
            index={0}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            enableDynamicSizing={snapPoints === undefined}
            backdropComponent={noBackdrop ? null : renderBackdrop}>

                <BottomSheetScrollView scrollEnabled={false} style={styles.container}>
                    <View style={{flex: 1, marginBottom: 0}}>
                      {children}
                    </View>
                </BottomSheetScrollView>

      </BottomSheetModal>
  );
};

export const CustomStaticBottomSheet: FC<CustomBottomSheetProps> = ({bottomSheetModalRef, snapPoints, noBackdrop, onDismiss, children}) => {
  
  const {theme} = useContext(AppContext)

  const secondary = useThemeColor(theme, "Secondary")


  const [backdropPressBehavior, setBackdropPressBehavior] = useState<BackdropBehaviorType>('close');

  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior={backdropPressBehavior} />
    ),
    [backdropPressBehavior]
  );

  const backgroundColor = secondary

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
          enablePanDownToClose={true}
          keyboardBehavior="interactive"
          enableHandlePanningGesture={false}
          enableDynamicSizing={snapPoints === undefined}
          backdropComponent={noBackdrop ? null : renderBackdrop}>

              <BottomSheetView style={[styles.container, {flex: snapPoints ? 1 : undefined}]}>
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
    }
});
  
  export default CustomBottomSheet;