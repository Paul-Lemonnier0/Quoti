import React, { useCallback } from "react";
import { View, StyleSheet, Image } from "react-native"
import { HugeText, NormalGrayText, TitleText } from "../../styles/StyledText"
import { useThemeColor } from "../../components/Themed"
import { useState} from "react";
import { CustomScrollView, UsualScreen } from "../../components/View/Views";
import { TextButton } from "../../components/Buttons/UsualButton";
import { useContext } from "react";
import { HabitsContext } from "../../data/HabitContext";
import HabitIcons from "../../data/HabitIcons";
import { BorderIconButton, Icon, IconButton, IconProvider, NavigationActions, NavigationButton } from "../../components/Buttons/IconButtons";
import ProgressBar from "../../components/Progress/ProgressBar";
import StepsList from "../../components/Habitudes/Step/StepsList";
import { addDays, addMonths } from "date-fns";
import { useEffect } from "react";
import RangeActivity, { MonthRangeActivity, WeekRangeActivity } from "../../components/Calendars/RangeActivity";
import { getHeightResponsive, getWidthResponsive } from "../../styles/UtilsStyles";
import { BottomScreenOpen_Impact, Success_Impact } from "../../constants/Impacts";
import HabitCompletedBottomScreen from "../BottomScreens/Habitudes/HabitCompletedBottomScreen";
import { useRef } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FrequencyTypes, Habit, Step } from "../../types/HabitTypes";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { auth } from "../../firebase/InitialisationFirebase";
import SettingHabitBottomScreen from "../BottomScreens/Habitudes/SettingsHabitBottomScreen";
import { Habits_Skeleton } from "../../constants/HabitsPlaceholder";
import { FrequencyDetails } from "../../components/Habitudes/FrequencyDetails";
import Separator from "../../components/Other/Separator";
import Quoti from "../../components/Other/Quoti";
import { AppContext } from "../../data/AppContext";
import { FormStep } from "../../types/FormHabitTypes";
import { toISOStringWithoutTimeZone } from "../../primitives/BasicsMethods";
import BottomMenuStyle from "../../styles/StyledBottomMenu";
import ProfilList from "../../components/Profil/ProfilList";
import { UserDataBase } from "../../firebase/Database_User_Primitives";
import { UserContext } from "../../data/UserContext";
import { HomeStackParamsList } from "../../navigation/HomeNavigator";
import { isHabitScheduledForDate } from "../../primitives/HabitudesReccurence";
import StreakDayDetailsBottomScreen from "../BottomScreens/StreakDayDetailsBottomScreen";
import DoneHabitSettingBottomScreen from "../BottomScreens/Habitudes/DoneHabitSettingsBottomScreen";
import StreakFlame from "../../components/Other/Flames";
import HabitCompletedBottomScreenNav from "../BottomScreens/Habitudes/HabitCompletedBottomScreenNav";
import { getSeriazableHabit } from "../../primitives/HabitMethods";
import { useStepActions } from "../../hooks/Habits/useStepActions";

type HabitudeScreenProps = NativeStackScreenProps<HomeStackParamsList, "HabitudeScreen">

const HabitudeScreen = ({ route, navigation }: HabitudeScreenProps) => {

    const {
        habitID, 
        habitFrequency, 
        goalID, 
        currentDateString, 
        noInteractions,
        isPresentation,
        isArchived,
        isDone
    } = route.params;

    const {theme} = useContext(AppContext)
    const {user: currentUser} = useContext(UserContext)

    const tertiary = useThemeColor(theme, "Tertiary")
    const fontGray = useThemeColor(theme, "FontGray")
    const secondary = useThemeColor(theme, "Secondary")

    const {
        Habits, 
        ArchivedHabits,
        DoneHabits,
        Goals, 
        HabitsHistory,
        getHabitFromFilteredHabits, 
    } = useContext(HabitsContext)

    const { handleCheckStep } = useStepActions()

    const bottomSheetModalRef_HabitCompleted = useRef<BottomSheetModal>(null)
    const bottomSheetModalRef_Settings = useRef<BottomSheetModal>(null)

    const [last7DaysLogs, setLast7DaysLogs] = useState<string[]>([])

    const currentDate = new Date(currentDateString)
    
    const habit: Habit | undefined = 
        isPresentation ? (
            isArchived ? (ArchivedHabits ? ArchivedHabits[habitID] : null) :
            (isDone ? DoneHabits[habitID] 
            : Habits[habitID])
        )
        :
        getHabitFromFilteredHabits(habitFrequency, goalID, habitID) ?? Habits_Skeleton[0]

    if(goalID && habit){
        habit["color"] = Goals[goalID].color ?? habit.color
    }

    const [steps, setSteps] = useState<Step[]>(habit ? Object.values(habit.steps) : [])

    const doneSteps = steps.filter(step => step.isChecked).length ?? 0
    const totalSteps = steps ? steps.length : 0

    const pourcentage_value = doneSteps * 100 / totalSteps

    const isFinished = steps.filter(step => step.isChecked).length === steps.length

    const onStepChecked = (step: Step | FormStep, index: number) => {
        const stepWellType = step as Step
        const isChecked = !stepWellType.isChecked

        const updatedSteps = [...steps]
        updatedSteps[index] = {...stepWellType, isChecked}

        const new_doneSteps = updatedSteps.filter(stepWellType => stepWellType.isChecked).length
        const isHabitNowCompleted = new_doneSteps === totalSteps

        handleCheckStep(habitID, stepWellType.stepID, currentDate, isChecked, isHabitNowCompleted)
        setSteps(updatedSteps);    

        if(isHabitNowCompleted){
            bottomSheetModalRef_HabitCompleted.current?.present();
            Success_Impact()

            if(user && user.email) {
            }
        }
    }

    const imageSize = 35

    const user = auth.currentUser

    const history = HabitsHistory[habitID]

    const isHebdo = habitFrequency=== FrequencyTypes.Hebdo
    const isMonthly = habitFrequency=== FrequencyTypes.Mensuel

    const startingDate = isHebdo ? addDays(currentDate, -(7*7))
                            : isMonthly ? addMonths(currentDate, -7)
                                : addDays(currentDate, -7);
    const endingDate = currentDate;

    useEffect(() => {
        const last7DaysLogs_temp: Date[] = []
        if(history) {
            history.forEach(date => {
                const date_temp = new Date(date)
                if(date_temp.setHours(0,0,0,0) >= startingDate.setHours(0,0,0,0) && date_temp.setHours(0,0,0,0) <= endingDate.setHours(0,0,0,0)) {
                    last7DaysLogs_temp.push(date)
                }
            })
        
            last7DaysLogs_temp.sort((date1, date2) => date1.valueOf() - date2.valueOf());
        }

        setLast7DaysLogs(last7DaysLogs_temp.map(log => toISOStringWithoutTimeZone(log)))

    }, [HabitsHistory])

    const handleOpenSettings = useCallback(() => {
        BottomScreenOpen_Impact()
        // bottomSheetModalRef_Settings.current?.present();
        bottomSheetModalRef_HabitCompleted.current?.present();
        
    }, []);

    const goBack = () => {
        navigation.goBack()
    }

    if(!habit) return null

    const currentUserDB: UserDataBase | null = (currentUser && currentUser.displayName && currentUser.email) ? {
        displayName: currentUser.displayName,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        uid: currentUser.uid,
        photoURL: currentUser.photoURL ?? undefined,
    } : null

    const notNullMembers = habit.members ? habit.members.filter(user => user !== null) : []
    const fullMembers = [...notNullMembers]
    if(currentUserDB) {
        fullMembers.push(currentUserDB)
    }

    if(!habit) {
        navigation.goBack()
    }

    const isPlannedForToday = isHabitScheduledForDate(habit, new Date(currentDateString))

    const startingDateString = habit.startingDate ? habit.startingDate.toLocaleDateString("fr", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }) : "Non-définie"

    const handleEditFrequencyAdditionnalMethod = () => {
        navigation.goBack()
    }

    const handleSeeActivity = () => {
        navigation.navigate("HabitStreakDetailsScreen", {
            habitID: habit.habitID, 
            currentDateString: currentDateString,
            isDone: isDone,
            isArchived: isArchived 
        })
    }

    return(
        <UsualScreen>
            <View style={[styles.container]}>
                <View style={styles.header}>
                    <View style={styles.subHeader}>
                        <NavigationButton action={NavigationActions.goBack}/>
                        <StreakFlame value={habit.currentStreak} color={habit.color}/>
                        <BorderIconButton isTransparent isBorderGray name={"settings"} provider={IconProvider.Feather} onPress={handleOpenSettings}/>
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
                                    <NormalGrayText bold text={habit.description}/>
                                </View>
                            </View>

                            <ProgressBar progress={pourcentage_value/100} color={habit.color} withPourcentage/>
                        </View>

                        <View style={styles.bodyCore}>
                            
                            <View style={styles.groupContainer}>
                                <TitleText text="Progression"/>

                                <View style={styles.displayColumn}>
                                    <StepsList disabled={!isPlannedForToday || isDone || isArchived}
                                        softDisabled={doneSteps === totalSteps} steps={steps} onStepChecked={onStepChecked} color={habit.color}/>
                                </View>
                            </View>

                            <View style={styles.groupContainer}>
                                <View style={styles.streakHeader}>
                                    <TitleText text="Série"/>
                                    <TextButton small bold text={"Voir plus"} isGray noPadding onPress={handleSeeActivity}/>
                                </View>
                                <View style={styles.streakContainer}>  
                                    {
                                        isHebdo ?
                                        <WeekRangeActivity habit={habit} start={currentDate} history={last7DaysLogs} activityColor={habit.color}/>
                                        :  
                                            isMonthly ?
                                            <MonthRangeActivity habit={habit} start={currentDate} history={last7DaysLogs} activityColor={habit.color}/>
                                            : <RangeActivity habit={habit} start={currentDate} history={last7DaysLogs} activityColor={habit.color}/>
                                    }
                                </View>
                            </View>

                            <Separator/>


                            <View style={{ gap: 20, flex: 1, flexWrap: 'wrap', flexDirection: 'column' }}>
                                <TitleText text={"Fréquence"}/>
                                <FrequencyDetails frequency={habit.frequency} reccurence={habit.reccurence} occurence={habit.occurence}
                                    daysOfWeek={habit.daysOfWeek}/>
                            </View>

                            {
                                habit.members && habit.members.length > 0 && user &&
                                    <Separator/>
                            }
                            {
                                habit.members && habit.members.length > 0 && user &&
                                <View style={{ gap: 30, flex: 1, flexWrap: 'wrap', flexDirection: 'column' }}>
                                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                        <TitleText text={"Membres"}/>
                                        <TextButton 
                                            small
                                            bold
                                            onPress={() => navigation.navigate("MembersScreen", {users: fullMembers})} 
                                            text={"Voir plus"} 
                                            isGray 
                                            noPadding
                                        />
                                    </View>
                                    <ProfilList users={fullMembers}
                                        isPrimary
                                        isBorderPrimary
                                        nbVisibleUsers={10}
                                    />
                                </View>
                            }

                            <Separator/>
                            
                            <View style={{ gap: 20, flex: 1, flexWrap: 'wrap', flexDirection: 'column' }}>
                                <TitleText text={"Date de début"}/>
                                <TitleText text={startingDateString} style={{color: fontGray}}/>
                            </View>
                        </View>
                    </View>
                </CustomScrollView>
            </View>

            <HabitCompletedBottomScreenNav 
                bottomSheetModalRef={bottomSheetModalRef_HabitCompleted} 
                habit={getSeriazableHabit(habit)} 
                goBackHome={goBack}
            />

            {
                isArchived || isDone ? 
                <DoneHabitSettingBottomScreen 
                    bottomSheetModalRef={bottomSheetModalRef_Settings} 
                    habit={habit as Habit} 
                    isDone={isDone}
                    isArchived={isArchived}
                />
                :
                <SettingHabitBottomScreen 
                    bottomSheetModalRef={bottomSheetModalRef_Settings}
                    habit={habit} 
                    deleteAdditionnalMethod={goBack} 
                    attachToGoalAdditionnalMethod={goBack}
                    modifyAdditionnalMethod={goBack}
                    handleEditFrequencyAdditionnalMethod={handleEditFrequencyAdditionnalMethod}
                />
            }

            
        </UsualScreen>
    )
};

const styles = StyleSheet.create({
    container: {
        display: "flex", 
        flexDirection: "column", 
        gap: getHeightResponsive(20), 
        flex: 1, 
        marginBottom: 10    
    },

    header: {
        display: "flex", 
        flexDirection: "column", 
        gap: getHeightResponsive(20),
        marginBottom: 5
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
        gap: getHeightResponsive(30)
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
})

export default HabitudeScreen
