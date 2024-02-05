import React, { useCallback } from "react";
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
import RangeActivity from "../components/Calendars/RangeActivity";
import { getHeightResponsive, getWidthResponsive } from "../styles/UtilsStyles";
import { Success_Impact } from "../constants/Impacts";
import HabitCompletedBottomScreen from "./BottomScreens/Habitudes/HabitCompletedBottomScreen";
import { useRef } from "react";

const HabitudeScreen = () => {

    const navigation = useNavigation()

    const tertiary = useThemeColor({}, "Tertiary")
    const secondary = useThemeColor({}, "Secondary")

    const {getHabitFromFilteredHabits, handleCheckStep, Objectifs} = useContext(HabitsContext)
    const route = useRoute()
    const {habitID, habitFrequency, objectifID, currentDateString} = route.params;

    const bottomSheetModalRef_HabitCompleted = useRef(null)
    const bottomSheetModalRef_Settings = useRef(null)
    
    //POUR L'INSTANT : 

    const currentDate = currentDateString === "none" ? new Date(currentDateString) : new Date(currentDateString)

    const habit = getHabitFromFilteredHabits(habitFrequency, objectifID, habitID)

    if(objectifID){
        habit["color"] = Objectifs[objectifID].color ?? habit.color
    }

    const [steps, setSteps] = useState(Object.values(habit.steps))

    const doneSteps = steps.filter(step => step.isChecked).length
    const totalSteps = steps.length
    const isCompleted = doneSteps === totalSteps

    // const isNotToday = currentDate !== new Date()
    const isNotToday = false //pour les tests
    const isDisabled = isCompleted || isNotToday

    const pourcentage_value = doneSteps * 100 / totalSteps

    const isFinished = steps.filter(step => step.isChecked).length === steps.length

    const onStepChecked = (step, index) => {
        const isChecked = !step.isChecked

        const updatedSteps = [...steps]
        updatedSteps[index] = {...step, isChecked}

        const new_doneSteps = updatedSteps.filter(step => step.isChecked).length
        const isHabitNowCompleted = new_doneSteps === totalSteps

        handleCheckStep(habitID, step.stepID, currentDate, isChecked, isHabitNowCompleted)
        setSteps(updatedSteps);    

        if(isHabitNowCompleted){
            bottomSheetModalRef_HabitCompleted.current?.present();
            Success_Impact()
        }
    }

    const imageSize = 35

    const [lastSevenDaysLogs, setLastSevenDaysLogs] = useState({})
    const [logsReady, setLogsReady] = useState(false)

    useEffect(() => {
        const getLast7DaysLogs = async() => {
            const startingDate = addDays(currentDate, -7);
            const endingDate = currentDate;

            const lastSevenDaysLogs_temp = await getLogsForHabitInDateRange(startingDate, endingDate, habitID)
            setLastSevenDaysLogs(lastSevenDaysLogs_temp)
            setLogsReady(true)
        }

        getLast7DaysLogs();
    }, [])

    useEffect(() => {
        if(logsReady){

            let logsForCurrentDate = {}
            const currentDateString = currentDate.toString()
            const doneStepsAtCurrentDate = steps.filter(step => step.isChecked).map(step => step.stepID)
            
            if(isCompleted){
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
        }
    }, [logsReady, steps])


    const ReturnAchievementList = ({}) => {
        const renderAchievement = ({item}) => {
            return <AchievementBox achievement={item}/>
        }

        return(
            <FlatList data={Achievements} renderItem={renderAchievement}
            horizontal={true} showsHorizontalScrollIndicator={false}
            style={{marginHorizontal: getWidthResponsive(-30)}} contentContainerStyle={{gap: getWidthResponsive(15), paddingHorizontal: getWidthResponsive(30)}}/>
        )
    }

    const handleOpenSettings = useCallback(() => {
        bottomSheetModalRef_Settings.current?.present();
    }, []);

    const goBack = () => {
        navigation.goBack()
    }
 

    return(
        <UsualScreen>
            <View style={[styles.container]}>
                <View style={styles.header}>
                    <View style={styles.subHeader}>
                        <NavigationButton action={"goBack"}/>
                        <IconButton noPadding name={"settings"} provider={"Feather"} onPress={handleOpenSettings}/>
                    </View>
                </View>

                <CustomScrollView>     
                    <View style={styles.body}>            
                        <View style={styles.bodyHeader}>
                            <View style={[styles.displayRow, {gap: getWidthResponsive(20)}]}>
                                <View style={{borderRadius: getWidthResponsive(20), borderColor: isFinished ? habit.color : tertiary, borderWidth: 2, padding: getWidthResponsive(15)}}>
                                    <Image source={HabitIcons[habit.icon]} style={{height: getHeightResponsive(imageSize), aspectRatio: 1}}/>
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
                                    <StepsList disabled={false} steps={steps} onStepChecked={onStepChecked} color={habit.color}/>
                                </View>
                            </View>

                            <View style={styles.groupContainer}>
                                <TitleText text="Série"/>

                                <View style={styles.streakContainer}>

                                    <View style={styles.streakHeader}>
                                        <View style={styles.streakLeftHeader}>
                                            <IconButton name={"flame"} color={habit.color} provider={"IonIcons"} noPadding size={30}/>
                                            <HugeText text={habit.currentStreak}/>
                                        </View>

                                        <TextButton text={"Voir plus"} isGray noPadding/>
                                    </View>

                                    <RangeActivity start={currentDate} activity={lastSevenDaysLogs} steps={steps} activityColor={habit.color}/>
                                </View>
                            </View>
                        </View>
                    </View>
                </CustomScrollView>
            </View>

            <HabitCompletedBottomScreen bottomSheetModalRef={bottomSheetModalRef_HabitCompleted} habit={habit}/>
            <SettingHabitBottomScreen bottomSheetModalRef={bottomSheetModalRef_Settings} habit={habit} 
            deleteAdditionnalMethod={goBack} 
            attachToObjectifAdditionnalMethod={goBack}
            modifyAdditionnalMethod={goBack}/>

        </UsualScreen>
    )
};

const styles = StyleSheet.create({
    container: {
        display: "flex", 
        flexDirection: "column", 
        gap: getHeightResponsive(20), 
        flex: 1, 
        marginBottom: 0    
    },

    header: {
        display: "flex", 
        flexDirection: "column", 
        gap: getHeightResponsive(20)
    },
    
    subHeader: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        justifyContent: "space-between"
    },

    body: {
        flex: 1, 
        marginTop: 10,
        gap: getHeightResponsive(30),
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
        gap: getHeightResponsive(15),
        display: "flex",
        flexDirection: "column"
    }, 

    bodyCore: {
        display: "flex", 
        flexDirection: "column", 
        gap: getHeightResponsive(40)
    },

    groupContainer: {
        display: "flex", 
        flexDirection: "column", 
        gap: getHeightResponsive(30)
    },

    streakContainer: {
        display: "flex", 
        flexDirection: "column", 
        flex: 1, 
        gap: getHeightResponsive(20)
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
        gap: getWidthResponsive(10)
    }
})

export default HabitudeScreen
