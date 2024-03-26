import { FC } from "react"
import { View, StyleSheet } from "react-native"
import React from "react"

export interface BadgeProps {
    huge?: boolean,
    fillColor: string,
    bgColor: string 
}

const Badge: FC<BadgeProps> = ({huge, fillColor, bgColor}) =>
{

    const styles = StyleSheet.create(
        {
            backgroundBadgeStyle: {
                position: "absolute", 
                marginTop: huge ? 0 : -2.5, 
                marginRight: huge ? 0 :-2.5,
                height: huge ? 25 : 18, 
                width: huge ? 25 :18,
                right: 0, 
                top: 0, 
                borderRadius: 20, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center"
            },

            badgeStyle: {
                height: huge ? 15 : 10,
                width: huge ? 15 : 10,
                borderRadius: 20
            }
        }
    )

    return(

        <View style={[styles.backgroundBadgeStyle, {backgroundColor: bgColor}]}>
          <View style={[styles.badgeStyle, {backgroundColor: fillColor}]}/>
        </View>

    )
}

export default Badge