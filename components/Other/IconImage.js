import { StyleSheet } from "react-native";
import { Image } from "react-native"
import HabitIcons from "../../data/HabitIcons";
import { View } from "react-native";
import { useThemeColor } from "../Themed";

export default IconImage = ({image}) => {

    const img = HabitIcons[image]
    const primary = useThemeColor({}, "Primary")

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
      borderRadius: 50,
      aspectRatio: 1,
      height: 54,
    },
    imageStyle: {
      alignSelf: "center",
      justifyContent: "center",
      resizeMode: "contain",
      aspectRatio: 1,
      height: "50%"
    },
  });