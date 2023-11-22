import { TouchableOpacity } from "react-native"
import { useThemeColor } from "../Themed"
import { useNavigation } from "@react-navigation/native";
import cardStyle from "../../styles/StyledCard";
import { useContext } from "react";
import { ObjectifsContext } from "../../data/ObjectifContext";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import IconImage from "../Other/IconImage";
import { HugeText, MassiveText, NormalText, SubText, SubTitleText } from "../../styles/StyledText";
import { Dimensions } from "react-native";
import { Icon } from "../Buttons/IconButtons";
import { displayTree } from "../../primitives/BasicsMethods";
import { HabitsContext } from "../../data/HabitContext";

export default ObjectifBlock = ({objectifID, frequency}) => {

    const {AllObjectifs} = useContext(ObjectifsContext)
    const {filteredHabitsByDate} = useContext(HabitsContext)

    try{
        const objectif = AllObjectifs[objectifID]
        const habits = Object.values(filteredHabitsByDate[frequency]["Objectifs"][objectifID])

        const stylesCard = cardStyle()

        const width = Dimensions.get('window').width / 1.5

        const startDate = objectif.startingDate.toLocaleDateString("fr", {month: "short", day: "numeric"});
        const endDate = objectif.endingDate.toLocaleDateString("fr", {month: "short", day: "numeric", year: "numeric"});

        const isFinished = false
        const handlePress = () => {}

        console.log(objectif)

        return(
            <TouchableOpacity style={{width}}>
                <View style={[stylesCard.card, styles.objectif]}>
                    <View style={styles.header}>
                        <View style={[styles.iconContainer, {borderColor: objectif.color}]}>
                            <IconImage image={objectif.icon}/>
                        </View>
                        <View style={styles.footer}>

                            <View style={styles.titleDescriptionContainer}>
                                <SubTitleText numberOfLines={1} text={objectif.titre}/>
                                <SubText numberOfLines={1} text={objectif.description}/>
                            </View>



                        </View>
                    </View>

                    <View style={styles.displayColumn}>
                        <StepIndicator currentStep={habits.length} totalSteps={habits.length} color={objectif.color} height={3}/>
                    </View>


                </View>
            </TouchableOpacity>
        )
    }

    catch(e){
        console.log(e)
        return(<View><NormalText text={""}/></View>)
    }
}

const styles = StyleSheet.create({
    objectif: {
        gap: 50,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },

    header: {
        gap: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
    },

    titleDescriptionContainer: {
        flex:1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around"
    },

    footer: {
        gap: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center"
    },

    iconContainer: {
        display: "flex",
        justifyContent: "center", 
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 15 
    },

    displayColumn:{
        display: "flex",
        flexDirection: "column",
        gap: 10
    }
})