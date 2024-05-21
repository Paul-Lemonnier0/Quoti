import { HugeText, MassiveText, NormalGrayText, TitleText } from "../../../styles/StyledText"
import { Keyboard, View } from "react-native";
import { StyleSheet } from "react-native";
import { BorderIconButton, BottomSheetCloseButton, CloseButton } from "../../../components/Buttons/IconButtons";
import Confetti from "../../../components/Other/Confetti";
import { FC, RefObject, useContext, useRef, useState } from "react";
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
import { BackgroundTextButton, BorderTextButton } from "../../../components/Buttons/UsualButton";
import { CustomTextInputRefType, TextInputCustom, TextInputCustomProps } from "../../../components/TextFields/TextInput";
import { AppContext } from "../../../data/AppContext";
import { useThemeColor } from "../../../components/Themed";
import HabitIcons from "../../../data/HabitIcons";
import ProgressBar from "../../../components/Progress/ProgressBar";
import Separator from "../../../components/Other/Separator";
import { TouchableWithoutFeedback } from "react-native";
import CheckedAnimation from "../../../components/Other/CheckedAnimation";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { HomeStackParamsList } from "../../../navigation/HomeNavigator";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { HabitCompletedBottomScreenStackProps } from "./HabitCompletedBottomScreenNav";
import { BottomSheetModalMethodsContext } from "../../../data/BottomSheetModalContext";
import { BottomScreenOpen_Impact } from "../../../constants/Impacts";

type HabitCompletedBottomScreenProps = NativeStackScreenProps<HabitCompletedBottomScreenStackProps, "HabitCompletedBottomScreen">

const HabitCompletedBottomScreen: FC<HabitCompletedBottomScreenProps> = ({route, navigation}) => {
    const {closeModal} = useContext(BottomSheetModalMethodsContext)
    
    const {theme} = useContext(AppContext)
    const fontGray = useThemeColor(theme, "FontGray")

    const checkedAnimationRef = useRef<AnimatedLottieView>(null)

    const {habit} = route.params

    const handlePost = () => {
        BottomScreenOpen_Impact()
        navigation.navigate("PostCompletedHabitScreen", {habit: habit})
    }

    return (
        <UsualScreen hideMenu>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{flex: 1}}>
            <View style={styles.container}>
                <View style={{flexDirection: "column"}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>     
                        <CloseButton methode={closeModal}/> 
                    </View>
                </View>
            
                <View style={{flex: 1, gap: 20, paddingBottom: 60}}>
                    <View style={styles.bodyHeader}>
                        <View style={styles.emptyScreenSubContainer}>
                            <MassiveText text={"Bravo !"}/>
                            <TitleText style={{color: fontGray}} bold text={"Habitude complétée"}/>
                        </View>
                    </View>

                    <CheckedAnimation ref={checkedAnimationRef}/>

                    <View style={styles.titreEtDescriptionContainer}>
                        <HugeText style={{textAlign: "center"}} numberOfLines={3} text={habit.titre}/>
                        <TitleText style={{color: fontGray, textAlign: "center"}} numberOfLines={3} bold text={habit.description}/>
                    </View>
                </View>

                <View style={styles.footer}>
                    <View style={{display: "flex", flexDirection: "row", gap: 20}}>
                        <BackgroundTextButton isFlex text={"Partager votre réussite"} onPress={handlePost} bold/>
                    </View>
                </View>
            </View>
            </TouchableWithoutFeedback>

        </UsualScreen>
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

    titreEtDescriptionContainer:{
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center",
    },

    pageTitleContainer: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        gap: 20,
    },

    bodyHeader: {
        gap: 15,
        display: "flex",
        flexDirection: "column"
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
        gap: 5
    },

    footer: {
        justifyContent: "center",
    }
})
  
export default HabitCompletedBottomScreen