import { View, StyleSheet } from "react-native"
import { HugeText, LittleNormalText, NormalGrayText, NormalText, SubText, SubTitleGrayText, SubTitleText, TitleText } from "../../styles/StyledText"
import { useRef, useMemo, useCallback, useState } from "react"
import { useThemeColor } from "../../components/Themed"
import { useNavigation, useRoute } from "@react-navigation/native"
import { UsualScreen } from "../../components/View/Views"
import AchievementBox from "../../components/Achievements/AchievementBox"
import { CircleBorderIconButton, NavigationButton } from "../../components/Buttons/IconButtons"
import { ProfilButton } from "../../components/Profil/ProfilButton"
import { Image } from "react-native"
import { useContext } from "react"
import { HabitsContext } from "../../data/HabitContext"
import { signOut } from "@firebase/auth"
import { auth } from "../../firebase/InitialisationFirebase"
import { BackgroundTextButton, BorderTextButton } from "../../components/Buttons/UsualButton"
import { UserContext } from "../../data/UserContext"
import { sendFriendInvitation } from "../../firebase/Firestore_User_Primitives"

export default UserDetailsScreen = () => {

    const {Habits, Objectifs} = useContext(HabitsContext)
    const route = useRoute()

    const {detailledUser} = route.params
    const {user} = useContext(UserContext)

    const navigation = useNavigation()

    const nb_habits = Object.keys(Habits).length
    const nb_objectifs = Object.keys(Objectifs).length
    const friends = 4

    const user_data = [
      {titre: "Habitudes", value: nb_habits},
      {titre: "Objectifs", value: nb_objectifs},
      {titre: "Amis", value: friends},
    ]

    const handleFriendRequest = async() => {
      await sendFriendInvitation(detailledUser.uid, user.email)
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
                  <View key={index} style={{ flex: 1, gap: 5, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                    <SubTitleText text={data.value}/>
                    <NormalText text={data.titre}/>
                  </View>
                )
              })
          }
        </View>
      )
    }


    return(
        <UsualScreen>
          <View style={[styles.container]}>
                <View style={styles.header}>
                    <View style={styles.subHeader}>
                        <NavigationButton action={"goBack"}/>
                        <CircleBorderIconButton name={"settings"} provider={"Feather"} onPress={handleOpenSettings}/>
                    </View>
                </View>

                <View style={styles.body}>

                  <View style={{display: "flex", flexDirection: "column", gap: 20, alignItems: "center"}}>
                    <View style={styles.imageContainerStyle}>
                      <Image style={styles.imageStyle} source={detailledUser.photoURL ? {uri: detailledUser.photoURL} : require("../../img/TestVrai.png")}/>
                    </View>
                    
                    <View style={{display: "flex", flexDirection: "row"}}>
                      <TitleText text={"@" + detailledUser.displayName}/>
                    </View>

                  </View>
                  <RenderUserData/>

                  <BackgroundTextButton text={"Ajouter"} onPress={handleFriendRequest} bold/>


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
      marginBottom: 0    
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