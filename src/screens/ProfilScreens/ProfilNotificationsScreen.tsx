import { View, StyleSheet } from "react-native"
import { HugeText } from "../../styles/StyledText"
import { FC, useState } from "react"
import { UsualScreen } from "../../components/View/Views"
import { NavigationActions, NavigationButton } from "../../components/Buttons/IconButtons"
import { useContext } from "react"
import { UserContext } from "../../data/UserContext"
import { FlatList } from "react-native"
import { useEffect } from "react"
import { Database_getUsersInfo } from "../../firebase/Database_User_Primitives"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { HomeStackParamsList } from "../../navigation/BottomTabNavigator"
import { UserFirestoreType } from "../../types/FirestoreTypes/UserTypes"
import React from "react"
import ProfilItem from "../../components/Profil/ProfilItem"
import { acceptFriendInvitation, refuseFriendInvitation } from "../../firebase/Firestore_User_Primitives"
import { User } from "firebase/auth"

type ProfilNotificationsScreenProps = NativeStackScreenProps<HomeStackParamsList, "ProfilNotificationsScreen">

const ProfilNotificationsScreen: FC<ProfilNotificationsScreenProps> = ({navigation}) => {

    const {user} = useContext(UserContext)
    const [friendRequestUsers, setFriendRequestUsers] = useState<UserFirestoreType[]>([])

    const renderUser = ({item}) => {
        const onPress = () => {
            navigation.navigate("AnyUserProfilScreen", {detailledUser: item})
        }

        const handleAcceptFriend = () => {
            if(user?.uid && user?.email && item?.uid && item?.email) {
                acceptFriendInvitation(user?.uid, user?.email, item.uid, item.email)
            }
        }

        const handleRefuseFriend = () => {
            if(user?.uid && user?.email && item?.uid && item?.email) {
                refuseFriendInvitation(user?.uid, user?.email, item.uid, item.email)
            }
        }

        return <ProfilItem 
                user={item}
                onPress={onPress}
                handleAcceptFriend={handleAcceptFriend}
                handleRefuseFriend={handleRefuseFriend}/>
    }


    useEffect(() => {
        console.log("update")
        if(!user) {
            navigation.goBack(); 
        }

        else if(!user?.friendRequests) {
            navigation.goBack(); 
        }
        
        else if(user && user?.friendRequests?.length <= 0) {
            navigation.goBack(); 
        }

        const getFriendsRequests = async() => {
            if(user?.friendRequests && user.friendRequests.length > 0) {
                const res = await Database_getUsersInfo(user.friendRequests)
                const users = res.filter(user => user !== null && user !== undefined)

                setFriendRequestUsers(users)
                console.log(users)
                if(users.length === 0) {
                    navigation.goBack();
                }
            }
        }

        getFriendsRequests()
    }, [user])

    


    return(
        <UsualScreen>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <NavigationButton noPadding action={NavigationActions.goBack}/>
                    </View>

                    <HugeText text="Notifications"/>

                </View>
                <View style={styles.body}>
                    <View style={{display: "flex", flexDirection: "column", flex: 1, gap: 20, marginTop: 20}}>
                        <FlatList 
                            data={friendRequestUsers} 
                            style={{flex: 1}} 
                            renderItem={renderUser} 
                            contentContainerStyle={{gap: 20}}
                            />
                    </View>
                </View>
            </View>
        </UsualScreen>
  );
};
  
const styles = StyleSheet.create({  
    container: {
      display: "flex", 
      flexDirection: "column", 
      gap: 30, 
      flex: 1, 
      marginBottom: 0    
    },

    header: {
      display: "flex", 
      flexDirection: "column", 
      gap: 30,
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
    },
  });
export default ProfilNotificationsScreen;