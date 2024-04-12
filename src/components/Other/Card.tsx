import { View, Text, TouchableOpacity } from 'react-native'
import React, { FC, ReactNode, useContext } from 'react'
import { AppContext } from '../../data/AppContext'
import { useThemeColor } from '../Themed'

interface CustomCardProps {
    children: ReactNode,
    flex?: boolean,
    isPrimary?: boolean,
    onPress?: () => void
}   

const CustomCard: FC<CustomCardProps> = ({children, flex, onPress, isPrimary}) => {
    const {theme} = useContext(AppContext)

    const secondary = useThemeColor(theme, "Secondary")
    const primary = useThemeColor(theme, "Primary")

    return (
        <TouchableOpacity disabled={!onPress} onPress={onPress} style={{
            borderRadius: 20,
            backgroundColor: isPrimary ? primary : secondary,
            padding: 20,
            flex: flex ? 1 : 0,
            justifyContent: "flex-start",
            shadowColor: "#000000",
            alignSelf: "flex-start",
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity:  0.08,
            shadowRadius: 8,
            elevation: 3
        }}>
        {children}
        </TouchableOpacity>
    )
}

export default CustomCard
