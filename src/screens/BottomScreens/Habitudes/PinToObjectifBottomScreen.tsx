import { FC, RefObject, useContext, useMemo, useState } from "react";
import { HugeText, TitleText } from "../../../styles/StyledText"
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { BottomSheetCloseButton, CloseButton, NavigationActions, NavigationButton } from "../../../components/Buttons/IconButtons";
import { BottomScreenOpen_Impact, Success_Impact } from "../../../constants/Impacts";
import ObjectifRadioItem from "../../../components/Objectifs/ObjectifRadioItem";
import { CustomStaticBottomSheet } from "../../../components/BottomSheets/CustomBottomSheet";
import Separator from "../../../components/Other/Separator";
import { AppContext } from "../../../data/AppContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Habit, Objectif } from "../../../types/HabitTypes";
import React from "react"
import { AnimatedFlatList } from "../../../components/Stats/AnimatedFlatList";
import SimpleFullBottomSheet from "../../../components/BottomSheets/SimpleFullBottomSheet";
import { UsualScreen } from "../../../components/View/Views";
import Quoti from "../../../components/Other/Quoti";

export interface PinToObjectifBottomScreenProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    displayedObjectifs: Objectif[],
    updateHabitRelationWithObjectif: (habit: Habit, selectedPinObjectifID: string | null) => Promise<void>,
    habit: Habit,
    additionnalCloseMethod?: () => void
}

const CustomSeparator = () => {
    return (
        <View style={{marginVertical: 10, marginHorizontal: -20}}>
        </View>
    )
}
const PinToObjectifBottomScreen: FC<PinToObjectifBottomScreenProps> = 
    ({bottomSheetModalRef, displayedObjectifs, updateHabitRelationWithObjectif, habit, additionnalCloseMethod}) => {
    
    const {setIsLoading} = useContext(AppContext)

    const snapPoints = useMemo(() => ['75%'], []);

    const closeModal = () => {
        BottomScreenOpen_Impact()

        additionnalCloseMethod ? additionnalCloseMethod() : null
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

    const RenderObjectif = ({item}) => {

        const onPress = () => {
            BottomScreenOpen_Impact()
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
        <SimpleFullBottomSheet 
            bottomSheetModalRef={bottomSheetModalRef}>
            <UsualScreen>
                <View style={styles.container}>
                    <View style={styles.pageTitleContainer}>
                        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                            <CloseButton methode={closeModal}/>
                            <Quoti/>
                            <NavigationButton action={NavigationActions.validation} methode={handleChooseObjectif}/>
                        </View>

                        <View style={{}}>
                            <HugeText text="Choisissez un objectif"/>
                        </View>

                    </View>
                    <View style={{gap: 0, marginBottom: 30, marginHorizontal: -30}}>
                        <Separator/>
                        <FlatList
                            data={displayedObjectifs}
                            renderItem={({item, index}) => <RenderObjectif key={index} item={item}/>}
                            ItemSeparatorComponent={CustomSeparator}
                            style={{marginBottom: -5}}
                            contentContainerStyle={{paddingHorizontal: 25, paddingBottom: 50, paddingTop: 15}}
                        />
                    </View>
                </View>
            </UsualScreen>
        </SimpleFullBottomSheet>
    )
}

const styles = StyleSheet.create({

    container:{
      flex: 1, 
      gap: 0, 
      flexDirection: "column", 
      justifyContent: "space-between",
    },
    
    pageTitleContainer: {
      display: "flex", 
      flexDirection: "column", 
      gap: 20,
      marginBottom: 20
    },

    footer: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },
})

export default PinToObjectifBottomScreen