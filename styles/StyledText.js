import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { useThemeColor } from "../components/Themed";

export function SubText(props) {
  const fontGray = useThemeColor({}, "FontGray");

  const mergedStyles = StyleSheet.flatten([
    styles.subText,
    { color: fontGray },
    props.style, // Ajouter les styles supplémentaires ici
  ]);

  return (
    <Text {...props} style={mergedStyles}>
      {props.text}
    </Text>
  );
}

export function TitleText(props) {
  const fontColor = useThemeColor({}, "Font");

  const mergedStyles = StyleSheet.flatten([
    styles.titleText,
    { color: fontColor },
    props.style,
  ]);

  return <Text {...props} style={mergedStyles}>{props.text}</Text>;
}

export function SubTitleText(props) {
  const fontColor = useThemeColor({}, "Font");

  const mergedStyles = StyleSheet.flatten([
    styles.subTitleText,
    { color: fontColor, fontFamily: props.notBold ? "fontLight" : "fontMedium" },
    props.style,
  ]);

  return <Text {...props} style={mergedStyles}>{props.text}</Text>;
}

export function SubTitleGrayText(props) {
  const fontGray = useThemeColor({}, "FontGray");

  const mergedStyles = StyleSheet.flatten([
    props.style,
    styles.subTitleText,
    { color: fontGray },
  ]);

  return <Text {...props} style={mergedStyles}>{props.text}</Text>;
}

export function TitleGrayText(props) {
  const fontGray = useThemeColor({}, "FontGray");

  const mergedStyles = StyleSheet.flatten([
    styles.titleText,
    props.style,
    { color: fontGray },
  ]);

  return <Text {...props} style={mergedStyles}>{props.text}</Text>;
}

export function NormalText(props) {
  const fontColor = useThemeColor({}, "Font");

  const mergedStyles = StyleSheet.flatten([
    styles.normalText,
    { color: fontColor, fontFamily: props.bold ? "fontSemiBold" : "fontLight"},
    props.style,
  ]);

  return <Text {...props} style={mergedStyles}>{props.text}</Text>;
}

export function NormalGrayText(props) {
  const fontColor = useThemeColor({}, "FontGray");

  const mergedStyles = StyleSheet.flatten([
    styles.normalText,
    props.style,
    { color: fontColor },
  ]);

  return <Text {...props} style={mergedStyles}>{props.text}</Text>;
}

export function LittleNormalText(props) {
  const fontColor = useThemeColor({}, "Font");

  const mergedStyles = StyleSheet.flatten([
    styles.littleNormalText,
    props.style,
    { color: fontColor, fontFamily: props.bold ? "fontSemiBold" : "fontLight"},
  ]);

  return <Text {...props} style={mergedStyles}>{props.text}</Text>;
}

export function HugeText(props) {
  const fontColor = useThemeColor({}, "Font");

  const mergedStyles = StyleSheet.flatten([
    styles.hugeText,
    { color: fontColor },
    props.style,
  ]);

  return <Text {...props} style={mergedStyles}>{props.text}</Text>;
}

export function MassiveText(props) {
  const fontColor = useThemeColor({}, "Font");

  const mergedStyles = StyleSheet.flatten([
    styles.massiveText,
    { color: fontColor },
    props.style,
  ]);

  return <Text {...props} style={mergedStyles}>{props.text}</Text>;
}

const styles = StyleSheet.create({
  normalText: {
    fontSize: 16,
    fontFamily: "fontLight",
  },

  littleNormalText: {
    fontSize: 14,
    fontFamily: "fontLight",
  },

  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "fontSemiBold",
  },

  hugeText: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "fontBold",
  },

  massiveText: {
    fontSize: 50,
    fontWeight: "bold",
    fontFamily: "fontBold",
  },

  subTitleText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "fontSemiBold",
  },

  subText: {
    fontFamily: "fontLight",
  },
});
