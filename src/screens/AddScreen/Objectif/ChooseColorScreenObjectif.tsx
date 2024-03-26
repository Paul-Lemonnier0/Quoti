import React, { useState, useRef, useMemo, useCallback, FC } from "react"
import { View, StyleSheet } from "react-native"
import { BorderTextButton } from "../../../components/Buttons/UsualButton"
import { UsualScreen } from "../../../components/View/Views"
import { HugeText, SubTitleText } from "../../../styles/StyledText"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useThemeColor } from "../../../components/Themed"
import { ColorsList } from "../../../data/ColorsList"
import CustomColorBottomScreen from "../../BottomScreens/CustomColorBottomScreen"
import { NavigationButton } from "../../../components/Buttons/IconButtons"
import StepIndicator from "../../../components/Other/StepIndicator"
import ColorListSelector from "../../../components/Other/ColorListSelector"
import ChooseColorForm from "../../../components/Forms/ChooseColorForm"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AddScreenStackType } from "../../../navigation/BottomTabNavigator"
import { FormColoredHabitValues } from "../../../types/FormHabitTypes"
import { AddObjectifScreenType, getAddHabitStepsDetails, getAddObjectifStepsDetails } from "../../../constants/BasicConstants"

type ChooseColorScreenObjectifProps = NativeStackScreenProps<AddScreenStackType , "ChooseColorScreenObjectif">

export const ChooseColorScreenObjectif: FC<ChooseColorScreenObjectifProps> = ({route, navigation}) => {

    const {objectif} = route.params

    const handleGoNext = (values: FormColoredHabitValues) => {
        navigation.navigate("ChooseIconScreenObjectif", {objectif: {...objectif, ...values}})
    } 
    
    const CURRENT_STEP_DETAILS = getAddObjectifStepsDetails(AddObjectifScreenType.ChooseColorScreenObjectif)

    const totalSteps = CURRENT_STEP_DETAILS.TOTAL_STEPS
    const currentStep = CURRENT_STEP_DETAILS.CURRENT_STEP

    return(
        <ChooseColorForm 
            handleGoNext={handleGoNext}
            totalSteps={totalSteps}
            currentStep={currentStep}
        />
    )
}