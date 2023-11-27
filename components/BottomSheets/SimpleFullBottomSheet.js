import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet"
import { useThemeColor } from "../Themed"
import { useState, useCallback } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native";

const SimpleFullBottomSheet = (props) => {
    
    const {bottomSheetModalRef, snapPoints, handleSheetChanges} = props

    const handleSheetChangesMethod = handleSheetChanges ? handleSheetChanges : () => {}

    const fontGray = useThemeColor({}, "FontGray")
    const popupColor = useThemeColor({}, "Popup")
    const primary = useThemeColor({}, "Primary")
    const secondary = useThemeColor({}, "Secondary")

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
            ref={bottomSheetModalRef}
            enableHandlePanningGesture={false}
            enableContentPanningGesture={false}
            style={{flex: 1, borderRadius: 0, marginTop: -30,}}
            backgroundStyle={{backgroundColor: primary, borderRadius: 0}}
            handleIndicatorStyle={{backgroundColor: primary}}
            index={0}
            enablePanDownToClose={true}
            snapPoints={snapPoints}
            onChange={handleSheetChangesMethod}
            backdropComponent={renderBackdrop}>

                    <View style={[styles.container, {backgroundColor: primary}]}>
                      {props.children}
                    </View>

      </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
    container: { 
      flex: 1,
      borderRadius: 0,
      // marginTop: 20, 
      // gap: 20, 
      // padding:15, 
      // paddingHorizontal:30, 
      // flex:1, 
      // display:"flex",
    }
});
  
export default SimpleFullBottomSheet;