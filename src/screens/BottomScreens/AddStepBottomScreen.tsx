import { View, StyleSheet } from "react-native"
import { TitleText, SubTitleText } from "../../styles/StyledText"
import React, { Dispatch, FC, RefObject, useMemo, useState } from "react"
import { Feather } from "@expo/vector-icons"
import { useThemeColor } from "../../components/Themed"
import CustomBottomSheet from "../../components/BottomSheets/CustomBottomSheet"
import { BottomTextInputCustom, CustomTextInputRefType } from "../../components/TextFields/TextInput"
import { IncrementTime } from "../../components/Buttons/IncrementButtons"
import { TextButton } from "../../components/Buttons/UsualButton"
import { Keyboard } from "react-native"
import { TouchableWithoutFeedback } from "react-native"
import { useRef } from "react"
import { CloseButton } from "../../components/Buttons/IconButtons"
import Separator from "../../components/Other/Separator"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { Step } from "../../types/HabitTypes"
import { FormStep } from "../../types/FormHabitTypes"

export interface AddStepBottomScreenProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    setSteps: Dispatch<React.SetStateAction<FormStep[]>>,
    noBackdrop?: boolean
}

const AddStepBottomScreen: FC<AddStepBottomScreenProps> = ({bottomSheetModalRef, setSteps, noBackdrop}) => {

    const snapPoints = useMemo(() => ['85%'], [])

    const popupColor = useThemeColor({}, "Popup")

    let titreRef = useRef<CustomTextInputRefType>(null)
    let descriptionRef = useRef<CustomTextInputRefType>(null)

    const [isTitleWrong, setIsTitleWrong] = useState<boolean>(false)
    const [isDescriptionWrong, setIsDescriptionWrong] = useState<boolean>(false)

    const [hourDuration, setHourDuration] = useState<number>(0)
    const [minutesDuration, setMinutesDuration] = useState<number>(0)


    const clearAll = () => {
        setIsTitleWrong(false)
        setIsDescriptionWrong(false)
        setHourDuration(0)
        setMinutesDuration(0)
    }

    const handleValidate = () => {

        let canClose = true

        let titre = titreRef.current?.getValue();
        let description = descriptionRef.current?.getValue();

        if(titre && description){
            if(titre.trim().length <= 0 || description.trim().length <= 0) 
            {
                setIsDescriptionWrong(description.trim().length <= 0)
                setIsTitleWrong(titre.trim().length <= 0)
    
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
                    ([...previousSteps, newStep] as FormStep[]))
    
                clearAll()
                closeModal()  
            }
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
            <CustomBottomSheet bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints} noBackdrop={noBackdrop}>
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