import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet"
import { useThemeColor } from "../../components/Themed"
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
            ref={bottomSheetModalRef}
            style={{flex: 1}}
            backgroundStyle={{backgroundColor: popupColor, borderRadius: 40}}
            handleIndicatorStyle={{backgroundColor: fontGray}}
            index={0}
            enablePanDownToClose={true}
            snapPoints={snapPoints}
            onChange={handleSheetChangesMethod}
            backdropComponent={renderBackdrop}>

                <View style={styles.container}>
                    {props.children}
                </View>

      </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
    container: { 
      marginTop: 20, 
      gap: 20, 
      padding:15, 
      paddingHorizontal:30, 
      flex:1, 
      display:"flex",
    }
});
  
  export default CustomBottomSheet;