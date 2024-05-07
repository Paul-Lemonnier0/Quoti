import { HugeText, LittleNormalText, MassiveText, NormalText, SubTitleText, TitleText } from "../../../styles/StyledText"
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { BottomSheetCloseButton, CloseButton, Icon, IconProvider } from "../../../components/Buttons/IconButtons";
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
import Separator, { HoleLineSeparator } from "../../../components/Other/Separator";
import CustomCard from "../../../components/Other/Card";
import { useThemeColor } from "../../../components/Themed";
import { AppContext } from "../../../data/AppContext";
import { RatioType } from "../../Habitude/HabitStreakDetailsScreen";
import { isHabitPlannedThisMonth } from "../../../primitives/HabitudesReccurence";
import ProgressBar, { ProgressPie } from "../../../components/Progress/ProgressBar";

export interface HabitStreakDetailsBottomScreenProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    habit: Habit,
    ratio: RatioType
}

const HabitStreakDetailsBottomScreen: FC<HabitStreakDetailsBottomScreenProps> = ({bottomSheetModalRef, habit, ratio}) => {
    
    const {theme} = useContext(AppContext)
    const fontGray = useThemeColor(theme, "FontGray")

    const closeModal = () => {
        bottomSheetModalRef.current?.close()
    }

    return (
        <CustomBottomSheet
            hideHandle
            footerMethod={closeModal}
            footerText="Terminer"
            bottomSheetModalRef={bottomSheetModalRef}>
            <View style={styles.container}>
                <View style={styles.pageTitleContainer}>
                    <TitleText text={"Statistiques"}/>
                    <BottomSheetCloseButton methode={closeModal}/>
                </View>

                <View style={{flexDirection: "column", gap: 20, marginBottom: 10, marginTop: 10, flex: 1}}>
                    <View style={{gap: 20, flex: 1, flexDirection: "row"}}>
                        <CustomCard flex style={{gap: 40}}>
                            <TitleText text={"Série en cours"}/>
                            <View style={{flexDirection: "row", gap: 5}}>
                                <MassiveText text={habit.currentStreak}/>
                                <MassiveText text={"j"} style={{color: fontGray}}/>
                            </View>
                        </CustomCard>

                        <CustomCard flex style={{gap: 40}}>
                            <TitleText text={"Meilleure série"}/>
                            <View style={{flexDirection: "row", gap: 5}}>
                                <MassiveText text={"32"}/>
                                <MassiveText text={"j"} style={{color: fontGray}}/>
                            </View>
                        </CustomCard>
                    </View>

                    <CustomCard style={{flex: 1, gap: 50}}>
                        <View style={{justifyContent: "space-between", flexDirection: "row"}}>
                            <TitleText text={"Ratio "}/>
                            <TitleText style={{color: fontGray}} text={ratio.done + "/" + ratio.total}/>

                        </View>



                        <View style={{marginTop: -10, gap: 20}}>
                            <View style={{flexDirection: "row",gap: 5}}>
                                <MassiveText bold text={Math.round((ratio.done / ratio.total) * 100)  + ""}/>
                                <MassiveText text={"%"} style={{color: fontGray}}/>
                            </View>
                            <ProgressBar progress={ratio ? (ratio.done / ratio.total) : 0} color={habit.color}/>
                        </View>
                    </CustomCard>
                </View>
            </View>
        </CustomBottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "space-between",
        gap: 30, 
        marginBottom: 80,
        flex: 1
    },

    displayRow: {
        display: "flex",
        flexDirection: "row",
        gap: 30,
        marginVertical: 20
    },

    pageTitleContainer: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        justifyContent: "space-between",
        gap: 20,
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