import React from "react";
import { View, StyleSheet, Image } from "react-native"
import { HugeText, TitleText } from "../styles/StyledText"
import { useThemeColor } from "../components/Themed"
import { Feather } from '@expo/vector-icons'; 
import { useRoute } from "@react-navigation/native";
import { useState} from "react";
import { UsualScreen } from "../components/View/Views";
import { SubText } from "../styles/StyledText";
import { GoBackButton, SimpleButton } from "../components/Buttons/UsualButton";
import { useContext } from "react";
import { HabitsContext } from "../data/HabitContext";
import { RenderStep } from "../components/Habitudes/EtapeItem";
import HabitIcons from "../data/HabitIcons";

const HabitudeScreen = () => {

    const font = useThemeColor({}, "Font")
    const tertiary = useThemeColor({}, "Tertiary")

    const {Habits, handleCheckStep} = useContext(HabitsContext)

    const route = useRoute()
    const {habitID, currentDateString} = route.params;
    const currentDate = new Date(currentDateString)

    const habit = Habits[habitID]
    const steps = Object.values(habit.steps)
    const [displayedSteps, setDisplayedSteps] = useState(steps)
    const isDone = steps.filter(step => step.isChecked).length === steps.length

    const handleCheckingStep = (step, index) => {
        const isStepChecked = !step.isChecked
        steps[index] = {...step, isChecked: isStepChecked}

        handleCheckStep(habitID, step.stepID, index, currentDate, isStepChecked)
        setDisplayedSteps([...steps])
    }

    const imageSize = 35
    const paddingImage = 15
    const barWidth = 3

    return(
        <UsualScreen hideMenu={true}>
            <View style={[styles.container]}>
                <View style={styles.header}>
                    <View style={styles.subHeader}>
                        <GoBackButton borderHidden={true}/>
                        <View>
                            <SimpleButton onPress={() => handleOpenShareBottomSheet()}>
                                <Feather name="settings" size={20} color={font} />                                
                            </SimpleButton>
                        </View>
                    </View>
                </View>

                <View style={styles.body}>                 
                    <View>
                        <HugeText text="Progression"/>
                    </View>

                    <View style={[styles.displayRow, {gap: 20}]}>
                        <View style={{borderRadius: 20, borderColor: isDone ? habit.color : font, borderWidth: 2, padding: 15}}>
                            <Image source={HabitIcons[habit.icon]} style={{width: imageSize, height: imageSize}}/>
                        </View>

                        <View style={styles.titreEtDescriptionContainer}>
                            <SubText text={habit.description}/>
                            <TitleText text={habit.titre}/>
                        </View>
                    </View>

                    <View style={styles.displayColumn}>
                        {
                            displayedSteps.map((step, index) => {

                                return(
                                <View key={index} style={styles.displayColumn}>
                                    <RenderStep habit={habit} steps={steps} step={step} index={index} onPress={() => handleCheckingStep(step, index)}
                                        imageSize={imageSize} paddingImage={paddingImage}/>

                                    {index != steps.length-1 && <View style={{
                                        marginVertical: 15, 
                                        backgroundColor: tertiary, 
                                        borderRadius: 50, 
                                        height: 30, 
                                        width: barWidth, 
                                        marginLeft: (paddingImage*2 + imageSize)+20 + (paddingImage + imageSize)/2 - barWidth/2}}/>}
                                </View>
                                )
                            })
                        }
                    </View>

                    {/* <View style={styles.detailPanel}>
                        <TouchableOpacity style={[styles.detailPanelItem, styleCard.shadow, {borderColor: font, backgroundColor: secondary}]}>
                            <Feather name="users" size={24} color={font}/>
                            <SubTitleText text="2"/>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.detailPanelItem, styleCard.shadow, {borderColor: font, backgroundColor: secondary}]}>
                            <Octicons name="flame" size={24} color={font}/>
                            <SubTitleText text="50"/>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.detailPanelItem, styleCard.shadow, {borderColor: font, backgroundColor: secondary}]}>
                            <Feather name="award" size={24} color={font}/>
                            <SubTitleText text="7"/>
                        </TouchableOpacity>

                    </View> */}
                         
                </View>
            </View>
        </UsualScreen>
    )
};

const styles = StyleSheet.create({
    container: {
        display: "flex", 
        flexDirection: "column", 
        gap: 10, 
        flex: 1, 
        marginBottom: 0    
    },

    detailPanel:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 20,
    },

    detailPanelItem: {
        display: "flex", 
        paddingHorizontal: 30, 
        paddingVertical: 15, 
        flex: 1,
        borderWidth: 2,
        borderRadius: 15, 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center", 
        gap: 10,
        aspectRatio: 1

    },

    header: {
        display: "flex", 
        flexDirection: "column", 
        gap: 20
    },
    
    subHeader: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        justifyContent: "space-between"
    },

    body: {
        flex: 1, 
        gap: 30,
    },

    titreEtDescriptionContainer:{
        display: "flex", flex: 1,
        flexDirection: "column", 
        justifyContent: "center",
    },

    displayColumn: {
        display: "flex",
        flexDirection: "column",
    },

    displayRow: {
        display: "flex", 
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default HabitudeScreen
