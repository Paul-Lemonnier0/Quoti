import { SubTitleText } from "../../../styles/StyledText"
import { FC, RefObject, useCallback, useContext, useRef } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Icon, IconProvider } from "../../../components/Buttons/IconButtons";
import { TouchableOpacity } from "react-native";
import { useThemeColor } from "../../../components/Themed";
import { Success_Impact } from "../../../constants/Impacts";
import EditHabitNav from "../../EditScreens/Habits/EditHabitNav";
import { AppContext } from "../../../data/AppContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Habit } from "../../../types/HabitTypes";
import { CustomStaticBottomSheet } from "../../../components/BottomSheets/CustomBottomSheet";
import React from "react"
import { FormDetailledGoalHabit } from "../../../types/FormHabitTypes";
import Command, { CommandType } from "../../../components/Other/Command";


export interface SettingNewGoalHabitBottomScreenProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    habit: FormDetailledGoalHabit,
    deleteHabit: () => void, 
    editHabit: (habitID: string, newHabit: (FormDetailledGoalHabit | Habit)) => void,
    additionnalClosedMethod?: () => void,
    goalColor: string,
    isNotGoalIDConst?: boolean
}

const SettingNewGoalHabitBottomScreen: FC<SettingNewGoalHabitBottomScreenProps> = ({
    bottomSheetModalRef, 
    habit, 
    goalColor,
    deleteHabit,
    editHabit,
    additionnalClosedMethod,
    isNotGoalIDConst
}) => {
    
    const {setIsLoading, theme} = useContext(AppContext)


    const closeModal = () => {
        bottomSheetModalRef.current?.close()
        additionnalClosedMethod ? additionnalClosedMethod() : null
    }

    const handleDelete = async() => {
        setIsLoading(true)

        deleteHabit()

        setIsLoading(false)
        closeModal()
        Success_Impact()
    }

    const handleOpenEdit = () => {
        handleOpenEditHabit()
    }

    const handleEdit = (newHabit: (FormDetailledGoalHabit | Habit)) => {
        editHabit(habit.habitID, newHabit)
        closeModal()
    }
    
    const error = useThemeColor(theme, "Error")

    const commands: CommandType[] = [
        {icon: "edit-2", provider: IconProvider.Feather, text:"Modifier l'habitude", method: handleOpenEdit},
        {icon: "trash", provider: IconProvider.Feather, text:"Supprimer l'habitude", method: handleDelete, color: error}
    ]

    const bottomSheetModalRef_EditHabit: RefObject<BottomSheetModal> = useRef(null);
  
    const handleOpenEditHabit = useCallback(() => {
        bottomSheetModalRef_EditHabit.current?.present();
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

            <EditHabitNav
                bottomSheetModalRef={bottomSheetModalRef_EditHabit}
                habit={habit}
                goalColor={goalColor}
                isNewGoalHabit
                validationAdditionnalMethod={() => {}}
                editHabitCustomMethod={handleEdit}
                constGoalID={ isNotGoalIDConst ? undefined : habit.goalID }
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
        marginLeft: 5,
      },
})

export default SettingNewGoalHabitBottomScreen
  
