import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { FC, RefObject, useCallback, useContext, useRef } from "react"
import { Share, TouchableOpacity, View } from "react-native"
import { Objectif } from "../../../types/HabitTypes"
import { StyleSheet } from "react-native"
import { CustomStaticBottomSheet } from "../../../components/BottomSheets/CustomBottomSheet"
import { Icon, IconProvider } from "../../../components/Buttons/IconButtons"
import { SubTitleText } from "../../../styles/StyledText"
import FooterBottomSheet from "../../../components/BottomSheets/FooterBottomSheets"
import { useThemeColor } from "../../../components/Themed"
import { BottomScreenOpen_Impact, Success_Impact } from "../../../constants/Impacts"
import { AppContext } from "../../../data/AppContext"
import { HabitsContext } from "../../../data/HabitContext"

interface SettingsObjectifBottomSheetProps {
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
    addHabitAdditionnalMethod,
    removeHabitAdditionnalMethod,
    deleteAdditionnalMethod,
    modifyAdditionnalMethod
}) => {
    const {setIsLoading} = useContext(AppContext)
    const {removeObjectif} = useContext(HabitsContext)

    const closeModal = () => bottomSheetModalRef.current?.close()
    const bottomSheetModalRef_PinObjectifScreen: RefObject<BottomSheetModal> = useRef(null)

    const handleDelete = async() => {
        setIsLoading(true)
        deleteAdditionnalMethod ? deleteAdditionnalMethod() : null

        const deletePinnedHabits = false
        await removeObjectif(objectif.objectifID, deletePinnedHabits);

        setIsLoading(false)
        
        closeModal()
        Success_Impact()
    }

    const handleOpenEdit = () => {
        handleOpenEditHabit()
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
        {icon: "edit-2", provider: IconProvider.Feather, text:"Modifier l'objectif", method: handleOpenEdit},
        {icon: "share", provider: IconProvider.Feather, text:"Partager l'objectif", method: handleShare},
    ]

    commands.push({icon: "pin", provider: IconProvider.Octicons, text:"Modifier la composition", method: openPinObjectifScreen})

    commands.push({icon: "trash", provider: IconProvider.Feather, text:"Supprimer l'objectif", method: handleDelete, color: error})

    const bottomSheetModalRef_EditHabit: RefObject<BottomSheetModal> = useRef(null);
  
    const handleOpenEditHabit = useCallback(() => {
        bottomSheetModalRef_EditHabit.current?.present();
      }, []);
  
    return (
        <CustomStaticBottomSheet bottomSheetModalRef={bottomSheetModalRef}>
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
            
            {
            
            /* <PinToObjectifBottomScreen
                bottomSheetModalRef={bottomSheetModalRef_PinObjectifScreen}
                displayedObjectifs={displayedObjectifs}
                updateHabitRelationWithObjectif={handleMakeObjectifRelation}
                habit={habit}/>

            <EditHabitNav
                bottomSheetModalRef={bottomSheetModalRef_EditHabit}
                habit={getSeriazableHabit(habit)}
                validationAdditionnalMethod={handleEdit}
            /> */

            }
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