
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
import SelectDateBottomScreen from './BottomScreens/SelectDateBottomScreen';
import { AnimatedBasicSpinner, AnimatedBasicSpinnerView } from '../components/Spinners/AnimatedSpinner';
const HomeScreen = () => {

  const navigation = useNavigation()

  const [selectedDate, setSelectedDate] = useState(new Date())
  const selectedDateDayMonth = selectedDate.getDate() + " " + selectedDate.toLocaleDateString("fr", {month: "short"})

  const { Habits, changeDate, filteredHabitsByDate, isFetchingHabit, isFetched } = useContext(HabitsContext);

  const [selectedPeriode, setSelectedPeriode] = useState("Quotidien")
  const [displayedHabits, setDisplayedHabits] = useState(Object.values(filteredHabitsByDate[selectedPeriode]))
  
  const handleChangeSelectedDate = async(date) =>  {
    if(isFetched){
      console.log("changing date...")
      setSelectedDate(date)
      changeDate(date)
      console.log("date changed")
    }
  }

  useEffect(() => {
      setDisplayedHabits(Object.values(filteredHabitsByDate[selectedPeriode]))
  }, [filteredHabitsByDate])
  
  const [periodes, setPeriodes] = useState(["Calendar", 
  {frequency: "Quotidien", displayedText: "Jour", nbElement: 0}, 
  {frequency: "Hebdo", displayedText: "Semaine", nbElement: 0}, 
  {frequency: "Mensuel", displayedText: "Mois", nbElement: 0}])

  useEffect(() =>{
    console.log("changing periodes")
    setPeriodes(["Calendar", 
          {frequency: "Quotidien", displayedText: "Jour", nbElement: Object.values(filteredHabitsByDate.Quotidien).length}, 
          {frequency: "Hebdo", displayedText: "Semaine", nbElement: Object.values(filteredHabitsByDate.Hebdo).length}, 
          {frequency: "Mensuel", displayedText: "Mois", nbElement: Object.values(filteredHabitsByDate.Mensuel).length}])
        
  }, [filteredHabitsByDate])

  const handleChangeSelectedPeriode = (newPeriode) => {

    console.log("new Periode : ", newPeriode.frequency)

    if(isFetched) {
      setSelectedPeriode(newPeriode.frequency)
      setDisplayedHabits(Object.values(filteredHabitsByDate[newPeriode.frequency]))
    }

    setSelectedPeriode(newPeriode.frequency)
  }

  const getStatementSentence = () => {
    switch (selectedPeriode) {
      case 'Quotidien':
        return 'À faire aujourd\'hui:';
      case 'Hebdo':
        return 'À faire cette semaine:';
      case 'Mensuel':
        return 'À faire ce mois ci:';
      default:
        return 'À faire aujourd\'hui:';
    }
  };

  const statementSentence = getStatementSentence()

  const isHabitsEmpty = displayedHabits.length === 0

  const bottomSheetModalRef_Calendar = useRef(null);
  const snapPoints_Calendar = useMemo(() => ['55%'], []);

  const handleOpenCalendar = useCallback(() => {
        bottomSheetModalRef_Calendar.current?.present();
    }, []);

  const handleSheetChangesCalendar = useCallback((index) => {
      console.log("handleSheetChange", index)
  }, []);


  const renderPeriode = ({item, index}) => {

      if(item === "Calendar") {
        return(              
          <ContrastButton onClick={handleOpenCalendar}>
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

  const EmptyHabitsScreen = () => {
    return(<View style={{flex: 1, flexGrow: 1, justifyContent: "space-between", alignItems: "center", gap: 20, marginTop: 20}}>
      <Image style={{resizeMode: 'contain', aspectRatio: 1, width: "75%", maxHeight: "75%"}} source={require('../img/Illustration/Light_theme/Workout_Break.png')}/>
      <View style={{justifyContent: "space-evenly", alignItems: "center", gap: 0}}>
        <SubTitleText text="Rien de prévu ce jour"/>
        <NormalText text="Profitez en pour vous reposer !"/>
      </View>
    </View>)
  }

  const NotEmptyHabitsScreen = () => {
    return(
      <View style={styles.habitsContainer}>
        <VerticalAnimatedFlatList data={displayedHabits} currentDateString={selectedDate.toDateString()}/>
    </View>)
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
                    <HugeText text={selectedDateDayMonth}/>  
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
              <View style={{paddingVertical:0}}>
                <HomeCalendarCustomWeek selectedDate={selectedDate} setSelectedDate={handleChangeSelectedDate}/>
              </View>
            </View>


          </View>
        
          <View style={{display: "flex", flexDirection: "column", gap: 10, flex: 1}}>
                        
            <View style={{display: "flex", flexDirection: "row", alignItems:"center", justifyContent: "space-between"}}>
                <SubTitleText text={statementSentence}/>
            </View>

            <View style={styles.dayPlanContainer}>
              {
                (isFetchingHabit ? <AnimatedBasicSpinnerView/> : (isHabitsEmpty ? <EmptyHabitsScreen/> : <NotEmptyHabitsScreen/>))
              }
            </View>

          </View>

        </View>

        <SelectDateBottomScreen 
          selectedDate={selectedDate}
          setSelectedDate={handleChangeSelectedDate}
          bottomSheetModalRef={bottomSheetModalRef_Calendar} 
          snapPoints={snapPoints_Calendar} 
          handleSheetChanges={handleSheetChangesCalendar}/>

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