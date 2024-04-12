import { StyleSheet, TouchableOpacity, View } from "react-native"
import { useThemeColor } from "../Themed"
import { MaterialCommunityIcons} from '@expo/vector-icons'; 
import { NormalText, SubTitleText } from "../../styles/StyledText"
import { Icon, IconProvider } from "../Buttons/IconButtons";
import { getHeightResponsive, getWidthResponsive } from "../../styles/UtilsStyles";
import { FC, useContext } from "react";
import React from "react"
import { AppContext } from "../../data/AppContext";

export interface DatePickerBasicProps {
    onPress: () => void,
    label: string,
    boldLabel?: boolean,
    semiBoldLabel?: boolean,
    semiBold?: boolean
}

export interface DatePickerProps extends DatePickerBasicProps {
    date: Date
}

export interface DateOptions {
    day?: 'numeric',
    weekday?: 'long' | 'short',
    month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
    year?: 'numeric' | '2-digit';
}

export const DatePicker: FC<DatePickerProps> = ({onPress, date, label, boldLabel, semiBoldLabel, semiBold}) => {
    const {theme} = useContext(AppContext)

    const dateStringOptions: DateOptions = {day: 'numeric', weekday: 'short', month: 'long', year: 'numeric'}
    const secondary = useThemeColor(theme, "Secondary") 

    return(
        <View style={styles.dateSelectionHeader}>
            {boldLabel ? <SubTitleText text={label}/> : 
                        <NormalText bold={semiBoldLabel} text={label}/>}

            <View style={styles.dateSelectionButtonContainer}>
                <TouchableOpacity onPress={onPress} style={[styles.dateSelectionButton, {backgroundColor: secondary}]}>
                    <NormalText bold={semiBold} text={date.toLocaleDateString('fr', dateStringOptions)}/>

                    <Icon name="calendar-range-outline" provider={IconProvider.MaterialCommunityIcons}/>

                </TouchableOpacity>
            </View>
        </View>
    )
}
 
export interface MultiDatePickerProps extends DatePickerBasicProps {
    startDate: Date,
    endDate: Date
}

export const MultiDatePicker: FC<MultiDatePickerProps> = ({onPress, startDate, endDate, label, boldLabel, semiBoldLabel, semiBold}) => {
    const {theme} = useContext(AppContext)

    const secondary = useThemeColor(theme, "Secondary") 

    const startDateStringOptions: DateOptions = {day: 'numeric'}

    const endDateStringOptions: DateOptions = {day: 'numeric', month: "short", year: "numeric"}
    let endDateString: string;

    if(endDate.toISOString() === startDate.toISOString()){
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

                    <Icon name="calendar-range-outline" provider={IconProvider.MaterialCommunityIcons}/>

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
        marginTop: 0
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