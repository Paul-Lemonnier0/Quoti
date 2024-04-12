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
import { HomeStackParamsList, NewsScreenStackType } from "../../navigation/BottomTabNavigator"
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
import { sendFriendInvitation } from "../../firebase/Firestore_User_Primitives"
import { Success_Impact } from "../../constants/Impacts"

type AnyUserProfilScreenProps = NativeStackScreenProps<NewsScreenStackType, "AnyUserProfilScreen">

const AnyUserProfilScreen: FC<AnyUserProfilScreenProps> = ({navigation, route}) => {

    const {Habits, Objectifs} = useContext(HabitsContext)
    const {user, sendedFriendRequests, addUserFriendRequest} = useContext(UserContext)
    const {detailledUser} = route.params
    const {theme} = useContext(AppContext)

    const [friendRequestsUsers, setFriendRequestsUsers] = useState<(UserFirestoreType | null)[]>([])
    const [userFriendsID, setUserFriendsID] = useState<UserFirestoreType[]>([])

    const isAlreadyFriend = (user && user.friends && detailledUser && detailledUser.email && user.friends.includes(detailledUser.email)) as boolean
    const [isFriend, setIsFriend] = useState<boolean>(isAlreadyFriend)

    const hasAlreadySendedInvation = sendedFriendRequests.includes(detailledUser.uid)

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
        if(user && user.email && detailledUser.email){
            await sendFriendInvitation(user.uid, user.email, detailledUser.uid, detailledUser.email)
            addUserFriendRequest(detailledUser.uid)
            setHasSendedInvation(true)
            Success_Impact()
        }
    }

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
            user={detailledUser}
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
        />
  );
};
  
export default AnyUserProfilScreen;