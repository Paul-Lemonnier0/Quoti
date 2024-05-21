import React, { FC, useContext } from "react";
import { PostStateType } from "../../firebase/Firestore_Posts_Primitives";
import { View } from "react-native";
import { Icon, IconProvider } from "../Buttons/IconButtons";
import { LittleNormalText, NormalText } from "../../styles/StyledText";
import { AppContext } from "../../data/AppContext";
import { useThemeColor } from "../Themed";

interface PostStateObjType {
    text: string,
    icon: string,
    color: string,
    fontColor: string
    provider: IconProvider
}

interface PostStateProps {
    state: PostStateType,
    outline?: boolean
}

export const PostState: FC<PostStateProps> = ({state}) => {
    
    const {theme} = useContext(AppContext)
    const errorColor = useThemeColor(theme, "Error")
    const font = useThemeColor(theme, "Font")
    const secondary = useThemeColor(theme, "Secondary")
    const fontContrast = useThemeColor(theme, "FontContrast")
    const successColor = useThemeColor(theme, "Success")

    const PostStateObj: {[key in PostStateType]: PostStateObjType} = {
        [PostStateType.Done]: {
            text:  "Accomplie",
            icon: "check",
            color: font,
            fontColor: fontContrast,
            provider: IconProvider.Feather
        },
        [PostStateType.Ended]: {
            text: "Terminée",
            icon: "x",
            color: errorColor,
            fontColor: errorColor,
            provider: IconProvider.Feather
        },
        [PostStateType.Started]: {
            text: "Nouveauté",
            icon: "activity",
            color: successColor,
            fontColor: successColor,
            provider: IconProvider.Feather
        }
    }
    

    const postStateObj = PostStateObj[state]

    return (
        <View>
            <View style={{flexDirection: "row", gap: 8, alignItems: "center", borderColor: postStateObj.color, borderWidth: 2, borderRadius: 10, padding: 10}}>
                <Icon name={postStateObj.icon} provider={postStateObj.provider} color={postStateObj.color} size={20}/>
                <LittleNormalText bold text={postStateObj.text} style={{color: postStateObj.color}}/>
            </View>
        </View>
    )
}