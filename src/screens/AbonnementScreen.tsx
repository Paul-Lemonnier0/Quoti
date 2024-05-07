import { View } from "react-native"
import { UsualScreen } from "../components/View/Views"
import React from "react"
import { HugeText } from "../styles/StyledText"

export const AbonnementScreen = () => {
    return(
        <UsualScreen>
            <View>
                <HugeText text={"Abonnement"}/>
            </View>
        </UsualScreen>
    )
}