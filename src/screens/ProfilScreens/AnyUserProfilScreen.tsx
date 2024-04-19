import { useState, FC } from "react"
import { useContext } from "react"
import { HabitsContext } from "../../data/HabitContext"
import { UserContext, UserType } from "../../data/UserContext"
import { useEffect } from "react"
import { Database_getUsersInfo, UserDataBase } from "../../firebase/Database_User_Primitives"
import React from "react"
import { AppContext } from "../../data/AppContext"
import ProfilDetailsForm from "../../components/Profil/ProfilDetailsForm"
import { cancelFriendInvitation, sendFriendInvitation, VisitInfoUser } from "../../firebase/Firestore_User_Primitives"
import { BottomScreenOpen_Impact } from "../../constants/Impacts"
import { HomeStackParamsList, NewsScreenStackType } from "../../navigation/BottomTabNavigator"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

type AnyUserProfilScreenProps = NativeStackScreenProps<NewsScreenStackType , "AnyUserProfilScreen"> | NativeStackScreenProps<HomeStackParamsList , "AnyUserProfilScreen">

const AnyUserProfilScreen: FC<AnyUserProfilScreenProps> = ({route}) => {

    const {Habits, Objectifs} = useContext(HabitsContext)
    const {user, sendedFriendRequests, addUserFriendRequest, removeUserFriendRequest} = useContext(UserContext)
    const {detailledUser} = route.params
    const {theme} = useContext(AppContext)

    const [visitUserInfo, setVisitUserInfo] = useState<VisitInfoUser>(detailledUser as VisitInfoUser)

    const [friendRequestsUsers, setFriendRequestsUsers] = useState<(UserDataBase | null)[]>([])
    const [userFriendsID, setUserFriendsID] = useState<UserDataBase[]>([])

    const [isUserInfoLoading, setIsUserInfoLoading] = useState<boolean>(true)

    const isAlreadyFriend = (user && user.friends && detailledUser && user.friends.includes(detailledUser.uid)) as boolean
    const [isFriend, setIsFriend] = useState<boolean>(isAlreadyFriend)

    const hasAlreadySendedInvation = (detailledUser && sendedFriendRequests.includes(detailledUser.uid)) as boolean

    const [hasSendedInvitation, setHasSendedInvation] = useState<boolean>(hasAlreadySendedInvation)

    const nb_habits = Object.keys(Habits).length
    const nb_objectifs = Object.keys(Objectifs).length
    const nb_friends = 5

    const handleSeeHabits = () => {
    }

    const handleSeeObjectifs = () => {
    }

    const handleSeeFriends = () => {
    }

    const handleAddFriend = async() => {
        if(user && user.email && detailledUser && detailledUser.email){
            if(user.friends?.includes(detailledUser.uid)) {

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
            setIsUserInfoLoading(false)
            setVisitUserInfo(detailledUser)
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
            nb_friends={nb_friends}
            nb_habits={nb_habits}
            nb_objectifs={nb_objectifs}
            handleAddFriend={handleAddFriend}
            handleSeeHabits={handleSeeHabits}
            handleSeeFriends={handleSeeFriends}
            handleSeeObjectifs={handleSeeObjectifs}
            handleSeeSucces={() => {}}
            isFriend={isFriend}
            hasSendedInvitation={hasSendedInvitation}
            isLoading={isUserInfoLoading}
        />
  );
};
  
export default AnyUserProfilScreen;