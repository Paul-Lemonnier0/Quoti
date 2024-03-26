import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, useColorScheme } from "react-native"
import cardStyle from "../../styles/StyledCard"
import { useThemeColor } from "../Themed"
import React from "react"

export enum SocialConnectionWay {
    Google = "Google",
    Facebook = "Facebook",
}

export interface SocialButtonProps {
    provider: SocialConnectionWay,
    onPress(): void
}



const SocialButton: React.FC<SocialButtonProps> = ({provider, onPress}) => {

    const colorScheme = useColorScheme()

    const secondary = useThemeColor({}, "Secondary")
    const shadowStyle = cardStyle().shadow

    let img: ImageSourcePropType = require("../../img/Auth/Google.png");

    switch(provider){
        case SocialConnectionWay.Facebook:
            img = colorScheme === "dark" ? require("../../img/Auth/Facebook-white.png") : require("../../img/Auth/Facebook-blue.png")
    }

    return(
        <TouchableOpacity onPress={onPress} style={[shadowStyle, styles.container, {backgroundColor: secondary}]}>
            <Image source={img} style={styles.imageStyle}/>
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

export default SocialButton