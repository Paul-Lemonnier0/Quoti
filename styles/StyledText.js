import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { useThemeColor } from "../components/Themed";
import { fontPixel } from "./UtilsStyles";

export function SubText(props) {
  const fontGray = useThemeColor({}, "FontGray");

  const mergedStyles = StyleSheet.flatten([
    styles.subText,
    { color: fontGray, fontSize: fontPixel(14) },
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
    { color: fontColor, fontSize: fontPixel(24), fontFamily: "fontSemiBold" },
    props.style,
  ]);

  return <Text {...props} style={mergedStyles}>{props.text}</Text>;
}

export function SubTitleText(props) {
  const fontColor = useThemeColor({}, "Font");

  const mergedStyles = StyleSheet.flatten([
    styles.subTitleText,
    { color: fontColor, fontFamily: props.notBold ? "fontLight" : "fontMedium", fontSize: fontPixel(18) }, 
    props.style,
  ]);

  return <Text {...props} style={mergedStyles}>{props.text}</Text>;
}

export function SubTitleGrayText(props) {
  const fontGray = useThemeColor({}, "FontGray");

  const mergedStyles = StyleSheet.flatten([
    props.style,
    styles.subTitleText,
    { color: fontGray, fontSize: fontPixel(18) },
  ]);

  return <Text {...props} style={mergedStyles}>{props.text}</Text>;
}

export function TitleGrayText(props) {
  const fontGray = useThemeColor({}, "FontGray");

  const mergedStyles = StyleSheet.flatten([
    styles.titleText,
    props.style,
    { color: fontGray, fontSize: fontPixel(24) },
  ]);

  return <Text {...props} style={mergedStyles}>{props.text}</Text>;
}

export function NormalText(props) {
  const fontColor = useThemeColor({}, "Font");

  const mergedStyles = StyleSheet.flatten([
    styles.normalText,
    { color: fontColor, fontFamily: props.bold ? "fontSemiBold" : "fontLight", fontSize: fontPixel(16)}, 
    props.style,
  ]);

  return <Text {...props} style={mergedStyles}>{props.text}</Text>;
}

export function NormalGrayText(props) {
  const fontColor = useThemeColor({}, "FontGray");

  const mergedStyles = StyleSheet.flatten([
    styles.normalText,
    props.style,
    { color: fontColor, fontSize: fontPixel(16) },
  ]);

  return <Text {...props} style={mergedStyles}>{props.text}</Text>;
}

export function LittleNormalText(props) {
  const fontColor = useThemeColor({}, "Font");

  const mergedStyles = StyleSheet.flatten([
    styles.littleNormalText,
    props.style,
    { color: fontColor, fontFamily: props.bold ? "fontSemiBold" : "fontLight", fontSize: fontPixel(14)},
  ]);

  return <Text {...props} style={mergedStyles}>{props.text}</Text>;
}

export function HugeText(props) {
  const fontColor = useThemeColor({}, "Font");

  const mergedStyles = StyleSheet.flatten([
    styles.hugeText,
    { color: fontColor, fontSize: fontPixel(30) },
    props.style,
  ]);

  return <Text {...props} style={mergedStyles}>{props.text}</Text>;
}

export function MassiveText(props) {
  const fontColor = useThemeColor({}, "Font");

  const mergedStyles = StyleSheet.flatten([
    styles.massiveText,
    { color: fontColor, fontSize: fontPixel(50) },
    props.style,
  ]);

  return <Text {...props} style={mergedStyles}>{props.text}</Text>;
}

export function SubMassiveText(props) {
  const fontColor = useThemeColor({}, "Font");

  const mergedStyles = StyleSheet.flatten([
    styles.massiveText,
    { color: fontColor, fontSize: fontPixel(40) },
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
    fontFamily: "fontSemiBold",
  },

  hugeText: {
    fontSize: 30,
    fontFamily: "fontBold",
  },

  massiveText: {
    fontSize: 50,
    fontFamily: "fontBold",
  },

  subTitleText: {
    fontSize: 18,
    fontFamily: "fontSemiBold",
  },

  subText: {
    fontFamily: "fontLight",
  },
});
