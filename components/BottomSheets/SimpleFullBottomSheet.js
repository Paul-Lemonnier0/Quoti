import { BottomSheetBackdrop, BottomSheetFooter, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import { useThemeColor } from "../Themed"
import { useState, useCallback, useMemo, useEffect } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native";
import Separator from "../Other/Separator";
import { TextButton } from "../Buttons/UsualButton";
import { TitleText } from "../../styles/StyledText";
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated";

const SimpleFullBottomSheet = (props) => {
    
    const {bottomSheetModalRef, snapPoints, handleSheetChanges, footerMethod, footerText, customFooterComponent, isPrimary,
      isError, setIsError} = props

    const handleSheetChangesMethod = handleSheetChanges ? handleSheetChanges : () => {}

    const fontGray = useThemeColor({}, "FontGray")
    const popupColor = useThemeColor({}, "Popup")
    const primary = useThemeColor({}, "Primary")
    const secondary = useThemeColor({}, "Secondary")

    const backgroundColor = isPrimary ? primary : secondary

    const [backdropPressBehavior, setBackdropPressBehavior] = useState('close');
    const shakeAnimation = useSharedValue(0)

    useEffect(() => {
      if(isError){

        shakeAnimation.value = withSequence(
          withTiming(10, {duration: 75}),
          withTiming(-10, {duration: 75}),
          withTiming(10, {duration: 75}),
          withTiming(0, {duration: 75})
        )

        setIsError(false)
      }
    }, [isError])

    const footerAnimatedStyle = useAnimatedStyle(() => {
      return({ 
        transform: [{ translateX: shakeAnimation.value }] 
      })
    }, [])

    const renderBackdrop = useCallback(
      props => (
        <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior={backdropPressBehavior} />
      ),
      [backdropPressBehavior]
    );
  
    const snapPoints_Default = useMemo(() => ['100%'], []);

    const FooterComponent = useCallback((props) => (
        customFooterComponent ??
        <BottomSheetFooter {...props} bottomInset={0}>
          <View style={[styles.footer, {backgroundColor, paddingBottom: 25}]}>
              <Separator/>
              <Animated.View style={[footerAnimatedStyle]}>
                <TextButton bold extend onPress={footerMethod} text={footerText}/>
              </Animated.View>
          </View>
        </BottomSheetFooter>
      ),
      []
    );

    // renders
    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            enableHandlePanningGesture={false}
            enableContentPanningGesture={false}
            backgroundStyle={{backgroundColor}}
            footerComponent={footerText ? FooterComponent : undefined}
            handleIndicatorStyle={{backgroundColor: secondary}}
            index={0}
            enablePanDownToClose={true}
            enableDynamicSizing
            snapPoints={snapPoints ?? snapPoints_Default}
            onChange={handleSheetChangesMethod}
            backdropComponent={renderBackdrop}>

                    <BottomSheetView style={[styles.container, {backgroundColor, paddingBottom: footerText ? 100 : 0}]}>
                      {props.children}
                    </BottomSheetView>

      </BottomSheetModal>
  );
};

// const FooterComponent = () => {

//   const primary =  useThemeColor({}, "Primary")

//   return(
//     <BottomSheetFooter style={{position: "absolute", bottom: 30, right: 0, left: 0}}>
//       <View style={[styles.footer, {backgroundColor: primary}]}>
//           <Separator/>
//           <TextButton bold extend onPress={() => {}} text={"Aujourd'hui"}/>
//       </View>
//     </BottomSheetFooter>
//   )
// }
 
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