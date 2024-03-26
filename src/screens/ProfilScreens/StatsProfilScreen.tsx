import { View } from "react-native"
import { NormalText } from "../../styles/StyledText";
import { HomeStackParamsList } from "../../navigation/BottomTabNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { UsualScreen } from "../../components/View/Views";
import React from "react"

type StatProfilScreenProps = NativeStackScreenProps<HomeStackParamsList, "StatProfilScreen">

export const StatProfilScreen: FC<StatProfilScreenProps> = () => {
  return(
    <UsualScreen>
      <View>
        <NormalText text="Stats profil"/>
      </View>
    </UsualScreen>)
}