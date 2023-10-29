import { View } from "react-native"
import { UsualScreen } from "../../components/View/Views"
import { GoNextButton } from "../../components/Buttons/UsualButton"
import { HugeText, SubTitleText } from "../../styles/StyledText"
import { useState } from "react"
import { StyleSheet } from "react-native"
import { TextInputCustom } from "../../components/TextFields/TextInput"
import { CustomCarousel } from "../../components/Carousel/CustomCarousel"
import { useMemo } from "react"
import { useRef } from "react"
import { useCallback } from "react"
import { RenderAddStepCarouselItem } from '../../components/Habitudes/Step/StepCarouselItem'
import { useNavigation } from "@react-navigation/native"
import { generateUniqueID } from "../../primitives/BasicsMethods"
import AddStepBottomScreen from "../BottomScreens/AddStepBottomScreen"

export const AddBasicDetails = () => {

    const navigation = useNavigation();

    const [steps, setSteps] = useState([{addStepItem: true}])

    let titreRef = useRef(null)
    let descriptionRef = useRef(null)

    const [isTitleWrong, setIsTitleWrong] = useState(false)
    const [isDescriptionWrong, setIsDescriptionWrong] = useState(false)

    const bottomSheetModalRefAddStep = useRef(null);
    const snapPointsAddStep = useMemo(() => ['80%'], [])

    const handleOpenAddStep = useCallback(() => {
        bottomSheetModalRefAddStep.current?.present();
      }, []);

    const handleGoNext = () => {

        let canGoNext = true

        let titre = titreRef.current?.getValue();
        let description = descriptionRef.current?.getValue();

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
            stepsFinal = steps.map((step, index) =>  { return {...step, numero: index, stepID: generateUniqueID()} })
            stepsFinal.pop()
            
            const habit = {titre: titre, description: description, steps: stepsFinal}
 
            navigation.navigate("CreateHabitDetails", {habit})
        }
    }

    const renderAddSteps = ({item, index}) => {
        return <RenderAddStepCarouselItem item={item} index={index} data={steps} setData={setSteps} handleOpenAddStep={handleOpenAddStep}/>
    }

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

                    <TextInputCustom ref={titreRef} labelName={"Titre"} placeholder={"Entrez un titre"} isWrong={isTitleWrong}/>

                    <TextInputCustom ref={descriptionRef} labelName={"Description"} placeholder={"Entrez une courte description"} isWrong={isDescriptionWrong}/>

                    <View style={styles.carouselContainer}>
                        <SubTitleText text="Etapes :"/>

                        <CustomCarousel data={steps} renderItem={renderAddSteps}/>                        
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
        gap: 0,
        justifyContent: "center"
    },

    carouselContainer: {
        flex:1, 
        marginTop: 10,
        gap: 10
    }
})