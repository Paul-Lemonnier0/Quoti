import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ProgressBar } from "../Graphs/ProgressBar";
import { SubText, SubTitleText } from "../../styles/StyledText";
import shadowStyle from "../../styles/StyledShadow";
import { useThemeColor } from "../Themed";

import { useNavigation } from "@react-navigation/native";


export const HabitudeBlock = ({titre, pourcentage, couleur}) => {

    const secondary = useThemeColor({}, "Secondary")
    const shadowColor = useThemeColor({}, "ShadowColor")
    const navigation = useNavigation();
    const stylesShadow = shadowStyle(shadowColor);

    const handlePress = () =>
    {
        navigation.navigate("HabitudeScreen", {titre: titre, couleur: couleur, pourcentage: pourcentage});
    }

    return(

    <TouchableOpacity style={[styles.TouchableScreen, stylesShadow.shadow]} onPress={handlePress} accessibilityLabel={titre}>
        <View 
        style={
        [
            styles.Habits,
            {
            backgroundColor: secondary
            }
        ]}>
            <SubTitleText text={titre}/>
            <SubText text={"complété à " + pourcentage + "%"}/>
            <ProgressBar pourcentage={pourcentage} couleur={couleur}/>
        </View>
    </TouchableOpacity>)
};

const styles = StyleSheet.create(
    {    
        Habits: {
            flex: 1,
            margin: 10,
            padding: 20,
            borderRadius: 10,
            height: 150,
            justifyContent: "space-around",
        },

        TouchableScreen: {
            flex: 1,
        }
    }
)