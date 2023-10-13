// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign, Entypo, Feather, Octicons, MaterialCommunityIcons } from '@expo/vector-icons'; 

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, View, useColorScheme } from "react-native";

import HabitudeScreen from "../screens/HabitudeScreen";

import { useThemeColor } from "../components/Themed";
import DayDetailScreen from "../screens/DayDetailScreen";
import ProfilDetailsScreen from "../screens/ProfilScreens/ProfilDetailsScreen";
import MultipleAchievementScreen from "../screens/MultipleAchievementScreen";
import { getFocusedRouteNameFromRoute, useNavigation } from "@react-navigation/native";
import NewsScreen from "../screens/NewsScreen";
import HomeScreen from "../screens/HomeScreen";
import { StatProfilScreen } from "../screens/ProfilScreens/StatsProfilScreen";
import { AddBasicDetails, AddScreen } from "../screens/AddScreen/AddBasicDetails";
import CreateHabitDetails from "../screens/AddScreen/CreateHabitDetails";
import { ChooseIconScreen } from "../screens/AddScreen/ChooseIconScreen";
import ValidationScreenHabit from "../screens/AddScreen/ValidationScreenHabit";
import { ChooseColorScreen } from "../screens/AddScreen/ChooseColorScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PreAddScreen } from "../screens/AddScreen/PreAddScreen";
import BottomMenuStyle from "../styles/StyledBottomMenu";
import { NormalText } from "../styles/StyledText";
import { Text } from "react-native";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {

  const bottomMenuStyle = BottomMenuStyle().bottomMenuStyle

  const font = useThemeColor({}, "Font")
  const fontGray = useThemeColor({}, "FontGray")
  const contrast = useThemeColor({}, "Contrast")

  const navigation = useNavigation()

  const handleNavigateToAdd = () => {
    navigation.navigate("AddScreen")
  }

  return (

    <BottomTab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarInactiveTintColor: fontGray,
        
        tabBarActiveTintColor: "white",
        headerShown: false,
        tabBarStyle: bottomMenuStyle,
        // Use the getTabBarVisible function here within the screenOptions
        tabBarHideOnKeyboard: false,
      }}
    >

        <BottomTab.Screen
            name="Home"
            component={HomeNavigator}


            options={({ route }) => ({
              headerShown: false,
              tabBarLabel: () => {},
              tabBarIcon: ({ color, focused }) => (
                <View style={{display: "flex", flexDirection: "column", gap: 5, justifyContent: "center", alignItems: "center"}}>
                  <AntDesign size={24} name="user" color={color} focused={focused} />
                  
                </View>
              ),
              
              tabBarStyle: ((route) => {
                const routeName = getFocusedRouteNameFromRoute(route) ?? "HomeScreen"

                if (routeName !== 'HomeScreen') {
                  return { display: "none" }
                }
                return bottomMenuStyle

              })(route),
            })}
          />
      
        <BottomTab.Screen
          name="Add"
          component={AddScreenNavigator}
          options={{
            
            tabBarLabel: () => null,
            tabBarIcon: ({ color, focused  }) => (
              <AddButton name="plus" color={color} focused={focused} />
            ),
            
          }}
        />

      <BottomTab.Screen
        name="Notifs"
        component={NewsScreenNavigator}
        options={({focused }) => ({
          headerShown: false,
          tabBarIcon: ({ color, focused  }) => (
            <FeatherIcon name="hash" color={color} focused={focused} />
          ),

          tabBarLabel: () => null

        })}
      />

    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function MaterialIcon(props) {
  return <MaterialCommunityIcons size={24} {...props} />;
}

function AntDesignIcon(props) {
  return (
    <View style={{backgroundColor: "red"}}>
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
    <View style={{}}>
        <Feather size={24} {...props} />
    </View>)
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createNativeStackNavigator();

function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false, tabBarVisible: true }}
      />

      <HomeStack.Screen
        name="HabitudeScreen"
        component={HabitudeScreen} 
        options={({ route }) => ({
          habit: route.params.habit,
          tabBarVisible: false, // Hide the bottom navigation bar on this screen
        })}
      />

      <HomeStack.Screen
        name="DayDetailScreen"
        component={DayDetailScreen}
        options={({ route }) => ({ 
          habitude: route.params.habitude,
          date: route.params.date,
          tabBarVisible: false, // Show the bottom navigation bar on this screen
        })}
      />

      <HomeStack.Screen
        name="ProfilDetailsScreen"
        component={ProfilDetailsScreen}
        options={{ headerTitle: "Profil Details", tabBarVisible: true }} // Show the bottom navigation bar on this screen
      />

      <HomeStack.Screen
        name="MultipleAchievementScreen"
        component={MultipleAchievementScreen}
        options={{ headerTitle: "AllAchievementScreen", tabBarVisible: true }} // Show the bottom navigation bar on this screen
      />

      <HomeStack.Screen
        name="StatProfilScreen"
        component={StatProfilScreen}
        options={{ headerTitle: "StatProfilScreen", tabBarVisible: true }} // Show the bottom navigation bar on this screen
      />
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