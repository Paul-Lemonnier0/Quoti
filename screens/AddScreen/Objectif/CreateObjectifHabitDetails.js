import { BorderTextButton, TextButton } from "../../../components/Buttons/UsualButton"
import { UsualScreen } from "../../../components/View/Views"
import { HugeText, SubText, SubTitleText } from "../../../styles/StyledText"
import { View, StyleSheet } from "react-native"
import { useContext, useState } from "react"
import { IncrementButtons } from "../../../components/Buttons/IncrementButtons"
import { useNavigation, useRoute } from "@react-navigation/native"
import { NavigationButton } from "../../../components/Buttons/IconButtons"
import { BorderRadioButton } from "../../../components/RadioButtons/RadioButton"
import Separator from "../../../components/Other/Separator"
import { AddHabitToObjContext } from "./AddHabitToObjContext"
import { BottomSheetModalMethodsContext } from "../../../data/BottomSheetModalContext"
import FooterBottomSheets from "../../../components/BottomSheets/FooterBottomSheets"

export const CreateObjectifHabitDetails = () => {

    const navigation = useNavigation()

    const route = useRoute()
    const {habit} = route.params
    
    const {addHabitForObjectif} = useContext(AddHabitToObjContext)
    const {closeModal} = useContext(BottomSheetModalMethodsContext)

    const [selectedDays, setSelectedDays] = useState([]);
    const [isAllDaySelected, setAllDaySelected] = useState(true);

    const frequencies = [{key: "Quotidien", suffixe: "jours"}, {key: "Hebdo", suffixe: "sem."}, {key: "Mensuel", suffixe: "mois"}]
    const [selectedFrequency, setSelectedFrequency] = useState(frequencies[0])

    const [occurences, setOccurences] = useState(1)
    const [reccurence, setReccurence] = useState(1)

    const handleValidation = () => {

        const detailledHabit = {
            ...habit,
            frequency: selectedFrequency.key,
            occurence: occurences,
            reccurence: reccurence,
            daysOfWeek: selectedDays,
            notificationEnabled: true,
            alertTime: ""
          };
        
        addHabitForObjectif(detailledHabit)
        closeModal()
    }

    const handleSelectDay = (dayIndex) => {
        if(selectedDays.includes(dayIndex)){
            const indexOfElement = selectedDays.indexOf(dayIndex)
            setSelectedDays(previousSelectedDays => previousSelectedDays.filter(day => day !== dayIndex))
            selectedDays.splice(indexOfElement, 1)
        }
        
        else setSelectedDays(previousSelectedDays => [...previousSelectedDays, dayIndex])
      };

    const handleChangeFrequency = (frequency) => {
        setSelectedFrequency(frequency)
    } 

    let isRecurrenceIncrementBorderHidden = true;

    if(selectedFrequency.key === "Quotidien"){
        isRecurrenceIncrementBorderHidden = selectedDays.length > 0
    }

    else isRecurrenceIncrementBorderHidden = reccurence === 1

    const handleSetReccurence = (rec) => {
        if(selectedFrequency.key === "Quotidien"){
            setSelectedDays([])
        }

        setReccurence(rec)
    }

    return(
        <View/>
    )
}

const styles = StyleSheet.create({
    dayContainer: {
        padding: 10, 
        borderRadius: 10, 
        flex: 1, 
        borderWidth: 2, 
        justifyContent: "center", 
        alignItems: "center"
    },

    listContainer: {
        display: "flex",
        flexDirection: "row", 
        width: "100%", 
        justifyContent: "space-between",
        alignItems: "center",
        gap: 20,
    },

    subTitleHeaderContainer: {
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center",
    },

    container: {
        display: "flex", 
        flexDirection: "column", 
        gap: 30, 
        flex: 1, 

    },

    header: {
        display: "flex", 
        flexDirection: "column",
        gap: 30    
    },
    
    body: {
        flex: 1, 
        gap: 30,
        justifyContent: "space-around"
    },

    groupContainer: {
        display: 'flex', 
        flexDirection: "column",
        justifyContent: "center", 
        gap: 20,
    },

    footer: {
        justifyContent: "center", 
        alignItems: "center"
    }
})