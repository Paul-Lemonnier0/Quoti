import { StyleSheet } from "react-native"
import AddHabitToGoalNav from "../../../screens/AddScreen/Goal/AddHabitToGoalNav"
import { View } from "react-native"
import { NavigationActions, NavigationButton } from "../../Buttons/IconButtons"
import { HugeText, NormalGrayText, NormalText, SubTitleText, TitleText } from "../../../styles/StyledText"
import StepIndicator from "../../Other/StepIndicator"
import { CustomScrollView, UsualScreen } from "../../View/Views"
import PresentationHabitList from "../../Habitudes/PresentationHabitList"
import { BorderTextButton, TextButton } from "../../Buttons/UsualButton"
import { Image } from "react-native"
import { FC, useCallback, useContext, useRef, useState } from "react"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { FormDetailledHabit, FormDetailledGoalHabit } from "../../../types/FormHabitTypes"
import { AppContext } from "../../../data/AppContext"
import { HabitsContext } from "../../../data/HabitContext"
import { FormDetailledGoal } from "../../../types/FormGoalTypes"
import React from "react"
import { Habit, Goal } from "../../../types/HabitTypes"
import IllustrationsList, { IllustrationsType } from "../../../data/IllustrationsList"
import Quoti from "../../Other/Quoti"

export interface GoalHabitsFormProps {
    goal: (FormDetailledGoal | Goal)
    handleGoNext: (habits: (FormDetailledGoalHabit | Habit)[]) => Promise<void>,
    baseHabits?: Habit[]
}

const GoalHabitsForm: FC<GoalHabitsFormProps> = ({goal, handleGoNext, baseHabits}) => {

    const [habitsForGoal, setHabitsForGoal] = useState<(FormDetailledGoalHabit | Habit)[]>(baseHabits ?? [])

    const handleValidate = async() => {
        await handleGoNext(habitsForGoal)
    }

    const addHabitForGoal = (habit: FormDetailledHabit) => {
        setHabitsForGoal((prevHabits => {
            return [
                ...prevHabits, 
                {
                    ...habit, 
                    icon: goal.icon,
                    habitID: prevHabits.length.toString() + "-" + habit.titre
                }
            ]
        }))
    }

    const handleAddHabit = () => {
        handleOpenAddHabit()
    }

    const bottomSheetModalRef_AddHabit = useRef<BottomSheetModal>(null);
  
    const handleOpenAddHabit = useCallback(() => {
        bottomSheetModalRef_AddHabit.current?.present();
      }, []);
  
    const EmptyHabitsScreen = () => {
        return(
            <View style={{flex: 1, flexGrow: 1}}>
                <View style={[styles.emptySreenContainer, {justifyContent: "space-evenly"}]}>                
                    <Image style={styles.emptyScreenImageContainer} source={IllustrationsList[IllustrationsType.Creative]}/>
                    
                    <View style={styles.emptyScreenSubContainer}>
                        <TitleText text="Pour plus d'efficacité"/>
                        <NormalGrayText bold text={"Décomposez votre goal"}/>
                    </View>
                </View>
            </View>
        )
    }

    const DisplayHabitsScreen = () => {
        return(
            <View style={styles.body}>
                <PresentationHabitList 
                    baseColor={goal.color} habits={habitsForGoal} 
                    editHabit={(habitID: string, newHabit: (Habit | FormDetailledGoalHabit)): void => {                            
                        setHabitsForGoal((previousGoalHabits) => (
                            previousGoalHabits.map((prevHab) => {
                                if(prevHab.habitID === habitID) {
                                    return newHabit
                                }

                                return prevHab
                            })
                        ))
                    }}

                    deleteHabit={(habit: (Habit | FormDetailledGoalHabit)): void => {
                        setHabitsForGoal((previousGoalHabits) => (
                            previousGoalHabits.filter((prevHab) => prevHab.habitID != habit.habitID)
                        ))
                    }}
                />
            </View>
        )
    }
    
    return(
        <UsualScreen hideMenu>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <NavigationButton noPadding action={NavigationActions.goBack}/>
                        <Quoti/>
                        <NavigationButton noPadding action={NavigationActions.validation} methode={handleValidate}/>
                    </View>
                    
                    <HugeText text="Développer votre idée"/>

                    <StepIndicator totalSteps={5} currentStep={4}/>
                </View>

                <View style={styles.body}>

                    <View style={{marginTop: 0, justifyContent: "space-between", alignItems: "center", flexDirection: "row"}}>
                        <TitleText text={"Habitudes"}/>
                        <TextButton text="Ajouter" noPadding onPress={handleAddHabit} semiBold/>
                    </View>

                    {
                    habitsForGoal.length === 0 ? 
                        <EmptyHabitsScreen/> 
                        : 
                        <DisplayHabitsScreen/>
                    }
                    
                </View>
            </View>

            <AddHabitToGoalNav

                bottomSheetModalRef={bottomSheetModalRef_AddHabit}
                addHabitForGoal={addHabitForGoal}
                goalID={(goal as Goal)?.goalID ?? "placeholder"}
                color={goal.color}
            />
        </UsualScreen>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex", 
        flexDirection: "column", 
        gap: 30, 
        flex: 1, 
    },

    header: {
        display: "flex", 
        flexDirection: "column", 
        gap: 30
    },
    
    body: {
        flex: 1, 
        gap: 20,
        justifyContent: "center"
    },

    emptySreenContainer: {
        flex: 1, 
        flexGrow: 1, 
        alignItems: "center", 
        justifyContent: "center",
        gap: 30, 

    },
    
    emptyScreenImageContainer: {
        resizeMode: 'contain', 
        maxWidth: "95%",
        maxHeight: "45%"
    },

    emptyScreenSubContainer: {
        justifyContent: "space-evenly", 
        alignItems: "center",
        gap: 5,
    },
});

export default GoalHabitsForm;