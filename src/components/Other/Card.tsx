import { View, Text, TouchableOpacity, ViewStyle, StyleSheet, Animated } from 'react-native'
import React, { FC, ReactNode, useContext } from 'react'
import { AppContext } from '../../data/AppContext'
import { useThemeColor } from '../Themed'

interface CustomCardProps {
    children: ReactNode,
    flex?: boolean,
    isPrimary?: boolean,
    onPress?: () => void,
    style?: ViewStyle,
    animated?: boolean
}   

const CustomCard: FC<CustomCardProps> = ({
    children, 
    flex, 
    onPress, 
    isPrimary,
    style,
    animated
}) => {
    const {theme} = useContext(AppContext)

    const secondary = useThemeColor(theme, "Secondary")
    const primary = useThemeColor(theme, "Primary")

    if(animated) {
        <Animated.View style={style}>
            <TouchableOpacity disabled={!onPress} onPress={onPress} 
                style={[styles.card,
                    {
                        backgroundColor: isPrimary ? primary : secondary,
                        flex: flex ? 1 : 0,
                    }
                ]
            }>
                {children}
            </TouchableOpacity>
        </Animated.View>
    }

    return (
        <TouchableOpacity disabled={!onPress} onPress={onPress} 
            style={[styles.card,
                {
                    backgroundColor: isPrimary ? primary : secondary,
                    flex: flex ? 1 : 0,
                },
                style
            ]
        }>
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        padding: 20,
        justifyContent: "flex-start",
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity:  0.08,
        shadowRadius: 8,
        elevation: 3
    }
})

export default CustomCard
