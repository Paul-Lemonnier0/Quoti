import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { StyleSheet, View} from 'react-native';
import { FlatList } from 'react-native';
import { SubTitleText, HugeText, SubTitleGrayText, NormalText } from '../styles/StyledText';
import { ProfilButton } from '../components/Profil/ProfilButton';
import { useNavigation } from "@react-navigation/native";
import { UsualScreen } from '../components/View/Views';
import { HabitsContext } from '../data/HabitContext';
import { useContext } from 'react';
import { Image } from 'react-native';
import { RadioButton } from '../components/RadioButtons/RadioButton';
import { ContrastButton } from '../components/Buttons/IconButton';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AnimatedBasicSpinnerView } from '../components/Spinners/AnimatedSpinner';
import { endOfWeek, startOfWeek } from 'date-fns';
import SelectDateBottomScreen from './BottomScreens/SelectDateBottomScreen';
import VerticalAnimatedFlatList from '../components/FlatList/VerticalAnimatedFlatList';
import HomeCalendarCustomWeek from '../components/Calendars/HomeCalendarCustomWeek';

const HomeScreen = () => {

  //IMPORTS

  const navigation = useNavigation()
  const { changeDate, filteredHabitsByDate, isFetchingHabit, isFetched } = useContext(HabitsContext);

  //PERIODES

  const [selectedPeriode, setSelectedPeriode] = useState("Quotidien")

  const initialPeriodes = [
    {frequency: "Quotidien", displayedText: "Jour", nbElement: 0}, 
    {frequency: "Hebdo", displayedText: "Semaine", nbElement: 0}, 
    {frequency: "Mensuel", displayedText: "Mois", nbElement: 0}
  ]

  const [periodes, setPeriodes] = useState(["Calendar", ...initialPeriodes]) 

  useEffect(() =>{
    const updatedPeriodes = initialPeriodes.map(initPeriode => {
      return({
        ...initPeriode,
        nbElement: Object.values(filteredHabitsByDate[initPeriode.frequency]).length
      })
    })

    setPeriodes(["Calendar", ...updatedPeriodes])
        
  }, [filteredHabitsByDate])

  const handleChangeSelectedPeriode = (newPeriode) => {
    if(isFetched) {
      setSelectedPeriode(newPeriode.frequency)
      setDisplayedHabits(Object.values(filteredHabitsByDate[newPeriode.frequency]))
    }

    setSelectedPeriode(newPeriode.frequency)
  }

  //DISPLAYED HABITS


  const [displayedHabits, setDisplayedHabits] = useState(Object.values(filteredHabitsByDate[selectedPeriode]))

  useEffect(() => {
    setDisplayedHabits(Object.values(filteredHabitsByDate[selectedPeriode]))
  }, [filteredHabitsByDate])


  //SELECTED DATE


  const [selectedDate, setSelectedDate] = useState(new Date())
  const selectedDateDay = selectedDate.getDate() + " " + selectedDate.toLocaleDateString("fr", {month: "short"})
  const _startOfWeek = startOfWeek(selectedDate, {weekStartsOn: 1})
  const _endOfWeek = endOfWeek(selectedDate, {weekStartsOn: 1})
  const selectedDateWeek = _startOfWeek.toLocaleDateString("fr", {day: "numeric"}) + " - " + _endOfWeek.toLocaleDateString("fr", {day: "numeric", month: "short"})
  const selectedDateMonth = selectedDate.toLocaleDateString("fr", {month: "long"})

  const displayedDate = selectedPeriode === "Quotidien" ? selectedDateDay : (selectedPeriode === "Hebdo" ? selectedDateWeek : selectedDateMonth)
  
  const handleChangeSelectedDate = async(date) =>  {
    if(isFetched){
      console.log("changing date...")
      setSelectedDate(date)
      changeDate(date)
      console.log("date changed")
    }
  }

  //STATEMENT SENTENCE

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

  //BOTTOM SHEETS


  const bottomSheetModalRef_Calendar = useRef(null);
  const snapPoints_Calendar = useMemo(() => ['55%'], []);

  const handleOpenCalendar = useCallback(() => {
        bottomSheetModalRef_Calendar.current?.present();
    }, []);

  const handleSheetChangesCalendar = useCallback((index) => {
      console.log("handleSheetChange", index)
  }, []);


  //JSX

  const isHabitsEmpty = displayedHabits.length === 0

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
          <View style={[styles.displayRow, {gap: 10}]}>
            <SubTitleText text={item.displayedText} style={{color: isSelected ? "white": null}}/>
            <SubTitleGrayText text={item.nbElement}/>
          </View>
        </RadioButton>
      )
  }

  const EmptyHabitsScreen = () => {
    return(
    <View style={styles.emptySreenContainer}>
      <Image style={styles.emptyScreenImageContainer} source={require('../img/Illustration/Light_theme/Workout_Break.png')}/>
      <View style={styles.emptyScreenSubContainer}>
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
                <View style={styles.center}>
                    <HugeText text={displayedDate}/>  
                    <SubTitleGrayText text={selectedDate.getFullYear()}/>  
                </View> 

                <View style={styles.center}>
                    <ProfilButton onPress={handleOpenProfilDetails} profil={{image: require("../img/TestVrai.png")}}/>
                </View>
            </View>

            <View style={styles.displayColumn}>
              <FlatList horizontal={true} showsHorizontalScrollIndicator={false}
                        renderItem={renderPeriode}
                        data={periodes}
                        style={{marginHorizontal: -30}}
                        contentContainerStyle={{gap: 15, paddingHorizontal: 30}}/>
              <View>
                <HomeCalendarCustomWeek selectedDate={selectedDate} setSelectedDate={handleChangeSelectedDate}/>
              </View>
            </View>
          </View>
        
          <View style={[styles.displayColumn, {gap: 10, flex: 1}]}>                  
            <View>
                <SubTitleText text={statementSentence}/>
            </View>

            <View style={styles.dayPlanContainer}>
              {(isFetchingHabit ? <AnimatedBasicSpinnerView/> : (isHabitsEmpty ? <EmptyHabitsScreen/> : <NotEmptyHabitsScreen/>))}
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

  ProfilContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
  },

  center:{
    display:"flex", 
    flexDirection: "column", 
    justifyContent: "center"
  },

  displayColumn:{
    display: "flex", 
    flexDirection: "column"
  },

  displayRow:{
    display: "flex", 
    flexDirection: "row"
  },

  emptySreenContainer: {
    flex: 1, 
    flexGrow: 1, 
    justifyContent: "space-between", 
    alignItems: "center", 
    gap: 30, 
    marginTop: 20
  },

  emptyScreenImageContainer: {
    resizeMode: 'contain', 
    aspectRatio: 1, 
    width: "80%", 
    maxHeight: "80%"
  },

  emptyScreenSubContainer: {
    justifyContent: "space-evenly", 
    alignItems: "center"
  }
});

export default HomeScreen;