import { View, StyleSheet } from "react-native"
import { TitleText, SubTitleText } from "../../styles/StyledText"
import { useMemo, useState } from "react"
import { Feather } from "@expo/vector-icons"
import { useThemeColor } from "../../components/Themed"
import CustomBottomSheet from "../../components/BottomSheets/CustomBottomSheet"
import { BottomTextInputCustom, TextInputCustom } from "../../components/TextFields/TextInput"
import { IncrementTime } from "../../components/Buttons/IncrementButtons"
import { BackgroundTextButton, BigCircleBorderButton, TextButton } from "../../components/Buttons/UsualButton"
import { Keyboard } from "react-native"
import { TouchableWithoutFeedback } from "react-native"
import { useRef } from "react"
import { CircleBorderIconButton, CloseButton, NavigationButton } from "../../components/Buttons/IconButtons"
import Separator from "../../components/Other/Separator"
import SimpleFullBottomSheet from "../../components/BottomSheets/SimpleFullBottomSheet"
import { UsualScreen } from "../../components/View/Views"

const AddStepBottomScreen = ({bottomSheetModalRef, setSteps, noBackdrop}) => {

    const snapPoints = useMemo(() => ['85%'], [])

    const font = useThemeColor({}, "Font")
    const popupColor = useThemeColor({}, "Popup")

    let titreRef = useRef(null)
    let descriptionRef = useRef(null)

    const handleSetTitre = (text) => titre = text
    const handleSetDescription = (text) => description = text

    const [isTitleWrong, setIsTitleWrong] = useState(false)
    const [isDescriptionWrong, setIsDescriptionWrong] = useState(false)

    const [hourDuration, setHourDuration] = useState(0)
    const [minutesDuration, setMinutesDuration] = useState(0)


    const clearAll = () => {
        handleSetTitre("")
        setIsTitleWrong(false)
        handleSetDescription("")
        setIsDescriptionWrong(false)
        setHourDuration(0)
        setMinutesDuration(0)
    }

    const handleValidate = () => {

        let canClose = true

        let titre = titreRef.current?.getValue();
        let description = descriptionRef.current?.getValue();

        if(titre.trim().length <= 0 || description.trim().length <= 0) 
        {
            description.trim().length <= 0 ? setIsDescriptionWrong(true) : setIsDescriptionWrong(false)
            titre.trim().length <= 0 ? setIsTitleWrong(true) : setIsTitleWrong(false)

            canClose = false
        }

        if(canClose)
        {
            const stepDuration = hourDuration !== 0 || minutesDuration !== 0 ? hourDuration * 60 + minutesDuration : null

            const newStep = {
                titre: titre,
                description: description,
                duration: stepDuration
            }

            setSteps((previousSteps) => 
                ([...previousSteps, newStep]))

            clearAll()
            closeModal()  
        }
    }
  
    const closeModal = () => {
        bottomSheetModalRef.current?.close();
    }

    const handleSetNoDuration = () => {
        setHourDuration(0)
        setMinutesDuration(0)
    }

    return (
            <CustomBottomSheet bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints} handleSheetChanges={() => {}} noBackdrop={noBackdrop}>
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{flex: 1}}>

                        <View style={styles.contentContainer}>
                            <View style={styles.pageTitleContainer}>
                                <View style={{flex: 1}}>
                                    <TitleText text="Nouvelle étape"/>
                                </View>
                                <CloseButton noPadding methode={closeModal}/>
                            </View>

                        
                            <View style={styles.body}>

                                <View style={styles.subBodyContainer}>
                                    <BottomTextInputCustom semiBold ref={titreRef} labelName={"Titre"} placeholder={"Entrez un titre"} isWrong={isTitleWrong}/>
                                    <BottomTextInputCustom semiBold ref={descriptionRef} labelName={"Description"} placeholder={"Entrez une courte description"} isWrong={isDescriptionWrong}/>
                                </View>

                                <View style={styles.subBodyContainer}>
                                    <View style={{ marginLeft: 5, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <SubTitleText text={"Durée"}/>
                                        <TextButton text={"Aucune"} semiBold noPadding onPress={handleSetNoDuration}/>
                                    </View>

                                    <View style={styles.listContainer}>
                                        <IncrementTime value={hourDuration} isBorderHidden={hourDuration === 0} setValue={setHourDuration} customBackgroundColor={popupColor}/>
                                        <IncrementTime value={minutesDuration} isBorderHidden={minutesDuration === 0} setValue={setMinutesDuration} isMinutes={true} customBackgroundColor={popupColor}/>
                                    </View>
                                </View>
                            </View>


                            <View style={styles.footer}>
                                <Separator/>
                                <TextButton bold extend onPress={handleValidate} text={"Ajouter"}/>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
        </CustomBottomSheet>
    );
  };
  
  const styles = StyleSheet.create({

    contentContainer: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        gap: 30,
        marginBottom: 30,
    },

    pageTitleContainer: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        gap: 20,
        marginLeft: 5
    },

    body: {
        display: "flex", 
        flexDirection: "column", 
        flex: 1, 
        gap: 30
    },

    subBodyContainer: {
        display: 'flex', 
        flexDirection: "column",
        flex: 1,
        gap: 30
    },

    listContainer: {
        display: "flex",
        flexDirection: "row", 

        gap: 10,
    },

    validationButtonContainer: {
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        flex: 1, 
        marginTop: -20
    },

    footer: {
        display: "flex",
        flexDirection: "column",
        gap: 10
    },
  });
  
  export default AddStepBottomScreen;