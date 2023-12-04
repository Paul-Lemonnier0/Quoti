import { View } from "react-native"
import { useThemeColor } from "../Themed"

export default Separator = ({color, opacity = 0.25, height = 2, borderRadius = 2}) => {
    
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

export const VerticalSeparator = ({color, minHeight, opacity = 0.25, width = 3, borderRadius = 2}) => {
    
    const tertiary = useThemeColor({}, "Tertiary")
    
    return(
        <View style={
            {
                backgroundColor: color ?? tertiary, 
                width, 
                opacity,
                borderRadius,
                flex: 1
            }
        }/>
    )
}