import { View, StyleSheet } from "react-native"
import { TitleText, SubTitleText } from "../../styles/StyledText"
import { useState } from "react"
import { Feather } from "@expo/vector-icons"
import { useThemeColor } from "../../components/Themed"
import CustomBottomSheet from "../../components/BottomSheets/CustomBottomSheet"
import { TextInputCustom } from "../../components/TextFields/TextInput"
import { IncrementTime } from "../../components/Buttons/IncrementButtons"
import { BigCircleBorderButton } from "../../components/Buttons/UsualButton"
import { Keyboard } from "react-native"
import { TouchableWithoutFeedback } from "react-native"

const AddStepBottomScreen = ({bottomSheetModalRef, snapPoints, setSteps}) => {

    const font = useThemeColor({}, "Font")
    const popupColor = useThemeColor({}, "Popup")

    let titre = "";
    let description = "";
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

        console.log(titre)
        console.log(description)

        if(titre.length <= 0 || description.length <= 0) 
        {
            console.log(titre)
            description.length <= 0 ? setIsDescriptionWrong(true) : setIsDescriptionWrong(false)
            titre.length <= 0 ? setIsTitleWrong(true) : setIsTitleWrong(false)

            canClose = false
        }

        if(canClose)
        {
            console.log("hello")
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
            <CustomBottomSheet bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints} handleSheetChanges={() => {}}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

                    <View style={styles.contentContainer}>
                        <View style={styles.pageTitleContainer}>
                            <TitleText text="Nouvelle étape" style={{textAlign: "center"}}/>
                        </View>

                        <View style={styles.body}>

                            <View style={styles.subBodyContainer}>
                                <SubTitleText text="Titre :"/>
                                <TextInputCustom setValue={handleSetTitre} placeholder={"Entrez un titre"} isWrong={isTitleWrong}/>
                            </View>

                            <View style={styles.subBodyContainer}>
                                <SubTitleText text="Description :"/>
                                <TextInputCustom setValue={handleSetDescription} placeholder={"Entrez un titre"} isWrong={isDescriptionWrong}/>
                            </View>

                            <View style={[styles.subBodyContainer, {gap: 15}]}>
                                <SubTitleText text="Durée :"/>

                                <View style={styles.listContainer}>
                                    <IncrementTime value={hourDuration} setValue={setHourDuration} customBackgroundColor={popupColor}/>
                                    <IncrementTime value={minutesDuration} setValue={setMinutesDuration} isMinutes={true} customBackgroundColor={popupColor}/>
                                </View>
                            </View>

                            <View style={styles.validationButtonContainer}>
                                <BigCircleBorderButton onPress={handleValidate}>
                                    <Feather name="check" size={24} color={font} />
                                </BigCircleBorderButton>
                            </View>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
        </CustomBottomSheet>
    );
  };
  
  const styles = StyleSheet.create({

    contentContainer: {
        gap: 20,
        display: "flex",
        flexDirection: "column",
        flex: 1
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
        gap: 30, 
        flex: 1, 
        marginBottom: 15
    },

    subBodyContainer: {
        display: 'flex', 
        flexDirection: "column",
    },

    listContainer: {
        display: "flex",
        flexDirection: "row", 
        width: "100%", 
        justifyContent: "space-between",
        gap: 10,
    },

    validationButtonContainer: {
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        flex: 1, 
        marginTop: -20
    }
  });
  
  export default AddStepBottomScreen;