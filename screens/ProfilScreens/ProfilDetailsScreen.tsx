import { View, StyleSheet } from "react-native"
import { MassiveText, NormalText, SubTitleText, TitleText } from "../../styles/StyledText"
import { useState, FC } from "react"
import { useThemeColor } from "../../components/Themed"
import { UsualScreen } from "../../components/View/Views"
import { IconButton, IconProvider, NavigationButton } from "../../components/Buttons/IconButtons"
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

type ProfilDetailsScreenProps = NativeStackScreenProps<HomeStackParamsList, "ProfilDetailsScreen">

const ProfilDetailsScreen: FC<ProfilDetailsScreenProps> = ({navigation}) => {

    const {Habits, Objectifs} = useContext(HabitsContext)
    const {user} = useContext(UserContext)

    const secondary = useThemeColor({}, "Secondary")

    const [friendRequestsUsers, setFriendRequestsUsers] = useState<(UserFirestoreType | null)[]>([])
    const [userFriends, setUserFriends] = useState<(UserFirestoreType | null)[]>([])

    const nb_habits = Object.keys(Habits).length
    const nb_objectifs = Object.keys(Objectifs).length
    const nb_friends = user?.friends?.length ?? 0

    const handleSeeHabits = () => {
      // navigation.navigate("DisplayUsersScreen", {users: user.friends})
    }

    const handleSeeObjectifs = () => {
      // navigation.navigate("DisplayUsersScreen", {users: user.friends})
    }

    const handleSeeFriends = () => {
      navigation.navigate("DisplayUsersScreen", {users: userFriends})
    }

    const user_data = [
      {titre: "Habitudes", value: nb_habits, onPress: handleSeeHabits},
      {titre: "Objectifs", value: nb_objectifs, onPress: handleSeeObjectifs},
      {titre: "Amis", value: nb_friends, onPress: handleSeeFriends},
    ]

    const handleSignOut = async() => {
      await signOut(auth)
      console.log("déconnecté")
    }

    const handleOpenSettings = () => {
      navigation.navigate("ProfilSettingsScreen")
    }


    const RenderUserData = () => {
      return(
        <View style={{display: "flex", flexDirection: "row", gap: 0, justifyContent: "space-evenly", alignItems: "center"}}>
          {
              user_data.map((data, index) => {
                return(
                  <TouchableOpacity onPress={data.onPress} key={index} style={{ flex: 1, gap: 5, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                    <SubTitleText text={data.value}/>
                    <NormalText text={data.titre}/>
                  </TouchableOpacity>
                )
              })
          }
        </View>
      )
    }

    useEffect(() => {

      const getRequestFriendsUserInfo = async() => {
        setFriendRequestsUsers(await Database_getUsersInfo(user?.friendRequests ?? []))
      }


      getRequestFriendsUserInfo()
    }, [user?.friendRequests])

    useEffect(() => {
      const getUsersFriendsInfo = async() => {
        setUserFriends(await Database_getUsersInfo(user?.friends ?? []))
      }

      getUsersFriendsInfo()
    }, [user?.friends])


    const renderUser = ({item}) => {
      return <RequestFriendItem friend={item}/>
    }

    const RenderPlaceholderProfilPicture = () => {
      const firstUsernameLetter = user?.displayName?.substring(0,1) ?? ""

      return(
          <View style={[styles.imageStyle, {justifyContent: "center", alignItems: "center", backgroundColor: secondary }]}>
              <MassiveText text={firstUsernameLetter}/>
          </View>
      )
    }


    return(
        <UsualScreen>
          <View style={[styles.container]}>
                <View style={styles.header}>
                    <View style={styles.subHeader}>
                        <NavigationButton noPadding action={"goBack"}/>
                        <IconButton noPadding name={"settings"} provider={IconProvider.Feather} onPress={handleOpenSettings}/>
                    </View>
                </View>

                <View style={styles.body}>

                  <View style={{display: "flex", flexDirection: "column", gap: 20, alignItems: "center"}}>
                    <View style={styles.imageContainerStyle}>
                      {
                        user?.photoURL ?
                        <Image style={styles.imageStyle} source={{uri: user?.photoURL ?? ""}}/>
                        :
                        <RenderPlaceholderProfilPicture/>
                      }
                    </View>
                    
                    <View style={{display: "flex", flexDirection: "row"}}>
                      <TitleText text={"@" + (user?.displayName ?? "unknown")}/>
                    </View>

                  </View>
                  <RenderUserData/>

                  <FlatList contentContainerStyle={{gap: 20}} data={friendRequestsUsers} renderItem={renderUser}/>

                  <BorderTextButton text={"Déconnexion"} onPress={handleSignOut} bold/>


                </View>
          </View>

        </UsualScreen>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      display: "flex", 
      flexDirection: "column", 
      gap: 20, 
      flex: 1, 
      marginBottom: 0,
    },

    header: {
        display: "flex", 
        flexDirection: "column", 
        gap: 20
    },

    subHeader: {
      display: "flex", 
      flexDirection: "row", 
      alignItems:"center", 
      justifyContent: "space-between"
    },

    body: {
        flex: 1, 
        gap: 30,
    },

    imageStyle: {
      alignSelf: 'center',
      justifyContent: 'center',
      resizeMode: 'contain',
      aspectRatio: 1,
      flex: 1,      
      borderRadius: 200,
    },

    imageContainerStyle: {
      aspectRatio: 1,
      width: 120,
      alignItems: 'center',
      justifyContent: 'center', 
  }
});
  
export default ProfilDetailsScreen;