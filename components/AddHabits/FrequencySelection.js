import { View, StyleSheet } from "react-native"
import { NormalText, SubText, SubTitleText } from "../../styles/StyledText"
import { IncrementButtons } from "../Buttons/IncrementButtons"
import { useState } from "react"
import { BorderRadioButton } from "../RadioButtons/RadioButton"

export const SelectWeekDays = ({selectedDays, handleSelectDay}) => {

    const weekDays = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"]

    return(
        <View style={styles.selectorDayContainer}>           
            {weekDays.map((weekDay, index) => {

                const isSelected = selectedDays.includes(index)

                return <BorderRadioButton small extend hideInactiveBorder text={weekDay.substring(0, 1)} isHighlight={isSelected} handleOnClick={() => handleSelectDay(index)} key={index}/>
            })}
        </View>
    )
}



const styles = StyleSheet.create({
    selectorDayContainer: {
        display: "flex",
        flexDirection: "row", 
        gap: 5,
        marginVertical: 3
    }
})