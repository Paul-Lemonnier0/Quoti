import { Image } from "react-native"
import { View } from "react-native"
import { SubText, SubTitleText } from "../../styles/StyledText"
import { StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native"
import { BackgroundIconButton, BorderIconButton, IconProvider } from "../Buttons/IconButtons"
import { acceptFriendInvitation } from "../../firebase/Firestore_User_Primitives"
import { useContext } from "react"
import { UserContext } from "../../data/UserContext"

export default RequestFriendItem = ({ friend }) => {

    const {user} = useContext(UserContext)

    const handleAcceptFriendRequest = async() => {
        await acceptFriendInvitation(user.email, friend.uid)
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: friend.photoURL }} style={styles.image} />

            <View style={styles.detailsContainer}>
                <SubTitleText text={friend.displayName} />
                <SubText text={friend.email} numberOfLines={1}/>
            </View>
            
            <View>
                <BorderIconButton name="check" provider={IconProvider.Feather} onPress={handleAcceptFriendRequest}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        gap: 20, 
        alignItems: "center",

    },

    image: {
        width: 60,
        height: 60,
        borderRadius: 100
    },

    detailsContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 5,
        flex: 1
    }
})