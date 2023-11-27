import React from "react";
import { View, StyleSheet, Image } from "react-native"
import { HugeText, LittleNormalText, NormalGrayText, TitleText } from "../styles/StyledText"
import { useThemeColor } from "../components/Themed"
import { Feather } from '@expo/vector-icons'; 
import { useRoute } from "@react-navigation/native";
import { useState} from "react";
import { UsualScreen } from "../components/View/Views";
import { SubText } from "../styles/StyledText";
import { SimpleButton } from "../components/Buttons/UsualButton";
import { useContext } from "react";
import { HabitsContext } from "../data/HabitContext";
import { RenderStep } from "../components/Habitudes/EtapeItem";
import HabitIcons from "../data/HabitIcons";
import { CircleBorderIconButton, NavigationButton } from "../components/Buttons/IconButtons";
import ProgressBar from "../components/Progress/ProgressBar";
import { Share } from "react-native";
import { Alert } from "react-native";

const HabitudeScreen = () => {

    const font = useThemeColor({}, "Font")
    const fontGray = useThemeColor({}, "FontGray")
    const tertiary = useThemeColor({}, "Tertiary")
    const secondary = useThemeColor({}, "Secondary")

    const {getHabitFromFilteredHabits, handleCheckStep} = useContext(HabitsContext)

    const route = useRoute()
    const {habitID, habitFrequency, objectifID, currentDateString} = route.params;
    
    //POUR L'INSTANT : 

    const currentDate = currentDateString === "none" ? new Date(currentDateString) :  new Date(currentDateString)

    const habit = getHabitFromFilteredHabits(habitFrequency, objectifID, habitID)
    
    const steps = Object.values(habit.steps)

    const [displayedSteps, setDisplayedSteps] = useState(steps)

    const doneSteps = steps.filter(step => step.isChecked).length
    const totalSteps = steps.length
    const pourcentage_value = doneSteps * 100 / totalSteps

    const isFinished = steps.filter(step => step.isChecked).length === steps.length

    const handleCheckingStep = (step, index) => {
        const isStepChecked = !step.isChecked
        steps[index] = {...step, isChecked: isStepChecked}

        handleCheckStep(habitID, step.stepID, currentDate, isStepChecked)
        setDisplayedSteps(previousSteps => {
            const updatedSteps = [...previousSteps];
            updatedSteps[index] = { ...step, isChecked: isStepChecked };
            return updatedSteps;
          });    }

    const imageSize = 35
    const paddingImage = 15
    const barWidth = 3

    const handleShare = async() => {
        try{
            const result = await Share.share({
                message: habit.titre + " : " + habit.description,
                url: `exp://172.20.10.2:8081/--/SharedHabitScreen?`,
            })

            if(result.action === Share.sharedAction){
                if(result.activityType){
                    //Result of the activity type app shared
                }

                else{
                    //shared
                }
            }

            else if(result.action === Share.dismissedAction){
                //Pas shared
            }
        }

        catch(e){
            Alert.alert("Shared Error : ", e)
        }
    }

    return(
        <UsualScreen hideMenu={true}>
            <View style={[styles.container]}>
                <View style={styles.header}>
                    <View style={styles.subHeader}>
                        <NavigationButton action={"goBack"}/>
                        <CircleBorderIconButton name={"share-2"} provider={"Feather"} onPress={handleShare}/>
                    </View>
                </View>

                <View style={styles.body}>                 

                    <View style={styles.bodyHeader}>
                        <View style={[styles.displayRow, {gap: 20}]}>
                            <View style={{borderRadius: 20, borderColor: isFinished ? habit.color : tertiary, borderWidth: 2, padding: 15}}>
                                <Image source={HabitIcons[habit.icon]} style={{width: imageSize, height: imageSize}}/>
                            </View>

                            <View style={styles.titreEtDescriptionContainer}>
                                <HugeText text={habit.titre}/>
                                <NormalGrayText text={habit.description}/>
                            </View>
                        </View>

                        <ProgressBar progress={pourcentage_value/100} color={habit.color} inactiveColor={secondary} withPourcentage/>
                    </View>


                    <View>
                        <TitleText text="Progression"/>
                    </View>

                    <View style={styles.displayColumn}>
                        {
                            displayedSteps.map((step, index) => {

                                return(
                                <View key={index} style={styles.displayColumn}>
                                    <RenderStep habit={habit} steps={steps} step={step} index={index} onPress={() => handleCheckingStep(step, index)}
                                        imageSize={imageSize} paddingImage={paddingImage}/>

                                    {index != steps.length-1 && <View style={{
                                        marginVertical: 15, 
                                        backgroundColor: tertiary, 
                                        borderRadius: 50, 
                                        height: 30, 
                                        width: barWidth, 
                                        marginLeft: (paddingImage*2 + imageSize)+20 + (paddingImage + imageSize)/2 - barWidth/2}}/>}
                                </View>
                                )
                            })
                        }
                    </View>
                </View>
            </View>
        </UsualScreen>
    )
};

const styles = StyleSheet.create({
    container: {
        display: "flex", 
        flexDirection: "column", 
        gap: 20, 
        flex: 1, 
        marginBottom: 0    
    },

    header: {
        display: "flex", 
        flexDirection: "column", 
        gap: 20
    },
    
    subHeader: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        justifyContent: "space-between"
    },

    body: {
        flex: 1, 
        gap: 30,
    },

    titreEtDescriptionContainer:{
        display: "flex", 
        flex: 1,
        flexDirection: "column", 
        justifyContent: "center",
    },

    displayColumn: {
        display: "flex",
        flexDirection: "column",
    },

    displayRow: {
        display: "flex", 
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    bodyHeader: {
        gap: 15,
        display: "flex",
        flexDirection: "column"
    }, 
})

export default HabitudeScreen
