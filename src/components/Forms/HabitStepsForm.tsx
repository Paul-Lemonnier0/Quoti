import { FC, useCallback, useMemo, useRef, useState } from "react";
import { generateUniqueID } from "../../primitives/BasicsMethods";
import { AddHabitScreenType, getAddHabitStepsDetails } from "../../constants/BasicConstants";
import { Image, View } from "react-native";
import { HugeText, NormalText, SubTitleText, TitleText } from "../../styles/StyledText";
import IllustrationsList, { IllustrationsType } from "../../data/IllustrationsList";
import { CustomScrollView, UsualScreen } from "../View/Views";
import StepsList from "../Habitudes/Step/StepsList";
import { NavigationButton } from "../Buttons/IconButtons";
import StepIndicator from "../Other/StepIndicator";
import { TextButton } from "../Buttons/UsualButton";
import AddStepBottomScreen from "../../screens/BottomScreens/AddStepBottomScreen";
import { StyleSheet } from "react-native";
import { FormIconedHabit, FormStep, FormStepsHabitValues } from "../../types/FormHabitTypes";
import { SeriazableHabit, Step } from "../../types/HabitTypes";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React from "react"

export interface HabitStepsForm {
    isForModifyingHabit?: boolean,
    isNewObjectifHabit?: boolean,
    habit: FormIconedHabit | SeriazableHabit,
    handleGoNext: (coloredHabit: FormStepsHabitValues) => void,
}

const HabitStepsForm: FC<HabitStepsForm> = ({
    isNewObjectifHabit,
    isForModifyingHabit,
    habit,
    handleGoNext,
}) =>  {

    const baseHabitID = "habitID" in habit ? (habit as SeriazableHabit).habitID : ""
    const baseSteps = "steps" in habit ? Object.values((habit as SeriazableHabit).steps) : []

    const isStepPlaceholder = baseSteps.length === 1 && baseSteps[0].stepID === baseHabitID 

    const [steps, setSteps] = useState<(FormStep | Step)[]>(isStepPlaceholder ? [] : baseSteps)

    const bottomSheetModalRefAddStep = useRef<BottomSheetModal>(null);

    const handleOpenAddStep = useCallback(() => {
        bottomSheetModalRefAddStep.current?.present();
      }, []);

    const handleValidation = () => {

        const newValues: FormStepsHabitValues = {
            steps: []
        }

        if(steps.length === 0){
            newValues.steps = [{numero: -1}]
        }

        else {
            const stepsWithID = steps.map(step => {
                if(!step.hasOwnProperty("stepID")){
                    return {...step, stepID: generateUniqueID()}
                }

                return {...step}
            })

            newValues.steps = stepsWithID
        }

        handleGoNext(newValues)
    }

    const CURRENT_STEP_DETAILS = getAddHabitStepsDetails((isForModifyingHabit && !isNewObjectifHabit) ? null : habit.objectifID ?? null, AddHabitScreenType.AddHabitSteps)

    const totalSteps = CURRENT_STEP_DETAILS.TOTAL_STEPS
    const currentStep = CURRENT_STEP_DETAILS.CURRENT_STEP

    const handleAddStep = () => {
        handleOpenAddStep()
    }

    const NoStepScreen = () => {
        return(
            <View style={{flex: 1, flexGrow: 1}}>
                <View style={styles.emptySreenContainer}>

                    <Image style={styles.emptyScreenImageContainer} source={IllustrationsList[IllustrationsType.Education]}/>

                    <View style={styles.emptyScreenSubContainer}>
                        <NormalText text={"Pour plus d'efficacité"}/>
                        <SubTitleText text={"Décomposez votre habitude"}/>
                    </View>
                </View>
            </View>
        )
    }

    const StepScreen = () => {
        return(
            <CustomScrollView>
                <StepsList steps={steps} editable color={habit.color} setSteps={setSteps}/>
            </CustomScrollView>
        )
    }

    return(
        <UsualScreen hideMenu>
            <View style={styles.container}>

                <View style={styles.header}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <NavigationButton noPadding action={"goBack"}/>
                        <NavigationButton noPadding action={"goNext"} methode={handleValidation}/>
                    </View>            

                    
                    <HugeText text="Décomposez"/>

                    <StepIndicator totalSteps={totalSteps} currentStep={currentStep}/>
                    
                </View>



                    <View style={styles.body}>
                        <View style={{ marginLeft: 0, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                            <TitleText text={"Etapes"}/>
                            <TextButton text={"Ajouter"} semiBold noPadding onPress={handleAddStep}/>
                        </View>
                        
                        {
                        steps.length === 0 ? 
                            <NoStepScreen/>
                            :
                            <StepScreen/>
                        }

                    </View>
                    

                    <AddStepBottomScreen
                        bottomSheetModalRef={bottomSheetModalRefAddStep}
                        setSteps={setSteps}/>

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
        marginBottom: 10
    },

    body: {
        flex: 1, 
        gap: 30,
        justifyContent: "center"
    },

    header: {
        display: "flex", 
        flexDirection: "column", 
        gap: 30
    },

    footer:{

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
        width: "90%", 
        maxHeight: "60%",
    },

    emptyScreenSubContainer: {
        justifyContent: "space-evenly", 
        alignItems: "center",
        gap: 5
    },
})

export default HabitStepsForm