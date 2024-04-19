import { useState, FC } from "react"
import { useContext } from "react"
import { HabitsContext } from "../../data/HabitContext"
import { UserContext } from "../../data/UserContext"
import { useEffect } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { HomeStackParamsList } from "../../navigation/BottomTabNavigator"
import React from "react"
import { AppContext } from "../../data/AppContext"
import ProfilDetailsForm from "../../components/Profil/ProfilDetailsForm"

type ProfilDetailsScreenProps = NativeStackScreenProps<HomeStackParamsList, "ProfilDetailsScreen">

const ProfilDetailsScreen: FC<ProfilDetailsScreenProps> = ({navigation}) => {

    const {Habits, Objectifs} = useContext(HabitsContext)
    const {user} = useContext(UserContext)

    const {theme} = useContext(AppContext)

    const [friendRequestsUsers, setFriendRequestsUsers] = useState<string[]>([])
    const [userFriends, setUserFriends] = useState<string[]>(user?.friends ?? [])

    const nb_habits = Object.keys(Habits).length
    const nb_objectifs = Object.keys(Objectifs).length

    const handleSeeHabits = () => {
      navigation.navigate("ProfilListHabitScreen")
    }

    const handleSeeObjectifs = () => {
      navigation.navigate("ProfilListObjectifScreen")
    }

    const handleSeeFriends = () => {
      navigation.navigate("DisplayUsersScreen", {userIDs: userFriends})
    }

    const handleOpenSettings = () => {
      navigation.navigate("ProfilSettingsScreen")
    }

    useEffect(() => {
      if(user?.friendRequests) {
        setFriendRequestsUsers(user?.friendRequests)
      }
    }, [user?.friendRequests])

    useEffect(() => {
      if(user?.friends) {
        setUserFriends(user?.friends)
      }
    }, [user?.friends])

    const handlePressOnProfil = () => navigation.navigate("ProfilNotificationsScreen")

    return(
       <ProfilDetailsForm
          user={user}
          nb_friends={userFriends.length}
          nb_habits={nb_habits}
          nb_objectifs={nb_objectifs}
          handleOpenSettings={handleOpenSettings}
          handleSeeHabits={handleSeeHabits}
          handleSeeFriends={handleSeeFriends}
          handleSeeObjectifs={handleSeeObjectifs}
          handleSeeSucces={() => {}}
          handlePressOnProfil={handlePressOnProfil}
      />
  );
};
  
export default ProfilDetailsScreen;