import { Image } from "expo-image"
import { View } from "react-native"
import { SubText, SubTitleText } from "../../styles/StyledText"
import { StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native"
import { User } from "firebase/auth"
import { FC, useContext } from "react"
import React from "react"
import { PlaceholderProfilPicture } from "./ProfilButton"
import { Icon, IconButton, IconProvider } from "../Buttons/IconButtons"
import { UserType } from "../../data/UserContext"
import { AppContext } from "../../data/AppContext"
import { useThemeColor } from "../Themed"
import { UserDataBase } from "../../firebase/Database_User_Primitives"

export interface ProfilItemProps {
    user: UserType | UserDataBase,
    onPress?: () => void,
    handleAccept?: () => void,
    handleRefuse?: () => void,
    isPrimary?: boolean,
    isSelected?: boolean,
    expand?: boolean
}

const ProfilItem: FC<ProfilItemProps> = ({ 
    user,
    onPress, 
    isPrimary, 
    handleAccept, 
    handleRefuse,
    isSelected,
    expand,
}) => {

    const {theme} = useContext(AppContext)
    const fontGray = useThemeColor(theme, "FontGray")
    const contrast = useThemeColor(theme, "Contrast")

    const handleNavigationToDetailsScreen = () => {
        //navigation.navigate("UserDetailsScreen", {detailledUser: user})
        onPress ? onPress() : undefined
    }

    if(!user) return null

    return (
        <TouchableOpacity disabled={!onPress} onPress={handleNavigationToDetailsScreen} style={styles.container}>
            <View style={styles.subContainer}>
                {  
                    user.photoURL ?
                         <Image placeholder={"disk"} source={{ uri: user.photoURL}} 
                             style={[styles.image, {borderColor: isSelected ? "transparent" : "transparent"}]} />
                         : 
                        
                        <PlaceholderProfilPicture borderColor={contrast} isSelected={isSelected} isPrimary={isPrimary} name={user.displayName ?? ""}/>
                
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
                expand &&
                <View style={styles.iconContainer}>
                    <Icon name="chevron-right" color={fontGray} provider={IconProvider.Feather}/>
                </View>
            }
            
            {
                handleAccept && handleRefuse &&
                <View style={styles.iconContainer}>
                    <IconButton onPress={handleAccept} name="check" provider={IconProvider.Feather}/>
                    <IconButton onPress={handleRefuse} name="x" provider={IconProvider.Feather}/>
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
        borderRadius: 100,
        borderWidth: 2
    },

    detailsContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 5
    }
})

export default ProfilItem