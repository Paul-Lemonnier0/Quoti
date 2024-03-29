import { StyleSheet } from "react-native"
import AddHabitToObjectifNav from "../../../screens/AddScreen/Objectif/AddHabitToObjectifNav"
import { View } from "react-native"
import { NavigationButton } from "../../Buttons/IconButtons"
import { HugeText, NormalText, SubTitleText, TitleText } from "../../../styles/StyledText"
import StepIndicator from "../../Other/StepIndicator"
import { CustomScrollView, UsualScreen } from "../../View/Views"
import PresentationHabitList from "../../Habitudes/PresentationHabitList"
import { BorderTextButton, TextButton } from "../../Buttons/UsualButton"
import { Image } from "react-native"
import { FC, useCallback, useContext, useRef, useState } from "react"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { FormDetailledHabit, FormDetailledObjectifHabit } from "../../../types/FormHabitTypes"
import { AppContext } from "../../../data/AppContext"
import { HabitsContext } from "../../../data/HabitContext"
import { FormDetailledObjectif } from "../../../types/FormObjectifTypes"
import React from "react"
import { Habit, Objectif } from "../../../types/HabitTypes"

export interface ObjectifHabitsFormProps {
    objectif: (FormDetailledObjectif | Objectif)
    handleGoNext: (habits: (FormDetailledObjectifHabit | Habit)[]) => Promise<void>,
    baseHabits?: Habit[]
}

const ObjectifHabitsForm: FC<ObjectifHabitsFormProps> = ({objectif, handleGoNext, baseHabits}) => {

    const [habitsForObjectif, setHabitsForObjectif] = useState<(FormDetailledObjectifHabit | Habit)[]>(baseHabits ?? [])

    const handleValidate = async() => {
        await handleGoNext(habitsForObjectif)
    }

    const addHabitForObjectif = (habit: FormDetailledHabit) => {
        setHabitsForObjectif((prevHabits => {
            return [
                ...prevHabits, 
                {
                    ...habit, 
                    icon: objectif.icon,
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
            <View style={styles.body}>
                <View style={{flex: 1, marginBottom: 10}}>
                    <View style={{flex: 1, flexGrow: 1, justifyContent: "center", alignItems: "center"}}>
                        <View style={styles.emptySreenContainer}>            
                            <Image style={styles.emptyScreenImageContainer} source={require('../../../img/Illustration/Light_theme/Idea.png')}/>

                            <View style={[styles.emptyScreenSubContainer, {marginTop: 30, gap: 10}]}>
                                <SubTitleText text={"Détaillez votre objectif"}/>
                                <NormalText text={"Identifiez les clés pour atteinder votre but"} style={{textAlign: "center"}} />
                            </View>
                        </View>
                    </View>

                    <BorderTextButton text={"Ajouter une habitude"} onPress={handleAddHabit} extend bold/>
                </View>
            </View>
        )
    }

    const DisplayHabitsScreen = () => {
        return(
            <View style={styles.body}>

                <View style={{marginTop: -10, justifyContent: "space-between", alignItems: "center", flexDirection: "row"}}>
                    <TitleText text={"Habitudes"}/>
                    <TextButton text="Ajouter" onPress={handleAddHabit} semiBold/>
                </View>

                <CustomScrollView>
                    <PresentationHabitList baseColor={objectif.color} habits={habitsForObjectif} 
                        editHabit={(habitID: string, newHabit: (Habit | FormDetailledObjectifHabit)): void => {                            
                            setHabitsForObjectif((previousObjectifHabits) => (
                                previousObjectifHabits.map((prevHab) => {
                                    if(prevHab.habitID === habitID) {
                                        return newHabit
                                    }

                                    return prevHab
                                })
                            ))
                        }}

                        deleteHabit={(habit: (Habit | FormDetailledObjectifHabit)): void => {
                            setHabitsForObjectif((previousObjectifHabits) => (
                                previousObjectifHabits.filter((prevHab) => prevHab.habitID != habit.habitID)
                            ))
                        }}
                    />
                </CustomScrollView>
            </View>
        )
    }
    
    return(
        <UsualScreen hideMenu>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <NavigationButton noPadding action={"goBack"}/>
                        <NavigationButton noPadding action={"validation"} methode={handleValidate}/>
                    </View>

                    <HugeText text="Développer votre idée"/>

                    <StepIndicator totalSteps={5} currentStep={4}/>
                </View>

                {habitsForObjectif.length === 0 ? <EmptyHabitsScreen/> : <DisplayHabitsScreen/>}
                    
            </View>

            <AddHabitToObjectifNav

                bottomSheetModalRef={bottomSheetModalRef_AddHabit}
                addHabitForObjectif={addHabitForObjectif}
                objectifID={(objectif as Objectif)?.objectifID ?? "placeholder"}
                color={objectif.color}
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
        maxHeight: "45%",
    },

    emptyScreenSubContainer: {
        justifyContent: "space-evenly", 
        alignItems: "center",
        gap: 5
    },
});

export default ObjectifHabitsForm;