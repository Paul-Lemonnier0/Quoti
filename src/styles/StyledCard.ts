import { StyleSheet } from "react-native";
import { useThemeColor } from "../components/Themed";
import { useContext } from "react";
import { AppContext } from "../data/AppContext";

const cardStyle = () => {
  const {theme} = useContext(AppContext)

  const secondary = useThemeColor(theme, "Secondary")

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
      overflow: "visible",
      
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