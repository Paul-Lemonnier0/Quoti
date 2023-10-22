import { SafeAreaView, View } from "react-native"
import { BackgroundView, MainView, TopScreenView, UsualScreen } from "../../components/View/Views"
import { GoBackButton, GoNextButton } from "../../components/Buttons/UsualButton"
import { HugeText, NormalText, SubTitleText, TitleText } from "../../styles/StyledText"
import { RadioButton } from "../../components/RadioButtons/RadioButton"
import { useState } from "react"
import { StyleSheet } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { TextInputCustom } from "../../components/TextFields/TextInput"
import { ScrollView } from "react-native"
import { AddStepCustomCarousel, CustomCarousel } from "../../components/Carousel/CustomCarousel"
import AddStepBottomScreen from "../BottomScreens/AddStepBottomScreen"
import { useMemo } from "react"
import { useRef } from "react"
import { useCallback } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { HugeRadioButton } from "../../components/RadioButtons/HugeRadioButtons"
import BigContrastButton from "../../components/Buttons/BigContrastButton"
import { useThemeColor } from "../../components/Themed"
import Separator from "../../components/Other/Separator"
import StepIndicator from "../../components/Other/StepIndicator"

export const PreAddScreen = () => {

    const fontGray = useThemeColor({}, "FontGray")

    const navigation = useNavigation();

    const [selectedItem, setSelectedItem] = useState("Hab")
    const [isForCreate, setIsForCreate] = useState(true)
    const [steps, setSteps] = useState([{title: "Test titre", description: "Test description", duration: 60}, {addStepItem: true}])

    const [title, setTitle] = useState("")
    const [isTitleWrong, setIsTitleWrong] = useState(false)

    const [description, setDescription] = useState("")
    const [isDescriptionWrong, setIsDescriptionWrong] = useState(false)

    const bottomSheetModalRefAddStep = useRef(null);
    const snapPointsAddStep = useMemo(() => ['80%'], [])

    const handleOpenAddStep = useCallback(() => {
        bottomSheetModalRefAddStep.current?.present();
      }, []);

    const clearAll = () => {
        setSelectedItem("Hab")
        setIsForCreate(true)
        setSteps([{addStepItem: true}])
    }

    const handleGoNext = () => {
        navigation.navigate("AddBasicDetails")
    }

    return(
        <UsualScreen>
            <View style={styles.container}>

                <View style={styles.header}>

                    <HugeText text="Que voulez vous créer ?"/>
                    <GoNextButton handleGoNext={handleGoNext}/>

                </View>

                <StepIndicator totalSteps={isForCreate ? 5 : 2} currentStep={1}/>


                
                <View style={styles.body}>


                    <View style={styles.groupContainer}>

                        <HugeRadioButton handleOnClick={() => setIsForCreate(true)} isHighlight={isForCreate}>
                            <NormalText text="Créer"/>
                        </HugeRadioButton>

                        <HugeRadioButton handleOnClick={() => setIsForCreate(false)} isHighlight={!isForCreate}>
                            <NormalText text="Importer"/>
                        </HugeRadioButton>

                    </View>

                    <Separator/>


                    <View style={styles.groupContainer}>

                        <HugeRadioButton handleOnClick={() => setSelectedItem("Hab")} isHighlight={selectedItem === "Hab"}>
                            <NormalText text="Habitude"/>
                        </HugeRadioButton>

                        <HugeRadioButton handleOnClick={() => setSelectedItem("Obj")} isHighlight={selectedItem === "Obj"}>
                            <NormalText text="Objectif"/>
                        </HugeRadioButton>

                        <HugeRadioButton handleOnClick={() => setSelectedItem("Defi")} isHighlight={selectedItem === "Defi"}>
                            <NormalText text="Défi"/>
                        </HugeRadioButton>
                    
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
        gap: 30, 
        flex: 1, 
        marginBottom: 0
    },

    header: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        justifyContent: "space-between"
    },
    
    body: {
        flex: 1, 
        gap: 30,
        justifyContent: "center"
    },

    groupContainer: {
        display: 'flex', 
        flexDirection: "column",
        justifyContent: "center",
        gap: 25
    },
})
