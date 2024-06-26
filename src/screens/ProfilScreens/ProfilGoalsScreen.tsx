import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { UsualScreen } from '../../components/View/Views'
import { HabitsContext } from '../../data/HabitContext'
import { Goal, SeriazableGoal } from '../../types/HabitTypes'
import { CustomTextInputRefType, SearchBarCustom } from '../../components/TextFields/TextInput'
import { HugeText } from '../../styles/StyledText'
import { BorderIconButton, IconButton, IconProvider, NavigationActions, NavigationButton } from '../../components/Buttons/IconButtons'
import { HomeStackParamsList } from '../../navigation/HomeNavigator'
import { sortDate, sortString } from '../../primitives/BasicsMethods'
import BottomMenuStyle from '../../styles/StyledBottomMenu'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import SortBottomScreen from '../BottomScreens/SortBottomScreen'
import { BottomScreenOpen_Impact } from '../../constants/Impacts'
import { PresentationGoalList } from '../../components/Goals/GoalsList'
import { AppContext } from '../../data/AppContext'
import { useThemeColor } from '../../components/Themed'

type ProfilGoalsScreenProps = NativeStackScreenProps<HomeStackParamsList, "ProfilGoalsScreen">

const ProfilGoalsScreen: FC<ProfilGoalsScreenProps> = ({navigation}) => {

  const {theme} = useContext(AppContext)
  const primary = useThemeColor(theme, "Primary")

  const {Goals} = useContext(HabitsContext)

  const searchValueRef = useRef<CustomTextInputRefType>(null)

  const [goalsToDisplay, setGoalsToDisplay] = useState<Goal[]>(Object.values(Goals))
  const [searchValue, setSearchValue] = useState<string>("")

  const updateList = (text: string) => {
    setSearchValue(text)
    const getAllFilteredGoals = () => {

      const filteredHabits = Object.values(Goals).filter((goal) => {
          return goal.titre.includes(text) || goal.description.includes(text)
      })

      setGoalsToDisplay(filteredHabits)        
    }

    getAllFilteredGoals()
  }

  useEffect(() => {
    setGoalsToDisplay(Object.values(Goals))
  }, [Goals])

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
    setGoalsToDisplay(Object.values(Goals).filter((goal) => {
        return goal.titre.includes(searchValue) || goal.description.includes(searchValue)
    }))

    BottomScreenOpen_Impact()
    closeSortModal()
  }

  const handlePressOnGoal= (seriazableGoal: SeriazableGoal) => {
    BottomScreenOpen_Impact()    
    navigation.navigate("GoalDetailsScreen", { 
      seriazableGoal, 
      noInteractions: true,
      isPresentation: true,
     });
  }

  return (
    <View style={{backgroundColor: primary, flex: 1, paddingTop: 10, paddingHorizontal: 20}}>
      
      <View style={[styles.header, {zIndex: 10, backgroundColor: primary}]}>  
        
        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>    
          <NavigationButton noPadding action={NavigationActions.goBack}/>
          <BorderIconButton isBorderGray isTransparent name='sort' provider={IconProvider.MaterialCommunityIcons} onPress={handleOpenSortType}/>
        </View>
        
        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>    
          <HugeText text="Goals"/>
        </View>

      </View>

      <View style={[styles.container, {backgroundColor: primary}]}>
            <PresentationGoalList 
              goals={goalsToDisplay} 
              handleOnPress={handlePressOnGoal}
              noEnteringAnimation
              handleSearchGoal={updateList}
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
});

export default ProfilGoalsScreen