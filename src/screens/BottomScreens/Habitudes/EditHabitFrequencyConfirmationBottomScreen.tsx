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
import { Habit, Step } from "../../../types/HabitTypes";
import { CustomStaticBottomSheet } from "../../../components/BottomSheets/CustomBottomSheet";
import React from "react"
import ShareHabitBottomScreen from "../Social/ShareHabitBottomScreen";
import Command, { CommandType } from "../../../components/Other/Command";
import { IconProvider } from "../../../components/Buttons/IconButtons";
import EditHabitFrequencyScreen from "../../EditScreens/Habits/EditHabitFrequencyScreen";
import EditHabitFrequencyNav from "../../EditScreens/Habits/EditHabitFrequencyNav";
import { archiveUserHabit } from "../../../firebase/Firestore_Habits_Primitives";
import { auth } from "../../../firebase/InitialisationFirebase";
import { FormDetailledHabit, FormStep } from "../../../types/FormHabitTypes";
import { toISOStringWithoutTimeZone } from "../../../primitives/BasicsMethods";


export interface EditHabitFrequencyConfirmationBottomScreenProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    habit: Habit,
    additionnalClosedMethod?: () => void
}

const EditHabitFrequencyConfirmationBottomScreen: FC<EditHabitFrequencyConfirmationBottomScreenProps> = ({
    bottomSheetModalRef, 
    habit, 
    additionnalClosedMethod
}) => {
    
    const {setIsLoading, theme} = useContext(AppContext)
    const {removeHabit, archiveHabit, markHabitAsDone, addHabit} = useContext(HabitsContext)

    const error = useThemeColor(theme, "Error")

    const steps: (FormStep | Step)[] = Object.values(habit.steps).filter(step => step.stepID === habit.habitID).length > 0 ?
    [{numero: -1, stepID: habit.habitID}] : [...Object.values(habit.steps)]

    const closeModal = () => {
        BottomScreenOpen_Impact()
        bottomSheetModalRef.current?.close()
    }

    const deleteOldHabit = async() => {
        setIsLoading(true)

        await removeHabit(habit);
        await addHabit({...habit, startingDate: toISOStringWithoutTimeZone(new Date()), steps} as FormDetailledHabit)

        setIsLoading(false)
        closeModal()
        Success_Impact()
        
        additionnalClosedMethod ? additionnalClosedMethod() : null
    }

    const archiveOldHabit = async() => {
        setIsLoading(true)
        await archiveHabit(habit)
        await addHabit({...habit, startingDate: toISOStringWithoutTimeZone(new Date()), steps} as FormDetailledHabit)

        setIsLoading(false)

        closeModal()
        additionnalClosedMethod ? additionnalClosedMethod() : null
    }

    const markOldHabitAsDone = async() => {
        if(auth && auth.currentUser?.email) {
            setIsLoading(true)
            await markHabitAsDone(habit)
            await addHabit({...habit, startingDate: toISOStringWithoutTimeZone(new Date()), steps} as FormDetailledHabit)
            setIsLoading(false)
        }

        closeModal()
        additionnalClosedMethod ? additionnalClosedMethod() : null
    }

    const commands: CommandType[] = [
        {icon: "done-all", provider: IconProvider.MaterialIcons, text:"Marquer comme terminée", method: markOldHabitAsDone},
        {icon: "archive-outline", provider: IconProvider.MaterialCommunityIcons, text:"Archiver l'ancienne version", method: archiveOldHabit},
        {icon: "trash", provider: IconProvider.Feather, text:"Supprimer définitivement", method: deleteOldHabit, color: error},
    ]

    return (
        <CustomStaticBottomSheet 
            footerMethod={closeModal}
            footerText="Annuler"
            bottomSheetModalRef={bottomSheetModalRef} onDismiss={additionnalClosedMethod}>
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

export default EditHabitFrequencyConfirmationBottomScreen
  