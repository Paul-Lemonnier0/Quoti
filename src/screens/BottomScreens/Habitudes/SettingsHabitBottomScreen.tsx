import { FC, RefObject, useCallback, useContext, useRef } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { useThemeColor } from "../../../components/Themed";
import { HabitsContext } from "../../../data/HabitContext";
import { getHabitType, getSeriazableHabit } from "../../../primitives/HabitMethods";
import { BottomScreenOpen_Impact, Success_Impact } from "../../../constants/Impacts";
import PinToGoalBottomScreen from "./PinToGoalBottomScreen";
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
    attachToGoalAdditionnalMethod?: () => void, 
    deleteAdditionnalMethod?: () => void, 
    modifyAdditionnalMethod?: () => void,
    additionnalClosedMethod?: () => void,
    handleEditFrequencyAdditionnalMethod?: () => void
}

const SettingHabitBottomScreen: FC<SettingHabitBottomScreenProps> = ({
    bottomSheetModalRef, 
    habit, 
    attachToGoalAdditionnalMethod, 
    deleteAdditionnalMethod,
    modifyAdditionnalMethod,
    additionnalClosedMethod,
    handleEditFrequencyAdditionnalMethod
}) => {
    
    const {setIsLoading, theme} = useContext(AppContext)
    const { Goals } = useContext(HabitsContext)
    const { updateHabitRelationWithGoal } = useHabitActions()

    const habitType = getHabitType(habit)

    const displayedGoals = Object.values(Goals)

    const closeModal = () => {
         bottomSheetModalRef.current?.close()
    }

    const bottomSheetModalRef_PinGoalScreen: RefObject<BottomSheetModal> = useRef(null)
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

    const handleBreakGoalRelation = async() => {
        setIsLoading(true)
        attachToGoalAdditionnalMethod ? attachToGoalAdditionnalMethod() : null
        await updateHabitRelationWithGoal(habit, null)
        setIsLoading(false)
        Success_Impact()
    }

    const openPinGoalScreen = () => {
        BottomScreenOpen_Impact()
        bottomSheetModalRef_PinGoalScreen.current?.present() 
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

    const handleMakeGoalRelation = async(habit: Habit, selectedPinGoalID: string | null) => 
    {
        attachToGoalAdditionnalMethod ? attachToGoalAdditionnalMethod() : null
        await updateHabitRelationWithGoal(habit, selectedPinGoalID)
    }


    const error = useThemeColor(theme, "Error")

    const commands: CommandType[] = [
        {icon: "edit-2", provider: IconProvider.Feather, text:"Modifier l'habitude", method: handleOpenEdit},
        {icon: "clock-edit-outline", provider: IconProvider.MaterialCommunityIcons, text:"Modifier la fréquence", method: handleOpenEditFrequency},
    ]

    if(habitType === "Goals"){
        commands.push({icon: "pin", provider: IconProvider.Octicons, text:"Détacher de l'goal", method: handleBreakGoalRelation})
    }

    else {
        commands.push({icon: "pin", provider: IconProvider.Octicons, text:"Attacher à un goal", method: openPinGoalScreen})
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
            
            <PinToGoalBottomScreen
                bottomSheetModalRef={bottomSheetModalRef_PinGoalScreen}
                displayedGoals={displayedGoals}
                updateHabitRelationWithGoal={handleMakeGoalRelation}
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
  
