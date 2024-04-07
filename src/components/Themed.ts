import { useColorScheme } from "react-native";
import Colors from "../constants/Colors";

export interface ThemeProps {
  light?: string;
  dark?: string;
}

const useThemeColor = (props: ThemeProps, colorName: string): string => {
  const theme = useColorScheme();
  
  const darkProps = props.dark
  const lightProps = props.light
  
  return Colors[lightProps ? "light" : darkProps ? "dark" : theme ?? "light"][colorName];
};

export {useThemeColor};
