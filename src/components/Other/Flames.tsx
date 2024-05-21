import React, { FC } from 'react'
import { Icon, IconProvider } from '../Buttons/IconButtons'
import { HugeText, TitleText } from '../../styles/StyledText'
import { StyleSheet, View } from 'react-native'

type FlamesProps = {
    color: string,
    value: number
}

const StreakFlame: FC<FlamesProps> = ({value, color}) => {
  return (
    <View style={styles.streakContainer}>
        <Icon provider={IconProvider.FontAwesome5} size={24} color={color} name="fire"/>
        <TitleText text={value}/>
    </View>
  )
}

const styles = StyleSheet.create({
    streakContainer: {
        display: "flex", 
        flexDirection: "row", 
        alignItems: "center", 
        gap: 10,
        marginLeft: 5
    }
})

export default StreakFlame