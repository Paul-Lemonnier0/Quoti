import { Image, View } from "react-native"
import { UsualScreen } from "../../components/View/Views"
import { HugeText, NormalGrayText, NormalText, SubTitleText, TitleText } from "../../styles/StyledText"
import { useState } from "react"
import { StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Separator from "../../components/Other/Separator"
import StepIndicator from "../../components/Other/StepIndicator"
import { NavigationButton } from "../../components/Buttons/IconButtons"
import { BorderRadioButton } from "../../components/RadioButtons/RadioButton"
import { BackgroundTextButton } from "../../components/Buttons/UsualButton"
import { RadioButtonsBar } from "../../components/RadioButtons/RadioButtonsBar"

export const PreAddScreen = () => {

    const navigation = useNavigation();

    const [selectedItem, setSelectedItem] = useState("AddBasicDetails")
    const [totalSteps, setTotalSteps] = useState(6)

    const radios = [
        {key: "AddBasicDetails", text: "Habitude" },
        {key: "AddBasicDetailsObjectif", text: "Objectif"},
    ];

    const handleSetSelectedItem = (item) => {
        setSelectedItem(item)

        if(item === "AddBasicDetails"){
            setTotalSteps(6)
        }

        else setTotalSteps(5)

    }

    const handleClose = () => navigation.navigate("Home")
    const handleGoNext = () => navigation.navigate(selectedItem)

    return(
        <UsualScreen hideMenu>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <NavigationButton noPadding action={"close"} methode={handleClose}/>
                        <NavigationButton noPadding action={"goNext"} methode={handleGoNext}/>
                    </View>

                    <HugeText text="Que voulez vous faire ?"/>

                    <StepIndicator totalSteps={totalSteps} currentStep={0}/>
                </View>
                
                <View style={styles.body}>

                    <View style={{flex: 1, flexGrow: 1, marginTop: 20}}>
                        <View style={styles.emptySreenContainer}>
                        
                            <Image style={styles.emptyScreenImageContainer} source={IllustrationsList["Creative"]}/>

                            <View style={styles.emptyScreenSubContainer}>
                                <HugeText text={"Créer une habitude ou un objectif ?"} style={{textAlign: "center"}}/>
                                <NormalGrayText style={{textAlign: "center"}} text={"Les habitudes font parties de votre routine. Les objectifs sont composés d'habitudes et permettent de structurer davantage votre quotidien et vos projets"}/>
                            </View>
                        </View>
                    </View>

                    <View style={styles.groupContainer}>
                        <RadioButtonsBar items={radios} setSelectedItem={handleSetSelectedItem} selectedItem={selectedItem}/>
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
        flexDirection: "column", 
        gap: 30
    },
    
    body: {
        flex: 1, 
        gap: 30,
        justifyContent: "space-between"
    },

    groupContainer: {
        display: 'flex', 
        flexDirection: "row",
        justifyContent: "center",
        gap: 0,
        width: "100%"
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
        width: "85%", 
        maxHeight: "85%",
        flex: 0.75,
    },

    emptyScreenSubContainer: {
        justifyContent: "space-evenly", 
        alignItems: "center",
        flex: 1
    },
})
