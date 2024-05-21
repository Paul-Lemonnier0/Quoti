import { FlatList, Image, View } from "react-native"
import { TextButton } from "../Buttons/UsualButton"
import { HugeText, SubTitleText } from "../../styles/StyledText"
import Separator from "../Other/Separator"
import { CustomTextInputRefType, TextInputCustom } from "../TextFields/TextInput"
import { CustomScrollView, UsualScreen } from "../View/Views"
import StepIndicator from "../Other/StepIndicator"
import { NavigationActions, NavigationButton } from "../Buttons/IconButtons"
import { StyleSheet } from "react-native"
import { FC, useCallback, useContext, useRef, useState } from "react"
import { AddHabitScreenType, getAddHabitStepsDetails } from "../../constants/BasicConstants"
import GoalRadioItem from "../Goals/GoalRadioItem"
import { HabitsContext } from "../../data/HabitContext"
import { Goal, SeriazableHabit } from "../../types/HabitTypes"
import { FormBasicHabit, FormDetailledGoalHabit } from "../../types/FormHabitTypes"
import React from "react"
import IllustrationsList, { IllustrationsType } from "../../data/IllustrationsList"
import Quoti from "../Other/Quoti"
import { isTextInputValueValid, toISOStringWithoutTimeZone } from "../../primitives/BasicsMethods"
import { AppContext } from "../../data/AppContext"
import { useThemeColor } from "../Themed"
import { BottomScreenOpen_Impact, Error_Impact } from "../../constants/Impacts"
import { DatePicker } from "../TextFields/DatePicker"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import SelectDateBottomScreen from "../../screens/BottomScreens/SelectDateBottomScreen"

export interface HabitFormProps {
    isForModifyingHabit?: boolean,
    isForCreateObjectiveHabit?: boolean,
    closeModal?: () => void,
    baseHabit?: (SeriazableHabit | FormDetailledGoalHabit),
    handleGoNext: (basicHabit: FormBasicHabit | (SeriazableHabit | FormDetailledGoalHabit)) => void,
    currentStep?: number,
    constGoalID?: string
}

const HabitForm: FC<HabitFormProps> = ({
    isForModifyingHabit,
    isForCreateObjectiveHabit,
    closeModal,
    baseHabit,
    handleGoNext,
    constGoalID,
    currentStep = 1,
}) => {
    const {theme} = useContext(AppContext)
    const fontGray = useThemeColor(theme, "FontGray")

    const {Goals} = useContext(HabitsContext)

    const titreRef = useRef<CustomTextInputRefType>(null)
    const descriptionRef = useRef<CustomTextInputRefType>(null)

    const [isTitleWrong, setIsTitleWrong] = useState<boolean>(false)
    const [isDescriptionWrong, setIsDescriptionWrong] = useState<boolean>(false)

    const CURRENT_STEP_DETAILS = getAddHabitStepsDetails(null, AddHabitScreenType.AddBasicDetails)

    const baseTotalSteps = (baseHabit || isForCreateObjectiveHabit) ? CURRENT_STEP_DETAILS.TOTAL_STEPS - 1 : CURRENT_STEP_DETAILS.TOTAL_STEPS
    const [totalSteps, setTotalSteps] = useState(baseTotalSteps)

    const [displayedGoals, setDisplayedGoals] = useState<Goal[]>(Object.values(Goals))

    const [selectedGoal, setSelectedGoal] = useState<string | undefined>(constGoalID ?? ((isForModifyingHabit && baseHabit?.goalID) ? baseHabit.goalID : undefined))



    const RenderGoal = ({item, index}) => {
        const onPress = () => {
            BottomScreenOpen_Impact()

            if(!isForModifyingHabit){
                const CURRENT_STEP_DETAILS = getAddHabitStepsDetails(item.goalID, AddHabitScreenType.AddBasicDetails)
                        
                if(!isForCreateObjectiveHabit){
                    setTotalSteps(CURRENT_STEP_DETAILS.TOTAL_STEPS)
                }
            }

            setSelectedGoal(item.goalID)
        }

        return (
            <GoalRadioItem 
                onPress={onPress} goal={item} isPressDisabled={constGoalID !== undefined}
                isSelected={selectedGoal === item.goalID}/>
        )
    }

    const handleDissocier = () => {
        const CURRENT_STEP_DETAILS = getAddHabitStepsDetails(null, AddHabitScreenType.AddBasicDetails)
        setTotalSteps(CURRENT_STEP_DETAILS.TOTAL_STEPS)

        setSelectedGoal(undefined)
    }

    const handleValidation = () => {
        const titre = titreRef.current?.getValue();
        const description = descriptionRef.current?.getValue();
        if(titre && description && isTextInputValueValid(titre) && isTextInputValueValid(description)){
            const newValues: FormBasicHabit = {
                titre: titre.trim(), 
                description: description.trim(),
                goalID: selectedGoal,
                startingDate: toISOStringWithoutTimeZone(startingDate)
            }

            handleGoNext(newValues)

            setIsTitleWrong(false)
            setIsDescriptionWrong(false)
        }
        
        else {
            Error_Impact()

            setIsTitleWrong(!isTextInputValueValid(titre))
            setIsDescriptionWrong(!isTextInputValueValid(description))
        }
    }

    const NoGoalScreen = () => {
        return(
            <View style={{flex: 1, flexGrow: 1, marginBottom: 0}}>
                <View style={[styles.emptySreenContainer, {justifyContent: "space-evenly"}]}>
                    <Image style={styles.emptyScreenImageContainer} source={IllustrationsList[IllustrationsType.Creative]}/>
                </View>
            </View>
        )
    }

    const [startingDate, setStartingDate] = useState<Date>(baseHabit?.startingDate ? new Date(baseHabit?.startingDate) : new Date())

    const bottomSheetModalRef_Calendar = useRef<BottomSheetModal>(null);
  
    const handleOpenCalendar = useCallback(() => {
        BottomScreenOpen_Impact()
        bottomSheetModalRef_Calendar.current?.present();
    }, []);

    const isNotYetStartingDate = 
        baseHabit && baseHabit.startingDate && 
        new Date(baseHabit.startingDate).setHours(0,0,0,0) > new Date().setHours(0,0,0,0)

    return(
        <UsualScreen hideMenu>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        {(isForCreateObjectiveHabit || isForModifyingHabit) && closeModal ?
                            <NavigationButton noPadding methode={closeModal} action={NavigationActions.close}/>
                            :
                            <NavigationButton noPadding action={NavigationActions.goBack}/>
                        }
                        <Quoti/>
                        <NavigationButton noPadding action={NavigationActions.goNext} methode={handleValidation}/>
                    </View>

                    <HugeText text={baseHabit ? "Modifier cette habitude" : "Nouvelle habitude"}/>

                    <StepIndicator totalSteps={totalSteps} currentStep={currentStep}/>
                </View>

                <CustomScrollView>
                    <View style={styles.body}>

                        <View style={{display: "flex", flexDirection: "column", gap: 20,
                                    justifyContent: "center", flex: 1}}>

                            <View style={styles.subBody}>
                                <TextInputCustom startingValue={baseHabit ? baseHabit.titre : ""} semiBold ref={titreRef} labelName={"Titre"} placeholder={"Entrez un titre"} isWrong={isTitleWrong}/>
                                <TextInputCustom startingValue={baseHabit ? baseHabit.description : ""} semiBold ref={descriptionRef} labelName={"Description"} placeholder={"Entrez une courte description"} isWrong={isDescriptionWrong}/>
                            </View>
                            
                            {
                                isNotYetStartingDate &&
                                <>
                                    <View style={{marginTop: 20, marginBottom: 10}}>
                                        <Separator/>
                                    </View>

                                    <View style={[styles.displayColumn, {alignItems: "center", marginTop: 10}]}>
                                        <DatePicker label={"Date de début"} semiBoldLabel
                                            date={startingDate}
                                            onPress={handleOpenCalendar}/>
                                    </View>
                                </>
                            }
                            {
                                 !isForCreateObjectiveHabit &&
                                 <>
                                    <View style={{marginTop: 20, marginBottom: 20}}>
                                        <Separator/>
                                    </View>
                                    <View style={{ marginLeft: 5, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <SubTitleText text={"Goal"}/>
                                        <TextButton isGray text={"Dissocier"} disabled={constGoalID !== undefined} semiBold noPadding onPress={handleDissocier}/>
                                    </View>
                                </>
                            }
                            
                            {
                                displayedGoals.length === 0 ?
                                <NoGoalScreen/>
                                
                                :

                                !isForCreateObjectiveHabit &&
                                <View style={{flex: 1, marginBottom: -35}}>
                                    <View style={{display: "flex", flexDirection: "column", gap: 20, flex: 1}}>
                                        <FlatList
                                            scrollEnabled={false}
                                            data={displayedGoals}
                                            style={{margin: -20}}
                                            contentContainerStyle={{gap: 10, padding: 20, paddingBottom: 60}}
                                            renderItem={({item, index}) => <RenderGoal key={index} item={item} index={index}/>}
                                        />
                                    </View> 
                                </View>
                            }
                        </View>
                    </View>
                </CustomScrollView>
            </View>

                        
            <SelectDateBottomScreen
                disabledPastDays
                selectedDate={startingDate}
                setSelectedDate={setStartingDate}
                bottomSheetModalRef={bottomSheetModalRef_Calendar} 
            />
        </UsualScreen>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex", 
        flexDirection: "column", 
        gap: 20, 
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
        gap: 30,
        marginTop: 10,
        justifyContent: "center",
    },

    subBody: {
        flex: 1, 
        gap: 30,
        justifyContent: "center"
    },  

    emptySreenContainer: {
        flex: 1, 
        flexGrow: 1, 
        alignItems: "center", 
        justifyContent: "center",
        gap: 20, 

    },
    
    emptyScreenImageContainer: {
        resizeMode: 'contain', 
        width: "75%", 
        maxHeight: "75%",
    },

    
    displayColumn: {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center",
        gap: 10
    },
})

export default HabitForm