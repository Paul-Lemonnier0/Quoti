import { View } from "react-native"
import { useThemeColor } from "../Themed"

export default Separator = ({color, opacity = 0.25, height = 2, borderRadius = 2}) => {
    
    const tertiary = useThemeColor({}, "Tertiary")
    
    return(
        <View style={
            {
                backgroundColor: color ? color : tertiary, 
                height: height, 
                opacity: opacity,
                borderRadius: borderRadius
            }
        }/>
    )
}