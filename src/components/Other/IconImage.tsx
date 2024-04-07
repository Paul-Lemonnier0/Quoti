import { StyleSheet } from "react-native";
import { Image } from "react-native"
import HabitIcons from "../../data/HabitIcons";
import { View } from "react-native";
import { useThemeColor } from "../Themed";
import { getHeightResponsive, getWidthResponsive } from "../../styles/UtilsStyles";
import { FC } from "react";
import React from "react"
import { AppContext } from "../../data/AppContext";

export interface IconImageProps {
  image: string
}

const IconImage: FC<IconImageProps> = ({image}) => {

    const img = HabitIcons[image]

    return(
        <View style={[styles.imageContainer]}>
            <Image source={img} style={styles.imageStyle}/>
        </View>
    )
}

const styles = StyleSheet.create({

    imageContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: getWidthResponsive(50),
      aspectRatio: 1,
      height: getHeightResponsive(54),
    },
    imageStyle: {
      alignSelf: "center",
      justifyContent: "center",
      resizeMode: "contain",
      aspectRatio: 1,
      height: "50%"
    },
  });


  export default IconImage