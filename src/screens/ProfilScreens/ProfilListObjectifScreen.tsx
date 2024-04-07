import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { FC, useContext, useRef, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { HomeStackParamsList } from '../../navigation/BottomTabNavigator'
import { CustomScrollView, UsualScreen } from '../../components/View/Views'
import { HabitsContext } from '../../data/HabitContext'
import PresentationHabitList from '../../components/Habitudes/PresentationHabitList'
import { Habit, Objectif, SeriazableObjectif } from '../../types/HabitTypes'
import { CustomTextInputRefType, SearchBarCustom } from '../../components/TextFields/TextInput'
import { HugeText } from '../../styles/StyledText'
import { NavigationActions, NavigationButton } from '../../components/Buttons/IconButtons'
import { TextButton } from '../../components/Buttons/UsualButton'
import { PresentationObjectifList } from '../../components/Objectifs/ObjectifsList'

type ProfilListObjectifScreenProps = NativeStackScreenProps<HomeStackParamsList, "ProfilListObjectifScreen">

const ProfilListObjectifScreen: FC<ProfilListObjectifScreenProps> = ({navigation}) => {

  const {Objectifs} = useContext(HabitsContext)

  const searchValueRef = useRef<CustomTextInputRefType>(null)

  const [objectifsToDisplay, setObjectifsToDisplay] = useState<Objectif[]>(Object.values(Objectifs))
  const [searchValue, setSearchValue] = useState<string>("")


  const updateList = (text: string) => {
    setSearchValue(text)
    const getAllFilteredHabits = () => {

      const filteredObjectifs = Object.values(Objectifs).filter((objectif) => {
          return objectif.titre.includes(text) || objectif.description.includes(text)
      })

      setObjectifsToDisplay(filteredObjectifs)        
    }

    getAllFilteredHabits()
  }


  function shuffle(array: Array<any>) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array
  }

  const handlePressOnObjectif= (seriazableObjectif: SeriazableObjectif) => {
    navigation.navigate("PresentationObjectifDetailsScreen", {seriazableObjectif});
  }

  return (
    <UsualScreen>
      <View style={styles.container}>
        <View style={styles.header}>  
          <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>    
            <NavigationButton noPadding action={NavigationActions.goBack}/>
          </View>
          <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>    
            <HugeText text="Objectifs"/>
            <TextButton noPadding text='Trier' onPress={() => {}} bold/>

          </View>

        </View>
        <CustomScrollView >

        <View style={styles.body}>
            <SearchBarCustom ref={searchValueRef} placeholder={"Rechercher une habitude..."} onChangeText={updateList}/>
            <PresentationObjectifList objectifs={objectifsToDisplay} handleOnPress={handlePressOnObjectif}/>
        </View>
        </CustomScrollView>

      </View>
    </UsualScreen>
  )
}

const styles = StyleSheet.create({  
  container: {
    display: "flex", 
    flexDirection: "column", 
    gap: 20, 
    flex: 1, 
    marginBottom: 0    
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
      gap: 30,
  },
});

export default ProfilListObjectifScreen