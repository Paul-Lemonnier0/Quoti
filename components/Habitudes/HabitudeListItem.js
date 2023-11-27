import { Animated, View, StyleSheet, TouchableOpacity, Vibration} from "react-native";
import { HugeText, LittleNormalText, NormalText, SubText, SubTitleText, TitleText} from "../../styles/StyledText";
import { useThemeColor } from "../Themed";
import { useNavigation } from "@react-navigation/native";
import cardStyle from "../../styles/StyledCard";
import IconImage from "../Other/IconImage";
import StepIndicator from "../Other/StepIndicator";
import { BackgroundIconButton, Icon } from "../Buttons/IconButtons";
import ProgressBar from "../Progress/ProgressBar";
import { getHabitType } from "../../primitives/HabitMethods";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Alert } from "react-native";
import { useRef } from "react";
import { useContext } from "react";
import { BottomSheetModalMethodsContext } from "../../data/BottomSheetModalContext";
import * as Haptics from 'expo-haptics';
import { BottomScreenOpen_Impact } from "../../constants/Impacts";

export const HabitudeListItem =  ({habitude, currentDateString}) => {
    const primary = useThemeColor({}, "Primary")

    const navigation = useNavigation();
    const stylesCard = cardStyle()

    const objectifID  = habitude.objectifID

    const handlePress = () => {        
        navigation.navigate("HabitudeScreen", {habitID: habitude.habitID, habitFrequency: habitude.frequency, objectifID, currentDateString})    
    }

    const habit = habitude

    let steps = []
    if(habit.steps !== undefined){
        steps = Object.values(habit.steps)
    }

    else {
    }

    const habitDoneSteps = steps.filter(step => step.isChecked).length
    const totalSteps = steps.length

    const pourcentage = (habitDoneSteps * 100 / totalSteps)

    const isFinished = habitDoneSteps === steps.length

    const {openModal} = useContext(BottomSheetModalMethodsContext)

    const handleLongPress = () => {
        BottomScreenOpen_Impact();
        openModal()
    }

    return(
        <TouchableOpacity delayLongPress={750} onLongPress={handleLongPress} onPress={handlePress}>
            <Animated.View style={[stylesCard.card, styles.container]}>

                <View style={styles.habit}>
                    <View style={[styles.iconContainer, {borderColor: habit.color}]}>
                        <IconImage image={habit.icon}/>
                    </View>

                    <View style={styles.habitTitleStateContainer}>
                        <SubTitleText numberOfLines={1} text={habit.titre}/>
                        <SubText numberOfLines={1} text={habit.description}/>
                    </View>

                    <View style={styles.pourcentageContainer}>
                        <Icon name="chevron-right" provider={"Feather"}/>
                    </View>
                </View>

                <StepIndicator height={3} inactiveColor={primary} color={habit.color}
                    currentStep={habitDoneSteps} totalSteps={totalSteps}/>
            </Animated.View>
        </TouchableOpacity>
    )};

const styles = StyleSheet.create(
    {   
        container: {
            gap: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        },

        pourcentageContainer: {
            display: "flex", 
            gap: 5,
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
            gap: 20,
            flex: 1,
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