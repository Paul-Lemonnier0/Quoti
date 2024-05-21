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
import { BottomSheetCloseButton, IconButton, IconProvider } from "../../../components/Buttons/IconButtons";
import EditHabitFrequencyScreen from "../../EditScreens/Habits/EditHabitFrequencyScreen";
import EditHabitFrequencyNav from "../../EditScreens/Habits/EditHabitFrequencyNav";
import { TitleText } from "../../../styles/StyledText";
import EndHabitBottomScreen from "./EndHabitBottomScreen";
import { getBackUserHabit, HabitState } from "../../../firebase/Firestore_Habits_Primitives";
import Toast from "react-native-toast-message";
import { useHabitActions } from "../../../hooks/Habits/useHabitActions";


export interface DoneHabitSettingBottomScreenProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    habit: Habit,
    isDone?: boolean,
    isArchived?: boolean,
    attachToObjectifAdditionnalMethod?: () => void, 
    deleteAdditionnalMethod?: () => void, 
    modifyAdditionnalMethod?: () => void,
    additionnalClosedMethod?: () => void
}

const DoneHabitSettingBottomScreen: FC<DoneHabitSettingBottomScreenProps> = ({
    bottomSheetModalRef, 
    habit, 
    isDone,
    isArchived,
    attachToObjectifAdditionnalMethod, 
    deleteAdditionnalMethod,
    modifyAdditionnalMethod,
    additionnalClosedMethod
}) => {
    
    const {setIsLoading, theme} = useContext(AppContext)
    const { Objectifs } = useContext(HabitsContext)
    const { updateHabitRelationWithObjectif } = useHabitActions()

    const { removeHabit, archiveHabit, markHabitAsDone, getBackHabit } = useHabitActions()

    const displayedObjectifs = Object.values(Objectifs)


    const closeModal = () => {
         bottomSheetModalRef.current?.close()
        // additionnalClosedMethod ? additionnalClosedMethod() : null
    }

    const bottomSheetModalRef_PinObjectifScreen: RefObject<BottomSheetModal> = useRef(null)
    const bottomSheetModalRef_ShareHabitScreen: RefObject<BottomSheetModal> = useRef(null)
    const bottomSheetModalRef_EndHabit: RefObject<BottomSheetModal> = useRef(null)

    const handleDelete = async() => {
        setIsLoading(true)
        deleteAdditionnalMethod ? deleteAdditionnalMethod() : null
        await removeHabit(habit);
        setIsLoading(false)
        closeModal()
        Success_Impact()
    }

    const handleEdit = () => {
        modifyAdditionnalMethod ? modifyAdditionnalMethod() : null
    }

    const handleOpenShare = () => {
        bottomSheetModalRef_ShareHabitScreen.current?.present() 
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

    const handleArchive = async() => {
        setIsLoading(true)
        await archiveHabit(habit, HabitState.Done)
        setIsLoading(false)

        
        Toast.show({
            type: "success",
            text1: "Habitude archivée !",
            position: "top"
        })

        closeModal()
        additionnalClosedMethod ? additionnalClosedMethod() : null
    }

    const handleMarkAsDone = async() => {
        setIsLoading(true)
        await markHabitAsDone(habit, HabitState.Archived)
        setIsLoading(false)

        Toast.show({
            type: "success",
            text1: "Habitude terminée !",
            position: "top"
        })

        closeModal()
        additionnalClosedMethod ? additionnalClosedMethod() : null
    }

    const handleGetBackHabit = async() =>  {   
        setIsLoading(true)

        const customCollection = isDone ? HabitState.Done : HabitState.Archived

        await getBackHabit(habit, customCollection)
        setIsLoading(false)

        Toast.show({
            type: "success",
            text1: "Habitude récupérée !",
            position: "top"
        })

        closeModal()
        additionnalClosedMethod ? additionnalClosedMethod() : null

    }

    const commands: CommandType[] = [
        {icon: "back", provider: IconProvider.AntDesign, text:"Reprendre cette habitude", method: handleGetBackHabit}
    ]

    if(isDone){
        commands.push({icon: "archive-outline", provider: IconProvider.MaterialCommunityIcons, text:"Archiver l'habitude", method: handleArchive})
    }

    else if(isArchived) {
        commands.push({icon: "done-all", provider: IconProvider.MaterialIcons, text:"Marquer comme terminée", method: handleMarkAsDone})
    }

    commands.push({icon: "trash", provider: IconProvider.Feather, text:"Supprimer définitivement", method: handleDelete, color: error})

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
                validationAdditionnalMethod={handleOpenShare}
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

export default DoneHabitSettingBottomScreen
  
