
import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import { useThemeColor } from '../components/Themed';

import { FlatList } from 'react-native';
import { SubTitleText, HugeText, SubTitleGrayText, NormalText, TitleText } from '../styles/StyledText';
import { Habitudes, Friends } from '../data/habitudes';


import { ProfilButton } from '../components/Profil/ProfilButton';

import { useNavigation } from "@react-navigation/native";
import HomeCalendarCustomWeek from '../components/Calendars/HomeCalendarCustomWeek';
import cardStyle from '../styles/StyledCard';
import viewStyle from '../styles/StyledView';
import { UsualScreen } from '../components/View/Views';


import { HabitsContext } from '../data/HabitContext';
import { useContext } from 'react';
import VerticalAnimatedFlatList from '../components/FlatList/VerticalAnimatedFlatList';
import { Image } from 'react-native';
import { Dimensions } from 'react-native';
import { RadioButton } from '../components/RadioButtons/RadioButton';
import { ContrastButton, IconButton } from '../components/Buttons/IconButton';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { isHabitPlannedThisMonth, numberOfWeekBetweenDates, weekNumber } from '../primitives/HabitudesReccurence';
const HomeScreen = () => {

  const navigation = useNavigation()

  const { Habits } = useContext(HabitsContext);

  const quotidien = {}
  const hebdomadaire = {}
  const mensuel = {}
  const [selectedPeriode, setSelectedPeriode] = useState("Quotidien")
  const [displayedHabits, setDisplayedHabits] = useState({})
  const [FrequencyFilteredHabits, setFrequencyFilteredHabits] = useState({Quotidien: {}, Hebdo: {}, Mensuel: {}});


  useEffect(() => {
    // Assurez-vous que Habits a été récupéré
    if (Object.keys(Habits).length > 0) {

      const sortHabits = async() => {
        console.log("HELLLLLOOOOOOOO")
        const filteredHabits = await filterHabitsByFrequency();
        console.log("BISSSSSSSSSSSSSs")
        setFrequencyFilteredHabits(filteredHabits);
        setDisplayedHabits(Object.values(filteredHabits[selectedPeriode]))
      }

      sortHabits()
    }
  }, [Habits]);

  // Fonction de filtrage par fréquence
  const filterHabitsByFrequency = async() => {
    const quotidien = {};
    const hebdomadaire = {};
    const mensuel = {};

    for (const habitID in Habits) {
      const habit = Habits[habitID];

      switch (habit.frequency) {
        case 'Quotidien':
          quotidien[habitID] = habit;
          break;

        case 'Hebdo':
          hebdomadaire[habitID] = habit;
          break;

        case 'Mensuel':
          mensuel[habitID] = habit;
          break;
      }
    }

    return { Quotidien: quotidien, Hebdo: hebdomadaire, Mensuel: mensuel };
  };

  // console.log("FILTERED : ", FrequencyFilteredHabits.Quotidien)

  const periodes = useMemo(() => ["Calendar", {frequency: "Quotidien", displayedText: "Jour", nbElement: Object.values(FrequencyFilteredHabits.Quotidien).length}, 
                                              {frequency: "Hebdo", displayedText: "Semaine", nbElement: Object.values(FrequencyFilteredHabits.Hebdo).length}, 
                                              {frequency: "Mensuel", displayedText: "Mois", nbElement: Object.values(FrequencyFilteredHabits.Mensuel).length}], 
                                  [FrequencyFilteredHabits])

  const handleChangeSelectedPeriode = (newPeriode) => {
    setSelectedPeriode(newPeriode.frequency)
    setDisplayedHabits(Object.values(FrequencyFilteredHabits[newPeriode.frequency]))
  }

  const [currentDate, setCurrentDate] = useState(new Date())
  const currentDateDayMonth = currentDate.getDate() + " " + currentDate.toLocaleDateString("fr", {month: "short"})

  const isHabitsEmpty = displayedHabits.length === 0



  const renderPeriode = ({item, index}) => {

      if(item === "Calendar") {
        return(              
          <ContrastButton>
            <MaterialCommunityIcons name="calendar-range-outline" size={24} color="black" />
          </ContrastButton>
        )
      }

      const isSelected = item.frequency === selectedPeriode

      return(
        <RadioButton key={index} isHighlight={isSelected} handleOnClick={() => handleChangeSelectedPeriode(item)}>
          <View style={{display: "flex", flexDirection: "row", gap: 10}}>
            <SubTitleText text={item.displayedText} style={{color: isSelected ? "white": null}}/>
            <SubTitleGrayText text={item.nbElement}/>
          </View>
        </RadioButton>
      )
  }

  const handleOpenProfilDetails = useCallback(() => {
    navigation.navigate("ProfilDetailsScreen");
  }, []);

  return (
      <UsualScreen>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.ProfilContainer}>

                <View style={{display:"flex", flexDirection: "column", justifyContent: "center"}}>
                    <HugeText text={currentDateDayMonth}/>  
                    <SubTitleGrayText text="2023"/>  
                </View> 

                <View style={{alignItems: "center", justifyContent:"center", display:"flex"}}>
                    <ProfilButton onPress={handleOpenProfilDetails} profil={Friends[0]}/>
                </View>

            </View>

            <View style={{display: "flex", flexDirection: "column", gap: 0}}>

              <FlatList horizontal={true} showsHorizontalScrollIndicator={false}
                        renderItem={renderPeriode}
                        data={periodes}
                        style={{marginHorizontal: -30}}
                        contentContainerStyle={{gap: 15, paddingHorizontal: 30}}/>
              {/* <View style={{paddingVertical:0}}>
                <HomeCalendarCustomWeek selectedDate={currentDate} setSelectedDate={setCurrentDate}/>
            </View> */}
            </View>


          </View>
        
          <View style={{display: "flex", flexDirection: "column", gap: 10, flex: 1}}>
                        
            <View style={{display: "flex", flexDirection: "row", alignItems:"center", justifyContent: "space-between"}}>
                <SubTitleText text={"Plan du jour :"}/>
            </View>

            <View style={styles.dayPlanContainer}>
              {
                isHabitsEmpty ? 
                
                <View style={{flex: 1, flexGrow: 1, justifyContent: "space-between", alignItems: "center", gap: 20, marginTop: 20}}>
                  <Image style={{resizeMode: 'contain', aspectRatio: 1, width: "75%", maxHeight: "75%"}} source={require('../img/Illustration/Light_theme/Workout_Break.png')}/>
                  <View style={{justifyContent: "space-evenly", alignItems: "center", gap: 0}}>
                    <SubTitleText text="Rien de prévu ce jour"/>
                    <NormalText text="Profitez en pour vous reposer !"/>
                  </View>
                </View> 
                
                :
                
                <View style={styles.habitsContainer}>
                  <VerticalAnimatedFlatList data={displayedHabits}/>
                </View>
              }
            </View>

          </View>

        </View>

    </UsualScreen>
  );
};

const styles = StyleSheet.create({

  headerContainer: {
    margin: -30, 
    marginBottom:0, 
    paddingHorizontal: 30, 
    paddingVertical:15,
    borderBottomLeftRadius: 40, 
    borderBottomRightRadius: 40, 
  },

  headerParentContainer: {
    margin: -30, 
    marginBottom:0, 
    padding: 30, 

  },

  ProfilContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  
  },

  HabitsList:{
    flex:1,
    flexGrow: 1,
    display: "flex",
    margin: -15,
    marginLeft: -45,
    marginTop: 0,
  },

  coreContainer: {
    gap: 5,
    flex:1,
    flexGrow:1,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },

  storiesContainer: {
    borderTopColor: "#69738c",
    borderTopWidth: 0,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginHorizontal: -20,
  }, 

  container: {
    padding: 0,
    paddingBottom: 0,
    flex:1,
    gap: 30,
    display: "flex", 
  },

  header: {
    gap: 20
  },

  habitsContainer: {
    flex:1,
    flexGrow: 1,
    margin: -15,
    marginLeft: -45,
    marginTop: 0,
    marginBottom: -150
  },

  dayPlanContainer: {
    flex:1,
    flexGrow: 1,
  }
});

export default HomeScreen;