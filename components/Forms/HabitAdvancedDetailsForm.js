import { StyleSheet } from "react-native";
import { IncrementButtons } from "../Buttons/IncrementButtons";
import { HugeText, SubText, SubTitleText } from "../../styles/StyledText";
import { View } from "react-native";
import { BorderRadioButton } from "../RadioButtons/RadioButton";
import { SelectWeekDays } from "../AddHabits/FrequencySelection";
import Separator from "../Other/Separator";
import StepIndicator from "../Other/StepIndicator";
import { NavigationButton } from "../Buttons/IconButtons";
import { UsualScreen } from "../View/Views";
import { getAddHabitStepsDetails } from "../../constants/BasicConstants";
import { getSeriazableHabit } from "../../primitives/HabitMethods";
import { useContext, useState } from "react";
import { HabitsContext } from "../../data/HabitContext";
import { useNavigation, useRoute } from "@react-navigation/native";

export default HabitAdvancedDetailsForm = ({
    isForModifyingHabit,
    habit,
    handleGoNext,
}) => {


    const frequencies = [{key: "Quotidien", suffixe: "jours"}, {key: "Hebdo", suffixe: "sem."}, {key: "Mensuel", suffixe: "mois"}]
    
    const frequency_default = habit?.frequency ? frequencies.filter((freq) => freq.key === habit.frequency)[0] : frequencies[0]

    const [selectedDays, setSelectedDays] = useState(habit?.daysOfWeek ?? []);
    const [selectedFrequency, setSelectedFrequency] = useState(frequency_default)
    const [occurences, setOccurences] = useState(habit?.occurence ?? 1)
    const [reccurence, setReccurence] = useState(habit?.reccurence ?? 1)

    const handleValidation = async() => {

        const newValues = {
            frequency: selectedFrequency.key,
            occurence: occurences,
            reccurence: reccurence,
            daysOfWeek: selectedDays,
            notificationEnabled: true,
            alertTime: "",
          };

          handleGoNext(newValues)
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

    const CURRENT_STEP_DETAILS = getAddHabitStepsDetails(isForModifyingHabit ? null : habit.objectifID, "CreateHabitDetails")

    const totalSteps = CURRENT_STEP_DETAILS.TOTAL_STEPS
    const currentStep = CURRENT_STEP_DETAILS.CURRENT_STEP

    return(
        <UsualScreen hideMenu>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <NavigationButton noPadding action={"goBack"}/>
                        <NavigationButton noPadding action={"validation"} methode={handleValidation}/>
                    </View>

                    <HugeText text="À quelle fréquence ?"/>

                    <StepIndicator totalSteps={totalSteps} currentStep={currentStep}/>
                </View>

                <View style={styles.body}>
                    
                    <View style={styles.subBody}>
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

                    <View style={[styles.subBody, {justifyContent: "space-evenly"}]}>

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
                                    <SubText text="Ex : 2 fois par jour"/>
                                </View>

                                <IncrementButtons value={occurences} setValue={setOccurences}/>
                            </View>
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
        flexDirection: "column", 
        gap: 30
    },
    
    body: {
        flex: 1, 
        gap: 15,
    },

    subBody: {
        flex: 1,
        display: 'flex', 
        flexDirection: "column",
        justifyContent: "center", 
        gap: 20,
    },

    groupContainer: {
        display: 'flex', 
        flexDirection: "column",
        justifyContent: "center", 
        gap: 20,
    },

    footer: {
    }
})