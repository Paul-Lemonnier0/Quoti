import { useState, FC } from "react"
import { useContext } from "react"
import { HabitsContext } from "../../data/HabitContext"
import { UserContext } from "../../data/UserContext"
import { useEffect } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import { AppContext } from "../../data/AppContext"
import ProfilDetailsForm from "../../components/Profil/ProfilDetailsForm"
import { LogBox } from "react-native"
import { HomeStackParamsList } from "../../navigation/HomeNavigator"
import { getNumberOfHabitsForUser } from "../../firebase/Firestore_User_Primitives"
import { HabitState } from "../../firebase/Firestore_Habits_Primitives"

type ProfilDetailsScreenProps = NativeStackScreenProps<HomeStackParamsList, "ProfilDetailsScreen">

const ProfilDetailsScreen: FC<ProfilDetailsScreenProps> = ({navigation}) => {

    LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered.']);

    const {
      Habits, Objectifs,
      isDoneHabitsFetched, DoneHabits
    } = useContext(HabitsContext)
    const {user} = useContext(UserContext)

    const {theme} = useContext(AppContext)

    const [friendRequestsUsers, setFriendRequestsUsers] = useState<string[]>([])
    const [userFriends, setUserFriends] = useState<string[]>(user?.friends ?? [])

    const nb_habits = Object.keys(Habits).length
    const nb_objectifs = Object.keys(Objectifs).length

    const [nbHabitsDone, setNbHabitsDone] = useState<number>(0)
    const [nbObjectifsDone, setNbObjectifsDone] = useState<number>(0)

    useEffect(() => {
      const handleSetNbHabitsDone = async() => {
        if(isDoneHabitsFetched) {
          setNbHabitsDone(Object.keys(DoneHabits).length)
        }

        else {
          if(user?.email) {
            const nbHabits = await getNumberOfHabitsForUser(user?.email, HabitState.Done)
            setNbHabitsDone(nbHabits)
          }
        }
      }

      handleSetNbHabitsDone()
    }, [DoneHabits])

    const handleSeeHabits = () => {
      if(Object.values(Habits).length > 0) {
        navigation.navigate("ProfilHabitsScreen")
      }    
    }

    const handleSeeDoneHabits = () => {
      if(Object.values(Habits).length > 0) {
        navigation.navigate("ProfilDoneHabitsScreen")
      }    
    }

    const handleSeeObjectifs = () => {
      if(Object.values(Objectifs).length > 0) {
        navigation.navigate("ProfilObjectifsScreen")
      }
    }

    const handleSeeDoneObjectifs = () => {
      if(Object.values(Objectifs).length > 0) {
        navigation.navigate("ProfilDoneObjectifsScreen")
      }
    }

    const handleSeeFriends = () => {
      if(user && user.friends && user?.friends.length > 0) {
        navigation.navigate("ProfilFriendsScreen", { userIDs: user.friends })
      }
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
          friends={userFriends}
          nb_habits={nb_habits}
          nb_habits_done={nbHabitsDone}
          nb_objectifs={nb_objectifs}
          nb_objectifs_done={nbObjectifsDone}
          handleOpenSettings={handleOpenSettings}
          handleSeeHabits={handleSeeHabits}
          handleSeeDoneHabits={handleSeeDoneHabits}
          handleSeeDoneObjectifs={handleSeeDoneObjectifs}
          handleSeeFriends={handleSeeFriends}
          handleSeeObjectifs={handleSeeObjectifs}
          handleSeeSucces={() => {}}
          handlePressOnProfil={handlePressOnProfil}
      />
  );
};
  
export default ProfilDetailsScreen;