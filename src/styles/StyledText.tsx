import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Text } from "react-native";
import { useThemeColor } from "../components/Themed";
import { fontPixel } from "./UtilsStyles";
import { FC, useContext } from "react";
import React from "react"
import { AppContext } from "../data/AppContext";

export interface CustomTextProps {
  text: string | number | null,
  style?: TextStyle,
  color?: string,
  fontSize?: number,
  fontFamily?: string,
  bold?: boolean,
  numberOfLines?: number,
  semibold?: boolean
}

const CustomText: FC<CustomTextProps> = ({text, style, color = 'Font', fontSize = 16, fontFamily = 'fontLight', numberOfLines = undefined}) => {
  const {theme} = useContext(AppContext)  
  
  const mergedStyles = StyleSheet.flatten([
      {
        color: useThemeColor(theme, color), 
        fontSize: fontPixel(fontSize), 
        fontFamily,
      },
      style
    ])
  
    return (
      <Text style={mergedStyles} numberOfLines={numberOfLines}>
        {text}
      </Text>
    )
}

export const SubText: FC<CustomTextProps> = ({text, style, numberOfLines, bold}) => {
  return (
    <CustomText text={text} style={style} color={"FontGray"} fontSize={14} fontFamily={bold ? "fontSemiBold" : "fontLight"} numberOfLines={numberOfLines}/>
  );
}

export const TitleText: FC<CustomTextProps> = ({text, style, numberOfLines}) => {
  return (
    <CustomText text={text} style={style} fontSize={24} fontFamily="fontSemiBold" numberOfLines={numberOfLines}/>
  );
}

export const SubTitleText: FC<CustomTextProps> = ({text, style, numberOfLines}) => {
  return (
    <CustomText text={text} style={style} fontSize={18} fontFamily="fontMedium" numberOfLines={numberOfLines}/>
  );
}

export const SubTitleGrayText: FC<CustomTextProps> = ({text, style, numberOfLines}) => {
  return (
    <CustomText text={text} color="FontGray" style={style} fontSize={18} fontFamily="fontSemiBold" numberOfLines={numberOfLines}/>
  );
}

export const TitleGrayText: FC<CustomTextProps> = ({text, style, numberOfLines}) => {
  return (
    <CustomText text={text} color="FontGray" style={style} fontSize={24} fontFamily="fontSemiBold" numberOfLines={numberOfLines}/>
  );
}

export const NormalText: FC<CustomTextProps> = ({text, style, numberOfLines, bold}) => {
  return (
    <CustomText text={text} color="Font" style={style} fontSize={16} fontFamily={bold ? "fontSemiBold" : "fontLight"} numberOfLines={numberOfLines}/>
  );
}

export const NormalGrayText: FC<CustomTextProps> = ({text, style, numberOfLines, bold}) => {
  return (
    <CustomText text={text} color="FontGray" style={style} fontSize={16} fontFamily={bold ? "fontSemiBold" : "fontLight"} numberOfLines={numberOfLines}/>
  );
}

export const LittleNormalText: FC<CustomTextProps> = ({text, style, numberOfLines, bold}) => {
  return (
    <CustomText text={text} color="Font" style={style} fontSize={14} fontFamily={bold ? "fontSemiBold" : "fontLight"} numberOfLines={numberOfLines}/>
  );
}

export const HugeText: FC<CustomTextProps> = ({text, style, numberOfLines}) => {
  return (
    <CustomText text={text} color="Font" style={style} fontSize={30} fontFamily={"fontBold"} numberOfLines={numberOfLines}/>
  );
}

export const MassiveText: FC<CustomTextProps> = ({text, style, numberOfLines}) => {
  return (
    <CustomText text={text} color="Font" style={style} fontSize={50} fontFamily={"fontBold"} numberOfLines={numberOfLines}/>
  );
}

export const SubMassiveText: FC<CustomTextProps> = ({text, style, numberOfLines}) => {
  return (
    <CustomText text={text} color="Font" style={style} fontSize={40} fontFamily={"fontBold"} numberOfLines={numberOfLines}/>
  );
}