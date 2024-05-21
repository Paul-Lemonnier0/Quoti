import React from "react";
import SocialScreen from "../screens/SocialScreen";
import UtilsScreen from "../screens/UtilsScreen";
import AnyUserProfilScreen from "../screens/ProfilScreens/AnyProfilScreens/AnyUserProfilScreen";
import AnyUserProfilHabitsScreen from "../screens/ProfilScreens/AnyProfilScreens/AnyUserProfilHabitsScreen";
import AnyUserProfilGoalsScreen from "../screens/ProfilScreens/AnyProfilScreens/AnyUserProfilGoalsScreen";
import AnyUserProfilSuccessScreen from "../screens/ProfilScreens/AnyProfilScreens/AnyUserProfilSuccessScreen";
import AnyUserProfilFriendsScreen from "../screens/ProfilScreens/AnyProfilScreens/AnyUserProfilFriendsScreen";
import PresentationHabitScreen from "../screens/Habitude/PresentationHabitScreen";
import PresentationGoalDetailsScreen from "../screens/Goal/PresentationGoalDetailsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchUserScreen from "../screens/SocialScreens/SearchUserScreen";
import InteractionsScreen from "../screens/SocialScreens/InteractionsScreen";
import AnyUserProfilDoneHabitsScreen from "../screens/ProfilScreens/AnyProfilScreens/AnyUserProfilDoneHabitsScreen";
import AnyUserProfilDoneGoalsScreen from "../screens/ProfilScreens/AnyProfilScreens/AnyUserProfilDoneGoalsScreen";
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