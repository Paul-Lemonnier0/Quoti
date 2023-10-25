import { StyleSheet, TouchableOpacity, View } from "react-native"
import { BigCircleBorderButton } from "../Buttons/UsualButton"
import { SubTitleText, SubText, NormalText, TitleText } from "../../styles/StyledText"
import { Feather } from "@expo/vector-icons"
import { useThemeColor } from "../Themed"
import { CustomDurationIndicator } from "./Clock"
import { durationToTimeString } from "../../primitives/BasicsMethods"
import cardStyle from "../../styles/StyledCard"

export const AddEtapeItem = ({handleOpenAddStep}) => {

    const cardStyles = cardStyle()
    const font = useThemeColor({}, "Font")
    const secondary = useThemeColor({}, "Secondary")

    return(
        <View style={[cardStyles.shadow, styles.addStepContainer, {backgroundColor: secondary}]}>
            
            <View style={{width: "80%", gap: 10}}>
                <TitleText text="Ajoutez une étape" />

                <View style={{}}>
                    <NormalText text="Décomposer votre habitude en une ou plusieurs étapes !" />
                </View>
            </View>

            <View style={{flex: 1, justifyContent: "flex-end", alignItems: "flex-end"}}>
                <BigCircleBorderButton onPress={handleOpenAddStep} borderColor={font}>
                    <Feather name="plus" size={24} color={font} />
                </BigCircleBorderButton>
            </View>

        </View>
    )
}

export const AddedEtapeItem = ({step, handleDelete, handleModification, index}) => {

    const cardStyles = cardStyle()
    const secondary = useThemeColor({}, "Secondary")
    const fontGray = useThemeColor({}, "FontGray")
    const font = useThemeColor({}, "Font")

    return(
        <TouchableOpacity style={[cardStyles.shadow, styles.addedContainer, {backgroundColor: secondary}]}>

            <View style={{display: "flex", flexDirection: "column", gap: 10}}>
                    <TitleText text={step.titre}/>
                    <NormalText text={step.description}/>
            </View>

            <View style={styles.addedFooterContainer}>
                
                <CustomDurationIndicator duration={step.duration} />

                <View style={{flex: 1, justifyContent: "flex-end", alignItems: "flex-end"}}>
                    <BigCircleBorderButton onPress={() => {}}>
                        <Feather name="trash-2" size={24} color={font} />
                    </BigCircleBorderButton>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export const RenderStep = ({habit, steps, step, index, onPress, imageSize, paddingImage }) => {

    const secondary = useThemeColor({}, "Secondary")

    let isNextToBeChecked = false
    if(index === 0 && step.isChecked === false) isNextToBeChecked = true
    else if (index != 0 && step.isChecked === false && steps[index-1].isChecked) isNextToBeChecked = true

    return(
        <View style={{display: "flex", flexDirection: "row", gap: 20, height: imageSize+paddingImage}}>

            <View style={{width: 65, alignItems: "center", justifyContent: "center"}}>
                <SubText text={durationToTimeString(step.duration)}/>
            </View>

            <TouchableOpacity onPress={onPress}
            style={[styles.stepCheckBox,
                { 
                    borderColor: habit.color, backgroundColor: secondary, 
                    borderWidth: step.isChecked || isNextToBeChecked ? 2 : 0
                }]}>
                {step.isChecked ? <Feather name="check" size={20} color={habit.color}/> :  <SubTitleText text={index+1}/>}
            </TouchableOpacity>

            <View style={styles.titreEtDescriptionContainer}>
                <SubTitleText text={step.titre}/>
                <SubText text={step.description}/>
            </View>
        </View>)
}


const styles = StyleSheet.create({
    container: {
        borderRadius: 25, 
        padding:30, 
        paddingVertical: 25, 
        gap: 5, flex: 1,
        justifyContent: "space-between"
    },

    addStepContainer: {
        display: "flex", 
        flexDirection: "column", 
        gap: 10, 
        flex: 1, 
        borderRadius: 25, 
        padding:30, 
    },

    addedContainer: {
        gap: 10, 
        flex: 1, 
        borderRadius: 25, 
        padding:30, 
        justifyContent: "space-between", 
        display: "flex", 
        flexDirection: "column"
    },

    addedFooterContainer: {
        display: "flex", 
        flexDirection:"row", 
        justifyContent:"space-between", 
        alignItems: "flex-end", 
        gap: 20
    },

    stepCheckBox: {
        borderRadius: 15,
        aspectRatio: 1/1,
        alignItems:"center", 
        justifyContent: "center",
    }
})