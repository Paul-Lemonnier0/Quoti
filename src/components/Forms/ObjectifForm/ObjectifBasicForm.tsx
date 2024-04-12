import { View } from "moti"
import { UsualScreen } from "../../View/Views"
import { NavigationActions, NavigationButton } from "../../Buttons/IconButtons"
import { HugeText } from "../../../styles/StyledText"
import StepIndicator from "../../Other/StepIndicator"
import { CustomTextInputRefType, TextInputCustom } from "../../TextFields/TextInput"
import Separator from "../../Other/Separator"
import { MultiDatePicker } from "../../TextFields/DatePicker"
import { StyleSheet } from "react-native"
import SelectMultipleDateBottomScreen from "../../../screens/BottomScreens/SelectMultipleDateBottomScreen"
import { FC, useCallback, useRef, useState } from "react"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { Objectif, SeriazableObjectif } from "../../../types/HabitTypes"
import { FormBasicObjectif } from "../../../types/FormObjectifTypes"
import React from "react"
import { AddObjectifScreenType, getAddObjectifStepsDetails } from "../../../constants/BasicConstants"
import { addDays } from "date-fns"
import { convertBackSeriazableObjectif } from "../../../primitives/ObjectifMethods"
import Quoti from "../../Other/Quoti"

export interface ObjectifBasicForm {
    objectif?: SeriazableObjectif,
    handleGoNext: (newValues: FormBasicObjectif) => void,
    closeModal?: () => void,
    currentStep?: number,
    totalSteps?: number
}

export const ObjectifBasicForm: FC<ObjectifBasicForm> = ({objectif, handleGoNext, currentStep, closeModal, totalSteps}) => {

    const startingDateBase = objectif ? new Date(objectif.startingDate) : new Date()
    const endingDateBase = objectif ? new Date(objectif.startingDate) : addDays(new Date(), 14)

    const [startingDate, setStartingDate] = useState<Date>(startingDateBase)
    const [endingDate, setEndingDate] = useState<Date>(endingDateBase)

    const CURRENT_STEP_DETAILS = getAddObjectifStepsDetails(AddObjectifScreenType.AddBasicObjectifDetails)
    const total_steps = totalSteps ?? CURRENT_STEP_DETAILS.TOTAL_STEPS
    const current_step = currentStep ?? CURRENT_STEP_DETAILS.CURRENT_STEP

    let titreRef = useRef<CustomTextInputRefType>(null)
    let descriptionRef = useRef<CustomTextInputRefType>(null)

    const [isTitleWrong, setIsTitleWrong] = useState(false)
    const [isDescriptionWrong, setIsDescriptionWrong] = useState(false)

    const handleValidation = () => {
        let canGoNext = true

        const titre = titreRef.current?.getValue();
        const description = descriptionRef.current?.getValue();
        if(titre && description){
            if(titre.trim().length > 0 && description.trim().length > 0)
            {    
                const detailledObjectif: FormBasicObjectif = {
                    titre, 
                    description, 
                    startingDate: startingDate.toISOString(), 
                    endingDate: endingDate.toISOString()
                }

                handleGoNext(detailledObjectif)
            }

            else {
                setIsTitleWrong(titre.trim().length <= 0)
                setIsDescriptionWrong(description.trim().length <= 0)            
            }
        }
        
        else {
            setIsTitleWrong(!titre)
            setIsDescriptionWrong(!description)
        }
    }

    const bottomSheetModalRef_Calendar = useRef<BottomSheetModal>(null);
  
    const handleOpenCalendar = useCallback(() => {
          bottomSheetModalRef_Calendar.current?.present();
      }, []);

    return(
        <UsualScreen hideMenu>
            <View style={styles.container}>

                <View style={styles.header}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}> 
                       { closeModal ?
                         <NavigationButton noPadding methode={closeModal} action={NavigationActions.close}/>
                            :
                         <NavigationButton noPadding action={NavigationActions.goBack}/> 
                        }                       
                        <Quoti/>
                        <NavigationButton noPadding action={NavigationActions.goNext} methode={handleValidation}/>
                    </View>

                    <HugeText text="Nouvel objectif"/>

                    <StepIndicator totalSteps={total_steps} currentStep={current_step}/>
                </View>

                <View style={styles.body}>
                    <View style={styles.displayColumn}>
                        <TextInputCustom ref={titreRef} startingValue={objectif?.titre}
                            isWrong={isTitleWrong}
                            placeholder={"Nom de l'objectif"} labelName={"Titre"} semiBold
                            errorMessage={" "}/>

                        <TextInputCustom ref={descriptionRef} startingValue={objectif?.description}
                            isWrong={isDescriptionWrong}
                            placeholder={"Description de l'objectif"} labelName={"Description"} semiBold
                            errorMessage={" "}/>
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
                setStartingDate={setStartingDate}
                setEndingDate={setEndingDate}
                bottomSheetModalRef={bottomSheetModalRef_Calendar} 
            />

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