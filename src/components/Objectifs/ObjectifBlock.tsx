import { TouchableOpacity } from "react-native"
import cardStyle from "../../styles/StyledCard";
import { FC, useCallback, useContext, useRef } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import IconImage from "../Other/IconImage";
import { LittleNormalText, NormalText, SubText, SubTitleText } from "../../styles/StyledText";
import { Dimensions } from "react-native";
import { HabitsContext } from "../../data/HabitContext";
import ProgressBar from "../Progress/ProgressBar";
import Animated, { FadeInRight } from "react-native-reanimated";
import { FrequencyTypes, Habit, SeriazableObjectif, Step } from "../../types/HabitTypes";
import { getSeriazableObjectif } from "../../primitives/ObjectifMethods";
import SettingsObjectifBottomSheet from "../../screens/BottomScreens/Objectifs/SettingsObjectifBottomScreen";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomScreenOpen_Impact } from "../../constants/Impacts";
import { useThemeColor } from "../Themed";
import React from "react"

export interface ObjectifBlockProps {
    objectifID: string,
    frequency: FrequencyTypes,
    index: number,
    handleOnPress: (
        seriazableObjectif: SeriazableObjectif,
        frequency: FrequencyTypes,
        currentDateString: string
    ) => void,
    currentDateString: string
}

const ObjectifBlock: FC<ObjectifBlockProps> = ({objectifID, frequency, index, handleOnPress, currentDateString}) => {

    const {Objectifs, filteredHabitsByDate} = useContext(HabitsContext)
    const font = useThemeColor({}, "Font")

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const openModal = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleLongPress = () => {
        BottomScreenOpen_Impact();
        openModal()
    }

    const objectif = Objectifs[objectifID]
    const habits: Habit[] = Object.values(filteredHabitsByDate[frequency].Objectifs?.[objectifID] ?? {})

    const stylesCard = cardStyle()

    const width = Dimensions.get('window').width / 1.5

    const handlePress = () => {
        const seriazableObjectif = getSeriazableObjectif(objectif)
        handleOnPress(seriazableObjectif, frequency, currentDateString)
    }

    const steps: Step[] = []
    for(const habit of habits){
        Object.values(habit.steps).map(step => steps.push(step))
    }

    const doneSteps = steps.filter(step => step.isChecked).length
    const totalSteps = steps.length
    const pourcentage_value = Math.round(doneSteps * 100 / steps.length)
    const isFinished = totalSteps === doneSteps

    if(!objectif) {
        return null
    }

    return(
        <>
        <TouchableOpacity style={{opacity: isFinished ? 0.5 : 1, width}} onPress={handlePress} delayLongPress={750} onLongPress={handleLongPress}>
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
                        <ProgressBar progress={pourcentage_value ? pourcentage_value/100 : 0} color={objectif.color}/>
                    </View>

                    <LittleNormalText text={pourcentage_value + "%"} bold/>
                </View>


            </Animated.View>
        </TouchableOpacity>

        <SettingsObjectifBottomSheet bottomSheetModalRef={bottomSheetModalRef} objectif={objectif}/>

        </>
    )
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