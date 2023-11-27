import { HugeText, NormalText, SubText, SubTitleText } from "../../../styles/StyledText"
import { AchievementBox } from "../../../components/Achievements/AchievementBox"
import CustomBottomSheet from "../../../components/BottomSheets/CustomBottomSheet"
import { useContext, useMemo } from "react";
import FooterBottomSheets from "../../../components/BottomSheets/FooterBottomSheets";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Icon } from "../../../components/Buttons/IconButtons";
import { TouchableOpacity } from "react-native";
import { useThemeColor } from "../../../components/Themed";
import { HabitsContext } from "../../../data/HabitContext";
import { getHabitType } from "../../../primitives/HabitMethods";
import { Success_Impact } from "../../../constants/Impacts";

export default SettingHabitBottomScreen = ({bottomSheetModalRef, habit}) => {
    
    const habitType = getHabitType(habit)
    const snapPoints = habitType === "Objectifs" ? ["55%"] : ["50%"]    
    const {removeHabit, updateHabitRelationWithObjectif} = useContext(HabitsContext)

    const closeModal = () => bottomSheetModalRef.current?.close()

    const handleDelete = async() => {
        await removeHabit(habit);
        Success_Impact()
        closeModal()
    }

    const handleSkip = () => {
        Success_Impact()
    }

    const handleEdit = () => {
        Success_Impact()
    }

    const handleShare = () => {
        Success_Impact()
    }

    const handleBreakObjectifRelation = () => {
        updateHabitRelationWithObjectif(habit, null)
        Success_Impact()
    }

    const error = useThemeColor({}, "Error")
    const font = useThemeColor({}, "Font")
    const tertiary = useThemeColor({}, "Tertiary")
    const fontGray = useThemeColor({}, "FontGray")

    const commands = [
        {icon: "trending-up", text:"Passer pour aujourd'hui", method: handleSkip},
        {icon: "edit-2", text:"Modifier l'habitude", method: handleEdit},
        {icon: "share", text:"Partager l'habitude", method: handleShare},
    ]

    if(habitType === "Objectifs"){
        commands.push({icon: "pin", provider: "Octicons", text:"Détacher de l'objectif", method: handleBreakObjectifRelation})
    }

    commands.push({icon: "trash", text:"Supprimer l'habitude", method: handleDelete, color: error})

    return (
        <CustomBottomSheet bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints} onChange={() => {}}>
            <View style={styles.container}>
                {
                    commands.map(command => (
                        <TouchableOpacity onPress={command.method} style={styles.displayRow} key={command.icon}>
                            <Icon name={command.icon} provider={command.provider ?? "Feather"} color={command.color ?? font}/>
                            <SubTitleText text={command.text} provider={"Feather"} style={{color: command.color ?? font}}/>
                        </TouchableOpacity>                    
                    ))
                }

                <FooterBottomSheets text={"Annuler"} onPress={() => bottomSheetModalRef.current?.close()}/>
            </View>
        </CustomBottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "space-between",
        gap: 30, 
        flex: 1,
        marginBottom: 30
    },

    displayRow: {
        display: "flex",
        flexDirection: "row",
        gap: 30
    }
})
  
