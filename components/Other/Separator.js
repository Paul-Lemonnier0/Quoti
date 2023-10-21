import { View } from "react-native"
import { useThemeColor } from "../Themed"

export default Separator = ({color, opacity = 0.25, height = 2, borderRadius = 2}) => {
    
    const fontGray = useThemeColor({}, "FontGray")
    
    return(
        <View style={
            {
                backgroundColor: color ? color : "#bfbfbf", 
                height: height, 
                opacity: opacity,
                borderRadius: borderRadius
            }
        }/>
    )
}