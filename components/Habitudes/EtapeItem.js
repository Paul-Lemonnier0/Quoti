import { StyleSheet, TouchableOpacity, View } from "react-native"
import { SubTitleText, SubText, NormalText, TitleText } from "../../styles/StyledText"
import { Feather } from "@expo/vector-icons"
import { useThemeColor } from "../Themed"
import { CustomDurationIndicator } from "./Clock"
import { durationToTimeString } from "../../primitives/BasicsMethods"
import cardStyle from "../../styles/StyledCard"
import { CircleBorderIconButton } from "../Buttons/IconButtons"

export const AddEtapeItem = ({handleOpenAddStep}) => {

    const cardStyles = cardStyle()
    const secondary = useThemeColor({}, "Secondary")

    return(
        <View style={[cardStyles.shadow, styles.addStepContainer, { backgroundColor: secondary }]}>
            <View style={styles.addMoreStepTextContainer}>
                <TitleText text="Ajoutez une étape" />
                <NormalText text="Décomposer votre habitude en quelques étapes !" />
            </View>

            <View style={styles.fullFlexEndContainer}>
                <CircleBorderIconButton onPress={handleOpenAddStep} provider={"Feather"} name={"plus"}/>
            </View>
        </View>
    )
}

export const AddedEtapeItem = ({step}) => {

    const cardStyles = cardStyle()
    const secondary = useThemeColor({}, "Secondary")
    const fontGray = useThemeColor({}, "FontGray")
    const font = useThemeColor({}, "Font")

    return(
        <TouchableOpacity style={[cardStyles.shadow, styles.addedContainer, {backgroundColor: secondary}]}>

            <View style={styles.addedTextContainer}>
                <TitleText text={step.titre}/>
                <NormalText text={step.description}/>
            </View>

            <View style={styles.addedFooterContainer}>
                <CustomDurationIndicator duration={step.duration} />

                <View style={styles.fullFlexEndContainer}>
                    <CircleBorderIconButton onPress={handleOpenAddStep} provider={"Feather"} name={"trash-2"}/>
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
        <View style={[styles.renderStepContainer, {minHeight: imageSize+paddingImage}]}>
            <View style={styles.stepDurationContainer}>
                <SubText text={durationToTimeString(step.duration)}/>
            </View>

            <TouchableOpacity onPress={onPress}
                style={[styles.stepCheckBox,
                { 
                    height: imageSize+paddingImage,
                    borderColor: habit.color, backgroundColor: secondary, 
                    borderWidth: step.isChecked || isNextToBeChecked ? 2 : 0
                }]}>
                {step.isChecked ? <Feather name="check" size={20} color={habit.color}/> :  <SubTitleText text={index+1}/>}
            </TouchableOpacity>

            <View style={styles.titreEtDescriptionContainer}>
                <SubTitleText text={step.titre}/>
                <SubText text={step.description}/>
            </View>
        </View>
    )
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

    addedTextContainer: {
        display: "flex", 
        flexDirection: "column", 
        gap: 10
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
    },

    fullFlexEndContainer: {
        flex: 1, 
        justifyContent: "flex-end", 
        alignItems: "flex-end"
    },

    addMoreStepTextContainer: {
        width: "80%", 
        gap: 10
    },

    stepDurationContainer: {
        width: 65, 
        alignItems: "center", 
        justifyContent: "center"
    },

    titreEtDescriptionContainer:{
        display: "flex", flex: 1,
        flexDirection: "column", 
        justifyContent: "center",
    },

    renderStepContainer: {
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center", 
        gap: 20,
    }
})