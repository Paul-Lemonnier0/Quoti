import React, { useCallback } from "react";
import { View, StyleSheet, Image } from "react-native"
import { HugeText, NormalGrayText, TitleText } from "../../styles/StyledText"
import { useThemeColor } from "../../components/Themed"
import { useState} from "react";
import { CustomScrollView, UsualScreen } from "../../components/View/Views";
import { useContext } from "react";
import HabitIcons from "../../data/HabitIcons";
import { IconButton, IconProvider, NavigationActions, NavigationButton } from "../../components/Buttons/IconButtons";
import ProgressBar from "../../components/Progress/ProgressBar";
import StepsList from "../../components/Habitudes/Step/StepsList";
import { getHeightResponsive, getWidthResponsive } from "../../styles/UtilsStyles";
import HabitCompletedBottomScreen from "../BottomScreens/Habitudes/HabitCompletedBottomScreen";
import { useRef } from "react";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { Step } from "../../types/HabitTypes";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import SettingHabitBottomScreen from "../BottomScreens/Habitudes/SettingsHabitBottomScreen";
import { FrequencyDetails } from "../../components/Habitudes/FrequencyDetails";
import Separator from "../../components/Other/Separator";
import Quoti from "../../components/Other/Quoti";
import { AppContext } from "../../data/AppContext";
import { convertBackSeriazableHabit } from "../../primitives/HabitMethods";
import { SocialScreenStackType } from "../../navigation/SocialNavigator";
import { HomeStackParamsList } from "../../navigation/HomeNavigator";
import { UserContext } from "../../data/UserContext";
import ProfilList from "../../components/Profil/ProfilList";
import { UserDataBase } from "../../firebase/Database_User_Primitives";
import { auth } from "../../firebase/InitialisationFirebase";

type PresentationHabitScreenProps = 
    NativeStackScreenProps<SocialScreenStackType, "PresentationHabitScreen"> | 
    NativeStackScreenProps<HomeStackParamsList, "PresentationHabitScreen">

const PresentationHabitScreen = ({ route, navigation }: PresentationHabitScreenProps) => {

    const {habit: seriazableHabit, detailledUser} = route.params;

    const {theme} = useContext(AppContext)
    const {user: currentUser} = useContext(UserContext)

    const tertiary = useThemeColor(theme, "Tertiary")
    const secondary = useThemeColor(theme, "Secondary")

    const habit = convertBackSeriazableHabit(seriazableHabit)

    const bottomSheetModalRef_HabitCompleted = useRef<BottomSheetModal>(null)
    const bottomSheetModalRef_Settings = useRef<BottomSheetModal>(null)

    const [steps, setSteps] = useState<Step[]>(Object.values(habit.steps))

    const doneSteps = steps.filter(step => step.isChecked).length
    const totalSteps = steps.length

    const pourcentage_value = doneSteps * 100 / totalSteps

    const isFinished = steps.filter(step => step.isChecked).length === steps.length

    const imageSize = 35

    const handleOpenSettings = useCallback(() => {
    }, []);

    const goBack = () => {
        navigation.goBack()
    }

    const currentUserDB: UserDataBase | null = (currentUser && currentUser.displayName && currentUser.email) ? {
        displayName: currentUser.displayName,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        uid: currentUser.uid,
        photoURL: currentUser.photoURL ?? undefined,
    } : null

    const notNullMembers = habit.members.filter(user => user !== null)
    const fullMembers = [...notNullMembers]
    if(currentUserDB) {
        fullMembers.filter(user => user.uid !== currentUserDB.uid)
    }

    fullMembers.push(detailledUser)

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

                            <ProgressBar progress={pourcentage_value/100} color={habit.color} withPourcentage/>
                        </View>

                        <View style={styles.bodyCore}>
                            
                            <View style={styles.groupContainer}>
                                <TitleText text="Progression"/>

                                <View style={styles.displayColumn}>
                                    <StepsList disabled={false} steps={steps} onStepChecked={() => {}} softDisabled color={habit.color}/>
                                </View>
                            </View>

                            <Separator/>

                            <View style={{ gap: 30, flex: 1, flexWrap: 'wrap', flexDirection: 'column' }}>
                                <TitleText text={"Fréquence"}/>
                                <FrequencyDetails frequency={habit.frequency} reccurence={habit.reccurence} occurence={habit.occurence}/>
                            </View>

                            {
                                habit.members.length > 0 && currentUser &&
                                    <Separator/>
                            }
                            {
                                habit.members.length > 0 && currentUser &&
                                <View style={{ gap: 30, flex: 1, flexWrap: 'wrap', flexDirection: 'column' }}>
                                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                        <TitleText text={"Membres"}/>
                                    </View>
                                    <ProfilList users={fullMembers}
                                        isPrimary
                                        isBorderPrimary
                                        nbVisibleUsers={10}
                                    />
                                </View>
                            }
                        </View>
                    </View>
                </CustomScrollView>
            </View>

            <HabitCompletedBottomScreen 
                bottomSheetModalRef={bottomSheetModalRef_HabitCompleted} 
                habit={habit} 
                goBackHome={goBack}
            />

            <SettingHabitBottomScreen 
                bottomSheetModalRef={bottomSheetModalRef_Settings} 
                habit={habit} 
                deleteAdditionnalMethod={goBack} 
                attachToGoalAdditionnalMethod={goBack}
                modifyAdditionnalMethod={goBack}
            />
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
