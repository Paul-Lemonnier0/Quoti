import { Platform, StyleSheet } from "react-native";
import { useThemeColor, Text } from "../components/Themed";

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
    props.style,
    { color: fontColor },
  ]);

  return <Text {...props} style={mergedStyles}>{props.text}</Text>;
}

export function SubTitleText(props) {
  const fontColor = useThemeColor({}, "Font");

  const mergedStyles = StyleSheet.flatten([
    styles.subTitleText,
    props.style,
    { color: fontColor },
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
    props.style,
    { color: fontColor },
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
    { color: fontColor },
  ]);

  return <Text {...props} style={mergedStyles}>{props.text}</Text>;
}

export function HugeText(props) {
  const fontColor = useThemeColor({}, "Font");

  const mergedStyles = StyleSheet.flatten([
    styles.hugeText,
    props.style,
    { color: fontColor },
  ]);

  return <Text {...props} style={mergedStyles}>{props.text}</Text>;
}

const styles = StyleSheet.create({
  normalText: {
    fontSize: 16,
    fontFamily: "poppinsLight",
  },

  littleNormalText: {
    fontSize: 14,
    fontFamily: "poppinsLight",
  },

  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "poppinsSemiBold",
  },

  hugeText: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "poppinsBold",
  },

  subTitleText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "poppinsMedium",
  },

  subText: {
    fontFamily: "poppinsLight",
  },
});
