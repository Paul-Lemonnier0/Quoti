import { createNativeStackNavigator } from "@react-navigation/native-stack"
import WelcomeScreen from "../screens/SignUpScreens/WelcomeScreen"
import SignUpScreen from "../screens/SignUpScreens/SignUpScreen"
import LoginScreen from "../screens/SignUpScreens/LoginScreen"
import { NavigationContainer } from "@react-navigation/native"
import ChooseProfilPictureScreen from "../screens/SignUpScreens/ChooseProfilPictureScreen"
import AccountCreatedScreen from "../screens/SignUpScreens/AccountCreatedScreen"

export default function AuthNavigator(){

    const AuthentificationNavigator = createNativeStackNavigator()

    return(
        <AuthentificationNavigator.Navigator screenOptions={{ headerShown: false}}>
            <AuthentificationNavigator.Screen name="WelcomeScreen" component={WelcomeScreen}/>
            <AuthentificationNavigator.Screen name="LoginScreen" component={LoginScreen}/>
            <AuthentificationNavigator.Screen name="SignUpScreen" component={SignUpScreen}/>
            <AuthentificationNavigator.Screen name="AccountCreatedScreen" component={AccountCreatedScreen}/>
            <AuthentificationNavigator.Screen name="ChooseProfilPictureScreen" component={ChooseProfilPictureScreen}/>
        </AuthentificationNavigator.Navigator>
    )
}