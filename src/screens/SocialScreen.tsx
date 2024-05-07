import React, { FC, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { useState } from 'react'

import AnimatedHeader from '../components/Other/AnimatedHeader'
import { UserDataBase } from '../firebase/Database_User_Primitives';
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

const CONTAINER_HEIGHT = 70;

type SocialScreenProps = NativeStackScreenProps<SocialScreenStackType, "SocialScreen">

const SocialScreen: FC<SocialScreenProps> = ({navigation}) => {

    const {Habits} = useContext(HabitsContext);
    const {user} = useContext(UserContext)

    const {theme} = useContext(AppContext)
    const primary = useThemeColor(theme, "Primary")

    const [posts, setPosts] = useState<TestPostHabit[]>([
        // {
        //   habit: Object.values(Habits)[0],
        //   user: user as UserDataBase,
        //   date: new Date(),
        //   bio: "Une bonne journée ! Les habitudes rentrent de mieux en mieux dans le quotidien"
        // },
        // {
        //   habit: Object.values(Habits)[0],
        //   user: user as UserDataBase,
        //   date: new Date(),
        // },
    
        // {
        //   habit: Object.values(Habits)[0],
        //   user: user as UserDataBase,
        //   date: new Date(),
        // },
      
    ])

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

    return (
      <View style={{backgroundColor: primary, flex: 1, paddingTop: 10}}>
        <View style={[styles.container, {backgroundColor: primary}]}>
            <AnimatedScrollComponent
                data={posts}

                renderItem={({ item }) => 
                  <HabitPost {...item} 
                    onPress={() => handleGoToHabitDetails(item.user, item.habit)}
                    onPressProfil={() => handleGoToProfilDetails(item.user as UserDataBase)}
                  />
                }
                ItemSeparatorComponent={() => <HoleLineSeparator/>}
                // navigation={navigation}

                style={{paddingTop: 100}}
                contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 260}}
                
                headerHeight={CONTAINER_HEIGHT}
                HeaderComponent={({opacity}) => 
                  <AnimatedHeader title='Feed' opacity={opacity}> 
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