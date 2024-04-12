import { MassiveText, NormalText, SubTitleText, TitleText } from "../../../styles/StyledText"
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { CloseButton, Icon, IconProvider } from "../../../components/Buttons/IconButtons";
import Confetti from "../../../components/Other/Confetti";
import { FC, RefObject, useContext, useRef } from "react";
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
import CustomBottomSheet, { CustomStaticBottomSheet } from "../../../components/BottomSheets/CustomBottomSheet";
import Separator from "../../../components/Other/Separator";
import CustomCard from "../../../components/Other/Card";
import { useThemeColor } from "../../../components/Themed";
import { AppContext } from "../../../data/AppContext";

export interface HabitStreakDetailsBottomScreenProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    habit: Habit,
    goBackHome?: () => void
}

const HabitStreakDetailsBottomScreen: FC<HabitStreakDetailsBottomScreenProps> = ({bottomSheetModalRef, habit, goBackHome}) => {
    
    const {theme} = useContext(AppContext)
    const fontGray = useThemeColor(theme, "FontGray")

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
        if(goBackHome) goBackHome()
    }

    return (
        <CustomBottomSheet bottomSheetModalRef={bottomSheetModalRef} isPrimary>
            <View style={styles.container}>
                <View style={{flex: 1, gap: 30, marginTop: 30}}>

                    <View style={{gap: 40, flex: 1}}>
                        <View style={{flexDirection: "row", justifyContent: "space-between", gap: 30}}>
                            <View style={{flexDirection: "row", gap: 10, alignItems: "flex-end", justifyContent: "flex-start"}}>
                                <View style={{marginVertical: 10}}>
                                    <Icon provider={IconProvider.FontAwesome5} size={30} name="fire" color={habit.color}/>
                                </View>
                                <MassiveText text={habit.currentStreak} style={{fontSize: 50}}/>

                            </View>

                            <View style={{flexDirection: "column", gap: 5, justifyContent: "center", flex: 1}}>
                                <SubTitleText text={"Série en cours"}/>
                                <NormalText bold style={{color: fontGray}} text={"04 avr. 2024 - 10 avr. 2024"}/>
                            </View>
                        </View>

                        <Separator/>

                        <View style={{flexDirection: "row", justifyContent: "space-between", gap: 30}}>
                            <View style={{flexDirection: "row", gap: 10, alignItems: "flex-end", justifyContent: "flex-start"}}>
                                <View style={{marginVertical: 10}}>
                                    <Icon provider={IconProvider.FontAwesome5} size={30} name="fire" color={habit.color}/>
                                </View>
                                <MassiveText text={habit.bestStreak} style={{fontSize: 50}}/>

                            </View>

                            <View style={{flexDirection: "column", gap: 5, justifyContent: "center", flex: 1}}>
                                <SubTitleText text={"Meilleure série"}/>
                                <NormalText bold style={{color: fontGray}} text={"12 nov. 2023 - 27 dec. 2023"}/>
                            </View>
                        </View>
                        

                    </View>

                    <View style={styles.sectionContainer}>
           
                    </View>

                    
                    <View style={styles.sectionContainer}>

                    </View>
                </View>
            </View>
        </CustomBottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex", 
        flexDirection: "column", 
        gap: 20, 
        flex: 1,
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
    },
    
    sectionContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
    }
})
  
export default HabitStreakDetailsBottomScreen