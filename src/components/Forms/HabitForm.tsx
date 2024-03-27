import { View } from "react-native"
import { TextButton } from "../Buttons/UsualButton"
import { HugeText, SubTitleText } from "../../styles/StyledText"
import Separator from "../Other/Separator"
import { CustomTextInputRefType, TextInputCustom } from "../TextFields/TextInput"
import { CustomScrollView, UsualScreen } from "../View/Views"
import StepIndicator from "../Other/StepIndicator"
import { NavigationButton } from "../Buttons/IconButtons"
import { StyleSheet } from "react-native"
import { FC, useContext, useRef, useState } from "react"
import { AddHabitScreenType, getAddHabitStepsDetails } from "../../constants/BasicConstants"
import ObjectifRadioItem from "../Objectifs/ObjectifRadioItem"
import { HabitsContext } from "../../data/HabitContext"
import { Objectif, SeriazableHabit } from "../../types/HabitTypes"
import { FormBasicHabit } from "../../types/FormHabitTypes"
import React from "react"

export interface HabitFormProps {
    isForModifyingHabit?: boolean,
    isForCreateObjectiveHabit?: boolean,
    closeModal?: () => void,
    baseHabit?: SeriazableHabit,
    handleGoNext: (basicHabit: FormBasicHabit | SeriazableHabit) => void,
    currentStep?: number,
    constObjectifID?: string
}

const HabitForm: FC<HabitFormProps> = ({
    isForModifyingHabit,
    isForCreateObjectiveHabit,
    closeModal,
    baseHabit,
    handleGoNext,
    constObjectifID,
    currentStep = 1,
}) => {

    const {Objectifs} = useContext(HabitsContext)

    const titreRef = useRef<CustomTextInputRefType>(null)
    const descriptionRef = useRef<CustomTextInputRefType>(null)

    const [isTitleWrong, setIsTitleWrong] = useState<boolean>(false)
    const [isDescriptionWrong, setIsDescriptionWrong] = useState<boolean>(false)

    const CURRENT_STEP_DETAILS = getAddHabitStepsDetails(null, AddHabitScreenType.AddBasicDetails)

    const [totalSteps, setTotalSteps] = useState(isForCreateObjectiveHabit ? 2 : CURRENT_STEP_DETAILS.TOTAL_STEPS)

    const [displayedObjectifs, setDisplayedObjectifs] = useState<Objectif[]>(Object.values(Objectifs))

    const [selectedObjectif, setSelectedObjectif] = useState<string | undefined>(constObjectifID ?? ((isForModifyingHabit && baseHabit?.objectifID) ? baseHabit.objectifID : undefined))



    const RenderObjectif = ({item, index}) => {
        const onPress = () => {

            if(!isForModifyingHabit){
                const CURRENT_STEP_DETAILS = getAddHabitStepsDetails(item.objectifID, AddHabitScreenType.AddBasicDetails)
                        
                if(!isForCreateObjectiveHabit){
                    setTotalSteps(CURRENT_STEP_DETAILS.TOTAL_STEPS)
                }
            }

            setSelectedObjectif(item.objectifID)
        }

        return (
            <ObjectifRadioItem onPress={onPress} objectif={item} isPressDisabled={constObjectifID !== undefined}
                        isSelected={selectedObjectif === item.objectifID}/>
        )
    }

    const handleDissocier = () => {
        const CURRENT_STEP_DETAILS = getAddHabitStepsDetails(null, AddHabitScreenType.AddBasicDetails)
        setTotalSteps(CURRENT_STEP_DETAILS.TOTAL_STEPS)

        setSelectedObjectif(undefined)
    }

    const handleValidation = () => {
        let canGoNext = true

        const titre = titreRef.current?.getValue();
        const description = descriptionRef.current?.getValue();
        if(titre && description){
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
                const newValues: FormBasicHabit = {titre, description, objectifID: selectedObjectif}

                handleGoNext(newValues)
            }
        }
    }

    return(
        <UsualScreen hideMenu>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        {(isForCreateObjectiveHabit || isForModifyingHabit) && closeModal ?
                            <NavigationButton noPadding methode={closeModal} action={"close"}/>
                            :
                            <NavigationButton noPadding action={"goBack"}/>
                        }
                        <NavigationButton noPadding action={"goNext"} methode={handleValidation}/>
                    </View>

                    <HugeText text="Nouvelle habitude"/>

                    <StepIndicator totalSteps={totalSteps} currentStep={currentStep}/>
                </View>

                <CustomScrollView>
                    <View style={styles.body}>

                        <View style={{display: "flex", flexDirection: "column", gap: 20,
                                    justifyContent: "center"}}>

                            <View style={styles.subBody}>
                                <TextInputCustom startingValue={baseHabit ? baseHabit.titre : ""} semiBold ref={titreRef} labelName={"Titre"} placeholder={"Entrez un titre"} isWrong={isTitleWrong}/>
                                <TextInputCustom startingValue={baseHabit ? baseHabit.description : ""} semiBold ref={descriptionRef} labelName={"Description"} placeholder={"Entrez une courte description"} isWrong={isDescriptionWrong}/>
                            </View>

                            <Separator/>

                            <View style={{ marginLeft: 5, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                <SubTitleText text={"Objectif"}/>
                                <TextButton text={"Dissocier"} semiBold noPadding onPress={handleDissocier}/>
                            </View>

                            <View style={{display: "flex", flexDirection: "column", gap: 20}}>
                                {
                                    displayedObjectifs.map((obj, index) => (
                                        <RenderObjectif key={index} item={obj} index={index}/>
                                    )) 
                                }
                            </View>             
                        </View>
                    </View>
                </CustomScrollView>
            </View>
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
        gap: 30,
        justifyContent: "center"
    },

    subBody: {
        flex: 1, 
        gap: 30,
    },  

    carouselContainer: {
        flex:1, 
        marginTop: 10,
        gap: 10
    },

    footer: {
    }
})

export default HabitForm