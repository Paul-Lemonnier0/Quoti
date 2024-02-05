import { StyleSheet } from "react-native"
import CustomColorBottomScreen from "../../screens/BottomScreens/CustomColorBottomScreen"
import { BorderTextButton } from "../Buttons/UsualButton"
import { View } from "react-native"
import ColorListSelector from "../Other/ColorListSelector"
import StepIndicator from "../Other/StepIndicator"
import { HugeText } from "../../styles/StyledText"
import { NavigationButton } from "../Buttons/IconButtons"
import { UsualScreen } from "../View/Views"
import { getAddHabitStepsDetails } from "../../constants/BasicConstants"
import { useCallback, useMemo, useRef, useState } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useThemeColor } from "../Themed"
import { ColorsList } from "../../data/ColorsList"

export default ChooseColorForm = ({
    isForModifyingHabit,
    habit,
    handleGoNext,
}) => {

    const font = useThemeColor({}, "Font")

    const [selectedColor, setSelectedColor] = useState(habit?.color ?? ColorsList[0])

    const handleValidation = () => {
        handleGoNext({color: selectedColor})
    }

    const bottomSheetModalRef_CustomColor = useRef(null);
    const handleOpenCustomColor = useCallback(() => {
        bottomSheetModalRef_CustomColor.current?.present();
      }, []);
  

    const CURRENT_STEP_DETAILS = getAddHabitStepsDetails(isForModifyingHabit ? null : habit.objectifID, "ChooseColorScreen")

    const totalSteps = CURRENT_STEP_DETAILS.TOTAL_STEPS
    const currentStep = CURRENT_STEP_DETAILS.CURRENT_STEP

    return(
        <UsualScreen hideMenu>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <NavigationButton noPadding action={"goBack"}/>
                        <NavigationButton noPadding action={"goNext"} methode={handleValidation}/>
                    </View>
                    <HugeText text="Choisissez une couleur"/>

                    <StepIndicator totalSteps={totalSteps} currentStep={currentStep}/>
                </View>


                <View style={styles.body}>
                    <View style={styles.centerFullContent}>
                        <ColorListSelector selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>
                    </View>

                    <View style={styles.centered}>
                        <View style={styles.customColorContainer}>
                            <BorderTextButton bold text="Aa" onPress={handleOpenCustomColor}/>
                            <View style={[styles.selectedColor, {borderColor: font, backgroundColor: selectedColor}]}/>
                        </View>
                    </View>
                </View>
            </View>

            <CustomColorBottomScreen 
                bottomSheetModalRef={bottomSheetModalRef_CustomColor} 
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
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
        marginBottom: 10
    },

    centered: {
        justifyContent: "center", 
        display: "flex", 
        alignItems: "center"
    },

    customColorContainer: {
        display: "flex", 
        flexDirection: "row", 
        gap: 10
    },

    selectedColor: {
        aspectRatio: 1,
        borderWidth: 2, 
        borderRadius: 18,
    },

    body: {
        flex: 1,
    },

    header: {
        display: "flex", 
        flexDirection: "column", 
        gap: 30
    },

    colorListContainer: {
        flex: 1,
        justifyContent: "center",
        marginHorizontal: -8,
    },

    colorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding:8,
    },

    colorSubContainer: {
        borderWidth: 2,
        borderRadius: 20, 
        padding: 5
    },

    centerFullContent: {
        display: "flex", 
        justifyContent: "center", 
        alignContent: "center", 
        flex:1
    },

    footer: {

    }
})