import { View } from "react-native"
import React, { FC, useContext } from "react"
import { FrequencyTypes } from "../../types/HabitTypes"
import { HugeText, TitleText } from "../../styles/StyledText"
import { useThemeColor } from "../Themed"
import { AppContext } from "../../data/AppContext"

interface FrequencyDetailsProps {
    frequency: FrequencyTypes,
    reccurence: number,
    occurence: number
}

export const FrequencyDetails: FC<FrequencyDetailsProps> = ({frequency, reccurence, occurence}) => {
    const {theme} = useContext(AppContext)

    const fontGray = useThemeColor(theme, "FontGray")

    const occLINKrecString = 
        (frequency === FrequencyTypes.Quotidien || frequency === FrequencyTypes.Mensuel) ? 
        "fois tous les" : "fois toutes les"

    const frequenceString = 
        frequency === FrequencyTypes.Quotidien ? "jours" :
        frequency === FrequencyTypes.Hebdo ? "semaines" :
        "mois"

    return(
        <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 10, flexWrap: 'wrap' }}>
            <HugeText text={occurence} />
            {
                occLINKrecString.split(" ").map((word) => 
                    <TitleText key={word} text={word} style={{ color: fontGray }} />
                )
            }
            {reccurence != 1 && <HugeText text={reccurence} />}
            <TitleText text={frequenceString} style={{ color: fontGray }} />
        </View>
    )
}