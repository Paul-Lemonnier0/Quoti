import {StyleSheet, View, ViewStyle} from 'react-native';
import { useThemeColor } from '../../components/Themed';
import Animated, { useDerivedValue } from 'react-native-reanimated';
import { FC, useContext } from 'react';
import React from "react"
import { AppContext } from '../../data/AppContext';

export interface ProgressBarProps {
    couleur: string,
    pourcentage: number,
    style: ViewStyle
}


export const ProgressBar:FC<ProgressBarProps> = ({couleur, pourcentage, style}) => {
    const {theme} = useContext(AppContext)

    const primaryColor = useThemeColor(theme, "Primary")

    const pourcentage_str = useDerivedValue(() => {
        return pourcentage + "%";
    });
    
    return (
        <View style={[style, styles.progressBar, {backgroundColor: primaryColor}]}>
            <Animated.View style={[StyleSheet.absoluteFill, {backgroundColor: couleur, width: pourcentage_str, borderRadius: 20}]}/>
        </View>
    )
}

const styles = StyleSheet.create({
    progressBar: {
        width: "100%",
        height: 4,
        borderRadius: 20,
    }
})