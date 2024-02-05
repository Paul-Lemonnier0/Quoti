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
import { DatePicker, MultiDatePicker } from "../../../components/TextFields/DatePicker"
import SelectMultipleDateBottomScreen from "../../BottomScreens/SelectMultipleDateBottomScreen"

export default AddBasicDetailsObjectif = () => {

    const navigation = useNavigation();

    const font = useThemeColor({}, "Font")
    const secondary = useThemeColor({}, "Secondary")

    let startingDateBase = new Date()
    let endingDateBase = new Date()
    endingDateBase.setDate(startingDateBase.getDate() + 3)

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
    }, []);

    return(
        <UsualScreen hideMenu>
            <View style={styles.container}>

                <View style={styles.header}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <NavigationButton noPadding action={"goBack"}/>
                        <NavigationButton noPadding action={"goNext"} methode={handleGoNext}/>
                    </View>

                    <HugeText text="Nouvel objectif"/>

                    <StepIndicator totalSteps={5} currentStep={1}/>
                </View>

                <View style={styles.body}>
                    <View style={styles.displayColumn}>
                        <TextInputCustom ref={titreRef} isWrong={isTitleWrong}
                            placeholder={"Nom de l'objectif"} labelName={"Titre"} semiBold
                            errorMessage={"Rentrez un titre valide"}/>

                        <TextInputCustom ref={descriptionRef} isWrong={isDescriptionWrong}
                            placeholder={"Description de l'objectif"} labelName={"Description"}  semiBold
                            errorMessage={"Rentrez une description valide"}/>
                    </View>
                    
                    <Separator/>

                    <View style={[styles.displayColumn, {alignItems: "center", marginTop: 10}]}>
                        <MultiDatePicker label={"Date de début et de fin"} semiBoldLabel
                            startDate={startingDate} endDate={endingDate} 
                            onPress={handleOpenCalendar}/>
                    </View>

                </View>
            </View>

            
        <SelectMultipleDateBottomScreen 
          startingDate={startingDate}
          setStartingDate={setStartingDate}
          endingDate={endingDate}
          setEndingDate={setEndingDate}
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
        flexDirection: "column", 
        gap: 30
    },
    
    body: {
        flex: 1, 
        gap: 20,
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