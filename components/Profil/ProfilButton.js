import { Image, View, StyleSheet, TouchableOpacity } from "react-native"
import Badge from "../Other/Badge"
import { useThemeColor } from "../Themed"
import cardStyle from "../../styles/StyledCard"

export const ProfilButton = ({profil, onPress}) => {

    const primary = useThemeColor({}, "Primary")
    const contrast = useThemeColor({}, "Contrast")
    const font = useThemeColor({}, "Font")
    const secondary = useThemeColor({}, "Secondary")

    const stylesShadow = cardStyle()

    return(
        <TouchableOpacity onPress={onPress} accessibilityLabel={"profilPictureBtn"}>
            <View style={[styles.imageContainerStyle, stylesShadow.shadow, {backgroundColor: primary}]}>
                <Image 
                style={
                    [
                        styles.imageStyle, { backgroundColor: secondary }
                    ]
                } 

                    source={profil.image}>

                </Image>    

                <Badge fillColor={font} bgColor={secondary}/>

            </View>
          </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
        aspectRatio: 1,
        width: "100%",
        maxHeight: "100%",
        borderRadius: 50,
      },

    imageContainerStyle: {
        borderRadius: 50,
        width: 60, 
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        
    }
});