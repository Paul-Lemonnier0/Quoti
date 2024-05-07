import { View, StyleSheet } from "react-native"
import { SubTitleText, HugeText } from "../../styles/StyledText"
import React, { Dispatch, FC, RefObject, useMemo, useState } from "react"
import { CustomTextInputRefType, TextInputCustom } from "../../components/TextFields/TextInput"
import { IncrementTime } from "../../components/Buttons/IncrementButtons"
import { TextButton } from "../../components/Buttons/UsualButton"
import { Keyboard } from "react-native"
import { TouchableWithoutFeedback } from "react-native"
import { useRef } from "react"
import { NavigationActions, NavigationButton } from "../../components/Buttons/IconButtons"
import Separator from "../../components/Other/Separator"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { PrioritesType, Step } from "../../types/HabitTypes"
import { FormFullStep, FormStep } from "../../types/FormHabitTypes"
import { generateUniqueID, getHoursFromDuration, getMinutesFromDuration } from "../../primitives/BasicsMethods"
import SimpleFullBottomSheet from "../../components/BottomSheets/SimpleFullBottomSheet"
import { UsualScreen } from "../../components/View/Views"
import { PriorityRadioButtons } from "../../components/Priority/PriotityIndicator"
import Quoti from "../../components/Other/Quoti"
import { BottomScreenOpen_Impact, Error_Impact } from "../../constants/Impacts"

export interface AddStepBottomScreenProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    setSteps: Dispatch<React.SetStateAction<(FormStep | Step)[]>>,
    baseStep?: Step | FormFullStep
}

const AddStepBottomScreen: FC<AddStepBottomScreenProps> = ({bottomSheetModalRef, setSteps, baseStep}) => {

    let titreRef = useRef<CustomTextInputRefType>(null)
    let descriptionRef = useRef<CustomTextInputRefType>(null)

    const [isTitleWrong, setIsTitleWrong] = useState<boolean>(false)
    const [isDescriptionWrong, setIsDescriptionWrong] = useState<boolean>(false)


    const [hourDuration, setHourDuration] = useState<number>(baseStep?.duration ? getHoursFromDuration(baseStep.duration) : 0)
    const [minutesDuration, setMinutesDuration] = useState<number>(baseStep?.duration ? getMinutesFromDuration(baseStep.duration) : 0)

    const [selectedPriority, setSelectedPriority] = useState<PrioritesType>(baseStep?.priority ?? PrioritesType.None)

    const clearAll = () => {
        setIsTitleWrong(false)
        setIsDescriptionWrong(false)
        setHourDuration(0)
        setMinutesDuration(0)
    }

    const handleValidate = () => {

        let titre = titreRef.current?.getValue();
        let description = descriptionRef.current?.getValue();

        if(titre && description){
            if(titre.trim().length > 0 && description.trim().length > 0) 
            {
                const stepDuration = hourDuration !== 0 || minutesDuration !== 0 ? hourDuration * 60 + minutesDuration : null
                const stepID = baseStep?.stepID ?? generateUniqueID()

                const newStep = {
                    titre: titre,
                    description: description,
                    duration: stepDuration,
                    priority: selectedPriority,
                    stepID
                }
                
                if (baseStep) {
                    setSteps((previousSteps) => (previousSteps.map((step) => {
                        if ("stepID" in step) {
                            return step.stepID === baseStep.stepID ? newStep : step;
                        }
                
                        return step;
                    }) as FormStep[]));
                }
                
                else setSteps((previousSteps) => ([...previousSteps, {...newStep, numero: previousSteps.length}] as FormStep[]))

                clearAll()
                BottomScreenOpen_Impact()
                closeModal() 
            }

            else {
                setIsDescriptionWrong(description.trim().length <= 0)
                setIsTitleWrong(titre.trim().length <= 0)
            }
        }

        else {
            Error_Impact()
            setIsTitleWrong(!titre)
            setIsDescriptionWrong(!description)
        }
    }
  
    const closeModal = () => {
        clearAll()

        BottomScreenOpen_Impact()
        bottomSheetModalRef.current?.close();
    }

    const handleSetNoDuration = () => {
        BottomScreenOpen_Impact()
        setHourDuration(0)
        setMinutesDuration(0)
    }

    return (
            <SimpleFullBottomSheet 
                footerMethod={handleValidate}
                footerText="Ajouter"
                bottomSheetModalRef={bottomSheetModalRef} isPrimary>
                <UsualScreen hideMenu>    
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{flex: 1}}>

                        <View style={styles.contentContainer}>
                            <View style={styles.header}>
                                <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                                    <NavigationButton noPadding methode={closeModal} action={NavigationActions.close}/>
                                    <Quoti/>
                                    <NavigationButton noPadding action={NavigationActions.validation} methode={handleValidate}/>
                                </View>

                                <HugeText text={baseStep ? "Modifier cette étape" : "Nouvelle étape"}/>

                            </View>
                            
                            <View style={styles.body}>

                                <View style={styles.subBodyContainer}>
                                    <TextInputCustom startingValue={baseStep?.titre} semiBold ref={titreRef} labelName={"Titre"} placeholder={"Entrez un titre"} isWrong={isTitleWrong}/>
                                    <TextInputCustom startingValue={baseStep?.description} semiBold ref={descriptionRef} labelName={"Description"} placeholder={"Entrez une courte description"} isWrong={isDescriptionWrong}/>
                                </View>

                                <Separator/>

                                <View style={styles.subBody}>
                                    <View style={styles.subBodyContainer}>
                                        <View style={{ marginLeft: 5, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                            <SubTitleText text={"Durée"}/>
                                            <TextButton isGray text={"Aucune"} semiBold noPadding onPress={handleSetNoDuration}/>
                                        </View>

                                        <View style={styles.listContainer}>
                                            <IncrementTime value={hourDuration} isBorderHidden={hourDuration === 0} setValue={setHourDuration}/>
                                            <IncrementTime value={minutesDuration} isBorderHidden={minutesDuration === 0} setValue={setMinutesDuration} isMinutes/>
                                        </View>
                                    </View>

                                    <View style={styles.subBodyContainer}>
                                        <View style={{ marginLeft: 5, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                            <SubTitleText text={"Priorité"}/>
                                            <TextButton isGray text={"Aucune"} semiBold noPadding onPress={() => setSelectedPriority(PrioritesType.None)}/>
                                        </View>

                                        <View style={styles.listContainer}>
                                            <PriorityRadioButtons selectedPriority={selectedPriority} setSelectedPriority={setSelectedPriority}/>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </UsualScreen>
        </SimpleFullBottomSheet>
    );
  };
  
  const styles = StyleSheet.create({

    contentContainer: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        gap: 30,
        marginBottom: 60,
    },

    header: {
        display: "flex", 
        flexDirection: "column", 
        gap: 30
    },

    body: {
        display: "flex", 
        flexDirection: "column", 
        flex: 1, 
        gap: 30
    },

    subBody: {
        display: "flex", 
        flexDirection: "column", 
        flex: 1, 
        gap: 15
    },

    subBodyContainer: {
        display: 'flex', 
        flexDirection: "column",
        justifyContent: "center",
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