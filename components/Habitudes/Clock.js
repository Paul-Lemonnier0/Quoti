import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { NormalText } from '../../styles/StyledText'
import { useThemeColor } from '../Themed'

export const CustomDurationIndicator = ({duration}) => {

    const font = useThemeColor({}, "Font")
    const fontGray = useThemeColor({}, "FontGray")

    const hours = Math.floor(duration / 60)
    const remainingMinutes = duration % 60

    const isHourNull = hours === 0
    const isMinutesNull = remainingMinutes === 0

    const formatedDuration = isHourNull ? remainingMinutes + "min" : (hours + "h" + (isMinutesNull ? "" : remainingMinutes))

    return (
        <View style={styles.clockContainer}>
            <Feather name="clock" size={24} color={font} />
            <NormalText text={formatedDuration} />
        </View>
    )
}

const styles = StyleSheet.create({
    clockContainer: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 5
    }
})