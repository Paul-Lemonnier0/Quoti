import { FC, useContext, useRef } from "react";
import ChooseColorForm from "../../../components/Forms/ChooseColorForm"
import { useNavigation, useRoute } from "@react-navigation/native";
import { FormColoredHabitValues } from "../../../types/FormHabitTypes";
import { EditHabitStackProps } from "./EditHabitNav";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AddHabitScreenType, getAddHabitStepsDetails } from "../../../constants/BasicConstants";
import React from "react"
import { BottomScreenOpen_Impact } from "../../../constants/Impacts";
import { StyleSheet, View } from "react-native";
import { BackgroundTextButton, BorderTextButton } from "../../../components/Buttons/UsualButton";
import { HugeText, MassiveText, NormalGrayText, NormalText, TitleText } from "../../../styles/StyledText";
import { Image } from "react-native";
import IllustrationsList, { IllustrationsType } from "../../../data/IllustrationsList";
import { CloseButton, NavigationActions, NavigationButton } from "../../../components/Buttons/IconButtons";
import { UsualScreen } from "../../../components/View/Views";
import { AppContext } from "../../../data/AppContext";
import { useThemeColor } from "../../../components/Themed";
import { EditHabitFrequencyStackProps } from "./EditHabitFrequencyNav";
import { BottomSheetModalMethodsContext } from "../../../data/BottomSheetModalContext";
import Quoti from "../../../components/Other/Quoti";
import EditHabitFrequencyConfirmationBottomScreen from "../../BottomScreens/Habitudes/EditHabitFrequencyConfirmationBottomScreen";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { convertBackSeriazableHabit } from "../../../primitives/HabitMethods";
import StepIndicator from "../../../components/Other/StepIndicator";
import { EditHabitContext } from "./EditHabitContext";

type InformationEditFrequencyHabitProps = NativeStackScreenProps<EditHabitFrequencyStackProps, "InformationEditFrequencyHabit">

const InformationEditFrequencyHabit: FC<InformationEditFrequencyHabitProps> = ({route, navigation}) => {
    
    const {closeModal} = useContext(BottomSheetModalMethodsContext)
    const {validationAdditionnalMethod} = useContext(EditHabitContext)

    const {theme} = useContext(AppContext)
    const fontGray = useThemeColor(theme, "FontGray")
    const error = useThemeColor(theme, "Error")
    
    const {newHabit, oldHabit} = route.params

    const confirmationBottomScreenRef = useRef<BottomSheetModal>(null)

    const openConfirmationModal = () => {
        BottomScreenOpen_Impact()
        confirmationBottomScreenRef.current?.present()
    }

    const validationMethod = () => {
        validationAdditionnalMethod ? validationAdditionnalMethod() : null
        closeModal()
    }

    return(
        <UsualScreen hideMenu>   
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <NavigationButton action={NavigationActions.goBack} noPadding/>
                        <Quoti/>
                        <NavigationButton noPadding action={NavigationActions.validation} methode={openConfirmationModal}/>
                    </View>

                    <HugeText text="Êtes-vous sûr.e ?"/>
                    <StepIndicator totalSteps={2} currentStep={1}/>

                </View>


                <View style={{flex: 1, flexGrow: 1}}>
                    <View style={{flexDirection: "column", gap: 50,  flex: 1}}>
                        <TitleText style={{color: fontGray}} bold text={"Les changements effectués entraîneront la création d'une "}>
                            <TitleText style={{}} bold text={"nouvelle habitude"}/>
                            <TitleText style={{color: fontGray}} bold text={" selon vos nouveaux paramètres."}/>                           
                        </TitleText>

                        <TitleText style={{color: fontGray}} bold text={"Vous pourrez ensuite "}>
                            <TitleText style={{color: error}} bold text={"supprimer"}/>
                            <TitleText style={{color: fontGray}} bold text={", "}/>
                            <TitleText style={{}} bold text={"archiver"}/>
                            <TitleText style={{color: fontGray}} bold text={" ou marquée comme "}/>
                            <TitleText style={{}} bold text={"terminée"}/>     
                            <TitleText style={{color: fontGray}} bold text={" l'ancienne habitude."}/>
                        </TitleText>
                    </View>
                </View>

                <View style={styles.footer}>
                    <View style={{display: "flex", flexDirection: "row", gap: 20, paddingHorizontal: 0}}>
                        <BackgroundTextButton isFlex text={"Continuez"} onPress={openConfirmationModal} bold/>
                        <BorderTextButton isFlex text={"Annuler"} onPress={closeModal} bold/>
                    </View>
                </View>
            </View>

            <EditHabitFrequencyConfirmationBottomScreen
                bottomSheetModalRef={confirmationBottomScreenRef}
                newHabit={convertBackSeriazableHabit(newHabit)}
                oldHabit={convertBackSeriazableHabit(oldHabit)}
                additionnalClosedMethod={validationMethod}
            />
        </UsualScreen>
    )
}


const styles = StyleSheet.create({

    container: {
        display: "flex", 
        flexDirection: "column", 
        gap: 50, 
        flex: 1, 
        marginBottom: 0
    },

    header: {
        display: "flex", 
        flexDirection: "column", 
        gap: 30
    },
    
    body: {
        flex: 1, 
        gap: 30,
    },

    footer:{
    
    },

    habitPresentationContainer: {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center", 
        gap: 20, 
        margin: 20
    },

    titleAndDescriptionContainer: {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center", 
        gap: 10
    },

    groupContainer: {
        display: 'flex', 
        flexDirection: "column",
        justifyContent: "center", 
        gap: 20, flex: 1
    },

    emptySreenContainer: {
        flex: 1, 
        flexGrow: 1, 
        alignItems: "center", 
        justifyContent: "center",
        gap: 20, 

    },
    
    emptyScreenImageContainer: {
        resizeMode: 'contain', 
        width: "90%", 
        maxHeight: "60%",
    },

    emptyScreenSubContainer: {
        justifyContent: "space-evenly", 
        alignItems: "center",
        gap: 5
    },
  });

export default InformationEditFrequencyHabit