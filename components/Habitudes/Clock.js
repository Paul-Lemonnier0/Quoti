import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { LittleNormalText, NormalGrayText, NormalText, SubText, SubTitleText, TitleText } from '../../styles/StyledText'
import { useThemeColor } from '../Themed'

const Clock = ({minutes, isFinished}) => {

    const fontGray = useThemeColor({}, "FontGray")

    if(isFinished)
    {
        return (
            <View style={styles.clockContainer}>
                <Feather name="clock" size={24} color={fontGray} />
                <SubText text={minutes + "min"} />
            </View>
        )
    }

    else
    {
        return (
            <View style={styles.clockContainer}>
                <Feather name="clock" size={24} color={"white"} />
                <LittleNormalText text={minutes} />
            </View>
        )
    }
}

export const CustomDurationIndicator = ({duration, isFinished}) => {

    const font = useThemeColor({}, "Font")
    const fontGray = useThemeColor({}, "FontGray")

    const hours = Math.floor(duration / 60)
    const remainingMinutes = duration % 60

    const isHourNull = hours === 0
    const isMinutesNull = remainingMinutes === 0

    const formatedDuration = isHourNull ? remainingMinutes + "min" : (hours + "h" + (isMinutesNull ? "" : remainingMinutes))

    return (
        <View style={styles.clockContainer}>
            <Feather name="clock" size={30} color={font} />
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

export default Clock