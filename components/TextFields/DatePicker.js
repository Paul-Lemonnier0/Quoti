import { StyleSheet, TouchableOpacity, View } from "react-native"
import { useThemeColor } from "../Themed"
import { MaterialCommunityIcons} from '@expo/vector-icons'; 
import { NormalText, SubTitleText } from "../../styles/StyledText"
import { Icon } from "../Buttons/IconButtons";
import { getHeightResponsive, getWidthResponsive } from "../../styles/UtilsStyles";

export const DatePicker = ({onPress, date, label, boldLabel, semiBoldLabel}) => {

    const dateStringOptions = {day: 'numeric', weekday: 'short', month: 'long', year: 'numeric'}
    const secondary = useThemeColor({}, "Secondary") 

    return(
        <View style={styles.dateSelectionHeader}>
            {boldLabel ? <SubTitleText text={label}/> : 
                        <NormalText bold={semiBoldLabel} text={label}/>}

            <View style={styles.dateSelectionButtonContainer}>
                <TouchableOpacity onPress={onPress} style={[styles.dateSelectionButton, {backgroundColor: secondary}]}>
                    <NormalText text={date.toLocaleDateString('fr', dateStringOptions)}/>

                    <Icon name="calendar-range-outline" provider={"MaterialCommunityIcons"}/>

                </TouchableOpacity>
            </View>
        </View>
    )
}

export const MultiDatePicker = ({onPress, startDate, endDate, label, boldLabel, semiBoldLabel, semiBold}) => {

    const secondary = useThemeColor({}, "Secondary") 

    let startDateStringOptions = {day: 'numeric'}

    const endDateStringOptions = {day: 'numeric', month: "short", year: "numeric"}
    let endDateString;

    if(endDate.toDateString() === startDate.toDateString()){
        endDateString = "?"
        startDateStringOptions["month"] = "short"
        startDateStringOptions["year"] = "numeric"
    }

    else {
        if(endDate.getMonth() !== startDate.getMonth()){
            startDateStringOptions["month"] = "short"
        }

        if(endDate.getFullYear() !== startDate.getFullYear()){
            startDateStringOptions["year"] = "numeric"
        }

        endDateString = endDate.toLocaleDateString("fr", endDateStringOptions)
    }

    const startDateString = startDate.toLocaleDateString("fr", startDateStringOptions)

    return(
        <View style={styles.dateSelectionHeader}>
            {boldLabel ? <SubTitleText text={label}/> : 
                        <NormalText bold={semiBoldLabel} text={label}/>}

            <View style={styles.dateSelectionButtonContainer}>
                <TouchableOpacity onPress={onPress} style={[styles.dateSelectionButton, {backgroundColor: secondary}]}>
                    <NormalText bold={semiBold} text={startDateString + " - " + endDateString}/>

                    <Icon name="calendar-range-outline" provider={"MaterialCommunityIcons"}/>

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
        width: "100%",

    },

    dateSelectionButton: {
        paddingHorizontal: getWidthResponsive(20), 
        paddingVertical: getHeightResponsive(20), 
        borderRadius: getWidthResponsive(18), 
        width: "100%", 
        borderColor: "transparent", 
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    }
})