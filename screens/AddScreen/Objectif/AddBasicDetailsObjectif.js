import { TouchableOpacity, View } from "react-native"
import { UsualScreen } from "../../../components/View/Views"
import { GoNextButton } from "../../../components/Buttons/UsualButton"
import { HugeText, NormalText, SubTitleText } from "../../../styles/StyledText"
import { useCallback, useMemo, useState } from "react"
import { StyleSheet } from "react-native"
import { TextInputCustom } from "../../../components/TextFields/TextInput"
import { useRef } from "react"
import { RenderAddStepCarouselItem } from '../../../components/Habitudes/Step/StepCarouselItem'
import { useNavigation } from "@react-navigation/native"
import { generateUniqueID } from "../../../primitives/BasicsMethods"
import { ContrastButton, NavigationButton } from "../../../components/Buttons/IconButtons"
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import SelectDateBottomScreen from "../../BottomScreens/SelectDateBottomScreen"
import { useThemeColor } from "../../../components/Themed"
import Separator from "../../../components/Other/Separator"
import { DatePicker } from "../../../components/TextFields/DatePicker"

export default AddBasicDetailsObjectif = () => {

    const navigation = useNavigation();

    const font = useThemeColor({}, "Font")
    const secondary = useThemeColor({}, "Secondary")

    let startingDateBase = new Date()
    let endingDateBase = new Date()
    endingDateBase.setDate(startingDateBase.getDate() + 3)

    console.log("end date : ", endingDateBase)

    const [startingDate, setStartingDate] = useState(startingDateBase)
    const [endingDate, setEndingDate] = useState(endingDateBase)
    const [dateToChange, setDateToChange] = useState(new Date())

    let titreRef = useRef(null)
    let descriptionRef = useRef(null)

    const [isTitleWrong, setIsTitleWrong] = useState(false)
    const [isDescriptionWrong, setIsDescriptionWrong] = useState(false)

    const handleGoNext = () => {

        let canGoNext = true

        let titre = titreRef.current?.getValue();
        let description = descriptionRef.current?.getValue();

        if(titre.trim().length === 0 || description.trim().length === 0) 
        {
            description.trim().length <= 0 ? setIsDescriptionWrong(true) : setIsDescriptionWrong(false)
            titre.trim().length <= 0 ? setIsTitleWrong(true) : setIsTitleWrong(false)

            canGoNext = false
        }

        else {
            setIsTitleWrong(false)
            setIsDescriptionWrong(false)
        }

        if(canGoNext) 
        { 
            const detailledObjectif = {
                titre, 
                description, 
                startingDate: startingDate.toDateString(), 
                endingDate: endingDate.toDateString()
            }
            navigation.navigate("ChooseColorScreenObjectif", {detailledObjectif})
        }
    }

    const bottomSheetModalRef_Calendar = useRef(null);
    const snapPoints_Calendar = useMemo(() => ['55%'], []);
  
    const handleOpenCalendar = useCallback(() => {
          bottomSheetModalRef_Calendar.current?.present();
      }, []);
  
    const handleSheetChangesCalendar = useCallback((index) => {
        console.log("handleSheetChange", index)
    }, []);

    let handleSetDateToChange = (date) => {
        // Mettez à jour la date appropriée (début ou fin) en fonction de la logique de votre application.
        if (dateToChange === startingDate) {
            setStartingDate(date);
        } else if (dateToChange === endingDate) {
            setEndingDate(date);
        }
    };

    const changeStartingDate = () => {
        setDateToChange(startingDate)
        handleSetDateToChange(startingDate)
        handleOpenCalendar()
    }

    const changeEndingDate = () => {
        setDateToChange(endingDate)
        handleSetDateToChange(endingDate)
        handleOpenCalendar()
    }

    const dateStringOptions = {day: 'numeric', weekday: 'short', month: 'long', year: 'numeric'}

    return(
        <UsualScreen>
            <View style={styles.container}>

                <View style={styles.header}>
                    <View style={{width: "80%"}}>
                        <HugeText text="Dites-nous en un peu plus !"/>
                    </View>

                    <NavigationButton action={"goNext"} methode={handleGoNext}/>
                </View>

                <StepIndicator totalSteps={5} currentStep={2}/>

                <View style={styles.body}>
                    <View style={styles.displayColumn}>
                        <TextInputCustom ref={titreRef} isWrong={isTitleWrong}
                            placeholder={"Nom de l'objectif"} labelName={"Titre"}
                            errorMessage={"Rentrez un titre valide"}/>

                        <TextInputCustom ref={descriptionRef} isWrong={isDescriptionWrong}
                            placeholder={"Description de l'objectif"} labelName={"Description"} 
                            errorMessage={"Rentrez une description valide"}/>
                    </View>
                    <Separator/>

                    <View style={[styles.displayColumn, {alignItems: "center"}]}>
                        <DatePicker label={"Date de début"} date={startingDate} onPress={changeStartingDate}/>
                        <DatePicker label={"Date de fin"} date={endingDate} onPress={changeEndingDate}/>
                    </View>

                </View>
            </View>

            
        <SelectDateBottomScreen 
          selectedDate={dateToChange}
          setSelectedDate={handleSetDateToChange}
          bottomSheetModalRef={bottomSheetModalRef_Calendar} 
          snapPoints={snapPoints_Calendar} 
          handleSheetChanges={handleSheetChangesCalendar}/>

        </UsualScreen>
    )
}

const styles = StyleSheet.create({
    
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
        gap: 20,
        justifyContent: "center"
    },

    displayColumn: {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center",
        gap: 10
    },

    dateSelectionHeader: {
        display: 'flex', 
        flexDirection: "column", 
        gap: 10, 
        marginVertical: 10
    },

    dateSelectionButtonContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%"
    },

    dateSelectionButton: {
        padding: 15, 
        borderWidth: 2, 
        width: "100%", 
        borderColor: "transparent", 
        borderRadius: 15
    }
})