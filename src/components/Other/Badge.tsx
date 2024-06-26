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
                marginTop: 0, 
                marginRight: 0,
                height: (huge || modificationBadge) ? 24 : 15, 
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
                height: (huge || modificationBadge) ? 18 : 10, 
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

export const AddStoryBadge = () =>
    {
        const {theme} = useContext(AppContext)
        const fontContrast = useThemeColor(theme, "FontContrast")
        const contrast = useThemeColor(theme, "Contrast")
        const primary = useThemeColor(theme, "Primary")
    
        const styles = StyleSheet.create(
            {
                backgroundBadgeStyle: {
                    marginTop: 0, 
                    marginRight: 0,
                    height: 24, 
                    aspectRatio: 1,
                    borderRadius: 20, 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center"
                },
    
                badgeStyle: {
                    height: 18, 
                    aspectRatio: 1,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center"
                }
            }
        )
    
        return(
            <View style={{position: "absolute", bottom: -0, zIndex: 5000, right: 0,  alignItems: "center", justifyContent: "center"}}>
                <View style={[styles.backgroundBadgeStyle, {backgroundColor: primary}]}>
                    <View style={[styles.badgeStyle, {backgroundColor: contrast}]}>
                        <Icon name="plus" provider={IconProvider.Entypo} color={fontContrast} size={15}/>
                    </View>
                </View>
            </View>
        )
    }

export default Badge