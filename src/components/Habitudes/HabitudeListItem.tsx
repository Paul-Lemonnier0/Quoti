import { View, StyleSheet, TouchableOpacity } from "react-native";
import { LittleNormalText, NormalGrayText, SubText, SubTitleText } from "../../styles/StyledText";
import { useThemeColor } from "../Themed";
import cardStyle from "../../styles/StyledCard";
import StepIndicator from "../Other/StepIndicator";
import { Icon, IconProvider } from "../Buttons/IconButtons";
import { FC, useCallback, useContext, useRef, useState } from "react";
import { BottomScreenOpen_Impact } from "../../constants/Impacts";
import { getHeightResponsive, getWidthResponsive } from "../../styles/UtilsStyles";
import ItemIcon from "../Icons/ItemIcon";
import Animated, { FadeInDown, useSharedValue, withDelay, withSpring } from "react-native-reanimated";
import SettingHabitBottomScreen from "../../screens/BottomScreens/Habitudes/SettingsHabitBottomScreen";
import { Habit } from "../../types/HabitTypes";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FormDetailledHabit, FormDetailledObjectifHabit } from "../../types/FormHabitTypes";
import React from "react"
import SettingNewObjectifHabitBottomScreen from "../../screens/BottomScreens/Habitudes/SettingsNewObjectifHabitBottomScreen";
import HabitStepDetailsBottomScreen from "../../screens/BottomScreens/Habitudes/HabitStepDetailsBottomScreen";
import { AppContext } from "../../data/AppContext";
import { HabitsContext } from "../../data/HabitContext";

export interface HabitudeListItemProps {
    habitude: Habit,
    index: number,
    handleOnPress: (habitude: Habit, 
    objectifID: string | undefined,
    currentDateString: string) => void,
    currentDateString: string,
}

export const HabitudeListItem: FC<HabitudeListItemProps> =  ({
    habitude, 
    index, 
    handleOnPress, 
    currentDateString
}) => {
    const {theme} = useContext(AppContext)
    const {Objectifs} = useContext(HabitsContext)

    const color = habitude.objectifID ? Objectifs[habitude.objectifID].color : habitude.color

    const primary = useThemeColor(theme, "Primary")
    const fontGray = useThemeColor(theme, "FontGray")
    const stylesCard = cardStyle()

    const handlePress = () => {  
        handleOnPress(habitude, habitude.objectifID, currentDateString)      
    }

    const habit = habitude

    const steps = Object.values(habit.steps)
    
    const habitDoneSteps = steps.filter(step => step.isChecked).length
    const totalSteps = steps.length

    const isFinished = habitDoneSteps === steps.length

    const scale = useSharedValue(1);

    const handleLongPress = () => {
        // scale.value = withSpring(0.9, {}, () => {
        //     scale.value = withSpring(1);
        // });

        scale.value = withSpring(0.9, {}, () => {
            scale.value = withSpring(1);
        });

        BottomScreenOpen_Impact();
        openModal()
    }

    const rescaleAfterBottomScreenClosed = () => {
        // scale.value = withSpring(1);
    }

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const openModal = useCallback(() => {
        BottomScreenOpen_Impact()
        bottomSheetModalRef.current?.present();
    }, []);

    return(
        <>
        <TouchableOpacity style={{opacity: isFinished ? 0.5 : 1}} delayLongPress={750} onLongPress={handleLongPress} onPress={handlePress}>
            <Animated.View entering={FadeInDown.duration(400).delay(index * 200)} 
                style={[
                    stylesCard.card, 
                    styles.container,
                    {transform: [{scale}]}
                ]}>

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

                <StepIndicator height={3} inactiveColor={primary} color={color}
                    currentStep={habitDoneSteps} totalSteps={totalSteps}/>
            </Animated.View>
        </TouchableOpacity>

        <SettingHabitBottomScreen 
            bottomSheetModalRef={bottomSheetModalRef} 
            habit={habit} 
            additionnalClosedMethod={rescaleAfterBottomScreenClosed}
        />
    </>
)};


export interface HabitudeListItemPresentation {
    habitude: Habit | FormDetailledHabit | FormDetailledObjectifHabit,
    isSelected?: boolean,
    deleteHabit?: () => void,
    editHabit?: (habitID: string, newHabit: (FormDetailledObjectifHabit | Habit)) => void,
    isNotObjectifIDConst?: boolean,
    isNotNewObjectifHabit?: boolean,
}

export const HabitudeListItemPresentation: FC<HabitudeListItemPresentation> =  ({
    habitude, 
    deleteHabit,
    editHabit,
    isNotObjectifIDConst,
    isNotNewObjectifHabit
}) => {    
    const {theme} = useContext(AppContext)
    const {Objectifs} = useContext(HabitsContext)

    const color = habitude.objectifID ? Objectifs[habitude.objectifID].color : habitude.color

    const primary = useThemeColor(theme, "Primary")

    const stylesCard = cardStyle()

    const habit = habitude

    const today = new Date()

    const steps = Object.values(habit.steps).filter((step) => (!("deleted" in step)))

    
    const habitDoneSteps = steps.length
    const totalSteps = steps.length

    const scale = useSharedValue(1);
    const handleLongPress = () => {
        // scale.value = withSpring(0.9, {}, () => {
        //     scale.value = withSpring(1);
        // });

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

    return(
        <>    
            <TouchableOpacity delayLongPress={750} onLongPress={handleLongPress} onPress={openModalStepsDetails}>
                <Animated.View style={[ stylesCard.card, styles.container, {transform: [{scale}]}]}>

                    <View style={styles.habit}>
                        <ItemIcon icon={habit.icon} color={color}/>

                        <View style={styles.habitTitleStateContainer}>
                            <SubTitleText numberOfLines={1} text={habit.titre}/>
                            <NormalGrayText bold numberOfLines={1} text={habit.description}/>
                        </View>
                    </View>

                    <StepIndicator height={3} inactiveColor={primary} color={color}
                        currentStep={habitDoneSteps} totalSteps={totalSteps}/>

                </Animated.View>
            </TouchableOpacity>

            {
                deleteHabit && editHabit &&
                <>
                    <SettingNewObjectifHabitBottomScreen 
                        bottomSheetModalRef={bottomSheetModalRef} 
                        habit={habit as FormDetailledObjectifHabit} 
                        deleteHabit={deleteHabit}
                        editHabit={editHabit}
                        objectifColor={habitude.color}
                        isNotObjectifIDConst={isNotObjectifIDConst}
                    />       

                    <HabitStepDetailsBottomScreen 
                        bottomSheetModalRef={bottomSheetModalRef_StepDetails} 
                        steps={steps}
                        editHabit={editHabit}
                        color={habitude.color}
                        icon={habitude.icon}
                        habit={habitude} 
                        isNotObjectifIDConst={isNotObjectifIDConst}
                        isNotNewObjectifHabit={isNotNewObjectifHabit}
                    />
                </>
            }


        </>
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