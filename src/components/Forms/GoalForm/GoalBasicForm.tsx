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
import { Goal, SeriazableGoal } from "../../../types/HabitTypes"
import { FormBasicGoal } from "../../../types/FormGoalTypes"
import React from "react"
import { AddGoalScreenType, getAddGoalStepsDetails } from "../../../constants/BasicConstants"
import { addDays } from "date-fns"
import { convertBackSeriazableGoal } from "../../../primitives/GoalMethods"
import Quoti from "../../Other/Quoti"
import { toISOStringWithoutTimeZone } from "../../../primitives/BasicsMethods"
import { Error_Impact } from "../../../constants/Impacts"

export interface GoalBasicForm {
    goal?: SeriazableGoal,
    handleGoNext: (newValues: FormBasicGoal) => void,
    closeModal?: () => void,
    currentStep?: number,
    totalSteps?: number
}

export const GoalBasicForm: FC<GoalBasicForm> = ({goal, handleGoNext, currentStep, closeModal, totalSteps}) => {

    const startingDateBase = goal ? new Date(goal.startingDate) : new Date()

    const [startingDate, setStartingDate] = useState<Date>(startingDateBase)
    const [endingDate, setEndingDate] = useState<Date | undefined>(undefined)

    const CURRENT_STEP_DETAILS = getAddGoalStepsDetails(AddGoalScreenType.AddBasicGoalDetails)
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
                const detailledGoal: FormBasicGoal = {
                    titre: titre.trim(), 
                    description: description.trim(), 
                    startingDate: toISOStringWithoutTimeZone(startingDate), 
                    endingDate: endingDate ? toISOStringWithoutTimeZone(endingDate) : undefined
                }

                handleGoNext(detailledGoal)
            }

            else {
                setIsTitleWrong(titre.trim().length <= 0)
                setIsDescriptionWrong(description.trim().length <= 0)            
            }
        }
        
        else {
            Error_Impact()
            
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
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}> 
                       { closeModal ?
                         <NavigationButton noPadding methode={closeModal} action={NavigationActions.close}/>
                            :
                         <NavigationButton noPadding action={NavigationActions.goBack}/> 
                        }                       
                        <Quoti/>
                        <NavigationButton noPadding action={NavigationActions.goNext} methode={handleValidation}/>
                    </View>

                    <HugeText text="Nouvel goal"/>

                    <StepIndicator totalSteps={total_steps} currentStep={current_step}/>
                </View>

                <View style={styles.body}>
                    <View style={styles.displayColumn}>
                        <TextInputCustom ref={titreRef} startingValue={goal?.titre}
                            isWrong={isTitleWrong}
                            placeholder={"Nom de l'goal"} labelName={"Titre"} semiBold
                            errorMessage={" "}/>

                        <TextInputCustom ref={descriptionRef} startingValue={goal?.description}
                            isWrong={isDescriptionWrong}
                            placeholder={"Description de l'goal"} labelName={"Description"} semiBold
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
                disablePastDays
                startingDate={startingDate}
                endingDate={endingDate}
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