import { AntDesign, Feather } from '@expo/vector-icons'; 
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureResponderEvent, View } from "react-native";
import { useThemeColor } from "../components/Themed";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatProfilScreen } from "../screens/ProfilScreens/StatsProfilScreen";
import BottomMenuStyle from "../styles/StyledBottomMenu";
import ProfilDetailsScreen from "../screens/ProfilScreens/ProfilDetailsScreen";
import HabitudeScreen from "../screens/Habitude/HabitudeScreen";
import NewsScreen from "../screens/NewsScreen";
import HomeScreen from "../screens/HomeScreen";
import { PreAddScreen } from "../screens/AddScreen/PreAddScreen";
import { AddBasicDetails } from "../screens/AddScreen/Habit/AddBasicDetails";
import { ChooseColorScreen } from "../screens/AddScreen/Habit/ChooseColorScreen";
import { ChooseIconScreen } from "../screens/AddScreen/Habit/ChooseIconScreen";
import CreateHabitDetails from "../screens/AddScreen/Habit/CreateHabitDetails";
import ValidationScreenHabit from "../screens/AddScreen/Habit/ValidationScreenHabit";
import AddBasicDetailsObjectif from '../screens/AddScreen/Objectif/AddBasicDetailsObjectif';
import AddBasicDetailsDefi from '../screens/AddScreen/Défi/AddBasicDetailsDefi';
import AddHabitsToObjectif from '../screens/AddScreen/Objectif/AddHabitsToObjectif';
import { ChooseColorScreenObjectif } from '../screens/AddScreen/Objectif/ChooseColorScreenObjectif';
import { ChooseIconScreenObjectif } from '../screens/AddScreen/Objectif/ChooseIconScreenObjectif';
import ObjectifDetailsScreen from '../screens/Objectif/ObjectifDetailsScreen';
import SharedHabitScreen from '../screens/Habitude/SharedHabitScreen';
import ProfilSettingsScreen from '../screens/ProfilScreens/ProfilSettingsScreen';
import UserDetailsScreen from '../screens/ProfilScreens/UserDetailsScreen';
import DisplayUsersScreen from '../screens/ProfilScreens/DisplayUsersScreen';
import AddHabitSteps from '../screens/AddScreen/Habit/AddHabitSteps';
import { BottomScreenOpen_Impact } from '../constants/Impacts';
import { TouchableOpacity } from 'react-native';
import ValidationScreenObjectif from '../screens/AddScreen/Objectif/ValidationScreenObjectif';
import React from 'react';
import { AntDesignName, FeatherIconName } from '../components/Buttons/IconButtons';
import { FrequencyTypes } from '../types/HabitTypes';

const BottomTab = createBottomTabNavigator();
const hideStyle = {display: 'none'}

function BottomTabNavigator() {
  const bottomMenuStyle = BottomMenuStyle().bottomMenuStyle
  const fontGray = useThemeColor({}, "FontGray")

  return (
    <BottomTab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ tabBarStyle: bottomMenuStyle, tabBarInactiveTintColor: fontGray, tabBarActiveTintColor: "white",
        tabBarHideOnKeyboard: false, headerShown: false, tabBarShowLabel: false}}>

        <BottomTab.Screen name="Home" component={HomeNavigator}
            options={{
              tabBarIcon: ({ color }) => 
                (<AntDesignIcon name="user" color={color}/>),

              }}/>
      
        <BottomTab.Screen name="Add" component={AddScreenNavigator}
          options={{
            tabBarIcon: ({color}) => (<View><Feather name="plus" size={24} color={color} /></View>),
            tabBarButton: ({ onPress, children }) => (<AddButton onPress={onPress} children={children}/>),
            ...(hideStyle ? {} : { tabBarStyle: hideStyle }),
          }}/>

        <BottomTab.Screen name="Notifs" component={NewsScreenNavigator}
              options={{tabBarIcon: ({color}) => (<FeatherIcon name={"hash"} color={color}/>)}}/>
    </BottomTab.Navigator>
)}

interface NavCustomButtonProps {
  name: string,
  color: string
}

function AntDesignIcon({name, color}: NavCustomButtonProps) {
  return <AntDesign size={24} name={name as AntDesignName} color={color}/>
}

function FeatherIcon({name, color}: NavCustomButtonProps) {
  return <Feather size={24} name={name as FeatherIconName} color={color}/>
}

interface AddButtonInterface {
  onPress: ((e: GestureResponderEvent | React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void) | undefined
  children: React.ReactNode
}

function AddButton({onPress, children}: AddButtonInterface) {
  
  const handleOnPress = (e: GestureResponderEvent | React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    onPress && onPress(e)
    BottomScreenOpen_Impact()
  }

  return (
    <View style={{flex: 1,justifyContent: 'center', alignItems: 'center', }}>
    <TouchableOpacity onPress={handleOnPress} style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10, aspectRatio: 1/1, flex: 1, borderRadius: 50, backgroundColor: "#242227"}}>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, padding: 15}}>
        {children}
      </View>
    </TouchableOpacity>
    </View>)
}



export type HomeStackParamsList = {
  HomeScreen: undefined,
  HabitudeScreen: {
    habitID: string,
    habitFrequency: FrequencyTypes,
    objectifID: string,
    currentDateString: string,
  },
  SharedHabitScreen: undefined,
  ObjectifDetailsScreen: undefined,
  ProfilDetailsScreen: undefined,
  ProfilSettingsScreen: undefined,
  DisplayUsersScreen: undefined,
  StatProfilScreen: undefined,
}



const HomeStack = createNativeStackNavigator<HomeStackParamsList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{}}/>

      <HomeStack.Screen name="HabitudeScreen" component={HabitudeScreen} options={{}}/>
      <HomeStack.Screen name="SharedHabitScreen" component={SharedHabitScreen} options={{}}/>

      <HomeStack.Screen name="ObjectifDetailsScreen" component={ObjectifDetailsScreen} options={{}}/>

      <HomeStack.Screen name="ProfilDetailsScreen" component={ProfilDetailsScreen} options={{}}/>
      <HomeStack.Screen name="ProfilSettingsScreen" component={ProfilSettingsScreen} options={{}}/>
      <HomeStack.Screen name="DisplayUsersScreen" component={DisplayUsersScreen} options={{}}/>

      <HomeStack.Screen name="StatProfilScreen" component={StatProfilScreen} options={{}}/>
    </HomeStack.Navigator>
  );
}

export type AddScreenStackType {
  PreAddScreen: undefined,

  AddBasicDetails: undefined,
  ChooseColorScreen: undefined,
  ChooseIconScreen: undefined,
  AddHabitSteps: undefined,
  ValidationScreenHabit: undefined,

  AddBasicDetailsObjectif: undefined,
  AddHabitsToObjectif: undefined,
  ChooseColorScreenObjectif: undefined,
  ChooseIconScreenObjectif: undefined,
  ValidationScreenObjectif: undefined,

  AddBasicDetailsDefi: undefined,
}

const AddScreenStack = createNativeStackNavigator<AddScreenStackType>();

function AddScreenNavigator() {
  return (
    <AddScreenStack.Navigator screenOptions={{ headerShown: false }}>

      <AddScreenStack.Screen name="PreAddScreen" component={PreAddScreen}/>   

      <AddScreenStack.Screen name="AddBasicDetails" component={AddBasicDetails}/>   
      <AddScreenStack.Screen name="AddHabitSteps" component={AddHabitSteps}/>   
      <AddScreenStack.Screen name="CreateHabitDetails" component={CreateHabitDetails}/>   
      <AddScreenStack.Screen name="ChooseIconScreen" component={ChooseIconScreen}/>   
      <AddScreenStack.Screen name="ChooseColorScreen" component={ChooseColorScreen}/>   
      <AddScreenStack.Screen name="ValidationScreenHabit" component={ValidationScreenHabit}/>   

      <AddScreenStack.Screen name="AddBasicDetailsObjectif" component={AddBasicDetailsObjectif}/>   
      <AddScreenStack.Screen name="AddHabitsToObjectif" component={AddHabitsToObjectif}/>   
      <AddScreenStack.Screen name="ChooseColorScreenObjectif" component={ChooseColorScreenObjectif}/>   
      <AddScreenStack.Screen name="ChooseIconScreenObjectif" component={ChooseIconScreenObjectif}/>   
      <AddScreenStack.Screen name="ValidationScreenObjectif" component={ValidationScreenObjectif}/>   

      <AddScreenStack.Screen name="AddBasicDetailsDefi" component={AddBasicDetailsDefi}/>   

    </AddScreenStack.Navigator>
  );
}

const NewsScreenStack = createNativeStackNavigator();

function NewsScreenNavigator() {
  return (
    <NewsScreenStack.Navigator screenOptions={{ headerShown: false }}>
      <NewsScreenStack.Screen name="NewsScreen" component={NewsScreen}/>   
      <NewsScreenStack.Screen name="UserDetailsScreen" component={UserDetailsScreen} options={{}}/>
    </NewsScreenStack.Navigator>
  );
}

export default BottomTabNavigator