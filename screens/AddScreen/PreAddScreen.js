import { View } from "react-native"
import { UsualScreen } from "../../components/View/Views"
import { HugeText } from "../../styles/StyledText"
import { useState } from "react"
import { StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Separator from "../../components/Other/Separator"
import StepIndicator from "../../components/Other/StepIndicator"
import { NavigationButton } from "../../components/Buttons/IconButtons"
import { BorderRadioButton } from "../../components/RadioButtons/RadioButton"

export const PreAddScreen = () => {

    const navigation = useNavigation();

    const [selectedItem, setSelectedItem] = useState("AddBasicDetails")
    const [isForCreate, setIsForCreate] = useState(true)

    const radios = [
        {key: "AddBasicDetails", text: "Habitude" },
        {key: "AddBasicDetailsObjectif", text: "Objectif"},
        {key: "AddBasicDetailsDefi", text: "Défi"},
      ];

    const handleGoNext = () => navigation.navigate(selectedItem)

    return(
        <UsualScreen>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{width: "80%"}}>
                        <HugeText text="Que voulez vous faire ?"/>
                    </View>                    
                    
                    <NavigationButton action={"goNext"} methode={handleGoNext}/>
                </View>

                <StepIndicator totalSteps={isForCreate ? 5 : 2} currentStep={1}/>
                
                <View style={styles.body}>
                    <View style={styles.groupContainer}>
                        <BorderRadioButton hideInactiveBorder text="Créer" handleOnClick={() => setIsForCreate(true)} isHighlight={isForCreate}/>
                        <BorderRadioButton hideInactiveBorder text="Importer" handleOnClick={() => setIsForCreate(false)} isHighlight={!isForCreate}/>
                    </View>

                    <Separator/>

                    <View style={styles.groupContainer}>
                        {radios.map((radio) => (
                            <BorderRadioButton hideInactiveBorder key={radio.key} text={radio.text}
                                handleOnClick={() => setSelectedItem(radio.key)}
                                isHighlight={selectedItem === radio.key}/>
                        ))}
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
        justifyContent: "space-between"
    },

    groupContainer: {
        display: 'flex', 
        flexDirection: "column",
        justifyContent: "center",
        gap: 25,
        flex: 1
    },
})
