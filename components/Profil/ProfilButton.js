import { Image, View, StyleSheet, TouchableOpacity } from "react-native"
import Badge from "../Other/Badge"
import { useThemeColor } from "../Themed"
import cardStyle from "../../styles/StyledCard"
import { useCallback, useContext } from "react"
import { UserContext } from "../../data/UserContext"
import { useNavigation } from "@react-navigation/native"
import { HugeText, NormalText, TitleGrayText, TitleText } from "../../styles/StyledText"

export const ProfilButton = () => {
    
    const {user} = useContext(UserContext)

    const primary = useThemeColor({}, "Primary")
    const font = useThemeColor({}, "Font")
    const secondary = useThemeColor({}, "Secondary")

    const stylesShadow = cardStyle()

    const navigation = useNavigation()

    const onPress = useCallback(() => {
        navigation.navigate("ProfilDetailsScreen");
      }, []);

    const hasNotifications = user.friendRequests && user.friendRequests.length > 0

    const PLACEHOLDER_PROFIL_PICTURE = require("../../img/TestVrai.png")


    const RenderPlaceholderProfilPicture = () => {
        const firstUsernameLetter = user.displayName.substr(0,1)

        return(
            <View style={[styles.imageStyle, {justifyContent: "center", alignItems: "center", backgroundColor: secondary }]}>
                <TitleText text={firstUsernameLetter}/>
            </View>
        )
    }

    return(
        <TouchableOpacity onPress={onPress} accessibilityLabel={"profilPictureBtn"}>
            <View style={[styles.imageContainerStyle, stylesShadow.shadow, {backgroundColor: primary}]}>
                {
                    user.photoURL ?

                    <Image style={[styles.imageStyle, { backgroundColor: secondary }]} source={{uri: user.photoURL}}/>
                    :
                    <RenderPlaceholderProfilPicture/>
                }


                { hasNotifications && <Badge fillColor={font} bgColor={secondary}/> }

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