import { FC, RefObject, useCallback, useContext, useMemo, useState } from "react";
import SimpleFullBottomSheet from "../../../components/BottomSheets/SimpleFullBottomSheet"
import { HugeText, TitleText } from "../../../styles/StyledText"
import { UsualScreen } from "../../../components/View/Views";
import { ScrollView, StyleSheet, View } from "react-native";
import { CloseButton } from "../../../components/Buttons/IconButtons";
import { Success_Impact } from "../../../constants/Impacts";
import ObjectifRadioItem from "../../../components/Objectifs/ObjectifRadioItem";
import { HabitsContext } from "../../../data/HabitContext";
import FooterBottomSheets from "../../../components/BottomSheets/FooterBottomSheets";
import { CustomStaticBottomSheet } from "../../../components/BottomSheets/CustomBottomSheet";
import { useThemeColor } from "../../../components/Themed";
import Separator from "../../../components/Other/Separator";
import { AppContext } from "../../../data/AppContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Habit, Objectif } from "../../../types/HabitTypes";

interface PinToObjectifBottomScreenProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    displayedObjectifs: Objectif[],
    updateHabitRelationWithObjectif: (habit: Habit, selectedPinObjectifID: string | null) => Promise<void>,
    habit: Habit
}

const PinToObjectifBottomScreen: FC<PinToObjectifBottomScreenProps> = 
    ({bottomSheetModalRef, displayedObjectifs, updateHabitRelationWithObjectif, habit}) => {
    
    const {setIsLoading} = useContext(AppContext)

    const snapPoints = useMemo(() => ['75%'], []);

    const closeModal = () => {
        bottomSheetModalRef.current?.close()
    }

    const [selectedPinObjectifID, setSelectedPinObjectifID] = useState(undefined)

    const handleChooseObjectif = async() => {
        if(habit.objectifID !== selectedPinObjectifID){
            setIsLoading(true)
            await updateHabitRelationWithObjectif(habit, selectedPinObjectifID ?? null)         
            setIsLoading(false)
        }

        Success_Impact()
        closeModal()
    }

    const RenderObjectif = ({item, index}) => {

        const onPress = () => {
            if(item.objectifID === selectedPinObjectifID){
                setSelectedPinObjectifID(undefined)
            }

            else setSelectedPinObjectifID(item.objectifID)
        }

        return (
            <ObjectifRadioItem onPress={onPress} objectif={item}
                        isSelected={selectedPinObjectifID === item.objectifID}/>
        )
    }


    return(
        <CustomStaticBottomSheet bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints}>
            <View style={styles.container}>
                <View style={styles.pageTitleContainer}>
                    <View style={{flex: 1}}>
                        <TitleText text="Choisissez un objectif"/>
                    </View>
                    <CloseButton noPadding methode={closeModal}/>
                </View>

                <ScrollView style={{display: "flex", flexDirection: "column", gap: 0}} showsVerticalScrollIndicator={false}>
                    <View style={{gap: 15, marginBottom: 30}}>
                    {
                        displayedObjectifs.map((obj, index) => (
                            <View key={index} style={{gap: 15}}>
                                <RenderObjectif key={index} item={obj} index={index}/>
                                { index !== displayedObjectifs.length - 1 && <Separator/> }
                            </View>
                        )) 
                    }
                    </View>
                </ScrollView>  

                <FooterBottomSheets text={"Valider"} onPress={handleChooseObjectif}/>
            </View>
        </CustomStaticBottomSheet>
    )
}

const styles = StyleSheet.create({

    container:{
      flex: 1, 
      gap: 0, 
      marginBottom: 30, 
      flexDirection: "column", 
      justifyContent: "space-between",
    },
    
    pageTitleContainer: {
      display: "flex", 
      flexDirection: "row", 
      alignItems:"center", 
      gap: 20,
      marginLeft: 5,
      marginBottom: 30
    },

    footer: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },
})

export default PinToObjectifBottomScreen