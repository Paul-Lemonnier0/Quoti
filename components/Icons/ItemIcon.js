import { StyleSheet, View } from "react-native"
import IconImage from "../Other/IconImage"

export default ItemIcon = ({icon, color, children}) => {
    return(
        <View style={[styles.iconContainer, {borderColor: color}]}>
            {children ? children : 
                <IconImage image={icon}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    iconContainer: {
        justifyContent: "center", 
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 15 ,
    },
})