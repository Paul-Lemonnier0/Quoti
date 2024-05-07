import React, { FC, useContext } from "react";
import { View } from "react-native";
import { FrequencyTypes } from "../../types/HabitTypes";
import { HugeText, TitleText } from "../../styles/StyledText";
import { useThemeColor } from "../Themed";
import { AppContext } from "../../data/AppContext";

interface FrequencyDetailsProps {
    frequency: FrequencyTypes;
    reccurence: number;
    occurence: number;
    daysOfWeek?: number[];
}

export const FrequencyDetails: FC<FrequencyDetailsProps> = ({
    frequency,
    reccurence,
    occurence,
    daysOfWeek
}) => {
    const { theme } = useContext(AppContext);
    const fontGray = useThemeColor(theme, "FontGray");

    const occLINKrecString = 
        frequency === FrequencyTypes.Quotidien || frequency === FrequencyTypes.Mensuel
            ? " fois tous les "
            : " fois toutes les ";

    const frequenceString = 
        frequency === FrequencyTypes.Quotidien ? "jours" :
        frequency === FrequencyTypes.Hebdo ? "semaines" :
        "mois";

    const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

    return (
        <View style={{ flexDirection: "row", alignItems: "flex-end", flexWrap: 'wrap' }}>
            <HugeText text={occurence}>
                <TitleText text={occLINKrecString} style={{ color: fontGray }} />
                {reccurence !== 1 && (!daysOfWeek || daysOfWeek.length === 0) &&
                    <HugeText text={reccurence + " "} />}

                {daysOfWeek && daysOfWeek.length > 0 && 
                    daysOfWeek.map((day, index) => <TitleText key={day} text={days[day] + (index !== daysOfWeek.length - 1 ? ", " : "")} />)}

                {(!daysOfWeek || daysOfWeek.length === 0) && 
                    <TitleText text={frequenceString} />}
            </HugeText>

        </View>
    );
};