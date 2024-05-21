import { TouchableOpacity } from "react-native"
import cardStyle from "../../styles/StyledCard";
import { FC, useCallback, useContext, useRef } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import IconImage from "../Other/IconImage";
import { LittleNormalText, NormalGrayText, NormalText, SubText, SubTitleText } from "../../styles/StyledText";
import { Dimensions } from "react-native";
import { HabitsContext } from "../../data/HabitContext";
import ProgressBar from "../Progress/ProgressBar";
import Animated, { FadeInRight, useSharedValue, withSpring } from "react-native-reanimated";
import { FrequencyTypes, Habit, Goal, SeriazableGoal, Step } from "../../types/HabitTypes";
import { getSeriazableGoal } from "../../primitives/GoalMethods";
import SettingsGoalBottomSheet from "../../screens/BottomScreens/Goals/SettingsGoalBottomScreen";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomScreenOpen_Impact } from "../../constants/Impacts";
import { useThemeColor } from "../Themed";
import React from "react"
import { AppContext } from "../../data/AppContext";
import { FormDetailledGoal } from "../../types/FormGoalTypes";

export interface GoalBlockProps {
    goalID: string,
    frequency: FrequencyTypes,
    index: number,
    handleOnPress: (
        seriazableGoal: SeriazableGoal,
        frequency: FrequencyTypes,
        currentDateString: string
    ) => void,
    currentDateString: string
}

const GoalBlock: FC<GoalBlockProps> = ({goalID, frequency, index, handleOnPress, currentDateString}) => {
    const {theme} = useContext(AppContext)

    const {Goals, filteredHabitsByDate} = useContext(HabitsContext)
    const fontGray = useThemeColor(theme, "FontGray")

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const openModal = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const scale = useSharedValue(1);

    const handleLongPress = () => {
        scale.value = withSpring(0.9, {}, () => {
            scale.value = withSpring(1);
        });

        BottomScreenOpen_Impact();
        openModal()
    }

    const goal = Goals[goalID]
    const habits: Habit[] = Object.values(filteredHabitsByDate[frequency].Goals?.[goalID] ?? {})

    const stylesCard = cardStyle()

    const width = Dimensions.get('window').width / 1.5

    const handlePress = () => {
        const seriazableGoal = getSeriazableGoal(goal)
        handleOnPress(seriazableGoal, frequency, currentDateString)
    }

    const steps: Step[] = []
    for(const habit of habits){
        Object.values(habit.steps).map(step => steps.push(step))
    }

    const doneSteps = steps.filter(step => step.isChecked).length
    const totalSteps = steps.length
    const pourcentage_value = Math.round(doneSteps * 100 / steps.length)
    const isFinished = totalSteps === doneSteps

    if(!goal) {
        return null
    }

    return(
        <Animated.View entering={FadeInRight.duration(400).delay(index * 200)}>
            <TouchableOpacity style={{opacity: isFinished ? 0.5 : 1, width}} onPress={handlePress} delayLongPress={750} onLongPress={handleLongPress}>
                <Animated.View 
                    style={[
                        stylesCard.card, 
                        styles.goal,
                        {transform: [{scale}]}
                    ]}>
                        
                    <View style={styles.header}>
                        <View style={[styles.iconContainer, {borderColor: goal.color}]}>
                            <IconImage image={goal.icon}/>
                        </View>
                    </View>

                    <View style={styles.titleDescriptionContainer}>
                        <SubTitleText numberOfLines={1} text={goal.titre}/>
                        <LittleNormalText style={{color: fontGray}} bold numberOfLines={1} text={goal.description}/>
                    </View>

                    <View style={styles.progressContainer}>


                        <View style={{flex: 1}}>
                            <ProgressBar progress={pourcentage_value ? pourcentage_value/100 : 0} color={goal.color}/>
                        </View>

                        <LittleNormalText text={pourcentage_value + "%"} bold/>
                    </View>


                </Animated.View>
            </TouchableOpacity>

            <SettingsGoalBottomSheet bottomSheetModalRef={bottomSheetModalRef} goal={goal}/>

        </Animated.View>
    )
}

export interface PresentationGoalBlockProps {
    index: number,
    handleOnPress: () => void,
    goal: Goal | FormDetailledGoal,
    habits: Habit[],
    noAnimation?: boolean,
    isSkeleton?: boolean
}

export const PresentationGoalBlock: FC<PresentationGoalBlockProps> = ({
    goal,
    index, 
    handleOnPress, 
    habits,
    noAnimation,
    isSkeleton
}) => {
    
    const {Goals} = useContext(HabitsContext)

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const openModal = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const scale = useSharedValue(1);

    const handleLongPress = () => {
        scale.value = withSpring(0.9, {}, () => {
            scale.value = withSpring(1);
        });

        BottomScreenOpen_Impact();
        openModal()
    }

    // const goal = Goals[goalID]

    const stylesCard = cardStyle()

    const steps: Step[] = []
    for(const habit of habits){
        Object.values(habit.steps).map(step => steps.push(step))
    }

    const pourcentage_value = 100
    const isFinished = false

    if(!goal) {
        return null
    }

    return(
        <Animated.View entering={noAnimation ? undefined : FadeInRight}>
        <TouchableOpacity disabled={isSkeleton}
            style={{opacity: isFinished ? 0.5 : 1, flex: 1}} onPress={handleOnPress} delayLongPress={750} onLongPress={handleLongPress}>
            <Animated.View 
                style={[
                    stylesCard.card, 
                    styles.goal,
                    {transform: [{scale}]}
                ]}>
                    
                <View style={styles.header}>
                    <View style={[styles.iconContainer, {borderColor: goal.color}]}>
                        <IconImage image={goal.icon}/>
                    </View>
                </View>

                <View style={styles.titleDescriptionContainer}>
                    <SubTitleText numberOfLines={1} text={goal.titre}/>
                    <NormalGrayText bold numberOfLines={1} text={goal.description}/>
                </View>

                <View style={styles.progressContainer}>


                    <View style={{flex: 1}}>
                        <ProgressBar progress={pourcentage_value/100} color={goal.color}/>
                    </View>

                    <LittleNormalText text={pourcentage_value + "%"} bold/>
                </View>


            </Animated.View>
        </TouchableOpacity>

        {
            (!isSkeleton) &&
            <SettingsGoalBottomSheet bottomSheetModalRef={bottomSheetModalRef} goal={goal as Goal}/>
        }

        </Animated.View>
    )
}

const styles = StyleSheet.create({
    goal: {
        flex: 1,
        gap: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },

    header: {
        gap: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
    },

    titleDescriptionContainer: {
        flex:1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        gap: 5
    },

    footer: {
        gap: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center"
    },

    iconContainer: {
        display: "flex",
        justifyContent: "center", 
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 15 
    },

    progressContainer:{
        display: "flex",
        flexDirection: "column",
        gap: 10
    }
})

export default GoalBlock