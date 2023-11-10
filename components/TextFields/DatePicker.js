import { StyleSheet, TouchableOpacity, View } from "react-native"
import { useThemeColor } from "../Themed"
import { MaterialCommunityIcons} from '@expo/vector-icons'; 
import { NormalText, SubTitleText } from "../../styles/StyledText"

export const DatePicker = ({onPress, date, label}) => {

    const dateStringOptions = {day: 'numeric', weekday: 'short', month: 'long', year: 'numeric'}
    const fontGray = useThemeColor({}, "FontGray")
    const contrast = useThemeColor({}, "Contrast")
    const secondary = useThemeColor({}, "Secondary") 

    return(
        <View style={styles.dateSelectionHeader}>
            <NormalText text={label}/>

            <View style={[styles.dateSelectionButtonContainer, {backgroundColor: secondary}]}>
                <TouchableOpacity onPress={onPress} style={[styles.dateSelectionButton, {borderColor: fontGray}]}>
                    <NormalText text={date.toLocaleDateString('fr', dateStringOptions)}/>

                    <MaterialCommunityIcons name="calendar-range-outline" size={24} color={contrast}/>

                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    dateSelectionHeader: {
        display: 'flex', 
        flexDirection: "column", 
        gap: 10, 
        marginVertical: 10
    },

    dateSelectionButtonContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%"
    },

    dateSelectionButton: {
        padding: 18, 
        borderRadius: 18,
        borderWidth: 2, 
        width: "100%", 
        borderColor: "transparent", 
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    }
})