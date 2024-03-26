import { createNativeStackNavigator } from "@react-navigation/native-stack"
import WelcomeScreen from "../screens/SignUpScreens/WelcomeScreen"
import SignUpScreen from "../screens/SignUpScreens/SignUpScreen"
import LoginScreen from "../screens/SignUpScreens/LoginScreen"
import ChooseProfilPictureScreen from "../screens/SignUpScreens/ChooseProfilPictureScreen"
import AccountCreatedScreen from "../screens/SignUpScreens/AccountCreatedScreen"
import React from "react"

export type AuthNavigatorStackProps = {
    WelcomeScreen: undefined,
    LoginScreen: undefined,
    SignUpScreen: undefined,
    AccountCreatedScreen: undefined,
    ChooseProfilPictureScreen: undefined,
}

const AuthentificationStack = createNativeStackNavigator<AuthNavigatorStackProps>()

const AuthNavigator = () => {

    return(
        <AuthentificationStack.Navigator screenOptions={{ headerShown: false}}>
            <AuthentificationStack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
            <AuthentificationStack.Screen name="LoginScreen" component={LoginScreen}/>
            <AuthentificationStack.Screen name="SignUpScreen" component={SignUpScreen}/>
            <AuthentificationStack.Screen name="AccountCreatedScreen" component={AccountCreatedScreen}/>
            <AuthentificationStack.Screen name="ChooseProfilPictureScreen" component={ChooseProfilPictureScreen}/>
        </AuthentificationStack.Navigator>
    )
}

export default AuthNavigator