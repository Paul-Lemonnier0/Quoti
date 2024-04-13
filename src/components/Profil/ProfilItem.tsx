import { Image } from "expo-image"
import { View } from "react-native"
import { SubText, SubTitleText } from "../../styles/StyledText"
import { StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native"
import { User } from "firebase/auth"
import { FC } from "react"
import React from "react"
import { PlaceholderProfilPicture } from "./ProfilButton"
import { IconButton, IconProvider } from "../Buttons/IconButtons"
import { UserType } from "../../data/UserContext"

export interface ProfilItemProps {
    user: UserType,
    onPress: () => void,
    handleAcceptFriend?: () => void,
    handleRefuseFriend?: () => void,
    isPrimary?: boolean
}

const ProfilItem: FC<ProfilItemProps> = ({ user, onPress, isPrimary, handleAcceptFriend, handleRefuseFriend }) => {

    const handleNavigationToDetailsScreen = () => {
        //navigation.navigate("UserDetailsScreen", {detailledUser: user})
        onPress()
    }

    if(!user) return null

    return (
        <TouchableOpacity onPress={handleNavigationToDetailsScreen} style={styles.container}>
            <View style={styles.subContainer}>
                {
                    user.photoURL ?
                        <Image placeholder={"disk"} source={{ uri: user?.photoURL ?? undefined }} style={styles.image} />
                        :
                        <PlaceholderProfilPicture isPrimary={isPrimary} name={user.displayName ?? ""}/>
                }

                <View style={styles.detailsContainer}>
                    <SubTitleText text={user.displayName} />
                    {
                        user.firstName && user.lastName ?
                        <SubText text={user.firstName + " " + user.lastName}/>: 
                        <SubText text={""}/>
                    }
                </View>
            </View>

            {
                handleAcceptFriend && handleRefuseFriend &&
                <View style={styles.iconContainer}>
                    <IconButton onPress={handleAcceptFriend} name="check" provider={IconProvider.Feather}/>
                    <IconButton onPress={handleRefuseFriend} name="x" provider={IconProvider.Feather}/>
                </View>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        gap: 20, 
        alignItems: "center",
        justifyContent: "space-between",
    },

    subContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 20, 
        alignItems: "center",
    },

    iconContainer: {
        display: "flex",
        flexDirection: "row",
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