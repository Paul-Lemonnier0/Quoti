import { View } from "react-native"
import { BackgroundView, MainView, TopScreenView, UsualScreen } from "../../components/View/Views"
import { GoBackButton, GoNextButton } from "../../components/Buttons/UsualButton"
import { HugeText, NormalText, SubTitleText, TitleText } from "../../styles/StyledText"
import { RadioButton } from "../../components/RadioButtons/RadioButton"
import { useState } from "react"
import { StyleSheet } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { TextInputCustom } from "../../components/TextFields/TextInput"
import { ScrollView } from "react-native"
import { CustomCarousel } from "../../components/Carousel/CustomCarousel"
import AddStepBottomScreen from "../BottomScreens/AddStepBottomScreen"
import { useMemo } from "react"
import { useRef } from "react"
import { useCallback } from "react"
import {RenderAddStepCarouselItem} from '../../components/Habitudes/Step/StepCarouselItem'
import { useNavigation, useRoute } from "@react-navigation/native"

export const AddBasicDetails = () => {

    const navigation = useNavigation();
    const [steps, setSteps] = useState([{addStepItem: true}])

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleChangeTitle = useCallback((text) => {
        setTitle(text);
    }, []);

    const handleChangeDescription = useCallback((text) => {
        setDescription(text);
    }, []);

    const [isTitleWrong, setIsTitleWrong] = useState(false)

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

        let canGoNext = true

        if(title.length <= 0) 
        {
            canGoNext = false
            setIsTitleWrong(true)
        }

        else setIsTitleWrong(false)

        if(description.length <= 0) 
        {
            canGoNext = false
            setIsDescriptionWrong(true)
        }

        else setIsDescriptionWrong(false)

        console.log(title)

        if(canGoNext) 
        {
            let stepsFinal
            if(steps.length === 1)
                stepsFinal = [{title: title, description: description, duration: 0, numero: 0}]
            
            else{
                stepsFinal = steps.filter((step) => step.addStepItem !== true)
                stepsFinal = steps.map((step, index) =>  { return {...step, numero: index} })
            }

            stepsFinal.pop()
            
            const habit = {
                titre: title,
                description: description,
                steps: stepsFinal, //Pour virer le add steps item
                doneSteps: 0
            }

            navigation.navigate("CreateHabitDetails", {habit})
        }
    }

    let testValue = "";


    return(
        <UsualScreen>
            <View style={styles.container}>

                <View style={styles.header}>

                    <View style={{width: "80%"}}>
                        <HugeText text="Dites-nous en un peu plus !"/>
                    </View>

                    <GoNextButton handleGoNext={handleGoNext}/>

                </View>

                <StepIndicator totalSteps={5} currentStep={2}/>



                <View style={styles.body}>

                    <View style={styles.groupContainer}>

                        <TextInputCustom onChangeText={setTitle} value={title} placeholder={"Entrez un titre"} isWrong={isTitleWrong}/>

                    </View>

                    <View style={styles.groupContainer}>
                        <TextInputCustom onChangeText={setDescription} value={description} placeholder={"Entrez une courte description"} isWrong={isDescriptionWrong}/>

                    </View>

                    <View style={[styles.groupContainer, {flex:1, marginBottom: 15, gap: 15}]}>
                        <SubTitleText text="Etapes :"/>

                        <View style={{flex: 1}}>
                            <CustomCarousel 
                                data={steps}
                                renderItem={({item, index}) => {
                                    return(
                                        <RenderAddStepCarouselItem 
                                            item={item} 
                                            index={index}
                                            data={steps} 
                                            setData={setSteps} 
                                            handleOpenAddStep={handleOpenAddStep}
                                        />
                                    )
                                }}
                            />                        
                        </View>
                    </View>
                </View>

                </View>

            <AddStepBottomScreen
            snapPoints={snapPointsAddStep}
            bottomSheetModalRef={bottomSheetModalRefAddStep}
            setSteps={setSteps}/>

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
        gap: 10,
        justifyContent: "center"
    },

    groupContainer: {
        display: 'flex', 
        flexDirection: "column",
        justifyContent: "center",
        gap: 5
    },
})