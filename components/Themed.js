import { useColorScheme } from "react-native";
import Colors from "../constants/Colors";

export function useThemeColor(props, colorName) {
  // const theme = useColorScheme();
  const theme = 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) return colorFromProps;

  return Colors[theme][colorName];
}
