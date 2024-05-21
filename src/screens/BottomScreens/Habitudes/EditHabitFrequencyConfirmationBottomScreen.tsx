import { FC, RefObject, useContext } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { useThemeColor } from "../../../components/Themed";
import { BottomScreenOpen_Impact, Success_Impact } from "../../../constants/Impacts";
import { AppContext } from "../../../data/AppContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Habit, Step } from "../../../types/HabitTypes";
import { CustomStaticBottomSheet } from "../../../components/BottomSheets/CustomBottomSheet";
import React from "react"
import Command, { CommandType } from "../../../components/Other/Command";
import { IconProvider } from "../../../components/Buttons/IconButtons";
import { auth } from "../../../firebase/InitialisationFirebase";
import { FormDetailledHabit, FormStep } from "../../../types/FormHabitTypes";
import { toISOStringWithoutTimeZone } from "../../../primitives/BasicsMethods";
import { useHabitActions } from "../../../hooks/Habits/useHabitActions";


export interface EditHabitFrequencyConfirmationBottomScreenProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    newHabit: Habit,
    oldHabit: Habit,
    additionnalClosedMethod?: () => void
}

const EditHabitFrequencyConfirmationBottomScreen: FC<EditHabitFrequencyConfirmationBottomScreenProps> = ({
    bottomSheetModalRef, 
    newHabit,
    oldHabit, 
    additionnalClosedMethod
}) => {
    
    const {setIsLoading, theme} = useContext(AppContext)
    const {removeHabit, archiveHabit, markHabitAsDone, addHabit} = useHabitActions()

    const error = useThemeColor(theme, "Error")

    const steps: (FormStep | Step)[] = Object.values(newHabit.steps).filter(step => step.stepID === newHabit.habitID).length > 0 ?
    [{numero: -1, stepID: newHabit.habitID}] : [...Object.values(newHabit.steps)]

    const closeModal = () => {
        BottomScreenOpen_Impact()
        bottomSheetModalRef.current?.close()
    }

    const deleteOldHabit = async() => {
        setIsLoading(true)

        await removeHabit(oldHabit);
        await addHabit({...newHabit, startingDate: toISOStringWithoutTimeZone(new Date()), steps} as FormDetailledHabit)

        setIsLoading(false)
        closeModal()
        Success_Impact()
        
        additionnalClosedMethod ? additionnalClosedMethod() : null
    }

    const archiveOldHabit = async() => {
        setIsLoading(true)
        await archiveHabit(oldHabit)
        await addHabit({...newHabit, startingDate: toISOStringWithoutTimeZone(new Date()), steps} as FormDetailledHabit)

        setIsLoading(false)

        closeModal()
        additionnalClosedMethod ? additionnalClosedMethod() : null
    }

    const markOldHabitAsDone = async() => {
        if(auth && auth.currentUser?.email) {
            setIsLoading(true)
            await markHabitAsDone(oldHabit)
            await addHabit({...newHabit, startingDate: toISOStringWithoutTimeZone(new Date()), steps} as FormDetailledHabit)
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
  