import { SubTitleText } from "../../../styles/StyledText"
import { FC, RefObject, useCallback, useContext, useRef } from "react";
import FooterBottomSheet from "../../../components/BottomSheets/FooterBottomSheets";
import { Share, View } from "react-native";
import { StyleSheet } from "react-native";
import { Icon, IconProvider } from "../../../components/Buttons/IconButtons";
import { TouchableOpacity } from "react-native";
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
import { FormDetailledHabit, FormDetailledObjectifHabit } from "../../../types/FormHabitTypes";


export interface SettingNewObjectifHabitBottomScreenProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    habit: FormDetailledObjectifHabit,
    deleteHabit: () => void, 
    editHabit: (habitID: string, newHabit: (FormDetailledObjectifHabit | Habit)) => void,
    additionnalClosedMethod?: () => void,
    objectifColor: string
}

const SettingNewObjectifHabitBottomScreen: FC<SettingNewObjectifHabitBottomScreenProps> = ({
    bottomSheetModalRef, 
    habit, 
    objectifColor,
    deleteHabit,
    editHabit,
    additionnalClosedMethod
}) => {
    
    const {setIsLoading} = useContext(AppContext)


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

    const handleEdit = (newHabit: (FormDetailledObjectifHabit | Habit)) => {
        editHabit(habit.habitID, newHabit)
        closeModal()
    }

    const error = useThemeColor({}, "Error")
    const font = useThemeColor({}, "Font")
    const fontGray = useThemeColor({}, "FontGray")

    interface commandType {
        icon: string,
        provider: IconProvider,
        text: string,
        method: () => void,
        color?: string
    }

    const commands: commandType[] = [
        {icon: "edit-2", provider: IconProvider.Feather, text:"Modifier l'habitude", method: handleOpenEdit},
        {icon: "trash", provider: IconProvider.Feather, text:"Supprimer l'habitude", method: handleDelete, color: error}
    ]

    const bottomSheetModalRef_EditHabit: RefObject<BottomSheetModal> = useRef(null);
  
    const handleOpenEditHabit = useCallback(() => {
        bottomSheetModalRef_EditHabit.current?.present();
      }, []);
  
    return (
        <CustomStaticBottomSheet bottomSheetModalRef={bottomSheetModalRef} onDismiss={additionnalClosedMethod}>
            <View style={styles.container}>
                <View style={{}}>
                    {
                        commands.map((command, index) => (
                            <TouchableOpacity onPress={command.method} style={styles.displayRow} key={command.icon}>
                                <Icon name={command.icon} provider={command.provider ?? "Feather"} color={command.color ?? fontGray}/>
                                <SubTitleText text={command.text} style={{color: command.color ?? font}}/>
                            </TouchableOpacity>      
                        ))
                    }
                </View>

                <FooterBottomSheet text={"Terminer"} onPress={() => bottomSheetModalRef.current?.close()}/>
            </View>

            <EditHabitNav
                bottomSheetModalRef={bottomSheetModalRef_EditHabit}
                habit={habit}
                objectifColor={objectifColor}
                isNewObjectifHabit
                validationAdditionnalMethod={() => {}}
                editHabitCustomMethod={handleEdit}
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

export default SettingNewObjectifHabitBottomScreen
  
