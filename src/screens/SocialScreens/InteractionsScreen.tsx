import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types'
import React, { FC, useContext, useState } from 'react'
import { SocialScreenStackType } from '../../navigation/SocialNavigator'
import { StyleSheet, View } from 'react-native'
import AnimatedHeader from '../../components/Other/AnimatedHeader'
import AnimatedScrollComponent from '../../components/ScrollView/AnimatedScrollComponent'
import { HoleLineSeparator } from '../../components/Other/Separator'
import HabitPost from '../../components/Posts/HabitPost'
import { UserDataBase } from '../../firebase/Database_User_Primitives'
import { TestPostHabit } from '../../firebase/Firebase_Posts_Primitives'
import { AppContext } from '../../data/AppContext'
import { HabitsContext } from '../../data/HabitContext'
import { UserContext } from '../../data/UserContext'
import { useThemeColor } from '../../components/Themed'
import { IconButton, NavigationActions, NavigationButton } from '../../components/Buttons/IconButtons'
import { HugeText } from '../../styles/StyledText'
import { Habit } from '../../types/HabitTypes'
import { getSeriazableHabit } from '../../primitives/HabitMethods'

type InteractionsScreenProps = NativeStackScreenProps<SocialScreenStackType, "InteractionsScreen">

const InteractionsScreen: FC<InteractionsScreenProps> = ({navigation}) => {
  const {Habits} = useContext(HabitsContext);
  const {user} = useContext(UserContext)

  const {theme} = useContext(AppContext)
  const primary = useThemeColor(theme, "Primary")

  const [posts, setPosts] = useState<TestPostHabit[]>([
      {
        habit: Object.values(Habits)[0],
        user: user as UserDataBase,
        date: new Date(),
        bio: "Une bonne journée ! Les habitudes rentrent de mieux en mieux dans le quotidien"
      },
      {
        habit: Object.values(Habits)[0],
        user: user as UserDataBase,
        date: new Date(),
      },
  
      {
        habit: Object.values(Habits)[0],
        user: user as UserDataBase,
        date: new Date(),
      },
  ])

  const handleGoToHabitDetails = (detailledUser: UserDataBase, habit: Habit) => {
    navigation.navigate("PresentationHabitScreen", {detailledUser, habit: getSeriazableHabit(habit)})
  }

  const handleGoToProfilDetails = (detailledUser: UserDataBase) => {
    navigation.navigate("AnyUserProfilScreen", {detailledUser})
  }

  return (
    <View style={{backgroundColor: primary, flex: 1, paddingTop: 10}}>
      <View style={[styles.header, {zIndex: 10, backgroundColor: primary}]}>  
        
        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", paddingBottom: 10}}>    
          <NavigationButton noPadding action={NavigationActions.goBack}/>
        </View>

      </View>

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
              navigation={navigation}

              style={{paddingTop: 100}}
              contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 260}}
              
              HeaderComponent={({opacity}) => 
              <AnimatedHeader title='Notifications' opacity={opacity}> 
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
    marginTop: 10,
  },

  header: {
    display: "flex", 
    flexDirection: "column", 
    gap: 20,
    paddingTop: 40,
    marginHorizontal: 20,
    marginBottom: 10
  },
})

export default InteractionsScreen