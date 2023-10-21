import { View, TouchableOpacity, StyleSheet } from "react-native"
import { LittleNormalText, NormalText } from "../../styles/StyledText"
import { useThemeColor } from "../Themed"
import { IncrementButtons } from "../Buttons/IncrementButtons"
import { useState } from "react"

const DaySelection = ({selectedDays, handleSelectDay, isAllDaySelected, handleSelectAllDay}) => {

    const secondary = useThemeColor({}, "Secondary") 
    const contrast = useThemeColor({}, "Contrast") 
    const font = useThemeColor({}, "Font") 

    const weekDays = [
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
        "Dimanche"
    ]

    const allDaySelected = selectedDays.filter((day) => day === true).length === 7

    return(
        <View style={styles.container}>

            {/* <View style={styles.header}>
                <LittleNormalText text="Tous les : "/>
            </View> */}

            <View style={[styles.selectorItemContainer, {justifyContent:"space-between"}]}>

                {weekDays.map((weekDay, index) => {

                    const isSelected = selectedDays[index]
                    const isHighlight = isSelected && ! allDaySelected

                    return(
                        <TouchableOpacity onPress={() => handleSelectDay(index)} key={weekDay} 
                            style={[styles.selectItem, 
                            {        
                                borderColor: isHighlight ? font : secondary,
                                backgroundColor: secondary,         
                            }]}>

                            <NormalText text={weekDay.substring(0, 1)}/>
                                    
                        </TouchableOpacity>
                    )
                })}

            </View>

            <View style={[styles.selectorItemContainer]}>
                <TouchableOpacity onPress={handleSelectAllDay}                         
                    style={[styles.selectAllItem, 
                    {        
                        borderColor: isAllDaySelected ? font : secondary,
                        backgroundColor: secondary,         
                    }]}>

                    <NormalText text="Tous les jours"/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const WeekSelection = ({reccurence, setReccurence}) => {

    const secondary = useThemeColor({}, "Secondary") 
    const contrast = useThemeColor({}, "Contrast") 
    const font = useThemeColor({}, "Font") 

    const handleEveryWeekPress = () => {
        setReccurence(1)
    }

    const isEveryWeek = reccurence === 1

    return(
        <View style={styles.container}>

            <View style={[styles.selectorItemContainer, {justifyContent:"space-around"}]}>

                <View style={styles.textFrequencyContainer}>
                    <NormalText text="Toutes les"/>
                </View>

                <IncrementButtons value={reccurence} setValue={setReccurence}/>

                <View style={styles.textFrequencyContainer}>
                    <NormalText text="semaines"/>
                </View>

            </View>

            <View style={[styles.selectorItemContainer]}>
                <TouchableOpacity onPress={handleEveryWeekPress}                         
                    style={[styles.selectAllItem, 
                    {        
                        borderColor: isEveryWeek ? font : secondary,
                        backgroundColor: secondary,         
                    }]}>

                    <NormalText text="Toutes les semaines"/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const MonthSelection = ({reccurence, setReccurence}) => {

    const secondary = useThemeColor({}, "Secondary") 
    const contrast = useThemeColor({}, "Contrast") 
    const font = useThemeColor({}, "Font") 

    
    const handleEveryMonthPress = () => {
        setReccurence(1)
    }

    const isEveryMonth = reccurence === 1

    return(
        <View style={styles.container}>

            <View style={[styles.selectorItemContainer, {justifyContent:"space-around"}]}>

                <View style={styles.textFrequencyContainer}>
                    <NormalText text="Tous les"/>
                </View>

                <IncrementButtons value={reccurence} setValue={setReccurence}/>

                <View style={styles.textFrequencyContainer}>
                    <NormalText text="mois"/>
                </View>

            </View>

            <View style={[styles.selectorItemContainer]}>
                <TouchableOpacity onPress={handleEveryMonthPress}                         
                    style={[styles.selectAllItem, 
                    {        
                        borderColor: isEveryMonth ? font : secondary,
                        backgroundColor: secondary,         
                    }]}>

                    <NormalText text="Tous les mois"/>
                </TouchableOpacity>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    selectItem: {
        padding: 10, 
        borderRadius: 10, 
        flex: 1, 
        borderWidth: 2, 
        justifyContent: "center", 
        alignItems: "center",
    },

    selectAllItem: {

        width: "100%",
        padding: 15, 
        borderRadius: 20, 
        borderWidth: 2, 
        justifyContent: "center", 
        alignItems: "center"
    },

    selectorItemContainer: {
        display: "flex",
        flexDirection: "row", 
        width: "100%", 
        gap: 10,
    },

    header: {
        width: "100%",
        display: "flex", 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-around", 
        gap: 15
    },

    container: {
        display: "flex", 
        flexDirection: "column", 
        gap: 20
    },

    textFrequencyContainer: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center"
    }
})

export {DaySelection, WeekSelection, MonthSelection}
