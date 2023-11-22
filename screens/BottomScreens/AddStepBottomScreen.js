import { View, StyleSheet } from "react-native"
import { TitleText, SubTitleText } from "../../styles/StyledText"
import { useState } from "react"
import { Feather } from "@expo/vector-icons"
import { useThemeColor } from "../../components/Themed"
import CustomBottomSheet from "../../components/BottomSheets/CustomBottomSheet"
import { TextInputCustom } from "../../components/TextFields/TextInput"
import { IncrementTime } from "../../components/Buttons/IncrementButtons"
import { BigCircleBorderButton, TextButton } from "../../components/Buttons/UsualButton"
import { Keyboard } from "react-native"
import { TouchableWithoutFeedback } from "react-native"
import { useRef } from "react"
import { CircleBorderIconButton } from "../../components/Buttons/IconButtons"
import Separator from "../../components/Other/Separator"

const AddStepBottomScreen = ({bottomSheetModalRef, snapPoints, setSteps, noBackdrop}) => {

    const font = useThemeColor({}, "Font")
    const popupColor = useThemeColor({}, "Popup")

    let titreRef = useRef(null)
    let descriptionRef = useRef(null)

    const handleSetTitre = (text) => titre = text
    const handleSetDescription = (text) => description = text

    const [isTitleWrong, setIsTitleWrong] = useState(false)
    const [isDescriptionWrong, setIsDescriptionWrong] = useState(false)

    const [hourDuration, setHourDuration] = useState(0)
    const [minutesDuration, setMinutesDuration] = useState(30)


    const clearAll = () => {
        handleSetTitre("")
        setIsTitleWrong(false)
        handleSetDescription("")
        setIsDescriptionWrong(false)
        setHourDuration(0)
        setMinutesDuration(30)
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
            const newStep = {
                titre: titre,
                description: description,
                duration: hourDuration * 60 + minutesDuration
            }

            setSteps((previousSteps) => 
            {
                const beforeLastIndex = previousSteps.length - 1;
                const newSteps = [...previousSteps];
                newSteps.splice(beforeLastIndex, 0, newStep);
                
                return newSteps
            })

            clearAll()
            bottomSheetModalRef.current?.close();
        }
    }
  
    return (
            <CustomBottomSheet bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints} handleSheetChanges={() => {}} noBackdrop={noBackdrop}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

                    <View style={styles.contentContainer}>
                        <View style={styles.pageTitleContainer}>
                            <TitleText text="Nouvelle étape" style={{textAlign: "center"}}/>
                        </View>

                        <View style={styles.body}>

                            <View style={[styles.subBodyContainer, {gap: 15}]}>
                                <View style={styles.subBodyContainer}>
                                    <TextInputCustom boldLabel ref={titreRef} labelName={"Titre"} placeholder={"Entrez un titre"} isWrong={isTitleWrong}/>
                                </View>

                                <View style={styles.subBodyContainer}>
                                    <TextInputCustom boldLabel ref={descriptionRef} labelName={"Description"} placeholder={"Entrez une courte description"} isWrong={isDescriptionWrong}/>
                                </View>
                            </View>

                            <View style={[styles.subBodyContainer, {gap: 15}]}>
                                <SubTitleText text="Durée :"/>

                                <View style={styles.listContainer}>
                                    <IncrementTime value={hourDuration} setValue={setHourDuration} customBackgroundColor={popupColor}/>
                                    <IncrementTime value={minutesDuration} setValue={setMinutesDuration} isMinutes={true} customBackgroundColor={popupColor}/>
                                </View>
                            </View>
                        </View>
                        <View style={{gap: 10}}>
                            <Separator opacity={0.5}/>

                            <View style={styles.footer}>
                                <TextButton bold extend onPress={handleValidate} text={"Ajouter"}/>
                            </View>
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
        gap: 20
    },

    pageTitleContainer: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        justifyContent: "center", 
        marginBottom: 25, 
        marginTop: -10
    },

    body: {
        display: "flex", 
        flexDirection: "column", 
        flex: 1, 
        marginBottom: 0,
        gap: 15
    },

    subBodyContainer: {
        display: 'flex', 
        flexDirection: "column",
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
        justifyContent: "center", 
        alignItems: "center"
    },
  });
  
  export default AddStepBottomScreen;