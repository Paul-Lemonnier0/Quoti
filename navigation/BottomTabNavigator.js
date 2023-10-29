import { AntDesign, Feather } from '@expo/vector-icons'; 
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { useThemeColor } from "../components/Themed";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PreAddScreen } from "../screens/AddScreen/PreAddScreen";
import { StatProfilScreen } from "../screens/ProfilScreens/StatsProfilScreen";
import { AddBasicDetails } from "../screens/AddScreen/AddBasicDetails";
import { ChooseIconScreen } from "../screens/AddScreen/ChooseIconScreen";
import { ChooseColorScreen } from "../screens/AddScreen/ChooseColorScreen";
import BottomMenuStyle from "../styles/StyledBottomMenu";
import DayDetailScreen from "../screens/DayDetailScreen";
import ProfilDetailsScreen from "../screens/ProfilScreens/ProfilDetailsScreen";
import MultipleAchievementScreen from "../screens/MultipleAchievementScreen";
import HabitudeScreen from "../screens/HabitudeScreen";
import NewsScreen from "../screens/NewsScreen";
import HomeScreen from "../screens/HomeScreen";
import CreateHabitDetails from "../screens/AddScreen/CreateHabitDetails";
import ValidationScreenHabit from "../screens/AddScreen/ValidationScreenHabit";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const bottomMenuStyle = BottomMenuStyle().bottomMenuStyle
  const fontGray = useThemeColor({}, "FontGray")

  return (

    <BottomTab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ tabBarStyle: bottomMenuStyle, tabBarInactiveTintColor: fontGray, tabBarActiveTintColor: "white",
        tabBarHideOnKeyboard: false, headerShown: false, tabBarShowLabel: false}}>

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

const HomeStack = createNativeStackNavigator();

function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{tabBarVisible: true}}/>
      <HomeStack.Screen name="HabitudeScreen" component={HabitudeScreen} options={{tabBarVisible: false}}/>
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