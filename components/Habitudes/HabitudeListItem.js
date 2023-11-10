import { View, StyleSheet, TouchableOpacity, TouchableOpacityBase, useWindowDimensions} from "react-native";
import { NormalText, SubText, SubTitleGrayText, SubTitleText} from "../../styles/StyledText";
import { useThemeColor } from "../Themed";
import { useContext, useState } from "react";
import { Feather } from '@expo/vector-icons'; 

import { useNavigation } from "@react-navigation/native";
import { StepCircularBar } from "./StepCircularBar";
 
import cardStyle from "../../styles/StyledCard";
import { HabitsContext } from "../../data/HabitContext";

import Animated, { interpolate, useAnimatedStyle, useDerivedValue, withTiming } from "react-native-reanimated";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { SimpleButtonBackground } from "../Buttons/UsualButton";
import { IconButton, SimpleIconButton } from "../Buttons/IconButtons";
import { Dimensions } from "react-native";

export const HabitudeListItem =  ({habitID, viewableItems, habitude, currentDateString}) => {

    const {Habits} = useContext(HabitsContext)
    const navigation = useNavigation();
    const stylesCard = cardStyle()

    const habit = habitude ? habitude : Habits[habitID]
    const isFinished = habit.doneSteps >= habit.totalSteps

    const handlePress = () => navigation.navigate("HabitudeScreen", {habitID, currentDateString})    

    const rStyle = useAnimatedStyle(() => {
        const isVisible = viewableItems.value.some((viewableItem) => {
                return viewableItem.item.habitID === habitID
        })

        return {
            opacity: withTiming(isVisible ? 1 : 0),
            transform: [{
                scale: withTiming(isVisible ? 1 : 0.6),
            }]
        };
    }, [])

    const steps = Object.values(habit.steps)

    const font = useThemeColor({}, "Font")
    const fontGray = useThemeColor({}, "FontGray")

    const habitDoneSteps = steps.filter(step => step.isChecked).length
    
    return(
        <TouchableOpacity onPress={handlePress}>
            <Animated.View style={[rStyle, stylesCard.card, styles.habit]}>
                <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <StepCircularBar habit={habit} habitDoneSteps={habitDoneSteps} isFinished={isFinished}/>
                </View>

                <View style={styles.habitTitleStateContainer}>
                    {isFinished ? <SubTitleGrayText numberOfLines={1} text={habit.titre}/> : <SubTitleText numberOfLines={1} text={habit.titre}/>}
                    <SubText numberOfLines={1} text={habit.description}/>
                </View>

                <View style={{display: "flex", justifyContent: "center"}}>
                    <Feather name="chevron-right" size={22} color={fontGray}/>
                </View>
            </Animated.View>

        </TouchableOpacity>
    )};

const styles = StyleSheet.create(
    {    
        habit: {
            marginVertical: 10, 
            gap: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        },

        timeContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10
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
            justifyContent: "center"
        }
    }
)