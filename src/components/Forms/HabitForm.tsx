import { FlatList, Image, View } from "react-native"
import { TextButton } from "../Buttons/UsualButton"
import { HugeText, NormalText, SubTitleText } from "../../styles/StyledText"
import Separator from "../Other/Separator"
import { CustomTextInputRefType, TextInputCustom } from "../TextFields/TextInput"
import { CustomScrollView, UsualScreen } from "../View/Views"
import StepIndicator from "../Other/StepIndicator"
import { NavigationActions, NavigationButton } from "../Buttons/IconButtons"
import { StyleSheet } from "react-native"
import { FC, useContext, useRef, useState } from "react"
import { AddHabitScreenType, getAddHabitStepsDetails } from "../../constants/BasicConstants"
import ObjectifRadioItem from "../Objectifs/ObjectifRadioItem"
import { HabitsContext } from "../../data/HabitContext"
import { Objectif, SeriazableHabit } from "../../types/HabitTypes"
import { FormBasicHabit, FormDetailledObjectifHabit } from "../../types/FormHabitTypes"
import React from "react"
import IllustrationsList, { IllustrationsType } from "../../data/IllustrationsList"
import Quoti from "../Other/Quoti"
import { isTextInputValueValid } from "../../primitives/BasicsMethods"

export interface HabitFormProps {
    isForModifyingHabit?: boolean,
    isForCreateObjectiveHabit?: boolean,
    closeModal?: () => void,
    baseHabit?: (SeriazableHabit | FormDetailledObjectifHabit),
    handleGoNext: (basicHabit: FormBasicHabit | (SeriazableHabit | FormDetailledObjectifHabit)) => void,
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

    const baseTotalSteps = (baseHabit || isForCreateObjectiveHabit) ? CURRENT_STEP_DETAILS.TOTAL_STEPS - 1 : CURRENT_STEP_DETAILS.TOTAL_STEPS
    const [totalSteps, setTotalSteps] = useState(baseTotalSteps)

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
        if(titre && description && isTextInputValueValid(titre) && isTextInputValueValid(description)){
            const newValues: FormBasicHabit = {titre, description, objectifID: selectedObjectif}

            handleGoNext(newValues)
        }
        
        else {
            setIsTitleWrong(!isTextInputValueValid(titre))
            setIsDescriptionWrong(!isTextInputValueValid(description))
        }
    }

    const NoObjectifScreen = () => {
        return(
            <View style={{flex: 1, flexGrow: 1, marginBottom: 0}}>
                <View style={[styles.emptySreenContainer, {justifyContent: "space-evenly"}]}>
                    <Image style={styles.emptyScreenImageContainer} source={IllustrationsList[IllustrationsType.Creative]}/>
                </View>
            </View>
        )
    }

    return(
        <UsualScreen hideMenu>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
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

                <View style={styles.body}>

                    <View style={{display: "flex", flexDirection: "column", gap: 20,
                                justifyContent: "center", flex: 1}}>

                        <View style={styles.subBody}>
                            <TextInputCustom startingValue={baseHabit ? baseHabit.titre : ""} semiBold ref={titreRef} labelName={"Titre"} placeholder={"Entrez un titre"} isWrong={isTitleWrong}/>
                            <TextInputCustom startingValue={baseHabit ? baseHabit.description : ""} semiBold ref={descriptionRef} labelName={"Description"} placeholder={"Entrez une courte description"} isWrong={isDescriptionWrong}/>
                        </View>

                        <View style={{marginTop: -30, marginBottom: 20}}>
                            <Separator/>
                        </View>

                        <View style={{ marginLeft: 5, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                            <SubTitleText text={"Objectif"}/>
                            <TextButton text={"Dissocier"} disabled={constObjectifID !== undefined} semiBold noPadding onPress={handleDissocier}/>
                        </View>

                        {
                            displayedObjectifs.length === 0 ?
                            <NoObjectifScreen/>
                            
                            :
                            
                            <View style={{flex: 1, marginBottom: -35}}>
                                <View style={{display: "flex", flexDirection: "column", gap: 20, flex: 1}}>
                                    <CustomScrollView>
                                        <View style={{gap: 10, marginBottom: 40}}>
                                        {
                                            displayedObjectifs.map((obj, index) => <RenderObjectif key={index} item={obj} index={index}/>)
                                        }
                                        </View>
                                    </CustomScrollView>
                                </View> 
                            </View>
                        }
                    </View>
                </View>
            </View>
        </UsualScreen>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex", 
        flexDirection: "column", 
        gap: 0, 
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
})

export default HabitForm