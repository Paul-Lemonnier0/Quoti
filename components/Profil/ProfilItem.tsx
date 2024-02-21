import { Image } from "react-native"
import { View } from "react-native"
import { SubText, SubTitleText } from "../../styles/StyledText"
import { StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native"
import { User } from "firebase/auth"
import { FC } from "react"

interface ProfilItemProps {
    user: User,
    onPress: () => void
}

const ProfilItem: FC<ProfilItemProps> = ({ user, onPress }) => {

    const handleNavigationToDetailsScreen = () => {
        //navigation.navigate("UserDetailsScreen", {detailledUser: user})
        onPress()
    }

    return (
        <TouchableOpacity onPress={handleNavigationToDetailsScreen}
         style={styles.container}>
            <Image source={{ uri: user?.photoURL ?? undefined }} style={styles.image} />

            <View style={styles.detailsContainer}>
                <SubTitleText text={user.displayName} />
                <SubText text={user.email} />
            </View>
        </TouchableOpacity>
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
        gap: 5
    }
})

export default ProfilItem