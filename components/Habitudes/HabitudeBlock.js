import { View, StyleSheet, TouchableOpacity} from "react-native";
import { SubText, SubTitleGrayText, SubTitleText} from "../../styles/StyledText";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { StepCircularBar } from "./StepCircularBar";
import cardStyle from "../../styles/StyledCard";
import { HabitsContext } from "../../data/HabitContext";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { Dimensions } from "react-native";
import { useThemeColor } from "../Themed";

export const HabitudeBlock = ({habitID, viewableItems, habitude, currentDateString}) => {

    const {Habits} = useContext(HabitsContext)
    const navigation = useNavigation();
    const stylesCard = cardStyle()

    const minWidth = Dimensions.get('window').width / 1.75

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
    const habitDoneSteps = steps.filter(step => step.isChecked).length

    const font = useThemeColor({}, "Font")
    
    return(
        <TouchableOpacity onPress={handlePress} style={{ width: minWidth}}>
            <Animated.View style={[rStyle, stylesCard.card, styles.habit, {borderWidth: 2, borderColor: font}]}>

                <View style={styles.habitTitleStateContainer}>
                    {isFinished ? <SubTitleGrayText numberOfLines={1} text={habit.titre}/> : <SubTitleText numberOfLines={1} text={habit.titre}/>}
                    <SubText numberOfLines={1} text={habit.description}/>
                </View>

                <View style={styles.footerHabit}>
                    <SubText text="1/2"/>
                    <StepCircularBar habit={habit} habitDoneSteps={habitDoneSteps} isFinished={isFinished}/>
                </View>
            </Animated.View>

        </TouchableOpacity>
    )
};


export const HabitPresentationBlock = ({habitude, viewableItems}) => {

    const navigation = useNavigation();
    const stylesCard = cardStyle()

    // const handlePress = () => navigation.navigate("HabitudeScreen", {habitID, currentDateString})    
    const handlePress = () => {}
    const habitDoneSteps = habitude.steps.length === 0 ? 1 : habitude.steps.length

    const rStyle = useAnimatedStyle(() => {
        const isVisible = viewableItems.value.some((viewableItem) => {
                return viewableItem.item.habitID === habitude.habitID
        })

        return {
            opacity: withTiming(isVisible ? 1 : 0),
            transform: [{
                scale: withTiming(isVisible ? 1 : 0.6),
            }]
        };
    }, [])

    const font = useThemeColor({}, "Font")
    
    return(
        <TouchableOpacity onPress={handlePress} style={{flex: 1}}>
            <Animated.View style={[rStyle, stylesCard.card, styles.habit, {borderWidth: 2, borderColor: font}]}>

                <View style={styles.habitTitleStateContainer}>
                    <SubTitleText numberOfLines={1} text={habitude.titre}/>
                    <SubText numberOfLines={1} text={habitude.description}/>
                </View>

                <View style={styles.footerHabit}>
                    <SubText text=""/>
                    <StepCircularBar habit={habitude} habitDoneSteps={habitDoneSteps}/>
                </View>
            </Animated.View>
        </TouchableOpacity>
    )
};


const styles = StyleSheet.create(
    {    
        habit: {
            flex: 1,
            margin: 10, 
            gap: 40,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        },

        footerHabit: {
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "flex-end", 
            flexDirection: "row"
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