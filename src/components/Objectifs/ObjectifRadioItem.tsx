import { StyleSheet, TouchableOpacity, View } from "react-native"
import { NormalGrayText, SubText, SubTitleText } from "../../styles/StyledText"
import ItemIcon from "../Icons/ItemIcon"
import { useThemeColor } from "../Themed"
import cardStyle from "../../styles/StyledCard"
import { Objectif } from "../../types/HabitTypes"
import { FC, useContext } from "react"
import React from "react"
import { AppContext } from "../../data/AppContext"

export interface ObjectifRadioItem {
    objectif: Objectif,
    isSelected: boolean,
    onPress?: () => void,
    backgroundColor?: string, 
    borderColor?: string,
    isPressDisabled?: boolean
}

const ObjectifRadioItem: FC<ObjectifRadioItem> = ({objectif, isSelected, onPress, backgroundColor, borderColor, isPressDisabled}) => {
    const {theme} = useContext(AppContext)

    
    const bgColor = backgroundColor ?? useThemeColor(theme, "Secondary")
    const contrast = useThemeColor(theme, "Contrast")

    const brColor = isSelected ? contrast : (borderColor ?? bgColor)
    
    const stylesCard = cardStyle()

    return(
        <TouchableOpacity onPress={onPress} disabled={isPressDisabled} style={[stylesCard.card, styles.container, {backgroundColor: bgColor, borderColor: brColor}]}>
            <ItemIcon color={objectif.color} icon={objectif.icon}/>

            <View style={[styles.displayColumn, {justifyContent: "center"}]}>
                <SubTitleText numberOfLines={1} text={objectif.titre}/>
                <NormalGrayText bold numberOfLines={1} text={objectif.description}/>
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

export default ObjectifRadioItem