import { View } from "react-native"
import Separator from "../Other/Separator"
import { TextButton } from "../Buttons/UsualButton"
import { StyleSheet } from "react-native"
import React, { FC, useContext } from "react"
import { useThemeColor } from "../Themed"
import { AppContext } from "../../data/AppContext"

export interface FooterBottomSheetProps {
    text: string,
    onPress(): void
}

const FooterBottomSheet: FC<FooterBottomSheetProps> = ({text, onPress}) => {
    const {theme} = useContext(AppContext)
    const secondary = useThemeColor(theme, "Secondary")

    return(
        <View style={{gap: 10, marginTop: 0, marginHorizontal: -30, backgroundColor: secondary}}>
            <Separator opacity={0.5}/>

            <View style={styles.footer}>
                <TextButton bold extend onPress={onPress} text={text}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        justifyContent: "center", 
        alignItems: "center"
    }
})

export default FooterBottomSheet