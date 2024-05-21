import { View } from "react-native"
import { LittleNormalText, NormalText, SubText, SubTitleText, TitleText } from "../../styles/StyledText"
import { StyleSheet } from "react-native"
import { useNavigation, useTheme } from "@react-navigation/native"
import { TouchableOpacity } from "react-native"
import { User } from "firebase/auth"
import { FC, useContext } from "react"
import React from "react"
import Badge, { AddStoryBadge } from "../Other/Badge"
import { useThemeColor } from "../Themed"
import { AppContext } from "../../data/AppContext"
import FastImage from 'react-native-fast-image';
import {Image} from "expo-image"
import { VisitInfoUser } from "../../firebase/Firestore_User_Primitives"
import { UserDataBase } from "../../firebase/Database_User_Primitives"
import { auth } from "../../firebase/InitialisationFirebase"

export interface ProfilButtonProps {
    user: User | VisitInfoUser | UserDataBase,
    onPress: () => void,
    noBadge?: boolean,
    modificationBadge?: boolean,
    tall?: boolean,
    huge?: boolean,
    hugeBadge?: boolean,
    disabled?: boolean,
    isSelected?: boolean,
    isPrimary?: boolean,
    small?: boolean,
    borderColor?: string,
    placeholderBorder?: boolean,
    borderWidth?: number,
    story?: boolean,
    allStoriesSeen?: boolean,
    label?: string
}

interface UserProfilPictureProps {
    user: User | VisitInfoUser | UserDataBase,
    width: number
}

export const UserProfilPicture: FC<UserProfilPictureProps> = ({width, user}) => {
    return(
        <Image cachePolicy={"disk"} style={[styles.image, {width}]} source={{ uri: user.photoURL ?? undefined }}/>
    )
}

interface PlaceholderProfilPictureProps {
    name: string,
    tall?: boolean,
    huge?: boolean,
    isPrimary?: boolean,
    isSelected?: boolean,
    small?: boolean,
    borderColor?: string,
    borderWidth?: number
}

export const PlaceholderProfilPicture: FC<PlaceholderProfilPictureProps> = ({
    name, 
    isPrimary, 
    small, 
    tall, 
    huge, 
    isSelected,
    borderColor,
    borderWidth
}) => {
    const {theme} = useContext(AppContext)

    const secondary = useThemeColor(theme, "Secondary")
    const primary = useThemeColor(theme, "Primary")
    const contrast = useThemeColor(theme, "Contrast")
    const font = useThemeColor(theme, "Font")

    return(
        <View style={{
            backgroundColor: isPrimary ? primary : secondary,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 200,
            width: huge ? 100 : (tall ? 70 : (small ? 45  : 60)),
            aspectRatio: 1,
            borderColor: isSelected ? contrast : (borderColor ?? "transparent"),
            borderWidth: borderWidth ?? 3,
            
        }}>
            {
                small ?
                <LittleNormalText bold text={name.substring(0,2).toLocaleUpperCase()} style={{color: font}}/> :
                huge ?
                <TitleText text={name.substring(0,2).toLocaleUpperCase()} style={{color: font, fontSize: 28}}/> :
                tall ? 
                <SubTitleText bold text={name.substring(0,2).toLocaleUpperCase()} style={{color: font}}/> :
                <NormalText bold text={name.substring(0,2).toLocaleUpperCase()} style={{color: font}}/>
            }
        </View>
    )
}

const ProfilButton: FC<ProfilButtonProps> = ({ 
    user, 
    onPress, 
    noBadge, 
    tall, 
    huge, 
    hugeBadge, 
    disabled, 
    modificationBadge,
    isSelected,
    isPrimary,
    small,
    borderColor: bdColor,
    borderWidth: bdWidth,
    allStoriesSeen,
    story,
    label
}) => {

    const {theme} = useContext(AppContext)

    const font = useThemeColor(theme, "Font")
    const primary = useThemeColor(theme, "Primary")
    const contrast = useThemeColor(theme, "Contrast")
    const tertiary = useThemeColor(theme, "Tertiary")

    const width = huge ? 100 : (tall ? 70 : (small ? 45  : 60))
    const backgroundColor = isSelected ? contrast : (bdColor ?? "transparent")
    const borderWidth = bdWidth ?? 2

    const storyStyle = {
        borderColor: allStoriesSeen ? tertiary : contrast,
        borderWidth: 3,
        padding: 4
    }

    const isCurrentUser = auth.currentUser && user.uid === auth.currentUser.uid

    const globalWidth = label ? 80 : undefined

    return (
        <View style={{flexDirection: "column", alignItems: "center", gap: 5, maxWidth: globalWidth, width: globalWidth}}>
            <TouchableOpacity onPress={onPress} disabled={disabled} style={{flexDirection: "column", alignItems: "center"}}>
                <View
                    style={[styles.container, { backgroundColor,  borderWidth, borderColor: backgroundColor }, story ? storyStyle : undefined]}>
                    {
                        user && user.photoURL ?
                        <UserProfilPicture width={width} user={user}/> :
                        <PlaceholderProfilPicture isSelected={isSelected} name={user.displayName ?? "A"} 
                            isPrimary={isPrimary} small={small} tall={tall} huge={huge}/>
                    }
                </View>
                {
                    !noBadge && 
                        <Badge huge={hugeBadge} modificationBadge={modificationBadge} fillColor={font} bgColor={primary}/>
                }
                {
                    story && isCurrentUser &&
                        <AddStoryBadge/>
                }
            </TouchableOpacity>
            {
                label &&
                <LittleNormalText bold text={label} style={{fontSize: 14}} numberOfLines={1}/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        gap: 20, 
        borderRadius: 500, 
    },

    image: {
        aspectRatio: 1,
        borderRadius: 100,
    },

    detailsContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 5
    }
})

export default ProfilButton