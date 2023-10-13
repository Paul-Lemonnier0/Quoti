import { StyleSheet } from "react-native"
import { useThemeColor } from "../components/Themed"
import cardStyle from "./StyledCard"

export default BottomMenuStyle = () => {
    const secondary = useThemeColor({}, "Secondary")
    const contrast = useThemeColor({}, "Contrast")

    const shadowStyle = cardStyle()

    return StyleSheet.create(
        {
            bottomMenuStyle: [{
                backgroundColor: "#000000",
                marginHorizontal: 50,
                position: "absolute", 
                bottom: 35, 
                borderRadius: 20,
                borderTopWidth: 0, 
                paddingBottom: 0,
            }, shadowStyle.shadow]
    })
}