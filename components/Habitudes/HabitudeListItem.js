import { View, StyleSheet, TouchableOpacity} from "react-native";
import { SubText, SubTitleText, TitleText} from "../../styles/StyledText";
import { useThemeColor } from "../Themed";
import { useNavigation } from "@react-navigation/native";
import cardStyle from "../../styles/StyledCard";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import IconImage from "../Other/IconImage";
import StepIndicator from "../Other/StepIndicator";
import { Icon } from "../Buttons/IconButtons";

export const HabitudeListItem =  ({habitude, currentDateString}) => {
    const primary = useThemeColor({}, "Primary")

    const navigation = useNavigation();
    const stylesCard = cardStyle()

    const handlePress = () => {        
        navigation.navigate("HabitudeScreen", {habitID: habitude.habitID, habitFrequency: habitude.frequency, currentDateString})    
    }

    const habit = habitude
    const steps = Object.values(habit.steps)

    const habitDoneSteps = steps.filter(step => step.isChecked).length
    const pourcentage = (habitDoneSteps * 100 / steps.length) + "%"

    const isFinished = habitDoneSteps === steps.length

    return(
        <TouchableOpacity onPress={handlePress}>
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
                        {/* <TitleText text={pourcentage} style={{color: habit.color}}/> */}
                        <Icon name={"chevron-right"} provider={"Feather"}/>
                    </View>
                </View>

                <StepIndicator currentStep={habitDoneSteps} totalSteps={steps.length} color={habit.color} inactiveColor={primary} height={3}/>
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
            justifyContent: "center"
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