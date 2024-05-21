import { FC, RefObject, useCallback, useContext, useRef } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { useThemeColor } from "../../../components/Themed";
import { HabitsContext } from "../../../data/HabitContext";
import { getHabitType, getSeriazableHabit } from "../../../primitives/HabitMethods";
import { BottomScreenOpen_Impact, Success_Impact } from "../../../constants/Impacts";
import PinToObjectifBottomScreen from "./PinToObjectifBottomScreen";
import EditHabitNav from "../../EditScreens/Habits/EditHabitNav";
import { AppContext } from "../../../data/AppContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Habit } from "../../../types/HabitTypes";
import { CustomStaticBottomSheet } from "../../../components/BottomSheets/CustomBottomSheet";
import React from "react"
import ShareHabitBottomScreen from "../Social/ShareHabitBottomScreen";
import Command, { CommandType } from "../../../components/Other/Command";
import { IconProvider } from "../../../components/Buttons/IconButtons";
import EditHabitFrequencyNav from "../../EditScreens/Habits/EditHabitFrequencyNav";
import EndHabitBottomScreen from "./EndHabitBottomScreen";
import { useHabitActions } from "../../../hooks/Habits/useHabitActions";


export interface SettingHabitBottomScreenProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    habit: Habit,
    attachToObjectifAdditionnalMethod?: () => void, 
    deleteAdditionnalMethod?: () => void, 
    modifyAdditionnalMethod?: () => void,
    additionnalClosedMethod?: () => void,
    handleEditFrequencyAdditionnalMethod?: () => void
}

const SettingHabitBottomScreen: FC<SettingHabitBottomScreenProps> = ({
    bottomSheetModalRef, 
    habit, 
    attachToObjectifAdditionnalMethod, 
    deleteAdditionnalMethod,
    modifyAdditionnalMethod,
    additionnalClosedMethod,
    handleEditFrequencyAdditionnalMethod
}) => {
    
    const {setIsLoading, theme} = useContext(AppContext)
    const { Objectifs } = useContext(HabitsContext)
    const { updateHabitRelationWithObjectif } = useHabitActions()

    const habitType = getHabitType(habit)

    const displayedObjectifs = Object.values(Objectifs)

    const closeModal = () => {
         bottomSheetModalRef.current?.close()
    }

    const bottomSheetModalRef_PinObjectifScreen: RefObject<BottomSheetModal> = useRef(null)
    const bottomSheetModalRef_ShareHabitScreen: RefObject<BottomSheetModal> = useRef(null)
    const bottomSheetModalRef_EndHabit: RefObject<BottomSheetModal> = useRef(null)
    
    const handleOpenEdit = () => {
        handleOpenEditHabit()
    }

    const handleOpenEditFrequency = () => {
        handleOpenEditHabitFrequency()
    }

    const handleEdit = () => {
        modifyAdditionnalMethod ? modifyAdditionnalMethod() : null
    }

    const handleOpenShare = () => {
        bottomSheetModalRef_ShareHabitScreen.current?.present() 
    }

    const handleBreakObjectifRelation = async() => {
        setIsLoading(true)
        attachToObjectifAdditionnalMethod ? attachToObjectifAdditionnalMethod() : null
        await updateHabitRelationWithObjectif(habit, null)
        setIsLoading(false)
        Success_Impact()
    }

    const openPinObjectifScreen = () => {
        BottomScreenOpen_Impact()
        bottomSheetModalRef_PinObjectifScreen.current?.present() 
    }

    const handleOpenFinishHabitBottomScreen = () => {
        BottomScreenOpen_Impact()
        bottomSheetModalRef_EndHabit.current?.present()
    }

    const closeParentModal = () => {
        setTimeout(() => {
            closeModal()
        }, 200)
    }

    const handleMakeObjectifRelation = async(habit: Habit, selectedPinObjectifID: string | null) => 
    {
        attachToObjectifAdditionnalMethod ? attachToObjectifAdditionnalMethod() : null
        await updateHabitRelationWithObjectif(habit, selectedPinObjectifID)
    }


    const error = useThemeColor(theme, "Error")

    const commands: CommandType[] = [
        {icon: "edit-2", provider: IconProvider.Feather, text:"Modifier l'habitude", method: handleOpenEdit},
        {icon: "clock-edit-outline", provider: IconProvider.MaterialCommunityIcons, text:"Modifier la fréquence", method: handleOpenEditFrequency},
    ]

    if(habitType === "Objectifs"){
        commands.push({icon: "pin", provider: IconProvider.Octicons, text:"Détacher de l'objectif", method: handleBreakObjectifRelation})
    }

    else {
        commands.push({icon: "pin", provider: IconProvider.Octicons, text:"Attacher à un objectif", method: openPinObjectifScreen})
    }

    commands.push({icon: "share", provider: IconProvider.Feather, text:"Partager l'habitude", method: handleOpenShare})
    commands.push({icon: "block", provider: IconProvider.Entypo, text:"Mettre fin à cette habitude", method: handleOpenFinishHabitBottomScreen, color: error})

    const bottomSheetModalRef_EditHabit: RefObject<BottomSheetModal> = useRef(null);
    const bottomSheetModalRef_EditHabitFrequency: RefObject<BottomSheetModal> = useRef(null);
  
    const handleOpenEditHabit = useCallback(() => {
        bottomSheetModalRef_EditHabit.current?.present();
    }, []);

    const handleOpenEditHabitFrequency = useCallback(() => {
        bottomSheetModalRef_EditHabitFrequency.current?.present();
      }, []);
  
    return (
        <CustomStaticBottomSheet 
            footerMethod={() => bottomSheetModalRef.current?.close()}
            footerText="Terminer"
            bottomSheetModalRef={bottomSheetModalRef} onDismiss={additionnalClosedMethod}>
            <View style={styles.container}>
                <View style={{}}>
                    {
                        commands.map((command, index) => <Command {...command} key={index}/>)
                    }
                </View>
            </View>
            
            <PinToObjectifBottomScreen
                bottomSheetModalRef={bottomSheetModalRef_PinObjectifScreen}
                displayedObjectifs={displayedObjectifs}
                updateHabitRelationWithObjectif={handleMakeObjectifRelation}
                habit={habit}/>

            <EditHabitNav
                bottomSheetModalRef={bottomSheetModalRef_EditHabit}
                habit={getSeriazableHabit(habit)}
                validationAdditionnalMethod={handleEdit}
                editHabitCustomMethod={() => {}}
            />

            <EditHabitFrequencyNav
                additionnalCloseMethod={closeParentModal}
                bottomSheetModalRef={bottomSheetModalRef_EditHabitFrequency}
                habit={getSeriazableHabit(habit)}
                validationAdditionnalMethod={() => { handleEditFrequencyAdditionnalMethod ? handleEditFrequencyAdditionnalMethod() : null}}
            />
            
            <ShareHabitBottomScreen
                bottomSheetModalRef={bottomSheetModalRef_ShareHabitScreen}
                habit={habit}
            />

            <EndHabitBottomScreen
                bottomSheetModalRef={bottomSheetModalRef_EndHabit}
                habit={habit}
                additionnalClosedMethod={closeParentModal}
            />
        </CustomStaticBottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "space-between",
        gap: 20, 
        marginBottom: 30,
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
        gap: 20,
        marginLeft: -5,
      },
})

export default SettingHabitBottomScreen
  
