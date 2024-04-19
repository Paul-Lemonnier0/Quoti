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
import React, { useContext } from 'react';
import { AntDesignName, FeatherIconName } from '../components/Buttons/IconButtons';
import { FrequencyTypes, SeriazableHabit, SeriazableObjectif } from '../types/HabitTypes';
import { User } from 'firebase/auth';
import { FormBasicHabit, FormColoredHabit, FormIconedHabit, FormStepsHabit } from '../types/FormHabitTypes';
import { FormBasicObjectif, FormColoredObjectif, FormDetailledObjectif } from '../types/FormObjectifTypes';
import { AppContext } from '../data/AppContext';
import ProfilListHabitScreen from '../screens/ProfilScreens/ProfilListHabitScreen';
import ProfilListObjectifScreen from '../screens/ProfilScreens/ProfilListObjectifScreen';
import ProfilListSuccessScreen from '../screens/ProfilScreens/ProfilListSuccessScreen';
import PresentationObjectifDetailsScreen from '../screens/Objectif/PresentationObjectifDetailsScreen';
import ProfilDataSettingsScreen from '../screens/ProfilScreens/ProfilSettingsScreens/ProfilDataSettingsScreen';
import ConditionUtilisationScreen from '../screens/ProfilScreens/ProfilSettingsScreens/ConditionUtilisationScreen';
import HelpAndSupportScreen from '../screens/ProfilScreens/ProfilSettingsScreens/HelpAndSupportScreen';
import SecurityScreen from '../screens/ProfilScreens/ProfilSettingsScreens/SecurityScreen';
import SubscriptionScreen from '../screens/ProfilScreens/ProfilSettingsScreens/SubscriptionScreen';
import HabitStreakDetailsScreen from '../screens/Habitude/HabitStreakDetailsScreen';
import UtilsScreen from '../screens/UtilsScreen';
import ProfilNotificationsScreen from '../screens/ProfilScreens/ProfilNotificationsScreen';
import { UserType } from '../data/UserContext';
import AnyUserProfilScreen from '../screens/ProfilScreens/AnyUserProfilScreen';
import { UserDataBase } from '../firebase/Database_User_Primitives';


export type BottomTabParamList = {
  Home: undefined;
  Add: undefined;
  Notifs: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
const hideStyle = {display: 'none'}

function BottomTabNavigator() {
  const {theme} = useContext(AppContext)
  const bottomMenuStyle = BottomMenuStyle().bottomMenuStyle
  const fontGray = useThemeColor(theme, "FontGray")

  //TODO : tester la solution avec le router

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
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
            tabBarStyle: {display: 'none'}
          }}/>

        <BottomTab.Screen name="Notifs" component={NewsScreenNavigator}
              options={{tabBarIcon: ({color}) => (<FeatherIcon name={"hash"} color={color}/>)}}/>
    </BottomTab.Navigator>
)}

export interface NavCustomButtonProps {
  name: string,
  color: string
}

function AntDesignIcon({name, color}: NavCustomButtonProps) {
  return <AntDesign size={24} name={name as AntDesignName} color={color}/>
}

function FeatherIcon({name, color}: NavCustomButtonProps) {
  return <Feather size={24} name={name as FeatherIconName} color={color}/>
}

export interface AddButtonInterface {
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
    objectifID: string | undefined,
    currentDateString: string,
    
  },
  HabitStreakDetailsScreen: {
    habitID: string,
    currentDateString: string,
  },
  SharedHabitScreen: {
    habit: SeriazableHabit,
    user: UserDataBase
  },
  ObjectifDetailsScreen: {
    seriazableObjectif: SeriazableObjectif,
    frequency: FrequencyTypes,
    currentDateString: string
  },
  PresentationObjectifDetailsScreen: {
    seriazableObjectif: SeriazableObjectif,
  },
  ProfilDetailsScreen: undefined,
  ProfilNotificationsScreen: undefined,

  AnyUserProfilScreen: {
    detailledUser: UserDataBase
  },
  ProfilListHabitScreen: undefined,
  ProfilListObjectifScreen: undefined,
  ProfilListSuccessScreen: undefined,
  ProfilSettingsScreen: undefined,
  DisplayUsersScreen: {
    userIDs: string[]
  },

  ProfilDataSettingsScreen: undefined,
  ConditionUtilisationScreen: undefined,
  HelpAndSupportScreen: undefined,
  SecurityScreen: undefined,
  SubscriptionScreen: undefined,

  StatProfilScreen: undefined,
}



const HomeStack = createNativeStackNavigator<HomeStackParamsList>()

function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen}  options={{}}/>

      <HomeStack.Screen name="HabitudeScreen" component={HabitudeScreen} options={{}}/>
      <HomeStack.Screen name="HabitStreakDetailsScreen" component={HabitStreakDetailsScreen} options={{}}/>
      <HomeStack.Screen name="SharedHabitScreen" component={SharedHabitScreen} options={{}}/>

      <HomeStack.Screen name="ObjectifDetailsScreen" component={ObjectifDetailsScreen} options={{}}/>
      <HomeStack.Screen name="PresentationObjectifDetailsScreen" component={PresentationObjectifDetailsScreen} options={{}}/>

      <HomeStack.Screen name="ProfilDetailsScreen" component={ProfilDetailsScreen} options={{}}/>
      <HomeStack.Screen name="AnyUserProfilScreen" component={AnyUserProfilScreen} options={{}}/>
      <HomeStack.Screen name="ProfilNotificationsScreen" component={ProfilNotificationsScreen} options={{}}/>
      <HomeStack.Screen name="ProfilSettingsScreen" component={ProfilSettingsScreen} options={{}}/>

      <HomeStack.Screen name="ProfilListHabitScreen" component={ProfilListHabitScreen} options={{}}/>
      <HomeStack.Screen name="ProfilListObjectifScreen" component={ProfilListObjectifScreen} options={{}}/>
      <HomeStack.Screen name="ProfilListSuccessScreen" component={ProfilListSuccessScreen} options={{}}/>
      <HomeStack.Screen name="DisplayUsersScreen" component={DisplayUsersScreen} options={{}}/>

      <HomeStack.Screen name="ProfilDataSettingsScreen" component={ProfilDataSettingsScreen} options={{}}/>
      <HomeStack.Screen name="ConditionUtilisationScreen" component={ConditionUtilisationScreen} options={{}}/>
      <HomeStack.Screen name="HelpAndSupportScreen" component={HelpAndSupportScreen} options={{}}/>
      <HomeStack.Screen name="SecurityScreen" component={SecurityScreen} options={{}}/>
      <HomeStack.Screen name="SubscriptionScreen" component={SubscriptionScreen} options={{}}/>

      <HomeStack.Screen name="StatProfilScreen" component={StatProfilScreen} options={{}}/>
    </HomeStack.Navigator>
  );
}

export type AddScreenStackType  = {
  Home: undefined,
  PreAddScreen: undefined,

  AddBasicDetails: undefined,
  ChooseColorScreen: {
    habit: FormBasicHabit
  },
  ChooseIconScreen: {
    habit: FormColoredHabit
  },
  AddHabitSteps: {
    habit: FormIconedHabit
  },
  CreateHabitDetails: {
    habit: FormStepsHabit
  },
  ValidationScreenHabit: {
    habit: SeriazableHabit
  },

  AddBasicDetailsObjectif: undefined,
  ChooseColorScreenObjectif: {
    objectif: FormBasicObjectif
  },
  ChooseIconScreenObjectif: {
    objectif: FormColoredObjectif
  },
  AddHabitsToObjectif: {
    objectif: FormDetailledObjectif
  },
  ValidationScreenObjectif: undefined,
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

    </AddScreenStack.Navigator>
  );
}

export type NewsScreenStackType = {
  NewsScreen: undefined,
  UserDetailsScreen: {
    detailledUser: User
  },
  UtilsScreen: undefined,

  AnyUserProfilScreen: {
    detailledUser: UserDataBase
  },
}

const NewsScreenStack = createNativeStackNavigator<NewsScreenStackType>();

function NewsScreenNavigator() {
  return (
    <NewsScreenStack.Navigator screenOptions={{ headerShown: false }}>
      <NewsScreenStack.Screen name="NewsScreen" component={NewsScreen}/>   
      <NewsScreenStack.Screen name="UserDetailsScreen" component={UserDetailsScreen}/>
      <NewsScreenStack.Screen name="UtilsScreen" component={UtilsScreen}/>
      <NewsScreenStack.Screen name="AnyUserProfilScreen" component={AnyUserProfilScreen}/>
    </NewsScreenStack.Navigator>
  );
}

export default BottomTabNavigator