import { View } from "react-native"
import { UsualScreen } from "../../components/View/Views"
import { GoNextButton } from "../../components/Buttons/UsualButton"
import { HugeText, NormalText } from "../../styles/StyledText"
import { useState } from "react"
import { StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { HugeRadioButton } from "../../components/RadioButtons/HugeRadioButtons"
import Separator from "../../components/Other/Separator"
import StepIndicator from "../../components/Other/StepIndicator"

export const PreAddScreen = () => {

    const navigation = useNavigation();

    const [selectedItem, setSelectedItem] = useState("Hab")
    const [isForCreate, setIsForCreate] = useState(true)

    const handleGoNext = () => navigation.navigate("AddBasicDetails")

    return(
        <UsualScreen>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{width: "80%"}}>
                        <HugeText text="Que voulez vous faire ?"/>
                    </View>                    
                    
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
