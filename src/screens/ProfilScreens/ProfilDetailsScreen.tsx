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

type ProfilDetailsScreenProps = NativeStackScreenProps<HomeStackParamsList, "ProfilDetailsScreen">

interface UserStatListItem {
  number: number,
  title: string,
  subTitle: string,
  color?: string,
  onPress: () => void,
}


interface UserStatComponentProps {
  item: UserStatListItem
}

const UserStatComponent: FC<UserStatComponentProps> = ({item}) => {
  const {theme} = useContext(AppContext)
  const fontGray = useThemeColor(theme, "FontGray")
  const font = useThemeColor(theme, "Font")

  return(
    <CustomCard flex onPress={item.onPress}>
      <View style={{gap: 40, flex: 1}}>
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
          <View style={{flexDirection: "row", gap: 10, alignItems: "flex-end", justifyContent: "flex-end"}}>
              <MassiveText text={item.number} style={{fontSize: 50, color: item.color ?? font}}/>
          </View>
        </View>
        
        <View>
          <SubTitleText text={item.title}/>
          <NormalText bold style={{color: fontGray}} text={item.subTitle}/>
        </View>
      </View>
    </CustomCard>
  )
}


const ProfilDetailsScreen: FC<ProfilDetailsScreenProps> = ({navigation}) => {

    const {Habits, Objectifs} = useContext(HabitsContext)
    const {user} = useContext(UserContext)

    const {theme} = useContext(AppContext)
    const fontGray = useThemeColor(theme, "FontGray")
    const font = useThemeColor(theme, "Font")

    const [friendRequestsUsers, setFriendRequestsUsers] = useState<(UserFirestoreType | null)[]>([])
    const [userFriends, setUserFriends] = useState<(UserFirestoreType | null)[]>([])

    const [selectedItem, setSelectedItem] = useState<string>("Habitude")

    const radios: ItemType[] = [
        {key: "Habitude", text: "Habitude" },
        {key: "Objectif", text: "Objectif"},
    ];

    const handleSetSelectedItem = (item: string) => {
        setSelectedItem(item)
    }

    const nb_habits = Object.keys(Habits).length
    const nb_objectifs = Object.keys(Objectifs).length
    const nb_friends = user?.friends?.length ?? 0

    const handleSeeHabits = () => {
      navigation.navigate("ProfilListHabitScreen")
    }

    const handleSeeObjectifs = () => {
      navigation.navigate("ProfilListObjectifScreen")
    }

    const handleSeeFriends = () => {
      navigation.navigate("DisplayUsersScreen", {users: userFriends})
    }

    const handleOpenSettings = () => {
      navigation.navigate("ProfilSettingsScreen")
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

        
    const userStatList: UserStatListItem[] = [
      {
        number: nb_habits,
        title: "Habitudes",
        subTitle: "En cours",
        onPress: handleSeeHabits,
      },
    
      {
        number: nb_objectifs,
        title: "Objectifs",
        subTitle: "En cours",
        onPress: handleSeeObjectifs,
      },

      {
        number: 7,
        title: "Habitudes",
        subTitle: "Terminées",
        color: fontGray,
        onPress: handleSeeHabits,
      },

      {
        number: 4,
        title: "Objectifs",
        subTitle: "Terminés",
        color: fontGray,
        onPress: handleSeeObjectifs,
      }
  ]

  interface UserData {
    number: number,
    title: string,
    onPress: () => void
  }

  const user_data: UserData[] = [
    {
      number: nb_friends,
      title: "Amis",
      onPress: handleSeeFriends
    },

    {
      number: 4,
      title: "Succès",
      onPress: () => {}
    }
  ]

  const RenderUserData = () => {
    return(
      <View style={{display: "flex", flexDirection: "row", gap: 0, justifyContent: "center", alignItems: "center", marginHorizontal: 60}}>
        {
            user_data.map((data, index) => {
              return(
                <TouchableOpacity onPress={data.onPress} key={index} style={{ 
                  flex: 1, 
                  gap: 5, 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center", 
                  justifyContent: "center",
                
                }}>
                  <TitleText text={data.number}/>
                  <NormalText bold text={data.title} style={{color: fontGray}}/>
                </TouchableOpacity>
              )
            })
        }
      </View>
    )
  }


    const streakSentence = "Série validée"
    const streakIcon = "chevrons-up"
    const streakColor = "green"

    // const streakSentence = "Aucune série en cours"
    // const streakIcon = "minus"
    // const streakColor = fontGray

    // const streakSentence = "Série à maintenir"
    // const streakIcon = "chevrons-down"
    // const streakColor = "red"

    return(
        <UsualScreen>
          
          <View style={[styles.container]}>
                <View style={styles.header}>
                    <View style={styles.subHeader}>
                        <NavigationButton noPadding action={NavigationActions.goBack}/>
                        <IconButton noPadding name={"settings"} provider={IconProvider.Feather} onPress={handleOpenSettings}/>
                    </View>
                </View>
                <CustomScrollView>

                <View style={styles.body}>
                  <View style={styles.bodyHeader}>
                      {user && <ProfilButton disabled huge noBadge user={user} onPress={() => {}}/>}
                      <View style={styles.titreEtDescriptionContainer}>
                          <TitleText text={"Paul Lemonnier"}/>
                          <NormalText bold style={{color: fontGray}} text={"@" + user?.displayName ?? "unknown"} />
                      </View>
                  </View>

                  <RenderUserData/>
                  <View style={{marginBottom: -15}}>
                    <Separator/>
                  </View>
 
                    <View style={{gap: 10}}>
                      <CustomCard>
                        <View style={{flexDirection: "row", gap: 15, paddingHorizontal: -10, width: "100%", alignItems: "center"}}>
                            <View style={{marginHorizontal: -10, justifyContent: "center",  marginTop: 5, alignItems: "center"}}>
                              <Icon name={"flame"} provider={IconProvider.IonIcons} size={60}/>
                            </View>
                            <View style={{flex: 1}}>
                              <SubMassiveText text={"70"}/>
                              <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
                                <Icon name={streakIcon} provider={IconProvider.Feather} color={streakColor}/>
                                <NormalText bold text={streakSentence} style={{color: streakColor}}/>
                              </View>
                            </View>
                        </View>
                      </CustomCard>

                      <FlatList
                        key={1}
                        numColumns={2}
                        columnWrapperStyle={{gap: 10, flex: 1}}
                        contentContainerStyle={{gap: 10}}
                        data={userStatList}
                        scrollEnabled={false}
                        renderItem={({item}) => <UserStatComponent item={item}/>}
                      />
                    </View>
                </View>
                </CustomScrollView>

          </View>

        </UsualScreen>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      display: "flex", 
      flexDirection: "column", 
      gap: 10, 
      flex: 1, 
      marginBottom: 0,
    },

    header: {
        display: "flex", 
        flexDirection: "column", 
        gap: 20,
        marginBottom: 5
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
        marginTop: 10,

    },

    imageStyle: {
      alignSelf: 'center',
      justifyContent: 'center',
      resizeMode: 'contain',
      aspectRatio: 1,
      flex: 1,      
      borderRadius: 200,
    },

    titreEtDescriptionContainer:{
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center",
      alignItems: "center",
      gap: 5
    },

    bodyHeader: {
      flexDirection: "column",
      gap: 25,
      justifyContent: "center",
      alignItems: "center"
   },

    imageContainerStyle: {
      aspectRatio: 1,
      width: 120,
      alignItems: 'center',
      justifyContent: 'center', 
  },

  groupContainer: {
    display: 'flex', 
    flexDirection: "row",
    justifyContent: "center",
    gap: 0,
    width: "100%"
  },
});
  
export default ProfilDetailsScreen;