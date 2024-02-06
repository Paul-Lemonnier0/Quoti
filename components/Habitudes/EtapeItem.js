import { StyleSheet, TouchableOpacity, View } from "react-native"
import { SubTitleText, SubText, NormalText, TitleText } from "../../styles/StyledText"
import { useThemeColor } from "../Themed"
import { CustomDurationIndicator } from "./Clock"
import { durationToTimeString } from "../../primitives/BasicsMethods"
import cardStyle from "../../styles/StyledCard"

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
            </View>
        </View>
    )
}

export const AddedEtapeItem = ({step, handleOpenAddStep}) => {

    const cardStyles = cardStyle()
    const secondary = useThemeColor({}, "Secondary")
    const fontGray = useThemeColor({}, "FontGray")
    const font = useThemeColor({}, "Font")

    return(
        <TouchableOpacity style={[cardStyles.shadow, styles.addedContainer, {backgroundColor: secondary}]}>

            <View style={styles.addedTextContainer}>
                <TitleText text={step.titre}/>
                <SubText text={step.description}/>
            </View>

            <View style={styles.addedFooterContainer}>
                <CustomDurationIndicator duration={step.duration} />

                <View style={styles.fullFlexEndContainer}>
                </View>
            </View>
        </TouchableOpacity>
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
        gap: 5
    },

    addedFooterContainer: {
        display: "flex", 
        flexDirection:"row", 
        justifyContent:"space-between", 
        alignItems: "flex-end", 
        gap: 20
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

    titreEtDescriptionContainer:{
        display: "flex", flex: 1,
        flexDirection: "column", 
        justifyContent: "center",
    },


})