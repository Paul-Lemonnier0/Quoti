import { FC, RefObject, useContext } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { useThemeColor } from "../../../components/Themed";
import { HabitsContext } from "../../../data/HabitContext";
import { BottomScreenOpen_Impact, Success_Impact } from "../../../constants/Impacts";
import { AppContext } from "../../../data/AppContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Habit } from "../../../types/HabitTypes";
import { CustomStaticBottomSheet } from "../../../components/BottomSheets/CustomBottomSheet";
import React from "react"
import Command, { CommandType } from "../../../components/Other/Command";
import { IconProvider } from "../../../components/Buttons/IconButtons";
import { auth } from "../../../firebase/InitialisationFirebase";
import Toast from "react-native-toast-message";


export interface EndHabitBottomScreenProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    habit: Habit,
    additionnalClosedMethod?: () => void
}

const EndHabitBottomScreen: FC<EndHabitBottomScreenProps> = ({
    bottomSheetModalRef, 
    habit, 
    additionnalClosedMethod
}) => {
    
    const {setIsLoading, theme} = useContext(AppContext)
    const {removeHabit, archiveHabit, markHabitAsDone} = useContext(HabitsContext)

    const error = useThemeColor(theme, "Error")

    const closeModal = () => {
        BottomScreenOpen_Impact()
        bottomSheetModalRef.current?.close()
    }

    const deleteOldHabit = async() => {
        setIsLoading(true)
        await removeHabit(habit);
        setIsLoading(false)
        closeModal()
        Success_Impact()

        Toast.show({
            type: "success",
            text1: "Habitude supprimée !",
            position: "top"
        })
        
        additionnalClosedMethod ? additionnalClosedMethod() : null
    }

    const archiveOldHabit = async() => {
        setIsLoading(true)
        await archiveHabit(habit)
        setIsLoading(false)

        Toast.show({
            type: "success",
            text1: "Habitude archivée !",
            position: "top"
        })

        closeModal()
        additionnalClosedMethod ? additionnalClosedMethod() : null
    }

    const markOldHabitAsDone = async() => {
        if(auth && auth.currentUser?.email) {
            setIsLoading(true)
            await markHabitAsDone(habit)
            setIsLoading(false)
        }

        Toast.show({
            type: "success",
            text1: "Habitude terminée !",
            position: "top"
        })
        
        closeModal()
        additionnalClosedMethod ? additionnalClosedMethod() : null
    }

    const commands: CommandType[] = [
        {icon: "done-all", provider: IconProvider.MaterialIcons, text:"Marquer comme terminée", method: markOldHabitAsDone},
        {icon: "archive-outline", provider: IconProvider.MaterialCommunityIcons, text:"Archiver l'habitude", method: archiveOldHabit},
        {icon: "trash", provider: IconProvider.Feather, text:"Supprimer l'habitude", method: deleteOldHabit, color: error},
    ]

    return (
        <CustomStaticBottomSheet 
            footerMethod={closeModal}
            footerText="Annuler"
            bottomSheetModalRef={bottomSheetModalRef}>
            <View style={styles.container}>
                <View style={{}}>
                    {
                        commands.map((command, index) => <Command {...command} key={index}/>)
                    }
                </View>
            </View>
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
        marginLeft: 5,
      },
})

export default EndHabitBottomScreen
  