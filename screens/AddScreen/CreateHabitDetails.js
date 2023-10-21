import { Feather } from "@expo/vector-icons"
import { CircleBorderButton, GoBackButton, GoNextButton, SimpleButton } from "../../components/Buttons/UsualButton"
import { BackgroundView, MainView, TopScreenView, UsualScreen } from "../../components/View/Views"
import { HugeText, NormalText, SubText, SubTitleGrayText, SubTitleText, TitleText } from "../../styles/StyledText"
import { useThemeColor } from "../../components/Themed"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { FlatList, ScrollView } from "react-native-gesture-handler"
import { useState } from "react"
import { DaySelection, MonthSelection, WeekSelection } from "../../components/AddHabits/FrequencySelection"
import { IncrementButtons, IncrementHours, IncrementMinutes } from "../../components/Buttons/IncrementButtons"
import { Switch } from "react-native"
import { roundToNearestMinutes } from "date-fns/esm"
import { TextInput } from "react-native"
import { RadioButton } from "../../components/RadioButtons/RadioButton"
import { useNavigation, useRoute } from "@react-navigation/native"
import { HugeRadioButton } from "../../components/RadioButtons/HugeRadioButtons"

const CreateHabitDetails = () => {

    const route = useRoute()
    const {habit} = route.params
    console.log(habit)


    const font = useThemeColor({}, "Font")
    const secondary = useThemeColor({}, "Secondary") 
    const contrast = useThemeColor({}, "Contrast") 

    const [selectedDays, setSelectedDays] = useState(new Array(7).fill(false));
    const [isAllDaySelected, setAllDaySelected] = useState(true);

    const [selectedFrequency, setSelectedFrequency] = useState("Quotidien")

    const [occurences, setOccurences] = useState(1)
    const [reccurence, setReccurence] = useState(1)

    const [notificationEnabled, setNotificationEnabled] = useState(true)

    const [alertMinutes, setAlertMinutes] = useState(30)
    const [alertHour, setAlertHour] = useState(12)

    const navigation = useNavigation()

    const handleGoNext = () => {

        const daysOfWeek = []

        if(selectedDays[7])
            daysOfWeek.push(0,1,2,3,4,5,6)
        
        else {
            selectedDays.map((isSelectedDay, index) => {
                if(isSelectedDay)
                    daysOfWeek.push(index)
            })
        }

        const detailledHabit = {
            ...habit, // Copy existing properties from the original habit object
            frequency: selectedFrequency,
            occurence: occurences,
            reccurence: reccurence,
            daysOfWeek: daysOfWeek,
            notificationEnabled: notificationEnabled,
            alertTime: notificationEnabled ? new Date(2003, 7, 16, alertHour, alertMinutes, 0).toString() : ""
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

        console.log(dayIndex)
      };

    const handleSelectAllDay = () => {
        setSelectedDays(new Array(7).fill(false));    
        setAllDaySelected(!isAllDaySelected)
    }

    const handleChangeFrequency = (frequency) => {
        setSelectedFrequency(frequency)
    }

    const allDaySelected = selectedDays.filter((day) => day === true).length === 7

    const frequencies = [
        "Quotidien",
        "Hebdo",
        "Mensuel",
    ]

    const [isTitleFieldFocus, setIsTitleFieldFocus] = useState(false)

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
                        {selectedFrequency === "Quotidien" && (
                            <DaySelection
                                selectedDays={selectedDays}
                                handleSelectDay={handleSelectDay}
                                isAllDaySelected={isAllDaySelected}
                                handleSelectAllDay={handleSelectAllDay}
                            />
                            )}

                        {selectedFrequency === "Hebdo" && (
                            <WeekSelection
                                reccurence={reccurence}
                                setReccurence={setReccurence}
                            />
                        )}

                        {selectedFrequency === "Mensuel" && (
                            <MonthSelection
                                reccurence={reccurence}
                                setReccurence={setReccurence}
                            />
                        )}
                        </View>



                        <View style={styles.groupContainer}>
                            <View style={styles.listContainer}>
                                <View style={{flex: 1, display: "flex", flexDirection: "column"}}>
                                    <SubTitleText text="Occurences :"/>
                                    <View style={{marginTop: 0}}>
                                        <SubText text="Ex : 2 fois par semaine"/>
                                    </View>                            
                                </View>
                                <View>
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
        gap: 10, marginTop: 10
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