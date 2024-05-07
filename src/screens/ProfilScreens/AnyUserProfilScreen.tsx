import { useState, FC } from "react"
import { useContext } from "react"
import { HabitsContext } from "../../data/HabitContext"
import { UserContext, UserType } from "../../data/UserContext"
import { useEffect } from "react"
import { Database_getUsersInfo, UserDataBase } from "../../firebase/Database_User_Primitives"
import React from "react"
import { AppContext } from "../../data/AppContext"
import ProfilDetailsForm from "../../components/Profil/ProfilDetailsForm"
import { cancelFriendInvitation, getNumberOfHabitsForUser, getNumberOfObjectifsForUser, getUserFriendsID, removeUserFriendFirestore, sendFriendInvitation, VisitInfoUser } from "../../firebase/Firestore_User_Primitives"
import { BottomScreenOpen_Impact } from "../../constants/Impacts"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../navigation"
import { SocialScreenStackType } from "../../navigation/SocialNavigator"
import { HomeStackParamsList } from "../../navigation/HomeNavigator"
import { HabitState } from "../../firebase/Firestore_Habits_Primitives"

type AnyUserProfilScreenProps = 
  NativeStackScreenProps<SocialScreenStackType, "AnyUserProfilScreen"> | 
  NativeStackScreenProps<HomeStackParamsList, "AnyUserProfilScreen">

const AnyUserProfilScreen: FC<AnyUserProfilScreenProps> = ({navigation, route}) => {

    const {Habits, Objectifs, DoneHabits, isDoneHabitsFetched, setIsDoneHabitsFetched} = useContext(HabitsContext)
    const {user, sendedFriendRequests, addUserFriendRequest, removeUserFriendRequest, removeUserFriend} = useContext(UserContext)
    const {detailledUser} = route.params
    const {theme} = useContext(AppContext)

    const [visitUserInfo, setVisitUserInfo] = useState<VisitInfoUser>(detailledUser as VisitInfoUser)

    const [friendRequestsUsers, setFriendRequestsUsers] = useState<(UserDataBase | null)[]>([])
    const [userFriendsID, setUserFriendsID] = useState<UserDataBase[]>([])

    const [isUserInfoLoading, setIsUserInfoLoading] = useState<boolean>(true)

    const isAlreadyFriend = ((user && user.friends && detailledUser && user.friends.includes(detailledUser.uid)) || (user && (user.uid === detailledUser.uid))) as boolean
    const [isFriend, setIsFriend] = useState<boolean>(isAlreadyFriend)

    const hasAlreadySendedInvation = (detailledUser && sendedFriendRequests.includes(detailledUser.uid)) as boolean

    const [hasSendedInvitation, setHasSendedInvation] = useState<boolean>(hasAlreadySendedInvation)

    const nb_habits = Object.keys(Habits).length
    const nb_objectifs = Object.keys(Objectifs).length

    const [nbHabitsDone, setNbHabitsDone] = useState<number>(0)
    const [nbObjectifsDone, setNbObjectifsDone] = useState<number>(0)

    const handleSeeHabits = () => {
      (navigation as NativeStackNavigationProp<HomeStackParamsList | SocialScreenStackType>).push("AnyUserProfilHabitsScreen", {detailledUser: detailledUser})
    }

    const handleSeeDoneHabits = () => {
      (navigation as NativeStackNavigationProp<HomeStackParamsList | SocialScreenStackType>).push("AnyUserProfilHabitsScreen", {detailledUser: detailledUser})
    }

    const handleSeeObjectifs = () => {
      (navigation as NativeStackNavigationProp<HomeStackParamsList | SocialScreenStackType>).push("AnyUserProfilObjectifsScreen", {detailledUser: detailledUser})
    }

    const handleSeeDoneObjectifs = () => {
      (navigation as NativeStackNavigationProp<HomeStackParamsList | SocialScreenStackType>).push("AnyUserProfilObjectifsScreen", {detailledUser: detailledUser})
    }

    const handleSeeFriends = () => {
      (navigation as NativeStackNavigationProp<HomeStackParamsList | SocialScreenStackType>).push("AnyUserProfilFriendsScreen", {userIDs: visitUserInfo.friendsID ?? []})
    }

    const handleAddFriend = async() => {
        if(user && user.email && detailledUser && detailledUser.email){
            if(user.friends?.includes(detailledUser.uid)) {
              removeUserFriend(detailledUser.uid, detailledUser.email)
              setHasSendedInvation(false)
            }

            else if(hasSendedInvitation) {
              console.log("canceling friend request")
              removeUserFriendRequest(detailledUser.uid)

              setHasSendedInvation(false)

              cancelFriendInvitation(user.uid, user.email, detailledUser.uid, detailledUser.email)
            }

            else {
              console.log("sending friend request")
              addUserFriendRequest(detailledUser.uid)

              setHasSendedInvation(true)

              sendFriendInvitation(user.uid, user.email, detailledUser.uid, detailledUser.email)
            }

            BottomScreenOpen_Impact()
        }
    }

    useEffect(() => {
        const setupUserInfo = async() => {
          setIsUserInfoLoading(true)

          if(user && (user.uid === detailledUser.uid)) {

            if(isDoneHabitsFetched) {
              setNbHabitsDone(Object.keys(DoneHabits).length)
            }
    
            else {
              if(user?.email) {
                const nbHabits = await getNumberOfHabitsForUser(user?.email, HabitState.Done)
                setNbHabitsDone(nbHabits)
              }
            }

            setVisitUserInfo({
              nbHabits: nb_habits,
              nbHabitsFinished: nbHabitsDone,
              nbObjectifs: nb_objectifs,
              nbObjectifsFinished: 0,
              nbSucces: 0,
              friendsID: user.friends ?? [],
              isPrivate: detailledUser.isPrivate ?? true,
              ...detailledUser
            })
          }

          else {
            const [nbHabits, nbHabitsDone, nbObjectifs, friendsID] = await Promise.all([
                getNumberOfHabitsForUser(detailledUser.email),
                getNumberOfHabitsForUser(detailledUser.email, HabitState.Done),
                getNumberOfObjectifsForUser(detailledUser.email),
                getUserFriendsID(detailledUser.email)
            ]);

            setVisitUserInfo({
              nbHabits: nbHabits,
              nbHabitsFinished: nbHabitsDone,
              nbObjectifs: nbObjectifs,
              nbObjectifsFinished: 0,
              nbSucces: 0,
              friendsID: friendsID,
              isPrivate: detailledUser.isPrivate ?? true,
              ...detailledUser
            })
          }

          setIsUserInfoLoading(false)
        }

        setupUserInfo()
    }, [])

    useEffect(() => {
      const getRequestFriendsUserInfo = async() => {
        setFriendRequestsUsers(await Database_getUsersInfo(user?.friendRequests ?? []))
      }

      getRequestFriendsUserInfo()
    }, [user?.friendRequests])

    useEffect(() => {
      const getUsersFriendsInfo = async() => {
        const res = await Database_getUsersInfo(user?.friends ?? [])
        setUserFriendsID(res.filter(user => user !== null && user !== undefined))
      }

      getUsersFriendsInfo()
    }, [user?.friends])

    return(
        <ProfilDetailsForm
            user={visitUserInfo}
            friends={visitUserInfo.friendsID ?? []}
            nb_habits={visitUserInfo.nbHabits ?? 0}
            nb_habits_done={nbHabitsDone}
            nb_objectifs={visitUserInfo.nbObjectifs ?? 0}
            nb_objectifs_done={0}
            handleAddFriend={handleAddFriend}
            handleSeeHabits={handleSeeHabits}
            handleSeeDoneHabits={handleSeeDoneHabits}
            handleSeeFriends={handleSeeFriends}
            handleSeeObjectifs={handleSeeObjectifs}
            handleSeeDoneObjectifs={handleSeeDoneObjectifs}
            handleSeeSucces={() => {}}
            isFriend={isFriend}
            hasSendedInvitation={hasSendedInvitation}
            isLoading={isUserInfoLoading}
        />
  );
};
  
export default AnyUserProfilScreen;