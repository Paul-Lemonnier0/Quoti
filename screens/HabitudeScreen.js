import React from "react";
import { View, StyleSheet, Image } from "react-native"
import { HugeText, LittleNormalText, MassiveText, NormalGrayText, NormalText, SubTitleText, TitleText } from "../styles/StyledText"
import { useThemeColor } from "../components/Themed"
import { Feather } from '@expo/vector-icons'; 
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState} from "react";
import { CustomScrollView, UsualScreen } from "../components/View/Views";
import { SubText } from "../styles/StyledText";
import { SimpleButton, TextButton } from "../components/Buttons/UsualButton";
import { useContext } from "react";
import { HabitsContext } from "../data/HabitContext";
import { RenderStep } from "../components/Habitudes/EtapeItem";
import HabitIcons from "../data/HabitIcons";
import { CircleBorderIconButton, IconButton, NavigationButton } from "../components/Buttons/IconButtons";
import ProgressBar from "../components/Progress/ProgressBar";
import { Share } from "react-native";
import { Alert } from "react-native";
import StepsList from "../components/Habitudes/Step/StepsList";
import cardStyle from "../styles/StyledCard";
import { addDays } from "date-fns";
import AchievementBox from "../components/Achievements/AchievementBox";
import { FlatList } from "react-native";
import Achievements from "../data/Achievements";
import { useEffect } from "react";
import { getLogsForHabitInDateRange } from "../firebase/Firestore_Step_Primitives";

const HabitudeScreen = () => {

    const font = useThemeColor({}, "Font")
    const primary = useThemeColor({}, "Primary")
    const tertiary = useThemeColor({}, "Tertiary")
    const secondary = useThemeColor({}, "Secondary")

    const styleCard = cardStyle();

    const {getHabitFromFilteredHabits, handleCheckStep} = useContext(HabitsContext)

    const route = useRoute()
    const {habitID, habitFrequency, objectifID, currentDateString} = route.params;
    
    //POUR L'INSTANT : 

    const currentDate = currentDateString === "none" ? new Date(currentDateString) : new Date(currentDateString)

    const habit = getHabitFromFilteredHabits(habitFrequency, objectifID, habitID)
    
    const [steps, setSteps] = useState(Object.values(habit.steps))

    const doneSteps = steps.filter(step => step.isChecked).length
    const totalSteps = steps.length
    const pourcentage_value = doneSteps * 100 / totalSteps

    const isFinished = steps.filter(step => step.isChecked).length === steps.length

    const onStepChecked = (step, index) => {
        const isStepChecked = !step.isChecked

        console.log(currentDateString)

        handleCheckStep(habitID, step.stepID, currentDate, isStepChecked)
        setSteps(previousSteps => {
            const updatedSteps = [...previousSteps];
            updatedSteps[index] = { ...step, isChecked: isStepChecked };
            return updatedSteps;
          });    
    }

    const imageSize = 35

    const [lastSevenDaysLogs, setLastSevenDaysLogs] = useState({})

    useEffect(() => {
        let logsForCurrentDate = {}
        const currentDateString = currentDate.toString()

        const doneStepsAtCurrentDate = steps.filter(step => step.isChecked).map(step => step.stepID)

        if(doneStepsAtCurrentDate.length > 0){
            console.log("ok ?")
            logsForCurrentDate[currentDateString] = doneStepsAtCurrentDate
            setLastSevenDaysLogs(previousLogs => {
                const updatedLogs = previousLogs;
                updatedLogs[currentDateString] = doneStepsAtCurrentDate
                return {...previousLogs, [currentDateString]: doneStepsAtCurrentDate}
            })
        }

        else {
            setLastSevenDaysLogs(previousLogs => {
                delete previousLogs[currentDateString]
                return {...previousLogs}
            })
        }
    }, [steps])

    useEffect(() => {
        const getLast7DaysLogs = async() => {

            const startingDate = addDays(currentDate, -7);
            const endingDate = currentDate;

            const lastSevenDaysLogs_temp = await getLogsForHabitInDateRange(startingDate, endingDate, habitID)
            setLastSevenDaysLogs(lastSevenDaysLogs_temp)
        }

        getLast7DaysLogs();
    }, [])

    const handleShare = async() => {
        try{
            const result = await Share.share({
                message: habit.titre + " : " + habit.description,
                url: `exp://172.20.10.2:8081/--/SharedHabitScreen?habitID='50'&userID='Paul'`,
            })

            if(result.action === Share.sharedAction){
                //shared
            }

            else if(result.action === Share.dismissedAction){
                //Pas shared
            }
        }

        catch(e){
            Alert.alert("Shared Error : ", e)
        }
    }

    const RenderHistory = () => {
        const history = [];
        for(let i = 0; i < 7; ++i){
            const new_date = addDays(currentDate, -i)
            history.unshift(new_date)
        }

        const dayWithLogs = Object.keys(lastSevenDaysLogs)
        
        return(
            <View style={{display: "flex", flexDirection: "row", gap: 15, flex: 1, justifyContent: "space-between", alignItems: "flex-end"}}>
            {
                history.map((day, index) => {

                    let isDone = false;
                    if(dayWithLogs.includes(day.toString())){
                        isDone = true
                    }

                    const dayName = day.toLocaleDateString("fr", { weekday: 'long' }).substring(0,2);        

                    
                    return(
                        <View key={index} style={[styles.displayColumn, {flex: 1, gap: 10}]}>
                            <View style={{aspectRatio: 1, backgroundColor: isDone ? habit.color : secondary, flex: 1,paddingVertical: 15, borderRadius: 5}}/>
                            <View style={{justifyContent: "center", alignItems: "center"}}>
                                <LittleNormalText bold text={dayName}/>
                            </View>
                        </View>
                    )
                })
            }
            </View>
        )
    }

    const ReturnAchievementList = ({}) => {
        const renderAchievement = ({item}) => {
            return <AchievementBox achievement={item}/>
        }

        return(
            <FlatList data={Achievements} renderItem={renderAchievement}
            horizontal={true} showsHorizontalScrollIndicator={false}
            style={{marginHorizontal: -30}} contentContainerStyle={{gap: 15, paddingHorizontal: 30}}/>
        )
    }

    return(
        <UsualScreen>
            <View style={[styles.container]}>
                <View style={styles.header}>
                    <View style={styles.subHeader}>
                        <NavigationButton action={"goBack"}/>
                        <CircleBorderIconButton name={"share-2"} provider={"Feather"} onPress={handleShare}/>
                    </View>
                </View>

                <CustomScrollView>     
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

                        <View style={styles.bodyCore}>
                            
                            <View style={styles.groupContainer}>
                                <TitleText text="Progression"/>

                                <View style={styles.displayColumn}>
                                    <StepsList steps={steps} onStepChecked={onStepChecked} color={habit.color}/>
                                </View>
                            </View>

                            <View style={styles.groupContainer}>
                                <TitleText text="Série"/>

                                <View style={styles.streakContainer}>

                                    <View style={styles.streakHeader}>
                                        <View style={styles.streakLeftHeader}>
                                            <IconButton name={"flame"} color={habit.color} provider={"IonIcons"} noPadding size={35}/>
                                            <MassiveText text={"10"}/>
                                        </View>

                                        <TextButton text={"Voir plus"} isGray noPadding/>
                                    </View>

                                    <RenderHistory/>
                                </View>
                            </View>

                            <View style={styles.groupContainer}>
                                <TitleText text={"Succès"}/>

                                <ReturnAchievementList/>
                            </View>
                        </View>
                    </View>
                </CustomScrollView>
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

    bodyCore: {
        display: "flex", 
        flexDirection: "column", 
        gap: 40
    },

    groupContainer: {
        display: "flex", 
        flexDirection: "column", 
        gap: 30
    },

    streakContainer: {
        display: "flex", 
        flexDirection: "column", 
        flex: 1, 
        gap: 20
    },

    streakHeader: {
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-between"
    },

    streakLeftHeader: {
        display: "flex", 
        flexDirection: "row", 
        alignItems: "center", 
        gap: 10
    }
})

export default HabitudeScreen
