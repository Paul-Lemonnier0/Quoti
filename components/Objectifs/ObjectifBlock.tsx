import { TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native";
import cardStyle from "../../styles/StyledCard";
import { FC, useContext } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import IconImage from "../Other/IconImage";
import { LittleNormalText, NormalText, SubText, SubTitleText } from "../../styles/StyledText";
import { Dimensions } from "react-native";
import { HabitsContext } from "../../data/HabitContext";
import ProgressBar from "../Progress/ProgressBar";
import { getSeriazableObjectif } from "../../primitives/ObjectifMethods";
import Animated, { FadeInRight } from "react-native-reanimated";
import { FrequencyTypes, Habit, Step } from "../../types/HabitTypes";

interface ObjectifBlockProps {
    objectifID: string,
    frequency: FrequencyTypes,
    index: number
}

const ObjectifBlock: FC<ObjectifBlockProps> = ({objectifID, frequency, index}) => {

    const {Objectifs, filteredHabitsByDate} = useContext(HabitsContext)

    try{
        const objectif = Objectifs[objectifID]
        const habits: Habit[] = Object.values(filteredHabitsByDate[frequency].Objectifs?.[objectifID] ?? {})

        const stylesCard = cardStyle()

        const width = Dimensions.get('window').width / 1.5

        const navigation = useNavigation()
        const handlePress = () => {
            const seriazableObjectif = getSeriazableObjectif(objectif)
            //navigation.navigate("ObjectifDetailsScreen", {seriazableObjectif, frequency, currentDateString});
        }

        const steps: Step[] = []
        for(const habit of habits){
            Object.values(habit.steps).map(step => steps.push(step))
        }

        const doneSteps = steps.filter(step => step.isChecked).length
        const totalSteps = steps.length
        const pourcentage_value = Math.round(doneSteps * 100 / steps.length) 
        const isFinished = totalSteps === doneSteps

        return(
            <TouchableOpacity style={{opacity: isFinished ? 0.5 : 1, width}} onPress={handlePress}>
                <Animated.View entering={FadeInRight.duration(400).delay(index * 200)} style={[stylesCard.card, styles.objectif]}>
                    <View style={styles.header}>
                        <View style={[styles.iconContainer, {borderColor: objectif.color}]}>
                            <IconImage image={objectif.icon}/>
                        </View>
                    </View>

                    <View style={styles.titleDescriptionContainer}>
                        <SubTitleText numberOfLines={1} text={objectif.titre}/>
                        <SubText numberOfLines={1} text={objectif.description}/>
                    </View>

                    <View style={styles.progressContainer}>


                        <View style={{flex: 1}}>
                            <ProgressBar progress={pourcentage_value/100} color={objectif.color}/>
                        </View>

                        <LittleNormalText text={pourcentage_value + "%"} bold/>
                    </View>


                </Animated.View>
            </TouchableOpacity>
        )
    }

    catch(e){
        return(<View><NormalText text={""}/></View>)
    }
}

const styles = StyleSheet.create({
    objectif: {
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
        justifyContent: "space-around"
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

export default ObjectifBlock