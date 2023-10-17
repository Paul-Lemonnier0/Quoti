import { StyleSheet } from "react-native";
import { useThemeColor } from "../components/Themed";

const cardStyle = () => {

  const shadowColor = useThemeColor({}, "ShadowColor")
  const secondary = useThemeColor({}, "Secondary")

  return StyleSheet.create({


    noShadowCard: {
      borderRadius: 25,
      backgroundColor: secondary,
      padding: 20,
    },

    card: {
      borderRadius: 25,
      backgroundColor: secondary,
      padding: 20,

      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity:  0.08,
      shadowRadius: 8,
      elevation: 3
    },

    shadow : {
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity:  0.08,
      shadowRadius: 8,
      elevation: 3
    },
  });
};

export default cardStyle;