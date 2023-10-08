import { StyleSheet } from "react-native"
import { Image } from "react-native"
import { View } from "react-native"
import { useThemeColor } from "../Themed"

export const ProfilPicture = ({profil}) => {

    const primary = useThemeColor({}, "Primary")

    return(
        <View style={[{backgroundColor: primary}, styles.imageContainer]}>
            <Image style={styles.image} source={profil.image}/>
        </View>

    )
}

const styles = StyleSheet.create({
    imageContainer: {
        width: 56,
        height: 56,
        display: "flex",
        flexDirection: "row",
        borderRadius: 50
    },

    image: {
        width: "100%",
        height: undefined,
        resizeMode: "contain",
        borderRadius: 50
    }
})