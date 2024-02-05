import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet"
import { useThemeColor } from "../Themed"
import { useState, useCallback } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";

const CustomBottomSheet = (props) => {
    
    const {bottomSheetModalRef, snapPoints, handleSheetChanges} = props

    const handleSheetChangesMethod = handleSheetChanges ? handleSheetChanges : () => {}

    const fontGray = useThemeColor({}, "FontGray")
    const popupColor = useThemeColor({}, "Popup")

    const [backdropPressBehavior, setBackdropPressBehavior] = useState('close');

    const renderBackdrop = useCallback(
      props => (
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
            onChange={handleSheetChangesMethod}
            backdropComponent={props.noBackdrop ? null : renderBackdrop}>

                <BottomSheetScrollView scrollEnabled={false} style={styles.container}>
                    <View style={{flex: 1, marginBottom: 0}}>
                      {props.children}
                    </View>
                </BottomSheetScrollView>

      </BottomSheetModal>
  );
};

export const CustomStaticBottomSheet = (props) => {
    
  const {bottomSheetModalRef, snapPoints, handleSheetChanges} = props

  const handleSheetChangesMethod = handleSheetChanges ? handleSheetChanges : () => {}

  const fontGray = useThemeColor({}, "FontGray")
  const popupColor = useThemeColor({}, "Popup")
  const secondary = useThemeColor({}, "Secondary")
  const primary = useThemeColor({}, "Primary")

  const [backdropPressBehavior, setBackdropPressBehavior] = useState('close');

  const renderBackdrop = useCallback(
    props => (
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
          enablePanDownToClose={true}
          enableDynamicSizing={snapPoints === undefined}
          onChange={handleSheetChangesMethod}
          backdropComponent={props.noBackdrop ? null : renderBackdrop}>

              <BottomSheetView scrollEnabled={false} style={[styles.container, {flex: snapPoints === undefined ? null : 1}]}>
                    {props.children}
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