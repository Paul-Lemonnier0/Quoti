import { View } from "react-native"
import { BackgroundView, UsualScreen } from "../../../components/View/Views"
import { BorderTextButton, TextButton } from "../../../components/Buttons/UsualButton"
import { HugeText, NormalText, SubTitleText } from "../../../styles/StyledText"
import { useContext, useState } from "react"
import { StyleSheet } from "react-native"
import { TextInputCustom } from "../../../components/TextFields/TextInput"
import { CustomCarousel } from "../../../components/Carousel/CustomCarousel"
import { useMemo } from "react"
import { useRef } from "react"
import { useCallback } from "react"
import { RenderAddStepCarouselItem } from '../../../components/Habitudes/Step/StepCarouselItem'
import { useNavigation, useRoute } from "@react-navigation/native"
import { generateUniqueID } from "../../../primitives/BasicsMethods"
import { NavigationButton } from "../../../components/Buttons/IconButtons"
import { BottomSheetModalMethodsContext } from "../../../data/BottomSheetModalContext"
import Separator from "../../../components/Other/Separator"
import AddStepBottomScreen from "../../BottomScreens/AddStepBottomScreen"
import FooterBottomSheets from "../../../components/BottomSheets/FooterBottomSheets"
import { AddBasicDetails } from "../Habit/AddBasicDetails"
import HabitForm from "../../../components/Forms/HabitForm"

export const AddBasicDetailsHabitObjectif = () => {

    const navigation = useNavigation();
    const {closeModal} = useContext(BottomSheetModalMethodsContext)

    const route = useRoute()
    const {isForModifyingHabit, isForCreateObjectiveHabit, habit} = route.params

    const handleGoNext = (habit) => {
        navigation.navigate("CreateObjectifHabitDetails", {habit})
    }

    return(
        <HabitForm
            isForCreateObjectiveHabit={isForCreateObjectiveHabit}
            isForModifyingHabit={isForModifyingHabit}
            baseHabit={habit}
            handleGoNext={handleGoNext}
            closeModal={closeModal}
        />
    )
}

const styles = StyleSheet.create({
    
    container: {
        display: "flex",
        flexDirection: "column", 
        justifyContent: "space-between",
        gap: 30, 
        flex: 1,
    },

    header: {
        display: "flex", 
        flexDirection: "column",
        gap: 30
    },
    
    body: {
        flex: 1, 
        gap: 0,
        justifyContent: "center",
    },

    subBody: {
        flex: 1, 
        gap: 30,
    },  

    footer: {
        justifyContent: "center", 
        alignItems: "center"
    },

    carouselContainer: {
        flex:1, 
        marginTop: 10,
        gap: 10
    }
})