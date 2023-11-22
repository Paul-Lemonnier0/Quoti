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
import { BackgroundIconButton, BorderButton, BorderIconButton, IconButton, NavigationButton } from '../components/Buttons/IconButtons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AnimatedBasicSpinnerView } from '../components/Spinners/AnimatedSpinner';
import { endOfWeek, startOfWeek } from 'date-fns';
import SelectDateBottomScreen from './BottomScreens/SelectDateBottomScreen';
import VerticalAnimatedFlatList from '../components/FlatList/VerticalAnimatedFlatList';
import HomeCalendarCustomWeek from '../components/Calendars/HomeCalendarCustomWeek';
import { ScrollView } from 'react-native';
import HorizontalAnimatedFlatList from '../components/FlatList/HorizontalAnimatedFlatList';
import { useThemeColor } from '../components/Themed';
import { BackgroundTextButton, BorderTextButton, TextButton } from '../components/Buttons/UsualButton';
import { displayTree } from '../primitives/BasicsMethods';
import { HabitudeListItem } from '../components/Habitudes/HabitudeListItem';

const HomeScreen = () => {

  //IMPORTS

  const navigation = useNavigation()
  const { changeDate, filteredHabitsByDate, isFetchingHabit, Habits, isFetched, removeHabit, updateHabit } = useContext(HabitsContext);

  const handleTest = () => {
    const firstHabit = Object.values(filteredHabitsByDate["Quotidien"]["Habitudes"])[0]
    // const firstHabit = Object.values(Habits)[0]

    const date =  new Date(2022, 10, 21)
    // updateHabit(firstHabit.habitID, {startingDate: date}, selectedDate)
    removeHabit(firstHabit)
  }

  //PERIODES

  const [selectedPeriode, setSelectedPeriode] = useState("Quotidien")

  const initialPeriodes = [
    {frequency: "Quotidien", displayedText: "Jour", nbElements: 0}, 
    {frequency: "Hebdo", displayedText: "Semaine", nbElements: 0}, 
    {frequency: "Mensuel", displayedText: "Mois", nbElements: 0}
  ]

  const [periodes, setPeriodes] = useState(["Calendar", ...initialPeriodes]) 

  useEffect(() =>{
    const updatedPeriodes = initialPeriodes.map(initPeriode => {

      const nbElements = Object.values(filteredHabitsByDate[initPeriode.frequency]["Habitudes"]).length + Object.values(filteredHabitsByDate[initPeriode.frequency]["Objectifs"]).length

      return({
        ...initPeriode,
        nbElements
      })
    })

    setPeriodes(["Calendar", ...updatedPeriodes])
        
  }, [filteredHabitsByDate])

  const handleChangeSelectedPeriode = (newPeriode) => {
    if(isFetched) {
      setSelectedPeriode(newPeriode.frequency)
      const data = filteredHabitsByDate[newPeriode.frequency]

      setDisplayedHabits(Object.values(data["Habitudes"]))
      setDisplayedObjectifs(Object.keys(data["Objectifs"]))
    }

    setSelectedPeriode(newPeriode.frequency)
  }

  //DISPLAYED HABITS

  const [displayedHabits, setDisplayedHabits] = useState(Object.values(filteredHabitsByDate[selectedPeriode]["Habitudes"]))
  const [displayedObjectifs, setDisplayedObjectifs] = useState(Object.keys(filteredHabitsByDate[selectedPeriode]["Objectifs"]))

  useEffect(() => {
    setDisplayedHabits(Object.values(filteredHabitsByDate[selectedPeriode]["Habitudes"]))
    setDisplayedObjectifs(Object.keys(filteredHabitsByDate[selectedPeriode]["Objectifs"]))
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
        <BackgroundRadioButton isHighlight={isSelected} text={item.displayedText} number={item.nbElements}
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
      <View style={{gap: 20}}>

        {
          displayedHabits.map(habit => (
            <HabitudeListItem 
              habitude={habit} 
              currentDateString={selectedDate.toDateString()}/>)
          )
        }

      </View>)
  }

  const objectifs = displayedObjectifs.map(obj => ({objectifID: obj, frequency: selectedPeriode}))
  console.log(objectifs)
  const NotEmptyObjectifsScreen = () => {
    return(
      <View>
        <HorizontalAnimatedFlatList data={objectifs} currentDateString={selectedDate.toDateString()}/>
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
                    <SubTitleGrayText text={selectedDate.getFullYear()}/>  
                    <HugeText text={displayedDate}/>  
                </View> 

                <IconButton name={"update"} provider={"MaterialCommunityIcons"} onPress={handleTest}/>

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
        
          <View style={{gap: 10, flex: 1}}>            

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
              
              <ScrollView style={[styles.displayColumn, {gap: 10, flex: 1, marginHorizontal: -30, marginBottom: -120}]}>
                <View style={[styles.displayColumn, {flex: 1, marginBottom: 100, marginHorizontal: 30, gap: 20}]}>
                  <View style={styles.objectifsContainer}>
                    <View>
                      <TitleText text={"Objectifs"}/>
                    </View>

                    <View style={styles.dayPlanContainer} showsVerticalScrollIndicator={false}>
                        <NotEmptyObjectifsScreen/>
                    </View>
                  </View>

                  <View style={styles.habitsContainer}>
                    <View>
                      <TitleText text={"Habitudes"}/>
                    </View>

                    <View style={styles.dayPlanContainer} showsVerticalScrollIndicator={false}>
                        <NotEmptyHabitsScreen/>
                    </View>
                  </View>
                </View>
              </ScrollView>


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
  },

  objectifsContainer: {
    gap: 20,
    display: 'flex',
    flexDirection: "column"
  },

  habitsContainer: {
    gap: 20,
    display: 'flex',
    flexDirection: "column"
  }
});

export default HomeScreen;