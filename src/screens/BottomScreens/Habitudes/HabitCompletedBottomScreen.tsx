import { MassiveText, TitleText } from "../../../styles/StyledText"
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { BottomSheetCloseButton, CloseButton } from "../../../components/Buttons/IconButtons";
import Confetti from "../../../components/Other/Confetti";
import { FC, RefObject, useRef } from "react";
import { useEffect } from "react";
import { Image } from "react-native";
import SimpleFullBottomSheet from "../../../components/BottomSheets/SimpleFullBottomSheet";
import { UsualScreen } from "../../../components/View/Views";
import IllustrationsList, { IllustrationsType } from "../../../data/IllustrationsList";
import { HabitudeListItemPresentation } from "../../../components/Habitudes/HabitudeListItem";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Habit } from "../../../types/HabitTypes";
import AnimatedLottieView from "lottie-react-native";
import React from "react"

export interface HabitCompletedBottomScreenProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    habit: Habit,
    goBackHome?: () => void
}

const HabitCompletedBottomScreen: FC<HabitCompletedBottomScreenProps> = ({bottomSheetModalRef, habit, goBackHome}) => {
    
    const confettiRef = useRef<AnimatedLottieView>(null)

    const triggerConfetti = () => {
        if(confettiRef.current){
            confettiRef.current.play(0);
        }
    }

    useEffect(() => {
        triggerConfetti()
    }, [])

    const closeModal = () => {
        bottomSheetModalRef.current?.close()
    }

    const handleGoBackHome = () => {
        //navigation.navigate("HomeScreen")
        if(goBackHome) goBackHome()
    }

    return (
        <SimpleFullBottomSheet bottomSheetModalRef={bottomSheetModalRef}  isPrimary
            footerText={"Retour"} footerMethod={closeModal}>
            <UsualScreen hideMenu>
                <View style={styles.container}>
                    <View style={styles.pageTitleContainer}>
                        <BottomSheetCloseButton methode={closeModal}/>
                    </View>



                    <View style={{flex: 0.75, flexGrow: 0.75}}>
                        <View style={styles.emptySreenContainer}>

                            <Image style={styles.emptyScreenImageContainer} source={IllustrationsList[IllustrationsType.WorkingFullSpeed]}/>

                            <View style={styles.emptyScreenSubContainer}>
                                <MassiveText text={"Bravo !"}/>
                                <TitleText text={"Habitude complétée"}/>
                            </View>
                        </View>
                    </View>

                    <View style={styles.footer}>
                        {/* <Animated.View style={{position: "absolute", bottom: 0}} entering={FadeInDown.delay(200)}> */}
                            <HabitudeListItemPresentation habitude={habit}/>
                        {/* </Animated.View> */}
                    </View>
                </View>


            </UsualScreen>

            <Confetti ref={confettiRef}/>

        </SimpleFullBottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex", 
        flexDirection: "column", 
        gap: 20, 
        flex: 1,
        marginBottom: 30
    },

    displayRow: {
        display: "flex",
        flexDirection: "row",
        gap: 0
    },

    pageTitleContainer: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        gap: 20,
        marginLeft: 5,
      },

    emptySreenContainer: {
        flex: 1, 
        flexGrow: 1, 
        alignItems: "center", 
        justifyContent: "space-around",
        gap: 20, 

    },
    
    emptyScreenImageContainer: {
        resizeMode: 'contain', 
        flex: 1,
        width: "90%", 
    },

    emptyScreenSubContainer: {
        justifyContent: "space-evenly", 
        alignItems: "center",
        gap: 5
    },

    footer: {
        justifyContent: "center",
        flex: 0.25,
    }
})
  
export default HabitCompletedBottomScreen