import { View, StyleSheet } from "react-native"
import { FC } from "react"
import { BorderRadioButton } from "../RadioButtons/RadioButton"

interface SelectWeekDaysProps {
    selectedDays: number[],
    handleSelectDay: (day: number) => void
}

export const SelectWeekDays: FC<SelectWeekDaysProps> = ({selectedDays, handleSelectDay}) => {

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