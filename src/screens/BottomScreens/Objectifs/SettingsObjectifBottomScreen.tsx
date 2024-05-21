import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { FC, RefObject, useCallback, useContext, useRef } from "react"
import { Share, TouchableOpacity, View } from "react-native"
import { Objectif } from "../../../types/HabitTypes"
import { StyleSheet } from "react-native"
import { CustomStaticBottomSheet } from "../../../components/BottomSheets/CustomBottomSheet"
import { Icon, IconProvider } from "../../../components/Buttons/IconButtons"
import { SubTitleText } from "../../../styles/StyledText"
import { useThemeColor } from "../../../components/Themed"
import { BottomScreenOpen_Impact, Success_Impact } from "../../../constants/Impacts"
import { AppContext } from "../../../data/AppContext"
import { HabitsContext } from "../../../data/HabitContext"
import React from "react"
import EditHabitNav from "../../EditScreens/Habits/EditHabitNav"
import { getSeriazableObjectif } from "../../../primitives/ObjectifMethods"
import EditObjectifNav from "../../EditScreens/Objectifs/EditObjectifNav"
import Command, { CommandType } from "../../../components/Other/Command"
import { useGoalsActions } from "../../../hooks/Habits/useGoalActions"

export interface SettingsObjectifBottomSheetProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    objectif: Objectif,
    addHabitAdditionnalMethod?: () => void, 
    removeHabitAdditionnalMethod?: () => void, 
    deleteAdditionnalMethod?: () => void, 
    modifyAdditionnalMethod?: () => void
}

const SettingsObjectifBottomSheet: FC<SettingsObjectifBottomSheetProps> = ({
    bottomSheetModalRef,
    objectif,
    deleteAdditionnalMethod,
    modifyAdditionnalMethod
}) => {
    const {setIsLoading, theme} = useContext(AppContext)
    const {removeGoal} = useGoalsActions()

    const closeModal = () => bottomSheetModalRef.current?.close()
    const bottomSheetModalRef_PinObjectifScreen: RefObject<BottomSheetModal> = useRef(null)

    const handleDelete = async() => {
        setIsLoading(true)
        deleteAdditionnalMethod ? deleteAdditionnalMethod() : null

        const deletePinnedHabits = false
        await removeGoal(objectif.objectifID, deletePinnedHabits);

        setIsLoading(false)
        
        closeModal()
        Success_Impact()
    }

    const handleOpenEdit = () => {
        handleOpenEditObjectif()
    }

    const handleEdit = () => {
        closeModal()
        modifyAdditionnalMethod ? modifyAdditionnalMethod() : null
    }

    const handleShare = async() => {
        BottomScreenOpen_Impact()

        try{
            const result = await Share.share({
                message: objectif.titre + " : " + objectif.description,
                url: `exp://172.20.10.2:8081/--/SharedHabitScreen?habitID='50'&userID='Paul'`,
            })

            if(result.action === Share.sharedAction){
                //shared
            }

            else if(result.action === Share.dismissedAction){
                //Pas shared
            }
        }

        catch(e){
            console.log("Shared Error : ", e)
        }
    }

    const openPinObjectifScreen = () => {
        bottomSheetModalRef_PinObjectifScreen.current?.present() 
    }

    const error = useThemeColor(theme, "Error")
    const font = useThemeColor(theme, "Font")
    const fontGray = useThemeColor(theme, "FontGray")

    const commands: CommandType[] = [
        {icon: "edit-2", provider: IconProvider.Feather, text:"Modifier l'objectif", method: handleOpenEdit},
        {icon: "share", provider: IconProvider.Feather, text:"Partager l'objectif", method: handleShare},
    ]

    commands.push({icon: "pin", provider: IconProvider.Octicons, text:"Modifier la composition", method: openPinObjectifScreen})

    commands.push({icon: "trash", provider: IconProvider.Feather, text:"Supprimer l'objectif", method: handleDelete, color: error})

    const bottomSheetModalRef_EditObjectif: RefObject<BottomSheetModal> = useRef(null);
  
    const handleOpenEditObjectif = useCallback(() => {
        bottomSheetModalRef_EditObjectif.current?.present();
      }, []);
  
    return (
        <CustomStaticBottomSheet 
            bottomSheetModalRef={bottomSheetModalRef}
            footerMethod={() => bottomSheetModalRef.current?.close()}
            footerText="Terminer">
            <View style={styles.container}>
                <View style={{}}>
                    {
                        commands.map((command, index) => <Command {...command} key={index}/>)
                    }
                </View>
            </View>
            
            <EditObjectifNav
                bottomSheetModalRef={bottomSheetModalRef_EditObjectif}
                objectif={getSeriazableObjectif(objectif)}
                validationAdditionnalMethod={handleEdit}
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

export default SettingsObjectifBottomSheet