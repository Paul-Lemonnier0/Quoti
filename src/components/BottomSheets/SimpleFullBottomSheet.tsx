import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetFooter, BottomSheetFooterProps, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import { useThemeColor } from "../Themed"
import React, { useState, useCallback, useMemo, useEffect, ReactNode, FC, useContext } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native";
import Separator from "../Other/Separator";
import { TextButton } from "../Buttons/UsualButton";
import { TitleText } from "../../styles/StyledText";
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated";
import { BackdropBehaviorType, BasicCustomBottomSheetProps } from "../../types/BottomScreenTypes";
import { AppContext } from "../../data/AppContext";

export interface SimpleFullBottomSheetProps extends BasicCustomBottomSheetProps {
  footerText?: string,
  footerMethod?: () => void,
  customFooterComponent?: ReactNode,
  isError?: boolean,
  setIsError?: (isError: boolean) => void,
  isPrimary?: boolean,
}

const SimpleFullBottomSheet: FC<SimpleFullBottomSheetProps> = 
  ({bottomSheetModalRef, snapPoints, footerMethod, footerText, customFooterComponent, isPrimary, isError, setIsError, children}) => {
    
    const {theme} = useContext(AppContext)
    
    const primary = useThemeColor(theme, "Primary")
    const secondary = useThemeColor(theme, "Secondary")

    const backgroundColor = isPrimary ? primary : secondary

    const [backdropPressBehavior, setBackdropPressBehavior] = useState<BackdropBehaviorType>('close');
    const shakeAnimation = useSharedValue(0)

    useEffect(() => {
      if(isError){

        shakeAnimation.value = withSequence(
          withTiming(10, {duration: 75}),
          withTiming(-10, {duration: 75}),
          withTiming(10, {duration: 75}),
          withTiming(0, {duration: 75})
        )

        if(setIsError !== undefined){
          setIsError(false)
        }
      }
    }, [isError])

    const footerAnimatedStyle = useAnimatedStyle(() => {
      return({ 
        transform: [{ translateX: shakeAnimation.value }] 
      })
    }, [])

    const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior={backdropPressBehavior} />
      ),
      [backdropPressBehavior]
    );
  
    const snapPoints_Default = useMemo(() => ['100%'], []);

    const FooterComponent = (props: BottomSheetFooterProps) => (
      (footerText && footerMethod) && (
        customFooterComponent || (
          <BottomSheetFooter {...props} bottomInset={0}>
            <View style={[styles.footer, {backgroundColor, paddingBottom: 25}]}>
                <Separator/>
                <Animated.View style={[footerAnimatedStyle]}>
                  <TextButton bold extend onPress={footerMethod} text={footerText}/>
                </Animated.View>
            </View>
          </BottomSheetFooter>
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
            snapPoints={snapPoints ?? snapPoints_Default}
            backdropComponent={renderBackdrop}>

                    <BottomSheetView style={[styles.container, {
                      backgroundColor, 
                      paddingBottom: footerText ? 230 : 0
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