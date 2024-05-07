import { StyleSheet, View } from "react-native"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import React, { FC, RefObject } from "react"
import { FormFullStep, FormStep } from "../../../../types/FormHabitTypes"
import { Step } from "../../../../types/HabitTypes"
import { NormalGrayText, NormalText, SubTitleText, TitleText } from "../../../../styles/StyledText"
import CustomBottomSheet from "../../../../components/BottomSheets/CustomBottomSheet"
import CustomCheckBox from "../../../../components/CheckBox/CustomCheckBox"
import Separator from "../../../../components/Other/Separator"
import { durationToTimeString } from "../../../../primitives/BasicsMethods"
import PriorityIndicator from "../../../../components/Priority/PriotityIndicator"

export interface StepDetailsBottomScreenProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    step: (Step | FormStep),
    color: string,
    checkStep?: () => void,
    isChecked?: boolean,
    areAllStepsChecked?: boolean,
    disabled?: boolean
}

const StepDetailsBottomScreen: FC<StepDetailsBottomScreenProps> = ({
    bottomSheetModalRef,
    step,
    color,
    checkStep,
    isChecked,
    areAllStepsChecked,
    disabled
}) => {

    const convertedStep = (step as Step | FormFullStep)

    const checkStatement = (convertedStep as Step).isChecked ? 
       ( areAllStepsChecked ? "Terminer" : "Décocher l'étape")
       : "Valider l'étape"


    const closeModal = () => {
        bottomSheetModalRef.current?.close()
    }

    let duration = "--"
    if(convertedStep.duration != undefined) duration = durationToTimeString(convertedStep.duration)

    return(

        <CustomBottomSheet 
            footerText={checkStep ? checkStatement : undefined}
            footerMethod={(disabled || areAllStepsChecked) ? closeModal : checkStep}
            bottomSheetModalRef={bottomSheetModalRef}>
            <View style={styles.container}>
                <View style={{flex: 1, gap: 30, marginVertical: 30}}>
                    <View style={{flex: 1, gap: 20, flexDirection: "row"}}>
                        <CustomCheckBox onPress={checkStep} isPrimary isChecked={isChecked} disabled={(disabled || areAllStepsChecked)} color={color} number={step.numero+1}/>
                        <View style={{gap: 5, flex: 1}}>
                            <TitleText text={convertedStep.titre}/>

                            <NormalGrayText bold text={convertedStep.description}/>
                        </View>
                    </View>

                    <Separator/>

                    <View style={styles.sectionContainer}>
                        <SubTitleText text={"Durée"}/>  
                        <NormalText text={duration} bold/>
                    </View>

                    
                    <View style={styles.sectionContainer}>
                        <SubTitleText text={"Priorité"}/>  
                        <PriorityIndicator priority={convertedStep.priority}/>
                    </View>


                </View>
            </View>

        </CustomBottomSheet>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex", 
        flexDirection: "column", 
        gap: 20, 
        flex: 1,
        marginBottom: 60
    },

    header: {
        display: "flex", 
        flexDirection: "column", 
        gap: 30
    },

    displayRow: {
        display: "flex",
        flexDirection: "row",
        gap: 0
    },

    pageTitleContainer: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        gap: 20,
        marginLeft: 5,
      },

    emptySreenContainer: {
        flex: 1, 
        flexGrow: 1, 
        alignItems: "center", 
        justifyContent: "space-around",
        gap: 50, 

    },
    
    emptyScreenImageContainer: {
        resizeMode: 'contain', 
        flex: 1,
        width: "90%", 
        height: undefined,
        aspectRatio: 1
    },

    emptyScreenSubContainer: {
        justifyContent: "space-evenly", 
        alignItems: "center",
        gap: 10
    },

    footer: {
        justifyContent: "center",
        flex: 0.20,
        marginTop: 30,
        marginBottom: 10
    },

    sectionContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
    }
})

export default StepDetailsBottomScreen