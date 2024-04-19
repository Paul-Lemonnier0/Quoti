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
import { Icon, IconButton, IconProvider, NavigationActions, NavigationButton } from "../../components/Buttons/IconButtons";
import ProgressBar from "../../components/Progress/ProgressBar";
import StepsList from "../../components/Habitudes/Step/StepsList";
import { addDays } from "date-fns";
import { useEffect } from "react";
import RangeActivity from "../../components/Calendars/RangeActivity";
import { getHeightResponsive, getWidthResponsive } from "../../styles/UtilsStyles";
import { Success_Impact } from "../../constants/Impacts";
import HabitCompletedBottomScreen from "../BottomScreens/Habitudes/HabitCompletedBottomScreen";
import { useRef } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamsList } from "../../navigation/BottomTabNavigator";
import { Step } from "../../types/HabitTypes";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { auth } from "../../firebase/InitialisationFirebase";
import SettingHabitBottomScreen from "../BottomScreens/Habitudes/SettingsHabitBottomScreen";
import { Habits_Skeleton } from "../../constants/HabitsPlaceholder";
import { FrequencyDetails } from "../../components/Habitudes/FrequencyDetails";
import Separator from "../../components/Other/Separator";
import Quoti from "../../components/Other/Quoti";
import { AppContext } from "../../data/AppContext";
import { addHabitDoneDate } from "../../firebase/Firestore_Habits_Primitives";
import { FormStep } from "../../types/FormHabitTypes";
import BottomMenuStyle from "../../styles/StyledBottomMenu";
import { toISOStringWithoutTimeZone } from "../../primitives/BasicsMethods";
import { convertBackSeriazableHabit } from "../../primitives/HabitMethods";

type PresentationHabitScreenProps = NativeStackScreenProps<HomeStackParamsList, "PresentationHabitScreen">

const PresentationHabitScreen = ({ route, navigation }: PresentationHabitScreenProps) => {

    const {habit: seriazableHabit} = route.params;
    const {theme} = useContext(AppContext)
    const tertiary = useThemeColor(theme, "Tertiary")
    const secondary = useThemeColor(theme, "Secondary")

    const {getHabitFromFilteredHabits, handleCheckStep, Objectifs, HabitsHistory} = useContext(HabitsContext)

    const habit = convertBackSeriazableHabit(seriazableHabit)

    const bottomSheetModalRef_HabitCompleted = useRef<BottomSheetModal>(null)
    const bottomSheetModalRef_Settings = useRef<BottomSheetModal>(null)

    const [steps, setSteps] = useState<Step[]>(Object.values(habit.steps))

    const doneSteps = steps.filter(step => step.isChecked).length
    const totalSteps = steps.length
    const isCompleted = doneSteps === totalSteps

    // const isNotToday = currentDate !== new Date()
    const isNotToday = false //pour les tests
    const isDisabled = isCompleted || isNotToday

    const pourcentage_value = doneSteps * 100 / totalSteps

    const isFinished = steps.filter(step => step.isChecked).length === steps.length

    const imageSize = 35

    // const {user} = useContext(UserContext)
    const user = auth.currentUser

    const history = HabitsHistory[habit.habitID]

    const currentDate = new Date()
    const currentDateString = toISOStringWithoutTimeZone(currentDate)

    const [last7DaysLogs, setLast7DaysLogs] = useState<string[]>([])
    const startingDate = addDays(currentDate, -7);
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
                        <NavigationButton action={NavigationActions.goBack}/>
                        <Quoti/>
                        <IconButton noPadding name={"settings"} provider={IconProvider.Feather} onPress={handleOpenSettings}/>
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

                            <ProgressBar progress={pourcentage_value/100} color={habit.color} inactiveColor={secondary} withPourcentage/>
                        </View>

                        <View style={styles.bodyCore}>
                            
                            <View style={styles.groupContainer}>
                                <TitleText text="Progression"/>

                                <View style={styles.displayColumn}>
                                    <StepsList disabled={false} steps={steps} onStepChecked={() => {}} softDisabled color={habit.color}/>
                                </View>
                            </View>

                            <View style={styles.groupContainer}>
                                <TitleText text="Série"/>

                                <View style={styles.streakContainer}>

                                    <View style={styles.streakHeader}>
                                        <View style={styles.streakLeftHeader}>
                                            <Icon provider={IconProvider.FontAwesome5} size={30} color={habit.color} name="fire"/>

                                            <HugeText text={habit.currentStreak}/>
                                        </View>

                                        <TextButton onPress={() => navigation.navigate("HabitStreakDetailsScreen", {habitID: habit.habitID, currentDateString: currentDateString})} text={"Voir plus"} isGray noPadding/>
                                    </View>

                                    <RangeActivity habit={habit} start={currentDate} history={last7DaysLogs} activityColor={habit.color}/>
                                </View>
                            </View>

                            <Separator/>

                            <View style={{ gap: 30, flex: 1, flexWrap: 'wrap', flexDirection: 'column' }}>
                                <TitleText text={"Fréquence"}/>
                                <FrequencyDetails frequency={habit.frequency} reccurence={habit.reccurence} occurence={habit.occurence}/>
                            </View>
                        </View>
                    </View>
                </CustomScrollView>
            </View>

            <HabitCompletedBottomScreen bottomSheetModalRef={bottomSheetModalRef_HabitCompleted} habit={habit} goBackHome={goBack}/>
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

    streakLeftHeader: {
        display: "flex", 
        flexDirection: "row", 
        alignItems: "center", 
        gap: getWidthResponsive(10),
        marginLeft: 5
    }
})

export default PresentationHabitScreen
