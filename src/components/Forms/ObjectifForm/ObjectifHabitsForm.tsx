import { StyleSheet } from "react-native"
import AddHabitToObjectifNav from "../../../screens/AddScreen/Objectif/AddHabitToObjectifNav"
import { View } from "react-native"
import { NavigationButton } from "../../Buttons/IconButtons"
import { HugeText, NormalText, SubTitleText } from "../../../styles/StyledText"
import StepIndicator from "../../Other/StepIndicator"
import { CustomScrollView, UsualScreen } from "../../View/Views"
import PresentationHabitList from "../../Habitudes/PresentationHabitList"
import { BorderTextButton } from "../../Buttons/UsualButton"
import { Image } from "react-native"
import { FC, useCallback, useContext, useRef, useState } from "react"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { FormDetailledHabit } from "../../../types/FormHabitTypes"
import { AppContext } from "../../../data/AppContext"
import { HabitsContext } from "../../../data/HabitContext"
import { FormDetailledObjectif } from "../../../types/FormObjectifTypes"
import React from "react"
import { Habit } from "../../../types/HabitTypes"

export interface ObjectifHabitsFormProps {
    objectif: FormDetailledObjectif
    handleGoNext: (habits: (FormDetailledHabit | Habit)[]) => Promise<void>,
    baseHabits?: (FormDetailledHabit | Habit)[]
}

const ObjectifHabitsForm: FC<ObjectifHabitsFormProps> = ({objectif, handleGoNext, baseHabits}) => {

    const [habitsForObjectif, setHabitsForObjectif] = useState<(FormDetailledHabit | Habit)[]>(baseHabits ?? [])

    const handleValidate = async() => {
        await handleGoNext(habitsForObjectif)
    }

    const addHabitForObjectif = (habit: FormDetailledHabit) => {
        setHabitsForObjectif((prevHabits => {
            return [
                ...prevHabits, 
                {
                    ...habit, 
                    color: objectif.color, 
                    icon: objectif.icon,
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

                <View style={{flex: 1, flexGrow: 1, justifyContent: "center", alignItems: "center"}}>
                    <View style={styles.emptySreenContainer}>            
                        <Image style={styles.emptyScreenImageContainer} source={require('../../../img/Illustration/Light_theme/Idea.png')}/>

                        <View style={styles.emptyScreenSubContainer}>
                            <NormalText text={"Decrivez votre objectif !"}/>
                            <SubTitleText text={"De quoi est-il composé ?"}/>
                        </View>
                    </View>
                </View>

                <BorderTextButton text={"Ajouter une habitude"} onPress={handleAddHabit} extend/>

            </View>
        )
    }

    const today = new Date()

    const DisplayHabitsScreen = () => {
        return(
            <View style={styles.body}>

                <BorderTextButton text={"Ajouter une habitude"} onPress={handleAddHabit} extend/>

                <CustomScrollView>
                    <PresentationHabitList habits={habitsForObjectif}/>
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

                    <HugeText text="Intégrez des habitudes"/>

                    <StepIndicator totalSteps={5} currentStep={4}/>
                </View>

                {habitsForObjectif.length === 0 ? <EmptyHabitsScreen/> : <DisplayHabitsScreen/>}
                    
            </View>

            <AddHabitToObjectifNav
                bottomSheetModalRef={bottomSheetModalRef_AddHabit}
                addHabitForObjectif={addHabitForObjectif}
                color={objectif.color}
                icon={objectif.icon}
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
        alignItems: "center"
    },
});

export default ObjectifHabitsForm;