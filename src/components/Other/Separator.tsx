import { View } from "react-native"
import { useThemeColor } from "../Themed"
import { FC } from "react"
import React from "react"

export interface SeparatorProps {
    color?: string,
    opacity?: number,
    height?: number,
    borderRadius?: number
}

const Separator: FC<SeparatorProps> = ({color, opacity = 0.25, height = 2, borderRadius = 2}) => {
    
    const tertiary = useThemeColor({}, "Tertiary")
    
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