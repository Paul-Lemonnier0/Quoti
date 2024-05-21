import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import HabitudeScreen from '../screens/Habitude/HabitudeScreen';
import ObjectifDetailsScreen from '../screens/Objectif/ObjectifDetailsScreen';
import ProfilDetailsScreen from '../screens/ProfilScreens/ProfilDetailsScreen';
import ProfilNotificationsScreen from '../screens/ProfilScreens/ProfilNotificationsScreen';
import ProfilSettingsScreen from '../screens/ProfilScreens/ProfilSettingsScreen';
import ProfilDataSettingsScreen from '../screens/ProfilScreens/ProfilSettingsScreens/ProfilDataSettingsScreen';
import ConditionUtilisationScreen from '../screens/ProfilScreens/ProfilSettingsScreens/ConditionUtilisationScreen';
import HelpAndSupportScreen from '../screens/ProfilScreens/ProfilSettingsScreens/HelpAndSupportScreen';
import SecurityScreen from '../screens/ProfilScreens/ProfilSettingsScreens/SecurityScreen';
import SubscriptionScreen from '../screens/ProfilScreens/ProfilSettingsScreens/SubscriptionScreen';
import AnyUserProfilScreen from '../screens/ProfilScreens/AnyProfilScreens/AnyUserProfilScreen';
import PresentationHabitScreen from '../screens/Habitude/PresentationHabitScreen';
import PresentationObjectifDetailsScreen from '../screens/Objectif/PresentationObjectifDetailsScreen';
import ProfilHabitsScreen from '../screens/ProfilScreens/ProfilHabitsScreen';
import ProfilObjectifsScreen from '../screens/ProfilScreens/ProfilObjectifsScreen';
import ProfilFriendsScreen from '../screens/ProfilScreens/ProfilFriendsScreen';
import HabitStreakDetailsScreen from '../screens/Habitude/HabitStreakDetailsScreen';
import MembersScreen from '../screens/MembersScreen';
import { FrequencyTypes, Habit, SeriazableHabit, SeriazableObjectif } from '../types/HabitTypes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserDataBase } from '../firebase/Database_User_Primitives';
import AnyUserProfilHabitsScreen from '../screens/ProfilScreens/AnyProfilScreens/AnyUserProfilHabitsScreen';
import AnyUserProfilObjectifsScreen from '../screens/ProfilScreens/AnyProfilScreens/AnyUserProfilObjectifsScreen';
import AnyUserProfilSuccessScreen from '../screens/ProfilScreens/AnyProfilScreens/AnyUserProfilSuccessScreen';
import AnyUserProfilFriendsScreen from '../screens/ProfilScreens/AnyProfilScreens/AnyUserProfilFriendsScreen';
import SharedHabitScreen from '../screens/Habitude/SharedHabitScreen';
import BlockedAccountsScreen from '../screens/ProfilScreens/ProfilSettingsScreens/BlockedAccountsScreen';
import ArchivedHabitsScreen from '../screens/Habitude/ArchivedHabitsScreen';
import ProfilDoneObjectifsScreen from '../screens/ProfilScreens/ProfilDoneObjectifsScreen';
import ProfilDoneHabitsScreen from '../screens/ProfilScreens/ProfilDoneHabitsScreen';
import AnyUserProfilDoneHabitsScreen from '../screens/ProfilScreens/AnyProfilScreens/AnyUserProfilDoneHabitsScreen';
import AnyUserProfilDoneObjectifsScreen from '../screens/ProfilScreens/AnyProfilScreens/AnyUserProfilDoneObjectifsScreen';

export type HomeStackParamsList = {
    HomeScreen: undefined,

    HabitudeScreen: {
        habitID: string,
        habitFrequency: FrequencyTypes,
        objectifID: string | undefined,
        currentDateString: string,
        noInteractions?: boolean,
        isPresentation?: boolean,
        isArchived?: boolean,
        isDone?: boolean,
    },

    HabitStreakDetailsScreen: {
        habitID: string,
        currentDateString: string,        
        isArchived?: boolean,
        isDone?: boolean,
    },

    MembersScreen: {
        users: UserDataBase[]
    },

    ObjectifDetailsScreen: {
        seriazableObjectif: SeriazableObjectif,
        frequency?: FrequencyTypes,
        currentDateString?: string,
        noInteractions?: boolean,
        isPresentation?: boolean
    },

    SharedHabitScreen: {
        user: UserDataBase,
        habit: SeriazableHabit
    },

    ProfilDetailsScreen: undefined,
    ProfilNotificationsScreen: undefined,
    ProfilSettingsScreen: undefined,

    ProfilDataSettingsScreen: undefined,
    ConditionUtilisationScreen: undefined,
    HelpAndSupportScreen: undefined,
    SecurityScreen: undefined,
    SubscriptionScreen: undefined,

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

    ProfilHabitsScreen: undefined,
    ProfilDoneHabitsScreen: undefined,
    ProfilObjectifsScreen: undefined,
    ProfilDoneObjectifsScreen: undefined,

    ProfilFriendsScreen: {
        userIDs: string[]
    }

    PresentationHabitScreen: {
        detailledUser: UserDataBase,
        habit: SeriazableHabit
    },

    PresentationObjectifDetailsScreen: {
        seriazableObjectif: SeriazableObjectif
    },

    BlockedAccountsScreen: undefined,

    ArchivedHabitsScreen: undefined
}

const HomeStack = createNativeStackNavigator<HomeStackParamsList>()

function HomeNavigator() {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} />

            <HomeStack.Screen name="HabitudeScreen" component={HabitudeScreen}/>
            <HomeStack.Screen name="ObjectifDetailsScreen" component={ObjectifDetailsScreen}/>

            <HomeStack.Screen name="ProfilDetailsScreen" component={ProfilDetailsScreen}/>
            <HomeStack.Screen name="ProfilNotificationsScreen" component={ProfilNotificationsScreen}/>
            <HomeStack.Screen name="SharedHabitScreen" component={SharedHabitScreen}/>
            
            <HomeStack.Screen name="ProfilDataSettingsScreen" component={ProfilDataSettingsScreen}/>
            <HomeStack.Screen name="ProfilSettingsScreen" component={ProfilSettingsScreen}/>
            <HomeStack.Screen name="ConditionUtilisationScreen" component={ConditionUtilisationScreen}/>
            <HomeStack.Screen name="HelpAndSupportScreen" component={HelpAndSupportScreen}/>

            <HomeStack.Screen name="SecurityScreen" component={SecurityScreen}/>
            <HomeStack.Screen name="BlockedAccountsScreen" component={BlockedAccountsScreen}/>

            <HomeStack.Screen name="SubscriptionScreen" component={SubscriptionScreen}/>

            <HomeStack.Screen name="ProfilHabitsScreen" component={ProfilHabitsScreen}/>
            <HomeStack.Screen name="ProfilDoneHabitsScreen" component={ProfilDoneHabitsScreen}/>

            <HomeStack.Screen name="ProfilObjectifsScreen" component={ProfilObjectifsScreen}/>
            <HomeStack.Screen name="ProfilDoneObjectifsScreen" component={ProfilDoneObjectifsScreen}/>

            <HomeStack.Screen name="ArchivedHabitsScreen" component={ArchivedHabitsScreen}/>

            <HomeStack.Screen name="AnyUserProfilScreen" component={AnyUserProfilScreen}/>
            <HomeStack.Screen name="AnyUserProfilHabitsScreen" component={AnyUserProfilHabitsScreen}/>
            <HomeStack.Screen name="AnyUserProfilDoneHabitsScreen" component={AnyUserProfilDoneHabitsScreen}/>
            <HomeStack.Screen name="AnyUserProfilObjectifsScreen" component={AnyUserProfilObjectifsScreen}/>
            <HomeStack.Screen name="AnyUserProfilDoneObjectifsScreen" component={AnyUserProfilDoneObjectifsScreen}/>
            <HomeStack.Screen name="AnyUserProfilSuccessScreen" component={AnyUserProfilSuccessScreen}/>
            <HomeStack.Screen name="AnyUserProfilFriendsScreen" component={AnyUserProfilFriendsScreen}/>

            <HomeStack.Screen name="ProfilFriendsScreen" component={ProfilFriendsScreen}/>

            <HomeStack.Screen name="HabitStreakDetailsScreen" component={HabitStreakDetailsScreen}/>
            <HomeStack.Screen name="MembersScreen" component={MembersScreen}/>

            <HomeStack.Screen name="PresentationHabitScreen" component={PresentationHabitScreen}/>
            <HomeStack.Screen name="PresentationObjectifDetailsScreen" component={PresentationObjectifDetailsScreen}/>
        </HomeStack.Navigator>
    );
}
export default HomeNavigator