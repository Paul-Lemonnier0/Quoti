import React, { FC, useContext, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useState } from 'react'

import AnimatedHeader from '../components/Other/AnimatedHeader'
import { Database_GetSpecificUser, Database_getUsersInfo, UserDataBase } from '../firebase/Database_User_Primitives';
import { UserContext } from '../data/UserContext';
import { AppContext } from '../data/AppContext';
import { HabitsContext } from '../data/HabitContext';
import { TestPostHabit } from '../firebase/Firebase_Posts_Primitives';
import HabitPost from '../components/Posts/HabitPost'
import { HoleLineSeparator } from '../components/Other/Separator'
import { useThemeColor } from '../components/Themed'
import { SocialScreenStackType } from '../navigation/SocialNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AnimatedScrollComponent from '../components/ScrollView/AnimatedScrollComponent'
import { IconButton, IconProvider } from '../components/Buttons/IconButtons';
import { Habit } from '../types/HabitTypes';
import { getSeriazableHabit } from '../primitives/HabitMethods';
import { getPosts, HabitPostType, HabitPostFirestore } from '../firebase/Firestore_Posts_Primitives';
import { NormalText } from '../styles/StyledText';
import StoriesBar, { UserStory } from '../components/Profil/StoriesBar';

const CONTAINER_HEIGHT = 70;

type SocialScreenProps = NativeStackScreenProps<SocialScreenStackType, "SocialScreen">

const SocialScreen: FC<SocialScreenProps> = ({navigation}) => {

    const {user} = useContext(UserContext)

    const {theme} = useContext(AppContext)
    const primary = useThemeColor(theme, "Primary")

    const [posts, setPosts] = useState<HabitPostType[]>([])
    const [users, setUsers] = useState<{[userID: string]: UserDataBase}>({})

    useEffect(() => {
      const handleFetchPosts = async() => {
        if(user) {
          setPosts(await getPosts(user?.uid, user?.friends ?? []))
        }
      }

      handleFetchPosts()
    }, [])

    useEffect(() => {
      const fetchUsers = async() => {
        const newUsers = {...users}

        for (const post of posts) {
          if(!users.hasOwnProperty(post.userID)) {
           const user = await Database_GetSpecificUser(post.userID)
           if(user) {
            newUsers[post.userID] = {...user}
           }
          }
        }

        setUsers({...newUsers})
      }

      fetchUsers()
    }, [posts])
    
    const handleGoToInteractions = () => {
      navigation.navigate("InteractionsScreen")
    }

    const handleGoToSearchUser = () => {
      navigation.navigate("SearchUserScreen")
    }

    const handleGoToHabitDetails = (detailledUser: UserDataBase, habit: Habit) => {
      navigation.navigate("PresentationHabitScreen", {detailledUser: {
        photoURL: detailledUser.photoURL,
        firstName: detailledUser.firstName,
        lastName: detailledUser.lastName,
        displayName: detailledUser.displayName,
        email: detailledUser.email,
        uid:  detailledUser.uid,
      }, habit: getSeriazableHabit(habit)})
    }

    const handleGoToProfilDetails = (detailledUser: UserDataBase) => {
      navigation.navigate("AnyUserProfilScreen", {detailledUser})
    }


    const [friends, setFriends] = useState<UserDataBase[]>([])

    useEffect(() => {
      const getUsers = async(userIDs: string[]) => {
        const usersData = await Database_getUsersInfo(userIDs)
        setFriends(usersData.filter(user => user !== null))
      }

      getUsers(user?.friends ?? [])
    }, [])

    
    const stories: UserStory[] = friends.map(friend => ({
      user: friend,
      stories: []
    }))
    
    stories.unshift({user: user as UserDataBase, stories: []})
    
    return (
      <View style={{backgroundColor: primary, flex: 1, paddingTop: 10}}>
        <View style={[styles.container, {backgroundColor: primary}]}>
            <AnimatedScrollComponent
                data={[...posts, ...posts, ...posts, ...posts]}

                renderItem={({ item }) => 
                  <HabitPost {...item} 
                    habitPost={item}
                    user={users[item.userID]}
                    onPress={() => handleGoToHabitDetails(users[item.userID], item.habit)}
                    onPressProfil={() => handleGoToProfilDetails(users[item.userID] as UserDataBase)}
                  />
                }

                flatListHeader={() => (
                  <StoriesBar stories={stories}/>
                )}
                navigation={navigation}

                style={{paddingTop: 100}}
                contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 260, gap: 40}}
                
                headerHeight={CONTAINER_HEIGHT}
                HeaderComponent={({opacity}) => 
                  <AnimatedHeader title='quoti.' opacity={opacity}> 
                      <IconButton name="hearto" provider={IconProvider.AntDesign} onPress={handleGoToInteractions}/>
                      <IconButton name="search" provider={IconProvider.Feather} onPress={handleGoToSearchUser}/>
                  </AnimatedHeader>
                }
            />
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    marginBottom: 0
  },
})

export default SocialScreen