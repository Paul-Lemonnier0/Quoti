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
import { useNavigation } from "@react-navigation/native"
import { generateUniqueID } from "../../../primitives/BasicsMethods"
import { NavigationButton } from "../../../components/Buttons/IconButtons"
import { BottomSheetModalMethodsContext } from "../../../data/BottomSheetModalContext"
import Separator from "../../../components/Other/Separator"
import AddStepBottomScreen from "../../BottomScreens/AddStepBottomScreen"
import FooterBottomSheets from "../../../components/BottomSheets/FooterBottomSheets"

export const AddBasicDetailsHabitObjectif = () => {

    const navigation = useNavigation();
    const {closeModal} = useContext(BottomSheetModalMethodsContext)

    const [steps, setSteps] = useState([{addStepItem: true}])

    let titreRef = useRef(null)
    let descriptionRef = useRef(null)

    const [isTitleWrong, setIsTitleWrong] = useState(false)
    const [isDescriptionWrong, setIsDescriptionWrong] = useState(false)

    const bottomSheetModalRefAddStep = useRef(null);
    const snapPointsAddStep = useMemo(() => ['70%'], [])

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
            let stepsFinal;

            if(steps.length > 1){
                stepsFinal = steps.map((step, index) =>  { return {...step, numero: index, stepID: generateUniqueID()} })
                stepsFinal.pop()
            }

            else stepsFinal = [{numero: -1}]

            const habit = {titre, description, steps: stepsFinal}
            
            navigation.navigate("CreateObjectifHabitDetails", {habit})
        }
    }

    const renderAddSteps = ({item, index}) => {
        return <RenderAddStepCarouselItem item={item} index={index} data={steps} setData={setSteps} handleOpenAddStep={handleOpenAddStep}/>
    }

    return(
        <UsualScreen hideMenu>
            <View style={styles.container}>

                <View style={styles.header}>
                    <View style={{width: "80%"}}>
                        <HugeText text="Ajoutez une habitude !"/>
                    </View>

                    <NavigationButton action={"goNext"} methode={handleGoNext}/>
                </View>

                <StepIndicator totalSteps={2} currentStep={1}/>

                <View style={styles.body}>

                    <TextInputCustom ref={titreRef} labelName={"Titre"} placeholder={"Nom de l'habitude "} isWrong={isTitleWrong}/>

                    <TextInputCustom ref={descriptionRef} labelName={"Description"} placeholder={"Description de l'habitude"} isWrong={isDescriptionWrong}/>

                    <View style={styles.carouselContainer}>
                        <SubTitleText text="Etapes :"/>

                        <CustomCarousel data={steps} renderItem={renderAddSteps}/>                        
                    </View>
                </View>

                <View style={{marginTop: 10}}>
                    <FooterBottomSheets text={"Annuler"} onPress={closeModal}/>
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
        justifyContent: "space-between",
        gap: 30, 
        flex: 1,
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