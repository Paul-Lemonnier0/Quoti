import { AntDesign, Feather } from '@expo/vector-icons'; 
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
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
import { AddBasicDetailsHabitObjectif } from '../screens/AddScreen/Objectif/AddBasicDetailsHabitObjectif';
import { CreateObjectifHabitDetails } from '../screens/AddScreen/Objectif/CreateObjectifHabitDetails';
import AddHabitToObjectifNav from '../screens/AddScreen/Objectif/AddHabitToObjectifNav';
import ComponentPresentation from '../screens/Test/ComponentPresentation';
import ObjectifDetailsScreen from '../screens/Objectif/ObjectifDetailsScreen';
import SpinnerView from '../components/Spinners/SpinnerView';
import SharedHabitScreen from '../screens/Habitude/SharedHabitScreen';
import SignUpScreen from '../screens/SignUpScreens/SignUpScreen';
import LoginScreen from '../screens/SignUpScreens/LoginScreen';
import ProfilSettingsScreen from '../screens/ProfilScreens/ProfilSettingsScreen';
import UserDetailsScreen from '../screens/ProfilScreens/UserDetailsScreen';
import DisplayUsersScreen from '../screens/ProfilScreens/DisplayUsersScreen';
import AddHabitSteps from '../screens/AddScreen/Habit/AddHabitSteps';
import { BottomScreenOpen_Impact } from '../constants/Impacts';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NormalText, TitleText } from '../styles/StyledText';
import ValidationScreenObjectif from '../screens/AddScreen/Objectif/ValidationScreenObjectif';


const BottomTab = createBottomTabNavigator();
const hideStyle = {display: 'none'}

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
            options={{
              tabBarIcon: ({ color, focused }) => 
                (<AntDesignIcon name="user" color={color} focused={focused}/>),

              }}/>
      
        <BottomTab.Screen name="Add" component={AddScreenNavigator}
          options={({ route }) => ({
            tabBarIcon: ({color}) => (<View><Feather name="plus" size={24} color={color} /></View>),
            tabBarButton: ({ onPress, children }) => (
              <AddButton onPress={onPress} children={children}/>
            ),

            tabBarStyle: hideStyle,
          })}/>

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

function AddButton({onPress, children}) {
  
  const handleOnPress = () => {
    BottomScreenOpen_Impact()
    onPress()
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

//SignUP/IN

const LoginStack = createNativeStackNavigator()

function LoginNavigator() {
  return(
    <LoginStack.Navigator screenOptions={{ headerShown: false}}>
      <LoginStack.Screen name="SignUpScreen" component={SignUpScreen} options={{ tabBarStyle: { display: 'none' } }}/>
      <LoginStack.Screen name="LoginScreen" component={LoginScreen} options={{ tabBarStyle: { display: 'none' } }}/>
    </LoginStack.Navigator>
  )
}

//FIN TEMP

const HomeStack = createNativeStackNavigator();

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

const AddScreenStack = createNativeStackNavigator();

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

// const AddHabitScreenStack = createNativeStackNavigator();


// function AddHabitScreenNavigator() {
//   return (
//     <AddHabitScreenStack.Navigator screenOptions={{ headerShown: false }}>

//       <AddHabitScreenStack.Screen name="AddBasicDetails" component={AddBasicDetails}/>   
//       <AddHabitScreenStack.Screen name="CreateHabitDetails" component={CreateHabitDetails}/>   
//       <AddHabitScreenStack.Screen name="ChooseIconScreen" component={ChooseIconScreen}/>   
//       <AddHabitScreenStack.Screen name="ChooseColorScreen" component={ChooseColorScreen}/>   
//       <AddHabitScreenStack.Screen name="ValidationScreenHabit" component={ValidationScreenHabit}/>   

//     </AddHabitScreenStack.Navigator>
//   );
// }

const NewsScreenStack = createNativeStackNavigator();

function NewsScreenNavigator() {
  return (
    <NewsScreenStack.Navigator screenOptions={{ headerShown: false }}>
      <NewsScreenStack.Screen name="NewsScreen" component={NewsScreen}/>   
      <NewsScreenStack.Screen name="UserDetailsScreen" component={UserDetailsScreen} options={{}}/>
    </NewsScreenStack.Navigator>
  );
}