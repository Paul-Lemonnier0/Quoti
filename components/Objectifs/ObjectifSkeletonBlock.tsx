import { TouchableOpacity } from "react-native"
import { useThemeColor } from "../Themed"
import { useNavigation } from "@react-navigation/native";
import cardStyle from "../../styles/StyledCard";
import { FC, memo, useContext } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import IconImage from "../Other/IconImage";
import { HugeText, LittleNormalText, MassiveText, NormalText, SubText, SubTitleText } from "../../styles/StyledText";
import { Dimensions } from "react-native";
import { Icon } from "../Buttons/IconButtons";
import { displayTree } from "../../primitives/BasicsMethods";
import { HabitsContext } from "../../data/HabitContext";
import ProgressBar from "../Progress/ProgressBar";
import { getSeriazableObjectif } from "../../primitives/ObjectifMethods";
import { Objectif } from "../../types/HabitTypes";
import { FormDetailledObjectif } from "../../types/FormObjectifTypes";

interface ObjectifSkeletonBlockProps {
    objectif: FormDetailledObjectif
}

const ObjectifSkeletonBlock: FC<ObjectifSkeletonBlockProps> = memo(({objectif}) => {
    const stylesCard = cardStyle()
    const width = Dimensions.get('window').width / 1.5

    return(
        <View style={{width}}>
            <View style={[stylesCard.card, styles.objectif]}>
                <View style={styles.header}>
                    <View style={[styles.iconContainer, {borderColor: objectif.color}]}>
                        <IconImage image={objectif.icon}/>
                    </View>
                </View>

                <View style={styles.titleDescriptionContainer}>
                    <SubTitleText numberOfLines={1} text={objectif.titre}/>
                    <SubText numberOfLines={1} text={objectif.description}/>
                </View>

                <View style={styles.progressContainer}>
                    <View style={{flex: 1}}>
                        <ProgressBar progress={0} color={objectif.color}/>
                    </View>

                    <LittleNormalText text={"%"} bold/>
                </View>


            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    objectif: {
        gap: 20,
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

    progressContainer:{
        display: "flex",
        flexDirection: "column",
        gap: 10
    }
})

export default ObjectifSkeletonBlock