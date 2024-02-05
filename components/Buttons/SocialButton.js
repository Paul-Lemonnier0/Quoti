import { Image, StyleSheet, TouchableOpacity } from "react-native"
import cardStyle from "../../styles/StyledCard"
import { useThemeColor } from "../Themed"

export default SocialButton = ({image, onPress}) => {

    const secondary = useThemeColor({}, "Secondary")
    const shadowStyle = cardStyle().shadow

    return(
        <TouchableOpacity onPress={onPress} style={[shadowStyle, styles.container, {backgroundColor: secondary}]}>
            <Image source={image} style={styles.imageStyle}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        padding: 18,
        borderRadius: 300,
        alignItems: "center",
        justifyContent: "center"
    },

    imageStyle: {
        width: 25,
        height: 25,
    }
})