import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { StyleSheet, View} from 'react-native';
import { FlatList } from 'react-native';
import { SubTitleText, HugeText, SubTitleGrayText, NormalText, TitleText } from '../styles/StyledText';
import { ProfilButton } from '../components/Profil/ProfilButton';
import { useNavigation } from "@react-navigation/native";
import { UsualScreen } from '../components/View/Views';
import { HabitsContext } from '../data/HabitContext';
import { useContext } from 'react';
import { Image } from 'react-native';
import { BackgroundRadioButton } from '../components/RadioButtons/RadioButton';
import { BackgroundIconButton, BorderButton, BorderIconButton, NavigationButton } from '../components/Buttons/IconButtons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AnimatedBasicSpinnerView } from '../components/Spinners/AnimatedSpinner';
import { endOfWeek, startOfWeek } from 'date-fns';
import SelectDateBottomScreen from './BottomScreens/SelectDateBottomScreen';
import VerticalAnimatedFlatList from '../components/FlatList/VerticalAnimatedFlatList';
import HomeCalendarCustomWeek from '../components/Calendars/HomeCalendarCustomWeek';
import { ScrollView } from 'react-native';
import HorizontalAnimatedFlatList from '../components/FlatList/HorizontalAnimatedFlatList';
import { useThemeColor } from '../components/Themed';
import { BackgroundTextButton, BorderTextButton } from '../components/Buttons/UsualButton';

const HomeScreen = () => {

  //IMPORTS

  const font = useThemeColor({}, "Font")

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
        return 'À faire ce jour :';
      case 'Hebdo':
        return 'À faire cette semaine :';
      case 'Mensuel':
        return 'À faire ce mois ci :';
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

  const renderPeriode = ({item}) => {

      if(item === "Calendar") {
        return <BorderIconButton onPress={handleOpenCalendar} name="calendar-range-outline" provider="MaterialCommunityIcons"/>
      }

      const isSelected = item.frequency === selectedPeriode

      return(
        <BackgroundRadioButton bold isHighlight={isSelected} text={item.displayedText} number={item.nbElement}
              handleOnClick={() => handleChangeSelectedPeriode(item)}/>
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
      <View style={{flex: 1, marginTop: 15, display: "flex", flexDirection: "column", gap: 30}}>

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

            <View style={[styles.displayColumn, {gap: 0}]}>
              <FlatList horizontal={true} showsHorizontalScrollIndicator={false}
                        renderItem={renderPeriode}
                        data={periodes}
                        style={{marginHorizontal: -30}}
                        contentContainerStyle={{gap: 15, paddingHorizontal: 30}}/>
                        
                {/* <HomeCalendarCustomWeek selectedDate={selectedDate} setSelectedDate={handleChangeSelectedDate}/> */}
            </View>
          </View>
        
          <View style={[styles.displayColumn, {gap: 10, flex: 1}]}>                  
            <View>
                <TitleText text={statementSentence}/>
            </View>
            {
              isFetchingHabit ? 
              <View style={styles.loadingAndEmptyScreenContainer}>
                <AnimatedBasicSpinnerView/>
              </View>
              :

              isHabitsEmpty ?

              <View style={styles.loadingAndEmptyScreenContainer}>
                <EmptyHabitsScreen/>
              </View>

              :

              <View style={styles.dayPlanContainer} showsVerticalScrollIndicator={false}>
                   <NotEmptyHabitsScreen/>
              </View>


            }
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
    gap: 20,
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
    margin: -15,
    marginTop: 0,
  },

  loadingAndEmptyScreenContainer: {
    flex:1,
    flexGrow: 1,
  },

  dayPlanContainer: {
    flex:1,
    flexGrow: 1,
    marginHorizontal: -30,
    paddingHorizontal: 30,
    marginBottom: -150,
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