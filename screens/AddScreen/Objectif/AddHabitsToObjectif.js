import { View } from "react-native"
import { UsualScreen } from "../../../components/View/Views"
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
import VerticalAnimatedFlatList from "../../../components/FlatList/VerticalAnimatedFlatList"
import { generateUniqueID } from "../../../primitives/BasicsMethods"



const AddHabitsToObjectif = () => {

    const route = useRoute()
    const {objectif} = route.params

    const fontContrast = useThemeColor({}, "FontContrast")

    const [habitsForObjectif, setHabitsForObjectif] = useState([])
    console.log("ARRAY : ", habitsForObjectif)

    const handleGoNext = () => {
        //navigation.navigate()
    }

    const addHabitForObjectif = (habit) => {
        setHabitsForObjectif((prevHabits => {
            return [...prevHabits, {...habit, color: objectif.color, icon: objectif.icon, habitID: generateUniqueID()}]
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

                <View style={{flex: 1, marginBottom: -120}}>
                    <VerticalAnimatedFlatList data={habitsForObjectif} currentDateString={today.toDateString()} presentation numCols={1}/>
                </View>

            </View>
        )
    }

    return(
        <UsualScreen>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{width: "80%"}}>
                        <HugeText text="Décomposez votre objectif !"/>
                    </View>

                    <NavigationButton action={"goNext"} methode={handleGoNext}/>
                </View>

                <StepIndicator totalSteps={5} currentStep={4}/>

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
        marginBottom: 0
    },

    header: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        justifyContent: "space-between"
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
        maxHeight: "55%",
    },

    emptyScreenSubContainer: {
        justifyContent: "space-evenly", 
        alignItems: "center"
    },
});

export default AddHabitsToObjectif;