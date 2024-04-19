import { View } from "react-native"
import { LittleNormalText, NormalText, SubText, SubTitleText, TitleText } from "../../styles/StyledText"
import { StyleSheet } from "react-native"
import { useNavigation, useTheme } from "@react-navigation/native"
import { TouchableOpacity } from "react-native"
import { User } from "firebase/auth"
import { FC, useContext } from "react"
import React from "react"
import Badge from "../Other/Badge"
import { useThemeColor } from "../Themed"
import { AppContext } from "../../data/AppContext"
import FastImage from 'react-native-fast-image';
import {Image} from "expo-image"
import { VisitInfoUser } from "../../firebase/Firestore_User_Primitives"

export interface ProfilButtonProps {
    user: User | VisitInfoUser,
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
    borderWidth?: number
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
            borderWidth: borderWidth ?? 2,
            
        }}>
            {
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
    borderColor,
    borderWidth,
    placeholderBorder
}) => {

    const {theme} = useContext(AppContext)

    const font = useThemeColor(theme, "Font")
    const primary = useThemeColor(theme, "Primary")
    const contrast = useThemeColor(theme, "Contrast")

    const width = huge ? 100 : (tall ? 70 : (small ? 45 : 60))
    const bdColor = isSelected ? contrast : (borderColor ?? "transparent")

    return (
        <View>
            <TouchableOpacity onPress={onPress} disabled={disabled}
            style={styles.container}>
                {
                    user && user.photoURL ?
                    <Image
                        cachePolicy={"disk"} 
                        style={[styles.image, {
                            width, 
                            borderWidth: borderWidth ?? 2,
                            borderColor: bdColor
                        }]}

                        source={{ 
                            uri: user.photoURL ?? undefined,
                        }}
                    />
                    :
                    <PlaceholderProfilPicture borderColor={placeholderBorder ? (borderColor ?? contrast) : "transparent"}
                        isPrimary={isPrimary} isSelected={isSelected} name={user.displayName ?? "A"} tall={tall} huge={huge}/>
                }
            </TouchableOpacity>
            {!noBadge && (modificationBadge ? <Badge huge={hugeBadge} modificationBadge fillColor={font} bgColor={primary}/> : <Badge huge={hugeBadge} fillColor={font} bgColor={primary}/>) }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        gap: 20, 
    },

    image: {
        width: 60,
        aspectRatio: 1,
        borderRadius: 100,
        borderWidth: 3
    },

    detailsContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 5
    }
})

export default ProfilButton