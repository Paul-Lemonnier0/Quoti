import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { HomeStackParamsList } from '../../navigation/BottomTabNavigator'
import { CustomScrollView, UsualScreen } from '../../components/View/Views'
import { HabitsContext } from '../../data/HabitContext'
import PresentationHabitList from '../../components/Habitudes/PresentationHabitList'
import { Habit } from '../../types/HabitTypes'
import { CustomTextInputRefType, SearchBarCustom } from '../../components/TextFields/TextInput'
import { HugeText } from '../../styles/StyledText'
import { NavigationActions, NavigationButton } from '../../components/Buttons/IconButtons'
import { TextButton } from '../../components/Buttons/UsualButton'

type ProfilListHabitScreenProps = NativeStackScreenProps<HomeStackParamsList, "ProfilListHabitScreen">

const ProfilListHabitScreen: FC<ProfilListHabitScreenProps> = ({}) => {

  const {Habits} = useContext(HabitsContext)

  const searchValueRef = useRef<CustomTextInputRefType>(null)

  const [habitsToDisplay, setHabitsToDisplay] = useState<Habit[]>(Object.values(Habits))
  const [searchValue, setSearchValue] = useState<string>("")

  const updateList = (text: string) => {
    setSearchValue(text)
    const getAllFilteredHabits = () => {

      const filteredHabits = Object.values(Habits).filter((habit) => {
          return habit.titre.includes(text) || habit.description.includes(text)
      })

      setHabitsToDisplay(filteredHabits)        
    }

    getAllFilteredHabits()
  }

  useEffect(() => {
    setHabitsToDisplay(Object.values(Habits))
  }, [Habits])



  return (
    <UsualScreen>
      <View style={styles.container}>
        <View style={styles.header}>  
          <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>    
            <NavigationButton noPadding action={NavigationActions.goBack}/>
          </View>
          <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>    
            <HugeText text="Habitudes"/>
            <TextButton noPadding text='Trier' onPress={() => {}} bold/>

          </View>

        </View>

        <View style={styles.body}>
            <SearchBarCustom ref={searchValueRef} placeholder={"Rechercher une habitude..."} onChangeText={updateList}/>

            <CustomScrollView >
              <PresentationHabitList 
                isNotNewObjectifHabit 
                isNotObjectifIDConst 
                habits={habitsToDisplay} 
                deleteHabit={() => {}} 
                editHabit={() => {}}
              />
            </CustomScrollView>
        </View>
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

export default ProfilListHabitScreen