import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { FC, useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Habit, Goal, SeriazableGoal } from '../../../types/HabitTypes'
import { CustomTextInputRefType, SearchBarCustom } from '../../../components/TextFields/TextInput'
import { HugeText } from '../../../styles/StyledText'
import { IconButton, IconProvider, NavigationActions, NavigationButton } from '../../../components/Buttons/IconButtons'
import { PresentationGoalList } from '../../../components/Goals/GoalsList'
import { SocialScreenStackType } from '../../../navigation/SocialNavigator'
import { fetchAllGoals } from '../../../firebase/Firestore_Goals_Primitives'
import { HomeStackParamsList } from '../../../navigation/HomeNavigator'
import SortBottomScreen from '../../BottomScreens/SortBottomScreen'
import { BottomScreenOpen_Impact } from '../../../constants/Impacts'
import { sortDate, sortString } from '../../../primitives/BasicsMethods'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { UsualScreen } from '../../../components/View/Views'
import { getUserHabitsForGoal } from '../../../firebase/Firestore_Habits_Primitives'
import Goals_SkeletonList from '../../../components/Goals/Goals_SkeletonList'

type AnyUserProfilGoalsScreenProps =
  NativeStackScreenProps<SocialScreenStackType, "AnyUserProfilGoalsScreen"> | 
  NativeStackScreenProps<HomeStackParamsList, "AnyUserProfilGoalsScreen">

const AnyUserProfilGoalsScreen: FC<AnyUserProfilGoalsScreenProps> = ({navigation, route}) => {

  const { detailledUser } = route.params

  const searchValueRef = useRef<CustomTextInputRefType>(null)

  const [searchValue, setSearchValue] = useState<string>("")

  const [userGoals, setUserGoals] = useState<Goal[]>([])
  const [goalsToDisplay, setGoalsToDisplay] = useState<Goal[]>([])

  useEffect(() => {
    const handleFetchUserGoals = async() => {
      const goals = await fetchAllGoals(detailledUser.email)
    
      setUserGoals(Object.values(goals))
      setGoalsToDisplay(Object.values(goals))
    }

    handleFetchUserGoals()
  }, [])

  const updateList = (text: string) => {
    setSearchValue(text)
    const getAllFilteredHabits = () => {

      const filteredGoals = userGoals.filter((goal) => {
          return goal.titre.includes(text) || goal.description.includes(text)
      })

      setGoalsToDisplay(filteredGoals)        
    }

    getAllFilteredHabits()
  }

  const handlePressOnGoal= (seriazableGoal: SeriazableGoal) => {
    (navigation as NativeStackNavigationProp<SocialScreenStackType | HomeStackParamsList>).navigate("PresentationGoalDetailsScreen", {seriazableGoal});
  }

  const sortTypeBottomSheetRef = useRef<BottomSheetModal>(null)

  const handleOpenSortType = () => {
    sortTypeBottomSheetRef.current?.present()
  }

  const closeSortModal = () => {
    sortTypeBottomSheetRef.current?.close()
  }

  const sortByName = () => {
    setGoalsToDisplay((prevObjs) => 
        [...prevObjs].sort((a, b) => sortString(a.titre, b.titre, true))
    );
  
    BottomScreenOpen_Impact();
    closeSortModal();
  };
  
  const sortByNameDesc = () => {
    setGoalsToDisplay((prevObjs) => 
      [...prevObjs].sort((a, b) => sortString(a.titre, b.titre, false))
    );
  
    BottomScreenOpen_Impact();
    closeSortModal();
  };
  
  const sortByLatestDate = () => {
    setGoalsToDisplay((prevObjs) => 
      [...prevObjs].sort((a, b) => sortDate(a.startingDate, b.startingDate, true))
    );
    
    BottomScreenOpen_Impact();
    closeSortModal();
  };
  
  const sortByOldestDate = () => {
    setGoalsToDisplay((prevObjs) => 
      [...prevObjs].sort((a, b) => sortDate(a.startingDate, b.startingDate, false))
    );
  
    BottomScreenOpen_Impact();
    closeSortModal();
  };

  const noSort = () => {
    setGoalsToDisplay(userGoals.filter((goal) => {
        return goal.titre.includes(searchValue) || goal.description.includes(searchValue)
    }))

    BottomScreenOpen_Impact()
    closeSortModal()
  }

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [habitsForGoals, setHabitsForGoals] = useState<{[key: string]: Habit[]}>({})

  useEffect(() => {
    const handleRetrieveHabitsForGoals = async(userMail: string) => {
      setIsLoading(true)

      const objHabits: {[key: string]: Habit[]} = {}

      await Promise.all(userGoals.map(async(obj) => {
          const habits = await getUserHabitsForGoal(userMail, obj.goalID)
          objHabits[obj.goalID] = habits
      }))

      setHabitsForGoals(objHabits)

      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
  }

  detailledUser ? handleRetrieveHabitsForGoals(detailledUser.email) : undefined
  }, [])

  return (
    <UsualScreen>
      <View style={styles.container}>
        <View style={styles.header}>  
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>    
              <NavigationButton noPadding action={NavigationActions.goBack}/>
              <IconButton noPadding name='sort' provider={IconProvider.MaterialCommunityIcons} onPress={handleOpenSortType}/>
            </View>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>    
              <HugeText text="Goals"/>
            </View>
        </View>

        <View style={styles.body}>
            <SearchBarCustom 
              ref={searchValueRef} 
              placeholder={"Rechercher un goal..."} 
              onChangeText={updateList}
            />

            {
              isLoading ?
              <Goals_SkeletonList isPresentation/> :
              <PresentationGoalList 
                goals={goalsToDisplay} 
                handleOnPress={handlePressOnGoal}
                differentUserMail={detailledUser.email}
                noEnteringAnimation
                marginBottom={160}
                habitsForGoals={habitsForGoals}
              />
            }
        </View>
      </View>

      <SortBottomScreen
          bottomSheetModalRef={sortTypeBottomSheetRef}
          sortByName={sortByName}
          sortByNameDesc={sortByNameDesc}
          sortByLatestDate={sortByLatestDate}
          sortByOldestDate={sortByOldestDate}
          noSort={noSort}
      />
    </UsualScreen>
  )
}

const styles = StyleSheet.create({  
  container: {
    display: "flex", 
    flexDirection: "column", 
    gap: 20, 
    flex: 1, 
    marginBottom: -120
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
      gap: 10,
      marginBottom: -35,    
  },
});

export default AnyUserProfilGoalsScreen