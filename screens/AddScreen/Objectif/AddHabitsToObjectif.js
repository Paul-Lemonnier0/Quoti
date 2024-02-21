import { View } from "react-native"
import { CustomScrollView, UsualScreen } from "../../../components/View/Views"
import { StyleSheet } from "react-native"
import { HugeText, NormalText, SubTitleText } from "../../../styles/StyledText"
import { BorderTextButton } from "../../../components/Buttons/UsualButton"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Image } from "react-native"
import { Touchable } from "react-native"
import { TouchableOpacity } from "react-native"
import { useThemeColor } from "../../../components/Themed"
import { NavigationButton } from "../../../components/Buttons/IconButtons"
import { useState } from "react"
import { useMemo } from "react"
import { useRef } from "react"
import { useCallback } from "react"
import AddHabitToObjectifNav from "./AddHabitToObjectifNav"
import { useContext } from "react"
import { HabitsContext } from "../../../data/HabitContext"
import HabitudesList from "../../../components/Habitudes/HabitudesList"
import { convertBackSeriazableObjectif } from "../../../primitives/ObjectifMethods"
import { Success_Impact } from "../../../constants/Impacts"
import { AnimatedBasicSpinnerView } from "../../../components/Spinners/AnimatedSpinner"
import { useEffect } from "react"
import BottomMenuStyle from "../../../styles/StyledBottomMenu"
import PresentationHabitList from "../../../components/Habitudes/PresentationHabitList"
import { AppContext } from "../../../data/AppContext"



const AddHabitsToObjectif = () => {

    const {setIsLoading} = useContext(AppContext)
    const {addObjectif, addHabit} = useContext(HabitsContext)

    const route = useRoute()
    const navigation = useNavigation()

    const {objectif} = route.params
    const deserializedObjectif = convertBackSeriazableObjectif(objectif)
    

    const [habitsForObjectif, setHabitsForObjectif] = useState([])

    const bottomMenuStyle = BottomMenuStyle().bottomMenuStyle

    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function sleep() {
        await timeout(3000);
        return;
    }

    const handleValidate = async() => {

        const startingDate = deserializedObjectif.startingDate
        const endingDate = deserializedObjectif.endingDate

        setIsLoading(true)
        const objectifWithID = await addObjectif(deserializedObjectif) 

        const updatedHabitsForObjectif = habitsForObjectif.map(habit => ({...habit, objectifID: objectifWithID.objectifID, startingDate, endingDate}))
        await Promise.all(updatedHabitsForObjectif.map(addHabit));
        setIsLoading(false)

        Success_Impact()
        console.log("objectif and habit(s) well added")
        navigation.navigate("ValidationScreenObjectif")
    }

    const addHabitForObjectif = (habit) => {
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

    const bottomSheetModalRef_AddHabit = useRef(null);
    const snapPoints_AddHabit = useMemo(() => ['100%'], []);
  
    const handleOpenAddHabit = useCallback(() => {
        bottomSheetModalRef_AddHabit.current?.present();
      }, []);
  
    const handleSheetChangesAddHabit = useCallback((index) => {}, []);

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
                snapPoints={snapPoints_AddHabit}
                handleSheetChanges={handleSheetChangesAddHabit}
                addHabitForObjectif={addHabitForObjectif}/>
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

export default AddHabitsToObjectif;