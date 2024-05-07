import { View, StyleSheet } from "react-native"
import { HugeText, SubTitleText } from "../../styles/StyledText"
import { FC, useState } from "react"
import { CustomScrollView, UsualScreen } from "../../components/View/Views"
import { IconButton, IconProvider, NavigationActions, NavigationButton } from "../../components/Buttons/IconButtons"
import { useContext } from "react"
import { UserContext } from "../../data/UserContext"
import { FlatList } from "react-native"
import { useEffect } from "react"
import { Database_GetSpecificUser, Database_getUsersInfo, UserDataBase } from "../../firebase/Database_User_Primitives"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import ProfilItem from "../../components/Profil/ProfilItem"
import { acceptFriendInvitation, refuseFriendInvitation } from "../../firebase/Firestore_User_Primitives"
import { Habit } from "../../types/HabitTypes"
import { getSpecificHabitForUser } from "../../firebase/Firestore_Habits_Primitives"
import HabitRequestBlock from "../../components/Habitudes/HabitRequestBlock"
import { getSeriazableHabit } from "../../primitives/HabitMethods"
import Quoti from "../../components/Other/Quoti"
import { HabitsContext } from "../../data/HabitContext"
import { HomeStackParamsList } from "../../navigation/HomeNavigator"

type ProfilNotificationsScreenProps = NativeStackScreenProps<HomeStackParamsList, "ProfilNotificationsScreen">

interface HabitRequestItem {
    user: UserDataBase,
    habit: Habit
}


const ProfilNotificationsScreen: FC<ProfilNotificationsScreenProps> = ({navigation}) => {

    const {user} = useContext(UserContext)
    const {addHabit} = useContext(HabitsContext)
    const [friendRequestUsers, setFriendRequestUsers] = useState<UserDataBase[]>([])
    const [habitsRequestsUsers, setHabitsRequestsUsers] = useState<HabitRequestItem[]>([])

    const renderUserFriendRequest = ({item}) => {
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
                handleAccept={handleAcceptFriend}
                handleRefuse={handleRefuseFriend}/>
    }

    const renderUserHabitRequest = ({item, index}) => {
        const onPress = () => {
            navigation.navigate("SharedHabitScreen", {
                habit: getSeriazableHabit(item.habit),
                user: item.user
            })
        }

        return <HabitRequestBlock 
                    index={index}
                    habit={item.habit}
                    user={item.user}
                    onPress={onPress}
                />
    }

    useEffect(() => {
        if(!user) {
            navigation.goBack(); 
        }

        else if(!user?.friendRequests && !user?.habitRequests) {
            navigation.goBack(); 
        }
        
        else if (user && (!user.friendRequests || user.friendRequests.length <= 0) && 
                (!user.habitRequests || user.habitRequests.length <= 0)) {
            navigation.goBack(); 
        }

        const getFriendsRequests = async() => {
            if(user?.friendRequests && user.friendRequests.length > 0) {
                const res = await Database_getUsersInfo(user.friendRequests)
                const users = res.filter(user => user !== null && user !== undefined)

                setFriendRequestUsers(users)

                if(users.length === 0) {
                    navigation.goBack();
                }
            }
        }

        const getHabitsRequests = async () => {
            console.log(user?.habitRequests)
            if (user?.habitRequests && user.habitRequests.length > 0) {
                const habitsPromises = user.habitRequests.map(async (req) => {
                    const res = await Database_GetSpecificUser(req.ownerID);
                    const habit = await getSpecificHabitForUser(req.ownerMail, req.habitID);
                    if (habit && res) {
                        const members = habit.members
                        members.push(res)

                        return { user: res, habit: {...habit, members} };
                    } else {
                        return null;
                    }
                });
        
                const habits = await Promise.all(habitsPromises);
                const filteredHabits = habits.filter(item => item !== null);
                setHabitsRequestsUsers(filteredHabits);
            }
        };
        
        getHabitsRequests()
        getFriendsRequests()
    }, [user])

    console.log(habitsRequestsUsers)

    return(
        <UsualScreen>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <NavigationButton noPadding action={NavigationActions.goBack}/>
                        <Quoti/>
                        <IconButton noPadding name="settings" provider={IconProvider.Feather} onPress={() => {}}/>
                    </View>

                    <HugeText text="Notifications"/>

                </View>
                <CustomScrollView>
                    <View style={styles.body}>
                        {
                            friendRequestUsers.length > 0 &&
                            <View style={{display: "flex", flexDirection: "column", flex: 1, gap: 20, marginTop: 20}}>
                                <SubTitleText text="Demande d'ami"/>
                                <FlatList 
                                    data={friendRequestUsers} 
                                    style={{flex: 1}} 
                                    scrollEnabled={false}
                                    renderItem={renderUserFriendRequest} 
                                    contentContainerStyle={{gap: 20}}
                                    />
                            </View>
                        }

                        {
                            user && user.habitRequests && user.habitRequests.length > 0 &&
                            <View style={{display: "flex", flexDirection: "column", flex: 1, gap: 20, marginTop: 20}}>
                                <SubTitleText text="Invitations à des habitudes"/>
                                <FlatList 
                                    data={habitsRequestsUsers} 
                                    style={{flex: 1}} 
                                    scrollEnabled={false}
                                    renderItem={renderUserHabitRequest} 
                                    contentContainerStyle={{gap: 20}}
                                    />
                            </View>
                        }
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
      gap: 0, 
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