import React from "react";
import SocialScreen from "../screens/SocialScreen";
import UtilsScreen from "../screens/UtilsScreen";
import AnyUserProfilScreen from "../screens/ProfilScreens/AnyUserProfilScreen";
import AnyUserProfilHabitsScreen from "../screens/ProfilScreens/AnyUserProfilHabitsScreen";
import AnyUserProfilObjectifsScreen from "../screens/ProfilScreens/AnyUserProfilObjectifsScreen";
import AnyUserProfilSuccessScreen from "../screens/ProfilScreens/AnyUserProfilSuccessScreen";
import AnyUserProfilFriendsScreen from "../screens/ProfilScreens/AnyUserProfilFriendsScreen";
import PresentationHabitScreen from "../screens/Habitude/PresentationHabitScreen";
import PresentationObjectifDetailsScreen from "../screens/Objectif/PresentationObjectifDetailsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserDataBase } from "../firebase/Database_User_Primitives";
import { SeriazableHabit, SeriazableObjectif } from "../types/HabitTypes";
import SearchUserScreen from "../screens/SocialScreens/SearchUserScreen";
import InteractionsScreen from "../screens/SocialScreens/InteractionsScreen";
import AnyUserProfilDoneHabitsScreen from "../screens/ProfilScreens/AnyUserProfilDoneHabitsScreen";
import AnyUserProfilDoneObjectifsScreen from "../screens/ProfilScreens/AnyUserProfilDoneObjectifsScreen";

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

    AnyUserProfilObjectifsScreen: {
        detailledUser: UserDataBase
    },

    AnyUserProfilDoneObjectifsScreen: {
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

    PresentationObjectifDetailsScreen: {
        seriazableObjectif: SeriazableObjectif
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
            <SocialScreenStack.Screen name="AnyUserProfilObjectifsScreen" component={AnyUserProfilObjectifsScreen}/>
            <SocialScreenStack.Screen name="AnyUserProfilDoneObjectifsScreen" component={AnyUserProfilDoneObjectifsScreen}/>
            <SocialScreenStack.Screen name="AnyUserProfilSuccessScreen" component={AnyUserProfilSuccessScreen}/>
            <SocialScreenStack.Screen name="AnyUserProfilFriendsScreen" component={AnyUserProfilFriendsScreen}/>

            <SocialScreenStack.Screen name="PresentationHabitScreen" component={PresentationHabitScreen}/>
            <SocialScreenStack.Screen name="PresentationObjectifDetailsScreen" component={PresentationObjectifDetailsScreen}/>
        </SocialScreenStack.Navigator>
    );
}

export default SocialScreenNavigator