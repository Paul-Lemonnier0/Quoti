import { FC, RefObject, useContext, useMemo, useState } from "react";
import { HugeText, TitleText } from "../../../styles/StyledText"
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { BottomSheetCloseButton, CloseButton, NavigationActions, NavigationButton } from "../../../components/Buttons/IconButtons";
import { BottomScreenOpen_Impact, Success_Impact } from "../../../constants/Impacts";
import GoalRadioItem from "../../../components/Goals/GoalRadioItem";
import { CustomStaticBottomSheet } from "../../../components/BottomSheets/CustomBottomSheet";
import Separator from "../../../components/Other/Separator";
import { AppContext } from "../../../data/AppContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Habit, Goal } from "../../../types/HabitTypes";
import React from "react"
import { AnimatedFlatList } from "../../../components/Stats/AnimatedFlatList";
import SimpleFullBottomSheet from "../../../components/BottomSheets/SimpleFullBottomSheet";
import { UsualScreen } from "../../../components/View/Views";
import Quoti from "../../../components/Other/Quoti";

export interface PinToGoalBottomScreenProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    displayedGoals: Goal[],
    updateHabitRelationWithGoal: (habit: Habit, selectedPinGoalID: string | null) => Promise<void>,
    habit: Habit,
    additionnalCloseMethod?: () => void
}

const CustomSeparator = () => {
    return (
        <View style={{marginVertical: 10, marginHorizontal: -20}}>
        </View>
    )
}
const PinToGoalBottomScreen: FC<PinToGoalBottomScreenProps> = 
    ({bottomSheetModalRef, displayedGoals, updateHabitRelationWithGoal, habit, additionnalCloseMethod}) => {
    
    const {setIsLoading} = useContext(AppContext)

    const snapPoints = useMemo(() => ['75%'], []);

    const closeModal = () => {
        BottomScreenOpen_Impact()

        additionnalCloseMethod ? additionnalCloseMethod() : null
        bottomSheetModalRef.current?.close()
    }

    const [selectedPinGoalID, setSelectedPinGoalID] = useState(undefined)

    const handleChooseGoal = async() => {
        if(habit.goalID !== selectedPinGoalID){
            setIsLoading(true)
            await updateHabitRelationWithGoal(habit, selectedPinGoalID ?? null)         
            setIsLoading(false)
        }

        Success_Impact()
        closeModal()
    }

    const RenderGoal = ({item}) => {

        const onPress = () => {
            BottomScreenOpen_Impact()
            if(item.goalID === selectedPinGoalID){
                setSelectedPinGoalID(undefined)
            }

            else setSelectedPinGoalID(item.goalID)
        }

        return (
            <GoalRadioItem onPress={onPress} goal={item}
                        isSelected={selectedPinGoalID === item.goalID}/>
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
                            <NavigationButton action={NavigationActions.validation} methode={handleChooseGoal}/>
                        </View>

                        <View style={{}}>
                            <HugeText text="Choisissez un goal"/>
                        </View>

                    </View>
                    <View style={{gap: 0, marginBottom: 30, marginHorizontal: -30}}>
                        <Separator/>
                        <FlatList
                            data={displayedGoals}
                            renderItem={({item, index}) => <RenderGoal key={index} item={item}/>}
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

export default PinToGoalBottomScreen