import { GoNextButton } from "../../components/Buttons/UsualButton"
import { UsualScreen } from "../../components/View/Views"
import { HugeText, NormalText, SubText, SubTitleText } from "../../styles/StyledText"
import { View, StyleSheet } from "react-native"
import { useState } from "react"
import { DaySelection, MonthSelection, WeekSelection } from "../../components/AddHabits/FrequencySelection"
import { IncrementButtons } from "../../components/Buttons/IncrementButtons"
import { useNavigation, useRoute } from "@react-navigation/native"
import { HugeRadioButton } from "../../components/RadioButtons/HugeRadioButtons"

const CreateHabitDetails = () => {

    const navigation = useNavigation()
    const route = useRoute()
    const {habit} = route.params

    const [selectedDays, setSelectedDays] = useState(new Array(7).fill(false));
    const [isAllDaySelected, setAllDaySelected] = useState(true);

    const [selectedFrequency, setSelectedFrequency] = useState("Quotidien")

    const [occurences, setOccurences] = useState(1)
    const [reccurence, setReccurence] = useState(1)

    const handleGoNext = () => {

        const daysOfWeek = []

        if(isAllDaySelected)
            daysOfWeek.push(7)
        
        else {
            selectedDays.map((isSelectedDay, index) => {
                if(isSelectedDay)
                    daysOfWeek.push(index)
            })
        }

        const detailledHabit = {
            ...habit,
            frequency: selectedFrequency,
            occurence: occurences,
            reccurence: reccurence,
            daysOfWeek: daysOfWeek,
            notificationEnabled: true,
            alertTime: ""
          };

        navigation.navigate("ChooseColorScreen", {detailledHabit})
    }

    const handleSelectDay = (dayIndex) => {

        setAllDaySelected(false)
        setSelectedDays((prevSelectedDays) => {
            const tempSelectedDays = [...prevSelectedDays];
            tempSelectedDays[dayIndex] = !tempSelectedDays[dayIndex];

            if(tempSelectedDays.filter((day) => day === true).length === 7)
                handleSelectAllDay()

            return tempSelectedDays;
        });
      };

    const handleSelectAllDay = () => {
        setSelectedDays(new Array(7).fill(false));    
        setAllDaySelected(true)
    }

    const handleChangeFrequency = (frequency) => {
        setSelectedFrequency(frequency)
    }

    return(
        <UsualScreen>
            <View style={styles.container}>

                <View style={styles.header}>

                    <View style={{width: "80%"}}>
                        <HugeText text="À quelle fréquence ?"/>
                    </View>

                    <GoNextButton handleGoNext={handleGoNext}/>

                </View>

                <StepIndicator totalSteps={5} currentStep={3}/>

                <View style={styles.body}>
                    
                    <View style={styles.groupContainer}>

                        <HugeRadioButton handleOnClick={() => handleChangeFrequency("Quotidien")} isHighlight={selectedFrequency === "Quotidien"}>
                            <NormalText text="Quotidien"/>
                        </HugeRadioButton>

                        <HugeRadioButton handleOnClick={() => handleChangeFrequency("Hebdo")} isHighlight={selectedFrequency === "Hebdo"}>
                            <NormalText text="Hebdomadaire"/>
                        </HugeRadioButton>

                        <HugeRadioButton handleOnClick={() => handleChangeFrequency("Mensuel")} isHighlight={selectedFrequency === "Mensuel"}>
                            <NormalText text="Mensuel"/>
                        </HugeRadioButton>

                    </View>

                    <Separator/>

                    <View style={styles.groupContainer}>
                        {selectedFrequency === "Quotidien" && <DaySelection selectedDays={selectedDays} handleSelectDay={handleSelectDay} 
                                                                        isAllDaySelected={isAllDaySelected} handleSelectAllDay={handleSelectAllDay}/>}

                        {selectedFrequency === "Hebdo" && <WeekSelection reccurence={reccurence} setReccurence={setReccurence}/>}

                        {selectedFrequency === "Mensuel" && <MonthSelection reccurence={reccurence} setReccurence={setReccurence}/>}
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
        gap: 20
    },
})

export default CreateHabitDetails