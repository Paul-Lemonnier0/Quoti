import { UsualScreen } from "../../../components/View/Views"
import { HugeText, SubText, SubTitleText } from "../../../styles/StyledText"
import { View, StyleSheet } from "react-native"
import { useState } from "react"
import { SelectWeekDays } from "../../../components/AddHabits/FrequencySelection"
import { IncrementButtons } from "../../../components/Buttons/IncrementButtons"
import { useNavigation, useRoute } from "@react-navigation/native"
import { NavigationButton } from "../../../components/Buttons/IconButtons"
import { BorderRadioButton } from "../../../components/RadioButtons/RadioButton"

const CreateHabitDetails = () => {

    const navigation = useNavigation()
    const route = useRoute()
    const {habit} = route.params

    const [selectedDays, setSelectedDays] = useState([]);
    const [isAllDaySelected, setAllDaySelected] = useState(true);

    const frequencies = [{key: "Quotidien", suffixe: "jours"}, {key: "Hebdo", suffixe: "sem."}, {key: "Mensuel", suffixe: "mois"}]
    const [selectedFrequency, setSelectedFrequency] = useState(frequencies[0])

    //J'EN SUIS LA, FREQUENCY PEUT ETRE BUGUEE

    const [occurences, setOccurences] = useState(1)
    const [reccurence, setReccurence] = useState(1)

    const handleGoNext = () => {

        const detailledHabit = {
            ...habit,
            frequency: selectedFrequency,
            occurence: occurences,
            reccurence: reccurence,
            daysOfWeek: selectedDays,
            notificationEnabled: true,
            alertTime: ""
          };

        navigation.navigate("ChooseColorScreen", {detailledHabit})
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
        <UsualScreen>
            <View style={styles.container}>

                <View style={styles.header}>

                    <View style={{width: "80%"}}>
                        <HugeText text="À quelle fréquence ?"/>
                    </View>

                    <NavigationButton action={"goNext"} methode={handleGoNext}/>

                </View>

                <StepIndicator totalSteps={5} currentStep={3}/>

                <View style={styles.body}>
                    
                    <View style={styles.groupContainer}>
                        {frequencies.map(frequency => (
                            <BorderRadioButton hideInactiveBorder
                                key={frequency.key}
                                text={frequency.key}
                                isHighlight={selectedFrequency.key === frequency.key}
                                handleOnClick={() => handleChangeFrequency(frequency)}
                            />
                        ))}
                    </View>

                    <Separator/>

                    <View style={styles.groupContainer}>
                        <View style={styles.listContainer}>
                            <View style={{flex: 1, display: "flex", flexDirection: "column", marginRight: 10}}>
                                <SubTitleText text="Récurrence :"/>
                                <SubText text="Ex : Tous les 2 jours"/>
                            </View>

                            <IncrementButtons isBorderHidden={isRecurrenceIncrementBorderHidden} value={reccurence} setValue={handleSetReccurence} suffixe={selectedFrequency.suffixe}/>

                        </View>

                        {
                            selectedFrequency.key === "Quotidien" ?
                                <SelectWeekDays selectedDays={selectedDays} handleSelectDay={handleSelectDay}/> :

                                <BorderRadioButton hideInactiveBorder isHighlight={reccurence === 1} handleOnClick={() => setReccurence(1)}
                                    text={selectedFrequency.key === "Mois" ? "Tous les mois" : "Toutes les semaines"} />
                        }
                    </View>


                    <View style={styles.groupContainer}>
                        <View style={styles.listContainer}>
                            <View style={{flex: 1, display: "flex", flexDirection: "column", marginRight: 10}}>
                                <SubTitleText text="Occurences :"/>
                                <SubText text="Ex : 2 fois par semaine"/>
                            </View>

                            <IncrementButtons value={occurences} setValue={setOccurences}/>
                        </View>
                    </View>
                </View>
            </View>
        </UsualScreen>
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
        gap: 20, marginTop: 10
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
        marginBottom: 0
    },

    header: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        justifyContent: "space-between"
    },
    
    body: {
        flex: 1, 
        gap: 30,
    },

    groupContainer: {
        display: 'flex', 
        flexDirection: "column",
        justifyContent: "center", 
        gap: 20,
        width: "100%"
    },
})

export default CreateHabitDetails