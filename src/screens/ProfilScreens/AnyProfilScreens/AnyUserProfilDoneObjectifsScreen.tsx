import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { FC, useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Habit, Objectif, SeriazableObjectif } from '../../../types/HabitTypes'
import { CustomTextInputRefType, SearchBarCustom } from '../../../components/TextFields/TextInput'
import { HugeText } from '../../../styles/StyledText'
import { IconButton, IconProvider, NavigationActions, NavigationButton } from '../../../components/Buttons/IconButtons'
import { PresentationObjectifList } from '../../../components/Objectifs/ObjectifsList'
import { SocialScreenStackType } from '../../../navigation/SocialNavigator'
import { fetchAllObjectifs } from '../../../firebase/Firestore_Objectifs_Primitives'
import { HomeStackParamsList } from '../../../navigation/HomeNavigator'
import SortBottomScreen from '../../BottomScreens/SortBottomScreen'
import { BottomScreenOpen_Impact } from '../../../constants/Impacts'
import { sortDate, sortString } from '../../../primitives/BasicsMethods'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { UsualScreen } from '../../../components/View/Views'
import { getUserHabitsForObjectif } from '../../../firebase/Firestore_Habits_Primitives'
import Objectifs_SkeletonList from '../../../components/Objectifs/Objectifs_SkeletonList'

type AnyUserProfilDoneObjectifsScreenProps =
  NativeStackScreenProps<SocialScreenStackType, "AnyUserProfilDoneObjectifsScreen"> | 
  NativeStackScreenProps<HomeStackParamsList, "AnyUserProfilDoneObjectifsScreen">

const AnyUserProfilDoneObjectifsScreen: FC<AnyUserProfilDoneObjectifsScreenProps> = ({navigation, route}) => {

  const { detailledUser } = route.params

  const searchValueRef = useRef<CustomTextInputRefType>(null)

  const [searchValue, setSearchValue] = useState<string>("")

  const [userObjectifs, setUserObjectifs] = useState<Objectif[]>([])
  const [objectifsToDisplay, setObjectifsToDisplay] = useState<Objectif[]>([])

  useEffect(() => {
    const handleFetchUserObjectifs = async() => {
      const objectifs = await fetchAllObjectifs(detailledUser.email)
    
      setUserObjectifs(Object.values(objectifs))
      setObjectifsToDisplay(Object.values(objectifs))
    }

    handleFetchUserObjectifs()
  }, [])

  const updateList = (text: string) => {
    setSearchValue(text)
    const getAllFilteredHabits = () => {

      const filteredObjectifs = userObjectifs.filter((objectif) => {
          return objectif.titre.includes(text) || objectif.description.includes(text)
      })

      setObjectifsToDisplay(filteredObjectifs)        
    }

    getAllFilteredHabits()
  }

  const handlePressOnObjectif= (seriazableObjectif: SeriazableObjectif) => {
    (navigation as NativeStackNavigationProp<SocialScreenStackType | HomeStackParamsList>).navigate("PresentationObjectifDetailsScreen", {seriazableObjectif});
  }

  const sortTypeBottomSheetRef = useRef<BottomSheetModal>(null)

  const handleOpenSortType = () => {
    sortTypeBottomSheetRef.current?.present()
  }

  const closeSortModal = () => {
    sortTypeBottomSheetRef.current?.close()
  }

  const sortByName = () => {
    setObjectifsToDisplay((prevObjs) => 
        [...prevObjs].sort((a, b) => sortString(a.titre, b.titre, true))
    );
  
    BottomScreenOpen_Impact();
    closeSortModal();
  };
  
  const sortByNameDesc = () => {
    setObjectifsToDisplay((prevObjs) => 
      [...prevObjs].sort((a, b) => sortString(a.titre, b.titre, false))
    );
  
    BottomScreenOpen_Impact();
    closeSortModal();
  };
  
  const sortByLatestDate = () => {
    setObjectifsToDisplay((prevObjs) => 
      [...prevObjs].sort((a, b) => sortDate(a.startingDate, b.startingDate, true))
    );
    
    BottomScreenOpen_Impact();
    closeSortModal();
  };
  
  const sortByOldestDate = () => {
    setObjectifsToDisplay((prevObjs) => 
      [...prevObjs].sort((a, b) => sortDate(a.startingDate, b.startingDate, false))
    );
  
    BottomScreenOpen_Impact();
    closeSortModal();
  };

  const noSort = () => {
    setObjectifsToDisplay(userObjectifs.filter((objectif) => {
        return objectif.titre.includes(searchValue) || objectif.description.includes(searchValue)
    }))

    BottomScreenOpen_Impact()
    closeSortModal()
  }

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [habitsForObjectifs, setHabitsForObjectifs] = useState<{[key: string]: Habit[]}>({})

  useEffect(() => {
    const handleRetrieveHabitsForObjectifs = async(userMail: string) => {
      setIsLoading(true)

      const objHabits: {[key: string]: Habit[]} = {}

      await Promise.all(userObjectifs.map(async(obj) => {
          const habits = await getUserHabitsForObjectif(userMail, obj.objectifID)
          objHabits[obj.objectifID] = habits
      }))

      setHabitsForObjectifs(objHabits)

      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
  }

  detailledUser ? handleRetrieveHabitsForObjectifs(detailledUser.email) : undefined
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
              <HugeText text="Objectifs"/>
            </View>
        </View>

        <View style={styles.body}>
            <SearchBarCustom 
              ref={searchValueRef} 
              placeholder={"Rechercher un objectif..."} 
              onChangeText={updateList}
            />

            {
              isLoading ?
              <Objectifs_SkeletonList isPresentation={true} /> :
              <PresentationObjectifList 
                objectifs={objectifsToDisplay} 
                handleOnPress={handlePressOnObjectif}
                differentUserMail={detailledUser.email}
                noEnteringAnimation
                marginBottom={160}
                habitsForObjectifs={habitsForObjectifs}
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

export default AnyUserProfilDoneObjectifsScreen