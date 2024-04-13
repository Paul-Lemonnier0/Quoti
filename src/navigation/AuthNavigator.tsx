import { createNativeStackNavigator } from "@react-navigation/native-stack"
import WelcomeScreen from "../screens/SignUpScreens/WelcomeScreen"
import SignUpScreen from "../screens/SignUpScreens/SignUpScreen"
import LoginScreen from "../screens/SignUpScreens/LoginScreen"
import ChooseProfilPictureScreen from "../screens/SignUpScreens/ChooseProfilPictureScreen"
import AccountCreatedScreen from "../screens/SignUpScreens/AccountCreatedScreen"
import React from "react"
import BaseDetailsSignUpScreen from "../screens/SignUpScreens/BaseDetailsSignUpScreen"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"

export type AuthNavigatorStackProps = {
    WelcomeScreen: undefined,
    LoginScreen: undefined,
    BaseDetailsSignUpScreen: undefined,

    SignUpScreen: {
        firstName: string,
        lastName: string,
        isPrivate: boolean
    },

    AccountCreatedScreen: {
        firstName: string,
        lastName: string,
    },

    ChooseProfilPictureScreen: undefined
}

const AuthentificationStack = createNativeStackNavigator<AuthNavigatorStackProps>()

const AuthNavigator = () => {

    return(
        <BottomSheetModalProvider>
            <AuthentificationStack.Navigator screenOptions={{ headerShown: false}}>
                <AuthentificationStack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
                <AuthentificationStack.Screen name="LoginScreen" component={LoginScreen}/>
                <AuthentificationStack.Screen name="BaseDetailsSignUpScreen" component={BaseDetailsSignUpScreen}/>
                <AuthentificationStack.Screen name="SignUpScreen" component={SignUpScreen}/>
                <AuthentificationStack.Screen name="AccountCreatedScreen" component={AccountCreatedScreen}/>
                <AuthentificationStack.Screen name="ChooseProfilPictureScreen" component={ChooseProfilPictureScreen}/>
            </AuthentificationStack.Navigator>
        </BottomSheetModalProvider>
    )
}

export default AuthNavigator