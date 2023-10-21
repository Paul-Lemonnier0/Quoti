import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { View, StyleSheet, FlatList } from "react-native"

import { IconButton } from "../../components/Buttons/IconButton"
import { TitleText, NormalText, SubTitleText } from "../../styles/StyledText"
import { useRef, useMemo, useCallback, useState } from "react"
import { Feather } from "@expo/vector-icons"
import { useThemeColor } from "../../components/Themed"
import { CircularBarProfil, AddCircularBarProfil } from "../../components/Profil/CircularBarProfil"
import { ContributorsHabits } from "../../data/habitudes"
import CustomBottomSheet from "../../components/BottomSheets/CustomBottomSheet"
import { TextInputCustom } from "../../components/TextFields/TextInput"
import { IncrementHours, IncrementMinutes } from "../../components/Buttons/IncrementButtons"
import { BigCircleBorderButton } from "../../components/Buttons/UsualButton"
import { Keyboard } from "react-native"
import { TouchableWithoutFeedback } from "react-native"

const AddStepBottomScreen = ({bottomSheetModalRef, snapPoints, setSteps}) => {

    const font = useThemeColor({}, "Font")
    const popupColor = useThemeColor({}, "Popup")

    const [titre, setTitre] = useState("")
    const [isTitleWrong, setIsTitleWrong] = useState(false)

    const [description, setDescription] = useState("")
    const [isDescriptionWrong, setIsDescriptionWrong] = useState(false)

    const [hourDuration, setHourDuration] = useState(0)
    const [minutesDuration, setMinutesDuration] = useState(30)


    const clearAll = () => {
        setTitre("")
        setIsTitleWrong(false)
        setDescription("")
        setIsDescriptionWrong(false)
        setHourDuration(0)
        setMinutesDuration(30)
    }

    const handleValidate = () => {

        let canClose = true

        if(titre.length === 0) 
        {
            setIsTitleWrong(true)
            canClose = false;
        }

        else setIsTitleWrong(false)

        if(description.length === 0) 
        {
            setIsDescriptionWrong(true)
            canClose = false;
        }

        else setIsDescriptionWrong(false)

        if(canClose)
        {
            const newStep = {
                titre: titre,
                description: description,
                duration: hourDuration * 60 + minutesDuration //in minutes
            }

            setSteps((previousSteps) => 
            {
                const beforeLastIndex = previousSteps.length - 1;
                const newSteps = [...previousSteps];
                newSteps.splice(beforeLastIndex, 0, newStep);

                console.log(newSteps)

                return newSteps
            })

            clearAll()

            bottomSheetModalRef.current?.close();
        }
    }
  
    // renders
    return (
            <CustomBottomSheet 
            bottomSheetModalRef={bottomSheetModalRef}
            snapPoints={snapPoints}
            handleSheetChanges={() => {}}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.contentContainer}>
                        <View style={{display: "flex", flexDirection: "row", alignItems:"center", justifyContent: "center", marginBottom: 25, marginTop: -10}}>

                            <TitleText text="Nouvelle étape" style={{textAlign: "center"}}/>

                        </View>

                        <View style={{display: "flex", flexDirection: "column", gap: 30, flex: 1, marginBottom: 15}}>

                            <View style={styles.groupContainer}>

                                <SubTitleText text="Titre :"/>
                                <TextInputCustom placeholder={"Entrez un titre"} value={titre} onChangeText={setTitre} isWrong={isTitleWrong}/>

                            </View>

                            <View style={styles.groupContainer}>
                                <SubTitleText text="Description :"/>

                                <TextInputCustom
                                    placeholder={"Entrez une courte description"}
                                    value={description}
                                    onChangeText={setDescription}
                                    isWrong={isDescriptionWrong}
                                />

                            </View>

                            <View style={[styles.groupContainer, {gap: 15}]}>
                                <SubTitleText text="Durée :"/>

                                <View style={styles.listContainer}>
                                    <IncrementHours value={hourDuration} setValue={setHourDuration} customBackgroundColor={popupColor}/>
                                    <IncrementMinutes value={minutesDuration} setValue={setMinutesDuration} customBackgroundColor={popupColor}/>
                                </View>
                            </View>

                            <View style={{display: "flex", alignItems: "center", justifyContent: "center", flex: 1, marginTop: -20}}>
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

    groupContainer: {
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
  });
  
  export default AddStepBottomScreen;