import { StyleSheet } from "react-native";

const shadowStyle = (shadowColor: string) => {
  return StyleSheet.create({
    shadow: {
      shadowColor: shadowColor,
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
    },
  });
};

export default shadowStyle;