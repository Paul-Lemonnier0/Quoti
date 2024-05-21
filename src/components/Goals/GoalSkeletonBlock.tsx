import cardStyle from "../../styles/StyledCard";
import { FC, memo } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import IconImage from "../Other/IconImage";
import { HugeText, LittleNormalText, NormalGrayText, SubText, SubTitleText } from "../../styles/StyledText";
import { Dimensions } from "react-native";
import ProgressBar from "../Progress/ProgressBar";
import { FormDetailledGoal } from "../../types/FormGoalTypes";
import React from "react"

export interface GoalSkeletonBlockProps {
    goal: FormDetailledGoal
}

const GoalSkeletonBlock: FC<GoalSkeletonBlockProps> = memo(({goal}) => {
    const stylesCard = cardStyle()
    const width = Dimensions.get('window').width / 1.5

    return(
        <View style={{width}}>
            <View style={[stylesCard.card, styles.goal]}>
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
                        <ProgressBar progress={0} color={goal.color}/>
                    </View>

                    <LittleNormalText text={"%"} bold/>
                </View>


            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    goal: {
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

export default GoalSkeletonBlock