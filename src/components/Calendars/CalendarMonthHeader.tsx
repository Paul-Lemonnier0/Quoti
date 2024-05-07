import { View } from "react-native";
import { SubTitleText } from "../../styles/StyledText";
import { FC } from "react";
import React from "react"

export interface CalendarMonthHeaderProps {
    currentDateString: string | undefined
}

export interface DateOptions {
    month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
    year?: 'numeric' | '2-digit';
}

const opt: DateOptions = {
    month: 'long',
    year: 'numeric',
};

const CalendarMonthHeader: FC<CalendarMonthHeaderProps> = ({currentDateString}) => {

    const currentDate: Date = currentDateString ? new Date(currentDateString) : new Date()
    const header: string = currentDate.toLocaleDateString('fr', opt);

    return (
        <View>
          <SubTitleText bold text={header}/>
        </View>
    );
}

export default CalendarMonthHeader