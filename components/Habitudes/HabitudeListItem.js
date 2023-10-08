import { View, StyleSheet, TouchableOpacity} from "react-native";
import { NormalText, SubText, SubTitleGrayText, SubTitleText} from "../../styles/StyledText";
import { useThemeColor } from "../Themed";
import { useContext, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { StepCircularBar } from "./StepCircularBar";
 
import cardStyle from "../../styles/StyledCard";
import { HabitsContext } from "../../data/HabitContext";


export const HabitudeListItem = ({index}) => {

    const {Habits} = useContext(HabitsContext)

    const habit = Habits[index]

    console.log(index, " index")

    const secondary = useThemeColor({}, "Secondary")
    const navigation = useNavigation();
    const stylesCard = cardStyle()

    const [isChecked, setIsChecked] = useState(false)

    const isFinished = habit.doneSteps >= habit.totalSteps

    const handlePress = () =>
    {
        navigation.navigate("HabitudeScreen", {habitIndex: index});
    }

    return(

            <TouchableOpacity accessibilityLabel={habit.id} onPress={handlePress}>
                <View 
                style={
                [
                    stylesCard.card,
                    styles.habit,
                    {
                        opacity: isFinished ? 0.75 : 1
                    },
                ]}>

                    <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <StepCircularBar habit={habit} isFinished={isFinished}/>
                    </View>

                    <View style={styles.habitTitleStateContainer}>
                        {isFinished ? <SubTitleGrayText text={habit.titre}/> : <SubTitleText text={habit.titre}/>}
                        <SubText text={habit.description}/>
                    </View>

                </View>
            </TouchableOpacity>
)};

const styles = StyleSheet.create(
    {    
        habit: {
            flex: 1,
            margin: 10, marginLeft: 40,
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