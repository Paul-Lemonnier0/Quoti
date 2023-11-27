import { AntDesign, Feather } from '@expo/vector-icons'; 
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { useThemeColor } from "../components/Themed";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatProfilScreen } from "../screens/ProfilScreens/StatsProfilScreen";

import BottomMenuStyle from "../styles/StyledBottomMenu";
import DayDetailScreen from "../screens/DayDetailScreen";
import ProfilDetailsScreen from "../screens/ProfilScreens/ProfilDetailsScreen";
import MultipleAchievementScreen from "../screens/MultipleAchievementScreen";
import HabitudeScreen from "../screens/HabitudeScreen";
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
import { AddBasicDetailsHabitObjectif } from '../screens/AddScreen/Objectif/AddBasicDetailsHabitObjectif';
import { CreateObjectifHabitDetails } from '../screens/AddScreen/Objectif/CreateObjectifHabitDetails';
import AddHabitToObjectifNav from '../screens/AddScreen/Objectif/AddHabitToObjectifNav';
import ComponentPresentation from '../screens/ComponentPresentation';
import ObjectifDetailsScreen from '../screens/Objectif/ObjectifDetailsScreen';
import SpinnerView from '../components/Spinners/SpinnerView';
import SharedHabitScreen from '../screens/Habitude/SharedHabitScreen';


const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const bottomMenuStyle = BottomMenuStyle().bottomMenuStyle
  const fontGray = useThemeColor({}, "FontGray")

  return (

    <BottomTab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ tabBarStyle: bottomMenuStyle, tabBarInactiveTintColor: fontGray, tabBarActiveTintColor: "white",
        tabBarHideOnKeyboard: false, headerShown: false, tabBarShowLabel: false}}>

        {/* <BottomTab.Screen name="Home" component={ComponentNavigator}
                    options={{tabBarIcon: ({ color, focused }) => (<AntDesignIcon name="user" color={color} focused={focused}/>)}}/> */}

        <BottomTab.Screen name="Home" component={HomeNavigator}
            options={{tabBarIcon: ({ color, focused }) => (<AntDesignIcon name="user" color={color} focused={focused}/>)}}/>
      
        <BottomTab.Screen name="Add" component={AddScreenNavigator}
            options={{tabBarIcon: ({ color, focused  }) => (<AddButton name="plus" color={color} focused={focused}/>)}}/>

        <BottomTab.Screen name="Notifs" component={NewsScreenNavigator}
              options={{tabBarIcon: ({color, focused}) => (<FeatherIcon name="hash" color={color} focused={focused} />)}}/>
    </BottomTab.Navigator>
)}

function AntDesignIcon(props) {
  return (
    <View>
      <AntDesign size={24} {...props} />
    </View>)
}

function AddButton(props) {
  return (
    <View style={{padding: 15, borderRadius: 50, backgroundColor: "#242227"}}>
        <Feather size={24} {...props} />
    </View>)
}

function FeatherIcon(props) {
  return (
    <View>
        <Feather size={24} {...props} />
    </View>)
}

//TEMP

const ComponentStack = createNativeStackNavigator();

function ComponentNavigator() {
  return (
    <ComponentStack.Navigator screenOptions={{ headerShown: false }}>
      <ComponentStack.Screen name="HomeScreen" component={ComponentPresentation} options={{ tabBarStyle: { display: 'none' } }}/>
    </ComponentStack.Navigator>
  );
}

//FIN TEMP

const HomeStack = createNativeStackNavigator();

function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{tabBarVisible: true}}/>

      <HomeStack.Screen name="HabitudeScreen" component={HabitudeScreen} options={{tabBarVisible: false}}/>
      <HomeStack.Screen name="SharedHabitScreen" component={SharedHabitScreen} options={{tabBarVisible: false}}/>

      <HomeStack.Screen name="ObjectifDetailsScreen" component={ObjectifDetailsScreen} options={{tabBarVisible: false}}/>
      <HomeStack.Screen name="DayDetailScreen" component={DayDetailScreen} options={{tabBarVisible: false}}/>
      <HomeStack.Screen name="ProfilDetailsScreen" component={ProfilDetailsScreen} options={{tabBarVisible: true}}/>
      <HomeStack.Screen name="MultipleAchievementScreen" component={MultipleAchievementScreen} options={{tabBarVisible: true}}/>
      <HomeStack.Screen name="StatProfilScreen" component={StatProfilScreen} options={{tabBarVisible: true}}/>
    </HomeStack.Navigator>
  );
}

const AddScreenStack = createNativeStackNavigator();

function AddScreenNavigator() {
  return (
    <AddScreenStack.Navigator screenOptions={{ headerShown: false }}>

      <AddScreenStack.Screen name="PreAddScreen" component={PreAddScreen}/>   

      <AddScreenStack.Screen name="AddBasicDetails" component={AddBasicDetails}/>   
      <AddScreenStack.Screen name="CreateHabitDetails" component={CreateHabitDetails}/>   
      <AddScreenStack.Screen name="ChooseIconScreen" component={ChooseIconScreen}/>   
      <AddScreenStack.Screen name="ChooseColorScreen" component={ChooseColorScreen}/>   
      <AddScreenStack.Screen name="ValidationScreenHabit" component={ValidationScreenHabit}/>   

      <AddScreenStack.Screen name="AddBasicDetailsObjectif" component={AddBasicDetailsObjectif}/>   
      <AddScreenStack.Screen name="AddHabitsToObjectif" component={AddHabitsToObjectif}/>   
      <AddScreenStack.Screen name="ChooseColorScreenObjectif" component={ChooseColorScreenObjectif}/>   
      <AddScreenStack.Screen name="ChooseIconScreenObjectif" component={ChooseIconScreenObjectif}/>   

      <AddScreenStack.Screen name="AddBasicDetailsDefi" component={AddBasicDetailsDefi}/>   

    </AddScreenStack.Navigator>
  );
}

const NewsScreenStack = createNativeStackNavigator();

function NewsScreenNavigator() {
  return (
    <NewsScreenStack.Navigator screenOptions={{ headerShown: false }}>
      <NewsScreenStack.Screen name="NewsScreen" component={NewsScreen}/>   
    </NewsScreenStack.Navigator>
  );
}