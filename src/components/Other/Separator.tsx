import { View } from "react-native"
import { useThemeColor } from "../Themed"
import { FC, useContext } from "react"
import React from "react"
import { AppContext } from "../../data/AppContext"

export interface SeparatorProps {
    color?: string,
    opacity?: number,
    height?: number,
    borderRadius?: number
}

const Separator: FC<SeparatorProps> = ({color, opacity = 0.25, height = 2, borderRadius = 2}) => {
    const {theme} = useContext(AppContext)

    const tertiary = useThemeColor(theme, "Tertiary")
    
    return(
        <View style={
            {
                backgroundColor: color ?? tertiary, 
                height, 
                opacity,
                borderRadius
            }
        }/>
    )
}

export default Separator