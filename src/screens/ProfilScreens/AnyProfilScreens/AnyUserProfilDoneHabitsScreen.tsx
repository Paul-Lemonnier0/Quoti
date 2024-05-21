import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { StyleSheet, View } from 'react-native'
import { UsualScreen } from '../../../components/View/Views'
import { Habit } from '../../../types/HabitTypes'
import { CustomTextInputRefType, SearchBarCustom } from '../../../components/TextFields/TextInput'
import { HugeText } from '../../../styles/StyledText'
import { IconButton, IconProvider, NavigationActions, NavigationButton } from '../../../components/Buttons/IconButtons'
import { TextButton } from '../../../components/Buttons/UsualButton'
import { SocialScreenStackType } from '../../../navigation/SocialNavigator'
import { getSeriazableHabit } from '../../../primitives/HabitMethods'
import PresentationHabitList from '../../../components/Habitudes/PresentationHabitList'
import { HomeStackParamsList } from '../../../navigation/HomeNavigator'
import SortBottomScreen from '../../BottomScreens/SortBottomScreen'
import { sortDate, sortString } from '../../../primitives/BasicsMethods'
import { BottomScreenOpen_Impact } from '../../../constants/Impacts'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { AppContext } from '../../../data/AppContext'
import { UserContext } from '../../../data/UserContext'
import { HabitsContext } from '../../../data/HabitContext'
import HabitudesSkeletonList from '../../../components/Habitudes/HabitsSkeletonList'
import { fetchUserHabits } from '../../../firebase/Firestore_Fetch_Habits_Primitives'
import { HabitState } from '../../../firebase/Firestore_Habits_Primitives'

type AnyUserProfilDoneHabitsScreenProps = 
  NativeStackScreenProps<SocialScreenStackType, "AnyUserProfilDoneHabitsScreen"> | 
  NativeStackScreenProps<HomeStackParamsList, "AnyUserProfilDoneHabitsScreen">

const AnyUserProfilDoneHabitsScreen: FC<AnyUserProfilDoneHabitsScreenProps> = ({navigation, route}) => {

  const {detailledUser} = route.params

  const {user} = useContext(UserContext)
  const {Habits} = useContext(HabitsContext)

  const searchValueRef = useRef<CustomTextInputRefType>(null)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>("")

  const [userHabits, setUserHabits] = useState<Habit[]>([])
  const [habitsToDisplay, setHabitsToDisplay] = useState<Habit[]>([])

  useEffect(() => {
    const handleFetchUserHabits = async() => {
      setIsLoading(true)

      const {habits} = await fetchUserHabits(detailledUser.email, HabitState.Done)
      setUserHabits(Object.values(habits))
      setHabitsToDisplay(Object.values(habits))

      setIsLoading(false)
    }

    if(user && detailledUser.uid === user.uid) {
      setUserHabits(Object.values(Habits))
      setHabitsToDisplay(Object.values(Habits))
    }

    else handleFetchUserHabits()
  }, [])

  const updateList = (text: string) => {
    setSearchValue(text)
    
    const getAllFilteredHabits = () => {
      const filteredHabits = userHabits.filter((habit) => {
          return habit.titre.includes(text) || habit.description.includes(text)
      })

      setHabitsToDisplay(filteredHabits)        
    }

    getAllFilteredHabits()
  }

  useEffect(() => {
    setHabitsToDisplay(Object.values(userHabits))
  }, [userHabits])

  const handlePressOnHabit = (habit: Habit) => {
    (navigation as NativeStackNavigationProp<HomeStackParamsList | SocialScreenStackType>).navigate("PresentationHabitScreen", {
      detailledUser: detailledUser,
      habit: getSeriazableHabit(habit)
    })
  }

  const sortTypeBottomSheetRef = useRef<BottomSheetModal>(null)

  const handleOpenSortType = () => {
    sortTypeBottomSheetRef.current?.present()
  }

  const closeSortModal = () => {
    sortTypeBottomSheetRef.current?.close()
  }

  const sortByName = () => {
    setHabitsToDisplay((prevHabits) => 
        [...prevHabits].sort((a, b) => sortString(a.titre, b.titre, true))
    );
  
    BottomScreenOpen_Impact();
    closeSortModal();
  };
  
  const sortByNameDesc = () => {
    setHabitsToDisplay((prevHabits) => 
      [...prevHabits].sort((a, b) => sortString(a.titre, b.titre, false))
    );
  
    BottomScreenOpen_Impact();
    closeSortModal();
  };
  
  const sortByLatestDate = () => {
    setHabitsToDisplay((prevHabits) => 
      [...prevHabits].sort((a, b) => sortDate(a.startingDate, b.startingDate, true))
    );
    
    BottomScreenOpen_Impact();
    closeSortModal();
  };
  
  const sortByOldestDate = () => {
    setHabitsToDisplay((prevHabits) => 
      [...prevHabits].sort((a, b) => sortDate(a.startingDate, b.startingDate, false))
    );
  
    BottomScreenOpen_Impact();
    closeSortModal();
  };

  const noSort = () => {
    setHabitsToDisplay(userHabits.filter((habit) => {
        return habit.titre.includes(searchValue) || habit.description.includes(searchValue)
    }))

    BottomScreenOpen_Impact()
    closeSortModal()
  }

  return (
    <UsualScreen>
      <View style={styles.container}>
        <View style={styles.header}>  
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>    
              <NavigationButton noPadding action={NavigationActions.goBack}/>
              <IconButton noPadding name='sort' provider={IconProvider.MaterialCommunityIcons} onPress={handleOpenSortType}/>
            </View>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>    
              <HugeText text="Habitudes"/>

            </View>
        </View>

        <View style={styles.body}>
            <SearchBarCustom ref={searchValueRef} placeholder={"Rechercher une habitude..."} onChangeText={updateList}/>

            {
              isLoading ?
              <HabitudesSkeletonList/> :
              <PresentationHabitList 
                owner={detailledUser}
                isNotNewGoalHabit 
                isNotGoalIDConst 
                habits={habitsToDisplay} 
                deleteHabit={() => {}} 
                editHabit={() => {}}
                onPress={handlePressOnHabit}
                marginBottom={160}
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

export default AnyUserProfilDoneHabitsScreen