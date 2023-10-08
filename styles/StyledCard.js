import { StyleSheet } from "react-native";
import { useThemeColor } from "../components/Themed";

const cardStyle = () => {

  const shadowColor = useThemeColor({}, "ShadowColor")
  const secondary = useThemeColor({}, "Secondary")

  return StyleSheet.create({
    card: {
      borderRadius: 25,
      backgroundColor: secondary,
      padding: 20,

      shadowColor: "#0f0f13",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity:  0.23,
      shadowRadius: 11.78,
      elevation: 15
    },

    shadow : {
      shadowColor: "#0f0f13",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity:  0.23,
      shadowRadius: 11.78,
      elevation: 15
    },
  });
};

export default cardStyle;