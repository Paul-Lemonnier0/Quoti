import React from "react";
import SocialScreen from "../screens/SocialScreen";
import UtilsScreen from "../screens/UtilsScreen";
import AnyUserProfilScreen from "../screens/ProfilScreens/AnyProfilScreens/AnyUserProfilScreen";
import AnyUserProfilHabitsScreen from "../screens/ProfilScreens/AnyProfilScreens/AnyUserProfilHabitsScreen";
import AnyUserProfilObjectifsScreen from "../screens/ProfilScreens/AnyProfilScreens/AnyUserProfilObjectifsScreen";
import AnyUserProfilSuccessScreen from "../screens/ProfilScreens/AnyProfilScreens/AnyUserProfilSuccessScreen";
import AnyUserProfilFriendsScreen from "../screens/ProfilScreens/AnyProfilScreens/AnyUserProfilFriendsScreen";
import PresentationHabitScreen from "../screens/Habitude/PresentationHabitScreen";
import PresentationObjectifDetailsScreen from "../screens/Objectif/PresentationObjectifDetailsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchUserScreen from "../screens/SocialScreens/SearchUserScreen";
import InteractionsScreen from "../screens/SocialScreens/InteractionsScreen";
import AnyUserProfilDoneHabitsScreen from "../screens/ProfilScreens/AnyProfilScreens/AnyUserProfilDoneHabitsScreen";
import AnyUserProfilDoneObjectifsScreen from "../screens/ProfilScreens/AnyProfilScreens/AnyUserProfilDoneObjectifsScreen";
import { AbonnementScreen } from "../screens/AbonnementScreen";

export type AbonnementScreenStackType = {
    AbonnementScreen: undefined,
}

const AbonnementScreenStack = createNativeStackNavigator<AbonnementScreenStackType>();

function AbonnementScreenNavigator() {
    return (
        <AbonnementScreenStack.Navigator screenOptions={{ headerShown: false }}>
            <AbonnementScreenStack.Screen name="AbonnementScreen" component={AbonnementScreen}/>               
        </AbonnementScreenStack.Navigator>
    );
}

export default AbonnementScreenNavigator