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

    let titre = "";
    let description = "";
    const handleSetTitre = (text) => titre = text
    const handleSetDescription = (text) => description = text

    const [isTitleWrong, setIsTitleWrong] = useState(false)
    const [isDescriptionWrong, setIsDescriptionWrong] = useState(false)

    const bottomSheetModalRefAddStep = useRef(null);
    const snapPointsAddStep = useMemo(() => ['80%'], [])

    const handleOpenAddStep = useCallback(() => {
        bottomSheetModalRefAddStep.current?.present();
      }, []);

    const handleGoNext = () => {

        let canGoNext = true

        if(titre.length <= 0 || description.length <= 0) 
        {
            console.log(titre)
            description.length <= 0 ? setIsDescriptionWrong(true) : setIsDescriptionWrong(false)
            titre.length <= 0 ? setIsTitleWrong(true) : setIsTitleWrong(false)

            canGoNext = false
        }

        if(canGoNext) 
        {
            let stepsFinal = steps.filter((step) => step.addStepItem !== true)
            stepsFinal = steps.map((step, index) =>  { return {...step, numero: index, stepID: generateUniqueID()} })

            stepsFinal.pop()
            
            const habit = {
                titre: titre,
                description: description,
                steps: stepsFinal,
                doneSteps: 0
            }

            navigation.navigate("CreateHabitDetails", {habit})
        }
    }

    const renderAddSteps = ({item, index}) => {
        return(
            <RenderAddStepCarouselItem 
                item={item} 
                index={index}
                data={steps} 
                setData={setSteps} 
                handleOpenAddStep={handleOpenAddStep}
            />
        )
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

                    <View style={styles.groupContainer}>
                        <TextInputCustom setValue={handleSetTitre} placeholder={"Entrez un titre"} isWrong={isTitleWrong}/>
                    </View>

                    <View style={styles.groupContainer}>
                        <TextInputCustom setValue={handleSetDescription} placeholder={"Entrez un titre"} isWrong={isDescriptionWrong}/>
                    </View>

                    <View style={[styles.groupContainer, styles.carouselContainer]}>
                        <SubTitleText text="Etapes :"/>

                        <View style={{flex: 1}}>
                            <CustomCarousel data={steps} renderItem={renderAddSteps}/>                        
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

    carouselContainer: {
        flex:1, 
        marginBottom: 15, 
        gap: 15
    }
})