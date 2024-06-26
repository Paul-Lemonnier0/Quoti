import React, { FC, useContext, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useRef } from 'react'
import { useState } from 'react'
import { AppContext } from '../../data/AppContext';
import { HabitsContext } from '../../data/HabitContext';
import { useThemeColor } from '../../components/Themed'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AnimatedScrollComponent from '../../components/ScrollView/AnimatedScrollComponent'
import { HomeStackParamsList } from '../../navigation/HomeNavigator'
import { BottomScreenOpen_Impact } from '../../constants/Impacts'
import { sortDate, sortString, toISOStringWithoutTimeZone } from '../../primitives/BasicsMethods'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Habit } from '../../types/HabitTypes'
import { RenderPresentationHabitItem } from '../../components/Habitudes/PresentationHabitList'
import { BorderIconButton, IconButton, IconProvider, NavigationActions, NavigationButton } from '../../components/Buttons/IconButtons'
import { HugeText } from '../../styles/StyledText'
import SortBottomScreen from '../BottomScreens/SortBottomScreen'

type ProfilDoneHabitsScreenProps = NativeStackScreenProps<HomeStackParamsList, "ProfilDoneHabitsScreen">

const ProfilDoneHabitsScreen: FC<ProfilDoneHabitsScreenProps> = ({navigation}) => {

    const {
      isDoneHabitsFetched, setIsDoneHabitsFetched, 
      DoneHabits, 
      fetchDoneHabits
    } = useContext(HabitsContext);

    const {theme, setIsLoading} = useContext(AppContext)
    const primary = useThemeColor(theme, "Primary")

    const [habitsToDisplay, setHabitsToDisplay] = useState<Habit[]>([])
    const [searchValue, setSearchValue] = useState<string>("")

    useEffect(() => {
      const handleGetDoneHabits = async() => {
        if(!isDoneHabitsFetched) {
          setIsLoading(true)

          const doneHabits = await fetchDoneHabits()
          setHabitsToDisplay(doneHabits)
          setIsDoneHabitsFetched(true)

          setIsLoading(false)

          BottomScreenOpen_Impact()
        }

        else setHabitsToDisplay(Object.values(DoneHabits))
      }

      handleGetDoneHabits()
    }, [DoneHabits])

    const updateList = (text: string) => {
      setSearchValue(text)
      const getAllFilteredHabits = () => {
        if(DoneHabits) {
          const filteredHabits = Object.values(DoneHabits).filter((habit) => {
            return habit.titre.includes(text) || habit.description.includes(text)
          })

          setHabitsToDisplay(filteredHabits)  
        }
      }

      getAllFilteredHabits()
    }

    const handlePressOnHabit = (habit: Habit) => {
        navigation.navigate("HabitudeScreen", {
          habitID: habit.habitID,
          habitFrequency: habit.frequency,
          goalID: habit.goalID,
          currentDateString: toISOStringWithoutTimeZone(new Date()),
          noInteractions: true,
          isPresentation: true,
          isArchived: true
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
      if(DoneHabits) {
        setHabitsToDisplay(Object.values(DoneHabits).filter((habit) => {
            return habit.titre.includes(searchValue) || habit.description.includes(searchValue)
        }))
      }

      BottomScreenOpen_Impact()
      closeSortModal()
    }

    return (
      <View style={{backgroundColor: primary, flex: 1, paddingTop: 10, paddingHorizontal: 20}}>
        
        <View style={[styles.header, {zIndex: 10, backgroundColor: primary}]}>  
          
          <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>    
            <NavigationButton noPadding action={NavigationActions.goBack}/>
            <BorderIconButton isTransparent isBorderGray name='sort' provider={IconProvider.MaterialCommunityIcons} onPress={handleOpenSortType}/>
          </View>
          
          <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>    
            <HugeText text="Habitudes terminées"/>
          </View>

        </View>

        <View style={[styles.container, {backgroundColor: primary}]}>
          <AnimatedScrollComponent 
            style={{paddingTop: 100}}
            contentContainerStyle={{paddingHorizontal: 0, paddingBottom: 260, gap: 20}}
            showsVerticalScrollIndicator={false}
            
            data={habitsToDisplay}                
            renderItem={({item, index}) => 
                <RenderPresentationHabitItem
                    item={item} 
                    index={index} 
                    deleteHabit={() => {}}
                    editHabit={() => {}}
                    isNotGoalIDConst
                    isNotNewGoalHabit
                    onPress={handlePressOnHabit}
                    noAnimation
                    isDone
                />
            }

            searchBarMethod={updateList}
            searchBarPlaceholder='Rechercher une habitude...'

            navigation={navigation}
          />
        </View>

        <SortBottomScreen
          bottomSheetModalRef={sortTypeBottomSheetRef}
          sortByName={sortByName}
          sortByNameDesc={sortByNameDesc}
          sortByLatestDate={sortByLatestDate}
          sortByOldestDate={sortByOldestDate}
          noSort={noSort}
        />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10
  },

  header: {
    display: "flex", 
    flexDirection: "column", 
    gap: 20,
    marginTop: 40,
    marginBottom: 5
  },
})

export default ProfilDoneHabitsScreen