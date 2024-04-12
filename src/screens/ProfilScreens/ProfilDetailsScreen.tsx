import { View, StyleSheet } from "react-native"
import { HugeText, LittleNormalText, MassiveText, NormalGrayText, NormalText, SubMassiveText, SubTitleGrayText, SubTitleText, TitleGrayText, TitleText } from "../../styles/StyledText"
import { useState, FC } from "react"
import { useThemeColor } from "../../components/Themed"
import { CustomScrollView, UsualScreen } from "../../components/View/Views"
import { Icon, IconButton, IconProvider, NavigationActions, NavigationButton } from "../../components/Buttons/IconButtons"
import { Image } from "react-native"
import { useContext } from "react"
import { HabitsContext } from "../../data/HabitContext"
import { signOut } from "@firebase/auth"
import { auth } from "../../firebase/InitialisationFirebase"
import { BorderTextButton } from "../../components/Buttons/UsualButton"
import { UserContext } from "../../data/UserContext"
import { FlatList } from "react-native"
import { useEffect } from "react"
import { Database_getUsersInfo } from "../../firebase/Database_User_Primitives"
import RequestFriendItem from "../../components/Profil/RequestFriendItem"
import { TouchableOpacity } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { HomeStackParamsList } from "../../navigation/BottomTabNavigator"
import { UserFirestoreType } from "../../types/FirestoreTypes/UserTypes"
import React from "react"
import { AppContext } from "../../data/AppContext"
import ProfilButton from "../../components/Profil/ProfilButton"
import { ItemType, RadioButtonsBar } from "../../components/RadioButtons/RadioButtonsBar"
import HabitudesList from "../../components/Habitudes/HabitudesList"
import PresentationHabitList from "../../components/Habitudes/PresentationHabitList"
import ObjectifsList from "../../components/Objectifs/ObjectifsList"
import Separator from "../../components/Other/Separator"
import CustomCard from "../../components/Other/Card"
import { SeriazableObjectif } from "../../types/HabitTypes"
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