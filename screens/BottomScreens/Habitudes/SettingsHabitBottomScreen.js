import { HugeText, NormalText, SubText, SubTitleText, TitleText } from "../../../styles/StyledText"
import CustomBottomSheet, { CustomStaticBottomSheet } from "../../../components/BottomSheets/CustomBottomSheet.tsx"
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import FooterBottomSheets from "../../../components/BottomSheets/FooterBottomSheets";
import { Share, View } from "react-native";
import { StyleSheet } from "react-native";
import { CloseButton, Icon } from "../../../components/Buttons/IconButtons";
import { TouchableOpacity } from "react-native";
import { useThemeColor } from "../../../components/Themed";
import { HabitsContext } from "../../../data/HabitContext";
import { getHabitType, getSeriazableHabit } from "../../../primitives/HabitMethods";
import { BottomScreenOpen_Impact, Success_Impact } from "../../../constants/Impacts";
import Separator from "../../../components/Other/Separator";
import SimpleFullBottomSheet from "../../../components/BottomSheets/SimpleFullBottomSheet";
import PinToObjectifBottomScreen from "./PinToObjectifBottomScreen";
import AddHabitToObjectifNav from "../../AddScreen/Objectif/AddHabitToObjectifNav";
import EditHabitNav from "../../EditScreens/Habits/EditHabitNav";
import { AppContext } from "../../../data/AppContext";

export default SettingHabitBottomScreen = ({
    bottomSheetModalRef, 
    habit, 
    attachToObjectifAdditionnalMethod, 
    deleteAdditionnalMethod,
    modifyAdditionnalMethod
}) => {
    
    const {setIsLoading} = useContext(AppContext)
    const {removeHabit, updateHabitRelationWithObjectif, Objectifs} = useContext(HabitsContext)

    const habitType = getHabitType(habit)
    const snapPoints = habitType === "Objectifs" ? ["55%"] : ["50%"]    

    const [displayedObjectifs, setDisplayedObjectifs] = useState(Object.values(Objectifs))


    const closeModal = () => bottomSheetModalRef.current?.close()
    const bottomSheetModalRef_PinObjectifScreen = useRef(null)

    const handleDelete = async() => {
        setIsLoading(true)
        deleteAdditionnalMethod ? deleteAdditionnalMethod() : null
        await removeHabit(habit);
        setIsLoading(false)
        closeModal()
        Success_Impact()
    }

    const handleSkip = () => {
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
                message: habit.titre + " : " + habit.description,
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
            Alert.alert("Shared Error : ", e)
        }
    }

    const handleBreakObjectifRelation = async() => {
        setIsLoading(true)
        attachToObjectifAdditionnalMethod ? attachToObjectifAdditionnalMethod() : null
        await updateHabitRelationWithObjectif(habit, null)
        setIsLoading(false)
        Success_Impact()
    }

    const openPinObjectifScreen = () => {
        bottomSheetModalRef_PinObjectifScreen.current?.present()
    }

    const handleMakeObjectifRelation = async(habit, selectedPinObjectifID) => 
    {
        attachToObjectifAdditionnalMethod ? attachToObjectifAdditionnalMethod() : null
        await updateHabitRelationWithObjectif(habit, selectedPinObjectifID)
    }

    const error = useThemeColor({}, "Error")
    const font = useThemeColor({}, "Font")
    const tertiary = useThemeColor({}, "Tertiary")
    const fontGray = useThemeColor({}, "FontGray")

    const commands = [
        {icon: "trending-up", text:"Passer pour aujourd'hui", method: handleSkip},
        {icon: "edit-2", text:"Modifier l'habitude", method: handleOpenEdit},
        {icon: "share", text:"Partager l'habitude", method: handleShare},
    ]

    if(habitType === "Objectifs"){
        commands.push({icon: "pin", provider: "Octicons", text:"Détacher de l'objectif", method: handleBreakObjectifRelation})
    }

    else {
        commands.push({icon: "pin", provider: "Octicons", text:"Attacher à un objectif", method: openPinObjectifScreen})
    }

    commands.push({icon: "trash", text:"Supprimer l'habitude", method: handleDelete, color: error})

    const bottomSheetModalRef_EditHabit = useRef(null);
  
    const handleOpenEditHabit = useCallback(() => {
        bottomSheetModalRef_EditHabit.current?.present();
      }, []);
  
    return (
        <CustomStaticBottomSheet bottomSheetModalRef={bottomSheetModalRef} onChange={() => {}}>
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

                <FooterBottomSheets text={"Terminer"} onPress={() => bottomSheetModalRef.current?.close()}/>
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
  
