import { StyleSheet, TouchableOpacity, View } from "react-native"
import { LittleNormalText, NormalGrayText, SubText, SubTitleText } from "../../styles/StyledText"
import ItemIcon from "../Icons/ItemIcon"
import { useThemeColor } from "../Themed"
import cardStyle from "../../styles/StyledCard"
import { Goal } from "../../types/HabitTypes"
import { FC, useContext } from "react"
import React from "react"
import { AppContext } from "../../data/AppContext"

export interface GoalRadioItem {
    goal: Goal,
    isSelected: boolean,
    onPress?: () => void,
    backgroundColor?: string, 
    borderColor?: string,
    isPressDisabled?: boolean
}

const GoalRadioItem: FC<GoalRadioItem> = ({goal, isSelected, onPress, backgroundColor, borderColor, isPressDisabled}) => {
    const {theme} = useContext(AppContext)

    
    const bgColor = backgroundColor ?? useThemeColor(theme, "Secondary")
    const contrast = useThemeColor(theme, "Contrast")
    const fontGray = useThemeColor(theme, "FontGray")

    const brColor = isSelected ? contrast : (borderColor ?? bgColor)
    
    const stylesCard = cardStyle()

    return(
        <TouchableOpacity onPress={onPress} disabled={isPressDisabled} style={[stylesCard.card, styles.container, {backgroundColor: bgColor, borderColor: brColor}]}>
            <ItemIcon color={goal.color} icon={goal.icon}/>

            <View style={[styles.displayColumn, {justifyContent: "center"}]}>
                <SubTitleText numberOfLines={1} text={goal.titre}/>
                <LittleNormalText style={{color: fontGray}} bold numberOfLines={1} text={goal.description}/>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        gap: 15,
        flexDirection: "row",
        flex: 1,
        borderWidth: 2
    },

    displayColumn: {
        display: "flex",
        flexDirection: "column",
        gap: 5,
        flex: 1
    },
})

export default GoalRadioItem