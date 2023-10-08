import { StyleSheet } from "react-native";
import { View } from "react-native";

import { TitleText } from "../styles/StyledText";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <TitleText style={styles.title} text="Bienvenue !"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
  },
});
