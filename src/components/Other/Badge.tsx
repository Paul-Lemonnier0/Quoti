import { FC, useContext } from "react"
import { View, StyleSheet } from "react-native"
import React from "react"
import { Icon, IconProvider } from "../Buttons/IconButtons"
import { AppContext } from "../../data/AppContext"
import { useThemeColor } from "../Themed"

export interface BadgeProps {
    huge?: boolean,
    fillColor: string,
    bgColor: string,
    modificationBadge?: boolean
}

const Badge: FC<BadgeProps> = ({huge, fillColor, bgColor, modificationBadge}) =>
{
    const {theme} = useContext(AppContext)
    const fontContrast = useThemeColor(theme, "FontContrast")

    const styles = StyleSheet.create(
        {
            backgroundBadgeStyle: {
                position: "absolute", 
                marginTop: (huge || modificationBadge) ? 0 : -1.5, 
                marginRight: (huge || modificationBadge) ? 0 : -1.5,
                height: (huge || modificationBadge) ? 25 : 15, 
                aspectRatio: 1,
                right: 0, 
                top: modificationBadge ? undefined : 0, 
                bottom: modificationBadge ? 0 : undefined, 
                borderRadius: 20, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center"
            },

            badgeStyle: {
                height: (huge || modificationBadge) ? 25 : 10, 
                aspectRatio: 1,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center"
            }
        }
    )

    return(

        <View style={[styles.backgroundBadgeStyle, {backgroundColor: bgColor}]}>
          {
            modificationBadge ? 
            <View style={[styles.badgeStyle, {backgroundColor: fillColor}]}>
                <Icon name="mode-edit" provider={IconProvider.MaterialIcons} color={fontContrast} size={13}/>
            </View>
            :
            <View style={[styles.badgeStyle, {backgroundColor: fillColor}]}/>
        }
        </View>
    )
}

export default Badge