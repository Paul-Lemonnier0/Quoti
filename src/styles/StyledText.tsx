import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Text } from "react-native";
import { useThemeColor } from "../components/Themed";
import { fontPixel } from "./UtilsStyles";
import { FC, ReactNode, useContext } from "react";
import React from "react"
import { AppContext } from "../data/AppContext";
import Animated from "react-native-reanimated";

export interface CustomTextProps {
  text: string | number | null,
  style?: TextStyle,
  color?: string,
  fontSize?: number,
  fontFamily?: string,
  bold?: boolean,
  numberOfLines?: number,
  semibold?: boolean,
  ellipsizeMode?: string,
  children?: ReactNode
}

const CustomText: FC<CustomTextProps> = ({text, style, children, color = 'Font', fontSize = 16, fontFamily = 'fontLight', numberOfLines = undefined}) => {
  const {theme} = useContext(AppContext)  
  
  const basicStyle = StyleSheet.create(
      {
        
      },   
    )
  
    return (
      <Animated.Text style={[{
        color: useThemeColor(theme, color), 
        fontSize: fontPixel(fontSize), 
        fontFamily,
      }, style]} numberOfLines={numberOfLines}>
        {text}
        {children}
      </Animated.Text>
    )
}

export const SubText: FC<CustomTextProps> = ({text, style, numberOfLines, bold, children}) => {
  return (
    <CustomText text={text} style={style} color={"FontGray"} fontSize={14} fontFamily={bold ? "fontSemiBold" : "fontLight"} numberOfLines={numberOfLines} children={children}/>
  );
}

export const TitleText: FC<CustomTextProps> = ({text, style, numberOfLines, bold, children}) => {
  return (
    <CustomText text={text} style={style} fontSize={24} fontFamily={bold ? "fontBold" : "fontSemiBold"} numberOfLines={numberOfLines} children={children}/>
  );
}

export const SubTitleText: FC<CustomTextProps> = ({text, style, numberOfLines, bold, children}) => {
  return (
    <CustomText text={text} style={style} fontSize={18} fontFamily={bold ? "fontSemiBold" : "fontMedium"} numberOfLines={numberOfLines} children={children}/>
  );
}

export const SubTitleGrayText: FC<CustomTextProps> = ({text, style, numberOfLines, children}) => {
  return (
    <CustomText text={text} color="FontGray" style={style} fontSize={18} fontFamily="fontSemiBold" numberOfLines={numberOfLines} children={children}/>
  );
}

export const TitleGrayText: FC<CustomTextProps> = ({text, style, numberOfLines, children}) => {
  return (
    <CustomText text={text} color="FontGray" style={style} fontSize={24} fontFamily="fontSemiBold" numberOfLines={numberOfLines} children={children}/>
  );
}

export const NormalText: FC<CustomTextProps> = ({text, style, numberOfLines, bold, children}) => {
  return (
    <CustomText text={text} color="Font" style={style} fontSize={16} fontFamily={bold ? "fontSemiBold" : "fontMedium"} numberOfLines={numberOfLines} children={children}/>
  );
}

export const NormalGrayText: FC<CustomTextProps> = ({text, style, numberOfLines, bold, children}) => {
  return (
    <CustomText text={text} color="FontGray" style={style} fontSize={16} fontFamily={bold ? "fontSemiBold" : "fontMedium"} numberOfLines={numberOfLines} children={children}/>
  );
}

export const LittleNormalText: FC<CustomTextProps> = ({text, style, numberOfLines, bold, children}) => {
  return (
    <CustomText text={text} color="Font" style={style} fontSize={15} fontFamily={bold ? "fontSemiBold" : "fontLight"} numberOfLines={numberOfLines} children={children}/>
  );
}

export const HugeText: FC<CustomTextProps> = ({text, style, numberOfLines, children}) => {
  return (
    <CustomText text={text} color="Font" style={style} fontSize={30} fontFamily={"fontBold"} numberOfLines={numberOfLines} children={children}/>
  );
}

export const MassiveText: FC<CustomTextProps> = ({text, style, numberOfLines, children}) => {
  return (
    <CustomText text={text} color="Font" style={style} fontSize={50} fontFamily={"fontBold"} numberOfLines={numberOfLines} children={children}/>
  );
}

export const SubMassiveText: FC<CustomTextProps> = ({text, style, numberOfLines, children}) => {
  return (
    <CustomText text={text} color="Font" style={style} fontSize={40} fontFamily={"fontBold"} numberOfLines={numberOfLines} children={children}/>
  );
}