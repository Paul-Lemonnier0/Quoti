import { FC, RefObject, useContext, useMemo, useState } from "react";
import { TitleText } from "../../../styles/StyledText"
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { BottomSheetCloseButton, CloseButton } from "../../../components/Buttons/IconButtons";
import { BottomScreenOpen_Impact, Success_Impact } from "../../../constants/Impacts";
import ObjectifRadioItem from "../../../components/Objectifs/ObjectifRadioItem";
import { CustomStaticBottomSheet } from "../../../components/BottomSheets/CustomBottomSheet";
import Separator from "../../../components/Other/Separator";
import { AppContext } from "../../../data/AppContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Habit, Objectif } from "../../../types/HabitTypes";
import React from "react"
import { AnimatedFlatList } from "../../../components/Stats/AnimatedFlatList";

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
        <CustomStaticBottomSheet 
            footerMethod={handleChooseObjectif}
            footerText="Valider"
            bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints}>
            <View style={styles.container}>
                <View style={styles.pageTitleContainer}>
                    <View style={{flex: 1}}>
                        <TitleText text="Choisissez un objectif"/>
                    </View>
                    <BottomSheetCloseButton methode={closeModal}/>
                </View>
                {/* <ScrollView style={{display: "flex", flexDirection: "column", gap: 0}} showsVerticalScrollIndicator={false}> */}
                <View style={{gap: 0, marginBottom: 30, marginHorizontal: -30}}>
                    <Separator/>

                    {
                        <FlatList
                            data={displayedObjectifs}
                            renderItem={({item, index}) => <RenderObjectif key={index} item={item}/>}
                            ItemSeparatorComponent={CustomSeparator}
                            style={{marginBottom: -5}}
                            contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 20, paddingTop: 15}}
                        />
                        // displayedObjectifs.map((obj, index) => (
                        //     <View key={index} style={{gap: 15}}>
                                
                        //         { index !== displayedObjectifs.length - 1 && <Separator/> }
                        //     </View>
                        // )) 
                    }
                </View>
                {/* </ScrollView>   */}
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
      marginLeft: -5,
      marginBottom: 15
    },

    footer: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },
})

export default PinToObjectifBottomScreen