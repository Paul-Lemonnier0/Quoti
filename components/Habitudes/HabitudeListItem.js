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

export const HabitudeListItem = ({id, index, viewableItems, listVisibility, scrollY, habitude}) => {

    const {Habits} = useContext(HabitsContext)

    const indexHabit = Habits.findIndex((hab) => {
        return hab.habitID === id
    })

    const habit = habitude ? habitude : Habits[indexHabit]

    const navigation = useNavigation();
    const stylesCard = cardStyle()

    const isFinished = habit.doneSteps >= habit.totalSteps

    const handlePress = () =>
    {
        navigation.navigate("HabitudeScreen", {habitIndex: indexHabit});
    }      


    const rStyle = useAnimatedStyle(() => {

        const isVisible = viewableItems.value.some((viewableItem) => {
                return viewableItem.item.habitID === id
            })


        return {
            opacity: withTiming(isVisible ? 1 : 0),
            transform: [{
                scale: withTiming(isVisible ? 1 : 0.6),
            }]
        };
    }, [])
    
    return(
        <TouchableOpacity onPress={handlePress}>
            <Animated.View style={[rStyle, stylesCard.card, styles.habit]}>
                <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <StepCircularBar habit={habit} isFinished={isFinished}/>
                </View>

                <View style={styles.habitTitleStateContainer}>
                    {isFinished ? <SubTitleGrayText text={habit.titre}/> : <SubTitleText text={habit.titre}/>}
                    <SubText text={habit.description}/>
                </View>
            </Animated.View>

        </TouchableOpacity>
    )};

const styles = StyleSheet.create(
    {    
        habit: {
            flex: 1,
            margin: 10, 
            marginLeft: 40,
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
            justifyContent: "space-around"
        }
    }
)