import { HugeText, LittleNormalText, MassiveText, NormalGrayText, NormalText, SubText, SubTitleGrayText, SubTitleText, TitleText } from "../../../styles/StyledText"
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
import ProgressBar, { CustomHabitStatProgressBar, ProgressPie } from "../../../components/Progress/ProgressBar";

interface StatComponentProps {
    title: string,
    value: number | string,
    massive?: boolean,
    legend?: boolean,
    legendBorderColor?: string,
    legendBackgroundColor?: string,
    percent?: boolean,
    streak?: boolean,
    flex?: boolean
}


const StatComponent: FC<StatComponentProps> = ({
    title,
    value,
    massive,
    percent,
    streak,
    legend,
    legendBackgroundColor,
    legendBorderColor,
    flex
}) => {
    const {theme} = useContext(AppContext)
    const secondary = useThemeColor(theme, "Secondary")
    const fontGray = useThemeColor(theme, "FontGray")
    
    return(
        <View style={{gap: 5, justifyContent: "space-between", flex: flex ? 1 : undefined}}>
            <NormalGrayText bold text={title}/>
            <View style={{flexDirection: "row", gap: 10, alignItems: legend ? undefined : "center"}}>
                {
                    streak &&
                    <Icon provider={IconProvider.FontAwesome5} name="fire" color={fontGray}/>
                }
                {
                    percent &&
                    <HugeText style={{color: fontGray}} text="%"/>
                }
                {
                    legend &&
                    <View
                        style={{
                            marginTop: 10,
                            height: 10,
                            borderRadius: 10,
                            width: 20,
                            borderWidth: 2,
                            backgroundColor: legendBackgroundColor ?? secondary,
                            borderColor: legendBorderColor ?? secondary,
                        }}/>
                }
                {
                    massive ? 
                    <MassiveText text={value} style={{fontSize: 90}}/> :
                    <HugeText text={value}/>
                }
            </View>
        </View>
    )
}

export interface HabitStreakDetailsBottomScreenProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    habit: Habit,
    ratio: RatioType
}

const HabitStreakDetailsBottomScreen: FC<HabitStreakDetailsBottomScreenProps> = ({bottomSheetModalRef, habit, ratio}) => {
    
    const {theme} = useContext(AppContext)
    const contrast = useThemeColor(theme, "Contrast")
    const fontGray = useThemeColor(theme, "FontGray")

    const closeModal = () => {
        bottomSheetModalRef.current?.close()
    }

    const skipped = 2
    const pourcentage = parseFloat((ratio.done * 100 / ratio.total).toString()).toFixed(1)

    return (
        <CustomBottomSheet
            hideHandle
            bottomSheetModalRef={bottomSheetModalRef}>
            <View style={styles.container}>
                <View style={styles.pageTitleContainer}>
                    <TitleText text={"Statistiques"}/>
                    <BottomSheetCloseButton methode={closeModal}/>
                </View>

                <View style={{flexDirection: "column", gap: 50, marginBottom: -20, marginTop: 0, flex: 1}}>
                    <View style={{flexDirection: "column", justifyContent: "space-between", marginBottom: -20}}>
                        <NormalGrayText text={"Taux de réussite"} bold/>
                        <MassiveText text={pourcentage} style={{fontSize: 70}}>
                            <MassiveText text={"%"} style={{fontSize: 60, color: fontGray}}/>
                        </MassiveText>
                    </View>
                    <View style={{flexDirection: "column", justifyContent: "space-between", gap: 15}}>
                        <NormalGrayText text={"Ratio"} bold/>
                        <CustomHabitStatProgressBar
                            total={ratio.total}
                            done={ratio.done}
                            skipped={skipped}
                            color={habit.color}
                        />
                    </View>


                    <View style={{flexDirection: "row", justifyContent: "space-between", gap: 40}}>
                        <StatComponent 
                            title={"Réalisées"} 
                            value={ratio.done}
                            legend legendBackgroundColor={habit.color} legendBorderColor={habit.color}
                        />
                        
                        <StatComponent 
                            title={"Passées"} value={skipped}
                            legend legendBorderColor={habit.color}
                        />
                        <StatComponent 
                            title={"Manquées"} value={ratio.total}
                            legend legendBorderColor={fontGray}
                        />
                    </View>


                    <View style={{flexDirection: "row", justifyContent: "space-between", gap: 40}}>
                        <StatComponent title={"Série en cours"} flex value={habit.currentStreak}/>
                        <StatComponent title={"Meilleure série"} flex value={habit.bestStreak}/>
                    </View>


                    {/* <ProgressBar progress={ratio ? (ratio.done / ratio.total) : 0} color={habit.color}/> */}

                    {/* <View style={{flex: 1, gap: 50}}>
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
                    </View> */}
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