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
export interface ProfilButtonProps {
    user: User,
    onPress: () => void,
    noBadge?: boolean,
    modificationBadge?: boolean,
    tall?: boolean,
    huge?: boolean,
    hugeBadge?: boolean,
    disabled?: boolean
}

interface PlaceholderProfilPictureProps {
    name: string,
    tall?: boolean,
    huge?: boolean,
}

export const PlaceholderProfilPicture: FC<PlaceholderProfilPictureProps> = ({name, tall, huge}) => {
    const {theme} = useContext(AppContext)

    const secondary = useThemeColor(theme, "Secondary")
    
    return(
        <View style={{
            backgroundColor: secondary,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 200,
            width: huge ? 100 : tall ? 70 : 60,
            aspectRatio: 1
        }}>
            {
                huge ?
                <TitleText text={name.substring(0,2).toLocaleUpperCase()} style={{color: "white", fontSize: 28}}/> :
                tall ? 
                <SubTitleText bold text={name.substring(0,2).toLocaleUpperCase()} style={{color: "white"}}/> :
                <NormalText bold text={name.substring(0,2).toLocaleUpperCase()} style={{color: "white"}}/>
            }
        </View>
    )
}

const ProfilButton: FC<ProfilButtonProps> = ({ user, onPress, noBadge, tall, huge, hugeBadge, disabled, modificationBadge }) => {
    const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    
    const {theme} = useContext(AppContext)

    const font = useThemeColor(theme, "Font")
    const primary = useThemeColor(theme, "Primary")

    return (
        <View>
            <TouchableOpacity onPress={onPress} disabled={disabled}
            style={styles.container}>
                {
                    user && user.photoURL ?
                    <Image
                        cachePolicy={"memory-disk"} 
                        style={[styles.image, {width: huge ? 100 : tall ? 70 : 55}]}
                        source={{ 
                            uri: user.photoURL ?? undefined,
                        }}
                    />
                    :
                    <PlaceholderProfilPicture name={user.displayName ?? "A"} tall={tall} huge={huge}/>
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
        borderRadius: 100
    },

    detailsContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 5
    }
})

export default ProfilButton