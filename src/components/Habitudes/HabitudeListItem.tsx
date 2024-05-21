import { View, StyleSheet, TouchableOpacity } from "react-native";
import { LittleNormalText, SubTitleText } from "../../styles/StyledText";
import { useThemeColor } from "../Themed";
import cardStyle from "../../styles/StyledCard";
import StepIndicator from "../Other/StepIndicator";
import { Icon, IconProvider } from "../Buttons/IconButtons";
import { FC, useCallback, useContext, useRef } from "react";
import { BottomScreenOpen_Impact } from "../../constants/Impacts";
import { getHeightResponsive, getWidthResponsive } from "../../styles/UtilsStyles";
import ItemIcon from "../Icons/ItemIcon";
import Animated, { FadeInDown, useSharedValue, withSpring } from "react-native-reanimated";
import SettingHabitBottomScreen from "../../screens/BottomScreens/Habitudes/SettingsHabitBottomScreen";
import { Habit } from "../../types/HabitTypes";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FormDetailledHabit, FormDetailledGoalHabit } from "../../types/FormHabitTypes";
import React from "react"
import SettingNewGoalHabitBottomScreen from "../../screens/BottomScreens/Habitudes/SettingsNewGoalHabitBottomScreen";
import HabitStepDetailsBottomScreen from "../../screens/BottomScreens/Habitudes/HabitStepDetailsBottomScreen";
import { AppContext } from "../../data/AppContext";
import { HabitsContext } from "../../data/HabitContext";
import ProfilList from "../Profil/ProfilList";
import { UserDataBase } from "../../firebase/Database_User_Primitives";
import { UserContext } from "../../data/UserContext";
import DoneHabitSettingBottomScreen from "../../screens/BottomScreens/Habitudes/DoneHabitSettingsBottomScreen";

export interface HabitudeListItemProps {
    habitude: Habit,
    index: number,
    handleOnPress: (habitude: Habit, 
    goalID: string | undefined,
    currentDateString: string) => void,
    currentDateString: string,
    noAnimation?: boolean
}

export const HabitudeListItem: FC<HabitudeListItemProps> = ({
    habitude, 
    index, 
    handleOnPress, 
    currentDateString,
    noAnimation
}) => {

    const {theme} = useContext(AppContext)
    const {Goals, Habits} = useContext(HabitsContext)
    const {user} = useContext(UserContext)

    const color = habitude.goalID ? Goals[habitude.goalID].color : habitude.color

    const fontGray = useThemeColor(theme, "FontGray")
    const stylesCard = cardStyle()

    const handlePress = () => {  
        handleOnPress(habitude, habitude.goalID, currentDateString)      
    }

    const habit = habitude

    const steps = Object.values(habit.steps)
    
    const habitDoneSteps = steps.filter(step => step.isChecked).length
    const totalSteps = steps.length

    const isFinished = habitDoneSteps === steps.length

    const scale = useSharedValue(1);

    const handleLongPress = () => {
        scale.value = withSpring(0.9, {}, () => {
            scale.value = withSpring(1);
        });

        BottomScreenOpen_Impact();
        openModal()
    }

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const openModal = useCallback(() => {
        BottomScreenOpen_Impact()
        bottomSheetModalRef.current?.present();
    }, []);


    
    const notNullMembers = habit.members.filter(member => member !== null)
    notNullMembers.unshift(user as UserDataBase)

    const isShared =  notNullMembers.length > 1

    return(
        <>
        <TouchableOpacity style={{opacity: isFinished ? 0.5 : 1}} delayLongPress={750} onLongPress={handleLongPress} onPress={handlePress}>
            <Animated.View
                style={[
                    stylesCard.card, 
                    styles.container,
                    {
                        transform: [{scale}]
                    }
                ]}>

                {
                    isShared ?
                    <View style={{flexDirection: "column", gap: 20}}>
                        <View style={styles.habit}>
                            <ItemIcon icon={habit.icon} color={color}/>
                            <ProfilList isPrimary users={notNullMembers} small/>
                        </View>

                        <View style={styles.habitTitleStateContainer}>
                            <SubTitleText numberOfLines={1} text={habit.titre}/>
                            <LittleNormalText style={{color: fontGray}} bold numberOfLines={1} text={habit.description}/>
                        </View>

                        <StepIndicator height={3} color={color}
                            currentStep={habitDoneSteps} totalSteps={totalSteps}/>
                    </View>

                    :
                    
                    <>
                    <View style={styles.habit}>
                        <ItemIcon icon={habit.icon} color={color}/>

                        <View style={styles.habitTitleStateContainer}>
                            <SubTitleText numberOfLines={1} text={habit.titre}/>
                            <LittleNormalText style={{color: fontGray}} bold numberOfLines={1} text={habit.description}/>
                        </View>

                        <View style={styles.pourcentageContainer}>
                            <Icon name="chevron-right" provider={IconProvider.Feather}/>
                        </View>
                    </View>

                    <StepIndicator height={3} color={color}
                        currentStep={habitDoneSteps} totalSteps={totalSteps}/>
                    </>
                }
            </Animated.View>

        </TouchableOpacity>

        <SettingHabitBottomScreen 
            bottomSheetModalRef={bottomSheetModalRef} 
            habit={habit} 
        />
    </>
)};


export interface HabitudeListItemPresentation {
    habitude: Habit | FormDetailledHabit | FormDetailledGoalHabit,
    isSelected?: boolean,
    deleteHabit?: () => void,
    editHabit?: (habitID: string, newHabit: (FormDetailledGoalHabit | Habit)) => void,
    isNotGoalIDConst?: boolean,
    isNotNewGoalHabit?: boolean,
    onPress?: () => void,
    noAnimation?: boolean,
    owner?: UserDataBase,
    isArchived?: boolean,
    isDone?: boolean,
}

export const HabitudeListItemPresentation: FC<HabitudeListItemPresentation> =  ({
    habitude, 
    deleteHabit,
    onPress,
    editHabit,
    isNotGoalIDConst,
    isNotNewGoalHabit,
    noAnimation,
    owner,
    isArchived,
    isDone
}) => {    
    const {theme} = useContext(AppContext)
    const {Goals} = useContext(HabitsContext)
    const {user} = useContext(UserContext)

    const color = habitude.color ?? (habitude.goalID ? Goals[habitude.goalID].color : habitude.color)

    const primary = useThemeColor(theme, "Primary")
    const fontGray = useThemeColor(theme, "FontGray")

    const stylesCard = cardStyle()

    const habit = habitude

    const today = new Date()

    const steps = Object.values(habit.steps).filter((step) => (!("deleted" in step)))

    
    const habitDoneSteps = steps.length
    const totalSteps = steps.length

    const scale = useSharedValue(1);
    const handleLongPress = () => {
        scale.value = withSpring(0.9, {}, () => {
            scale.value = withSpring(1);
        });

        BottomScreenOpen_Impact();
        openModal()
    }

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const openModal = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const bottomSheetModalRef_StepDetails = useRef<BottomSheetModal>(null);

    const openModalStepsDetails = useCallback(() => {
        BottomScreenOpen_Impact()
        bottomSheetModalRef_StepDetails.current?.present();
    }, []);

    const notNullMembers = "members" in habit ? habit.members.filter(member => member !== null) : []

    if(owner) {
        notNullMembers.unshift(owner)
    }

    else notNullMembers.unshift(user as UserDataBase)

    const isShared =  notNullMembers.length > 1

    return(
        <Animated.View entering={noAnimation ? undefined : FadeInDown}>    
            <TouchableOpacity delayLongPress={750} onLongPress={handleLongPress} onPress={onPress ?? openModalStepsDetails}>
                <Animated.View 
                    style={[
                        stylesCard.card, 
                        styles.container,
                        {
                            transform: [{scale}]
                        }
                    ]}>

                    {
                        isShared ?
                        <View style={{flexDirection: "column", gap: 20}}>
                            <View style={styles.habit}>
                                <ItemIcon icon={habit.icon} color={color}/>
                                <ProfilList isPrimary users={notNullMembers} small/>
                            </View>

                            <View style={styles.habitTitleStateContainer}>
                                <SubTitleText numberOfLines={1} text={habit.titre}/>
                                <LittleNormalText style={{color: fontGray}} bold numberOfLines={1} text={habit.description}/>
                            </View>

                            <StepIndicator height={3} color={color}
                                currentStep={habitDoneSteps} totalSteps={totalSteps}/>
                        </View>

                        :
                        
                        <>
                        <View style={styles.habit}>
                            <ItemIcon icon={habit.icon} color={color}/>

                            <View style={styles.habitTitleStateContainer}>
                                <SubTitleText numberOfLines={1} text={habit.titre}/>
                                <LittleNormalText style={{color: fontGray}} bold numberOfLines={1} text={habit.description}/>
                            </View>

                            <View style={styles.pourcentageContainer}>
                                <Icon name="chevron-right" provider={IconProvider.Feather}/>
                            </View>
                        </View>

                        <StepIndicator height={3} color={color}
                            currentStep={habitDoneSteps} totalSteps={totalSteps}/>
                        </>
                    }
                </Animated.View>

            </TouchableOpacity>

            {
                deleteHabit && editHabit &&
                <>
                    {
                        isArchived || isDone ? 
                        <DoneHabitSettingBottomScreen 
                            bottomSheetModalRef={bottomSheetModalRef} 
                            habit={habit as Habit} 
                            isDone={isDone}
                            isArchived={isArchived}
                        />
                        :
                        <SettingNewGoalHabitBottomScreen 
                            bottomSheetModalRef={bottomSheetModalRef} 
                            habit={habit as FormDetailledGoalHabit} 
                            deleteHabit={deleteHabit}
                            editHabit={editHabit}
                            goalColor={habitude.color}
                            isNotGoalIDConst={isNotGoalIDConst}
                        />
                    }
                           

                    <HabitStepDetailsBottomScreen 
                        bottomSheetModalRef={bottomSheetModalRef_StepDetails} 
                        steps={steps}
                        editHabit={editHabit}
                        color={habitude.color}
                        icon={habitude.icon}
                        habit={habitude} 
                        isNotGoalIDConst={isNotGoalIDConst}
                        isNotNewGoalHabit={isNotNewGoalHabit}
                    />
                </>
            }


        </Animated.View>
)};

const styles = StyleSheet.create(
    {   
        container: {
            gap: getHeightResponsive(20),
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            // flex: 1
        },

        pourcentageContainer: {
            display: "flex", 
            justifyContent: "center",
        },

        iconContainer: {
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            borderWidth: 2,
            borderRadius: 15 
        },
        
        habit: {
            gap: getWidthResponsive(20),
            // flex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        },

        TouchableScreen: {
            flex: 1,
        },

        footerhabit: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems:"center"
        },

        habitTitleStateContainer: {
            flex:1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 5
        },     
    }
)