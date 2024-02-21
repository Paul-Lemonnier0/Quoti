import { useColorScheme } from "react-native";
import Colors from "../constants/Colors";

interface ThemeProps {
  light?: string;
  dark?: string;
}

const useThemeColor = (props: ThemeProps, colorName: string): string => {
  const theme = useColorScheme();
  const colorFromProps = props[theme ?? "light"];

  if (colorFromProps) return colorFromProps;

  return Colors[theme ?? "light"][colorName];
};

export {useThemeColor};
