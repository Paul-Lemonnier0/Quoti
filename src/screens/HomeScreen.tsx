import React, { useState, useRef, FC, useEffect, useCallback } from 'react';
import { StyleSheet, View} from 'react-native';
import { HugeText, SubTitleGrayText } from '../styles/StyledText';
import { CustomScrollView, UsualScreen } from '../components/View/Views';
import { HabitsContext } from '../data/HabitContext';
import { useContext } from 'react';
import { ObjectifPlaceholder_Meditation, ObjectifPlaceholder_SemiMarathon, habitsPlaceholder } from '../data/HabitsPlaceholder';
import { getHeightResponsive } from '../styles/UtilsStyles';
import {  getMonthString, shortDateStringFormat, shortWeekStringFormat } from '../primitives/DateBasicMethods';
import SelectDateBottomScreen from './BottomScreens/SelectDateBottomScreen';
import { NothingToDoScreen } from '../components/ScreenComponents/HomeScreenComponents/EmptyScreens';
import { Periodes } from '../components/ScreenComponents/HomeScreenComponents/Periodes';
import { RenderHabits, RenderObjectifs } from '../components/ScreenComponents/HomeScreenComponents/NotEmptyScreen';
import { IconButton, IconProvider } from '../components/Buttons/IconButtons';
import { PeriodeType } from '../types/HomeScreenTypes';
import { FrequencyTypes, Habit, SeriazableObjectif } from '../types/HabitTypes';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamsList } from '../navigation/BottomTabNavigator';
import ProfilItem from '../components/Profil/ProfilItem';
import { auth } from '../firebase/InitialisationFirebase';
import ProfilButton from '../components/Profil/ProfilButton';
import { UserContext } from '../data/UserContext';

type HomeScreenProps = NativeStackScreenProps<HomeStackParamsList, "HomeScreen">

const HomeScreen: FC<HomeScreenProps> = ({navigation}) => {

  //IMPORTS

  const { changeDate, filteredHabitsByDate, isFetched } = useContext(HabitsContext);
  const {user} = useContext(UserContext)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [displayedHabits, setDisplayedHabits] = useState<Habit[]>([])
  const [displayedObjectifs, setDisplayedObjectifs] = useState<string[]>([])
  const [selectedPeriode, setSelectedPeriode] = useState<FrequencyTypes>(FrequencyTypes.Quotidien)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const initialPeriodes: PeriodeType[] = [
    { frequency: FrequencyTypes.Quotidien, displayedText: "Jour", nbElements: 0 }, 
    { frequency: FrequencyTypes.Hebdo, displayedText: "Semaine", nbElements: 0 }, 
    { frequency: FrequencyTypes.Mensuel, displayedText: "Mois", nbElements: 0 }
  ]

  const [periodes, setPeriodes] = useState<("Calendar" | PeriodeType)[]>(["Calendar", ...initialPeriodes]) 

  useEffect(() =>{
    const updatedPeriodes = initialPeriodes.map(initPeriode => {      
      let nbElements = 0;

      for (const [objID, habitList] of Object.entries(filteredHabitsByDate[initPeriode.frequency].Objectifs ?? {})) {
        nbElements += Object.keys(habitList).length
      }

      nbElements += Object.keys(filteredHabitsByDate[initPeriode.frequency].Habitudes ?? {}).length

      return({ ...initPeriode, nbElements })
    })

    setPeriodes(["Calendar", ...updatedPeriodes])

    setDisplayedHabits(Object.values(filteredHabitsByDate[selectedPeriode].Habitudes ?? {}))
    setDisplayedObjectifs(Object.keys(filteredHabitsByDate[selectedPeriode].Objectifs ?? {}))
        
  }, [filteredHabitsByDate, selectedDate])

  const handleChangeSelectedPeriode = (newPeriode: PeriodeType) => {
    if(isFetched) {

      setSelectedPeriode(newPeriode.frequency)
      const data = filteredHabitsByDate[newPeriode.frequency]

      setDisplayedHabits(Object.values(data.Habitudes ?? {}))
      setDisplayedObjectifs(Object.keys(data.Objectifs ?? {}))
    }

    setSelectedPeriode(newPeriode.frequency)
  }

    //SELECTED DATE

  
    const periodeStrings: {[key: string]: string} = {
      "Quotidien": shortDateStringFormat(selectedDate),
      "Hebdo": shortWeekStringFormat(selectedDate),
      "Mensuel": getMonthString(selectedDate) ,
    }
  
    const displayedDate = periodeStrings[selectedPeriode]
    
    const handleChangeSelectedDate = async(date: Date) =>  {
      if(isFetched){
        setIsLoading(true)
        setSelectedDate(date)

        await changeDate(date)

        setIsLoading(false)
      }
    }

  //BOTTOM SHEETS

  const bottomSheetModalRef_Calendar = useRef<BottomSheetModal>(null);

  const handleOpenCalendar = useCallback(() => {
        bottomSheetModalRef_Calendar.current?.present();
  }, []);

  const handlePressOnHabit = (habitude: Habit, objectifID: string | undefined, currentDateString: string) => {
      navigation.navigate("HabitudeScreen", {habitID: habitude.habitID, habitFrequency: habitude.frequency, objectifID, currentDateString})    
  }

  const handlePressOnObjectif = (seriazableObjectif: SeriazableObjectif, frequency: FrequencyTypes, currentDateString: string) => {
      navigation.navigate("ObjectifDetailsScreen", {seriazableObjectif, frequency, currentDateString});
  }

  //JSX

  const handleNavigationToDetailsScreen = () => {
      navigation.navigate("ProfilDetailsScreen")
  }

  const hasNotifications = user && user.friendRequests && user.friendRequests.length > 0
  console.log(user?.friendRequests)

  return (
      <UsualScreen>
        <View style={styles.container}>
          <View style={styles.header}>

            <View style={styles.ProfilContainer}>
                <View style={styles.center}>
                    <SubTitleGrayText text={selectedDate.getFullYear()}/>  
                    <HugeText text={displayedDate}/>  
                </View> 

                {user && <ProfilButton user={user} noBadge={!hasNotifications} onPress={handleNavigationToDetailsScreen}/>}
            </View>

            <Periodes 
              periodes={periodes} 
              selectedPeriode={selectedPeriode} 
              setPeriode={handleChangeSelectedPeriode}
              handleOpenCalendar={handleOpenCalendar}/>    

          </View>
        
          <View style={styles.body}>            
            {

              displayedHabits.length === 0 && displayedObjectifs.length === 0 && isFetched ?

              <NothingToDoScreen selectedPeriode={selectedPeriode}/>

              :
              
              <CustomScrollView>
                <View style={styles.subBody}>
                  <RenderObjectifs objectifs={displayedObjectifs} selectedPeriode={selectedPeriode} isLoading={isLoading} isFetched={isFetched} handleOnPress={handlePressOnObjectif} currentDateString={selectedDate.toISOString()}/>
                  <RenderHabits habits={displayedHabits} isLoading={isLoading} isFetched={isFetched} handleOnPress={handlePressOnHabit} currentDateString={selectedDate.toISOString()}/>
                </View>
              </CustomScrollView>
            }
          </View>
        </View>

        <SelectDateBottomScreen 
          selectedDate={selectedDate}
          setSelectedDate={handleChangeSelectedDate}
          bottomSheetModalRef={bottomSheetModalRef_Calendar}
        />
    </UsualScreen>
  );
};

const styles = StyleSheet.create({

  container: {
    padding: 0,
    paddingBottom: 0,
    flex:1,
    gap: getHeightResponsive(20),
    display: "flex", 
  },

  header: {
    gap: getHeightResponsive(20)
  },

  ProfilContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },  

  dayPlanContainer: {
    flex:1,
    flexGrow: 1,
  },

  body: {
    gap: 10, 
    flex: 1, 
    marginBottom: -30
  },

  subBody: {
    flex: 1, 
    gap: getHeightResponsive(20),
    flexDirection: "column",
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
});

export default HomeScreen;