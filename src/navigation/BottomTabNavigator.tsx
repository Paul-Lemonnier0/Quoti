import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useThemeColor } from "../components/Themed";
import BottomMenuStyle from "../styles/StyledBottomMenu";
import React, { useContext } from 'react';
import { AppContext } from '../data/AppContext';
import CustomBottomTabBar from './CustomBottomTabBar';
import HomeNavigator from './HomeNavigator';
import AddScreenNavigator from './AddScreenNavigator';
import SocialScreenNavigator from './SocialNavigator';
import AbonnementScreenNavigator from "./AbonnementNavigator";

export type BottomTabParamList = {
  Home: undefined;
  Add: undefined;
  Notifs: undefined;
  Abonnement: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

function BottomTabNavigator() {
  const {theme} = useContext(AppContext)
  const bottomMenuStyle = BottomMenuStyle().bottomMenuStyle
  const fontGray = useThemeColor(theme, "FontGray")

  return (
    <BottomTab.Navigator
      tabBar={(props) => <CustomBottomTabBar {...props} />}
      initialRouteName="Home"
      screenOptions={{ tabBarStyle: bottomMenuStyle, tabBarInactiveTintColor: fontGray, tabBarActiveTintColor: "white",
        tabBarHideOnKeyboard: false, headerShown: false, tabBarShowLabel: false}}>

        <BottomTab.Screen name="Home" component={HomeNavigator}/>
        <BottomTab.Screen name="Notifs" component={SocialScreenNavigator}/>
        <BottomTab.Screen name="Abonnement" component={AbonnementScreenNavigator}/>
        <BottomTab.Screen name="Add" component={AddScreenNavigator}/>
    </BottomTab.Navigator>
)}

export interface NavCustomButtonProps {
  name: string,
  color: string
}

export default BottomTabNavigator