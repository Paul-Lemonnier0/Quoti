import {View, Image, StyleSheet} from "react-native"
import { useThemeColor } from "../Themed"
import Badge from "../Other/Badge"

export const UserProfil = ({profil, isBadgeHide}) => {

    const contrast = useThemeColor({}, "Contrast")
    const secondary = useThemeColor({}, "Secondary")

    return(
        <View style={styles.container}>

            <Image style={
                [
                styles.imageStyle,
                {
                    backgroundColor: secondary
                }]} 

                source={profil.image}>
            </Image>

            {!isBadgeHide ?? <Badge huge={true} fillColor={contrast} bgColor={secondary}/>}
    
      </View>
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
        borderRadius: 100,
      },

      container: {
        borderRadius: 100,
        width: 100, 
        height: 100
      },
});