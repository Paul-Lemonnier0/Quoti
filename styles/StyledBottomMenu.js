import { StyleSheet } from "react-native"
import { useThemeColor } from "../components/Themed"

export default BottomMenuStyle = () => {
    const secondary = useThemeColor({}, "Secondary")
    const contrast = useThemeColor({}, "Contrast")

    return StyleSheet.create(
        {
            bottomMenuStyle: {
                backgroundColor: "#151315",
                marginHorizontal: 25,
                position: "absolute", 
                bottom: 35, 
                borderRadius: 20,
                borderTopWidth: 0, 
                paddingBottom: 0,
                shadowColor: "#000",
                shadowOpacity: 0.5,
                shadowOffset: {
                    width: 10,
                    height: 10
                }
            }
    })
}