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
import { UserDataBase } from "../firebase/Database_User_Primitives";
import { SeriazableHabit, SeriazableGoal } from "../types/HabitTypes";
import SearchUserScreen from "../screens/SocialScreens/SearchUserScreen";
import InteractionsScreen from "../screens/SocialScreens/InteractionsScreen";
import AnyUserProfilDoneHabitsScreen from "../screens/ProfilScreens/AnyProfilScreens/AnyUserProfilDoneHabitsScreen";
import AnyUserProfilDoneGoalsScreen from "../screens/ProfilScreens/AnyProfilScreens/AnyUserProfilDoneGoalsScreen";

export type SocialScreenStackType = {
    SocialScreen: undefined,
    UtilsScreen: undefined,

    AnyUserProfilScreen: {
        detailledUser: UserDataBase
    },

    AnyUserProfilHabitsScreen: {
        detailledUser: UserDataBase
    },

    AnyUserProfilDoneHabitsScreen: {
        detailledUser: UserDataBase
    },

    AnyUserProfilGoalsScreen: {
        detailledUser: UserDataBase
    },

    AnyUserProfilDoneGoalsScreen: {
        detailledUser: UserDataBase
    },
    
    AnyUserProfilSuccessScreen: {
        detailledUser: UserDataBase
    }    

    AnyUserProfilFriendsScreen: {
        userIDs: string[] 
    },

    PresentationHabitScreen: {
        detailledUser: UserDataBase,
        habit: SeriazableHabit
    },

    PresentationGoalDetailsScreen: {
        seriazableGoal: SeriazableGoal
    },

    InteractionsScreen: undefined,
    SearchUserScreen: undefined,
}

const SocialScreenStack = createNativeStackNavigator<SocialScreenStackType>();

function SocialScreenNavigator() {
    return (
        <SocialScreenStack.Navigator screenOptions={{ headerShown: false }}>
            <SocialScreenStack.Screen name="SocialScreen" component={SocialScreen}/>   
            <SocialScreenStack.Screen name="InteractionsScreen" component={InteractionsScreen}/>   
            <SocialScreenStack.Screen name="SearchUserScreen" component={SearchUserScreen}/>   
            


            <SocialScreenStack.Screen name="UtilsScreen" component={UtilsScreen}/>

            <SocialScreenStack.Screen name="AnyUserProfilScreen" component={AnyUserProfilScreen}/>
            <SocialScreenStack.Screen name="AnyUserProfilHabitsScreen" component={AnyUserProfilHabitsScreen}/>
            <SocialScreenStack.Screen name="AnyUserProfilDoneHabitsScreen" component={AnyUserProfilDoneHabitsScreen}/>
            <SocialScreenStack.Screen name="AnyUserProfilGoalsScreen" component={AnyUserProfilGoalsScreen}/>
            <SocialScreenStack.Screen name="AnyUserProfilDoneGoalsScreen" component={AnyUserProfilDoneGoalsScreen}/>
            <SocialScreenStack.Screen name="AnyUserProfilSuccessScreen" component={AnyUserProfilSuccessScreen}/>
            <SocialScreenStack.Screen name="AnyUserProfilFriendsScreen" component={AnyUserProfilFriendsScreen}/>

            <SocialScreenStack.Screen name="PresentationHabitScreen" component={PresentationHabitScreen}/>
            <SocialScreenStack.Screen name="PresentationGoalDetailsScreen" component={PresentationGoalDetailsScreen}/>
        </SocialScreenStack.Navigator>
    );
}

export default SocialScreenNavigator