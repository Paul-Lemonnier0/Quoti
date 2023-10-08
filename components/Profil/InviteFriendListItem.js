import { View } from "react-native"
import { SubText, SubTitleText, TitleText } from "../../styles/StyledText"
import cardStyle from "../../styles/StyledCard"
import { Image } from "react-native"
import { ProfilPicture } from "./ProfilPicture"
import { StyleSheet } from "react-native"
import { CircleBorderButton } from "../Buttons/UsualButton"
import { Feather } from "@expo/vector-icons"
import { useThemeColor } from "../Themed"

export const InviteFriendListItem = ({friend, handleInvite}) => {

    const fontGray = useThemeColor({}, "FontGray")
    const stylesCard = cardStyle()

    return(
        <View style={[stylesCard.card, styles.container]}>
            <View style={styles.innerContainer}>
                <ProfilPicture profil={friend}/>
                <View style={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                    <SubTitleText text={friend.pseudo}/>
                    <SubText text={friend.prenom + " " + friend.nom}/>
                </View>
            </View>

            <CircleBorderButton>
                <Feather name="user-plus" size={20} color={fontGray} />            
            </CircleBorderButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 15
    },

    innerContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 15
    }
})