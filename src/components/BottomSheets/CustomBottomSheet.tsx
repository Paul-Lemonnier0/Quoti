import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet"
import { useThemeColor } from "../Themed"
import { useState, useCallback, RefObject, ReactNode, FC } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { SharedValue } from "react-native-reanimated";
import { BackdropBehaviorType, BasicCustomBottomSheetProps } from "../../types/BottomScreenTypes";
import React from "react"

export  interface CustomBottomSheetProps extends BasicCustomBottomSheetProps {
  noBackdrop?: boolean,
  onDismiss?: () => void
}

const CustomBottomSheet: FC<CustomBottomSheetProps> = ({bottomSheetModalRef, snapPoints, noBackdrop, children}) => {
    
    const fontGray = useThemeColor({}, "FontGray")
    const popupColor = useThemeColor({}, "Popup")

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
            backgroundStyle={{backgroundColor: popupColor, borderRadius: 40}}
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
    
  const secondary = useThemeColor({}, "Secondary")


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
      display:"flex",
    }
});
  
  export default CustomBottomSheet;