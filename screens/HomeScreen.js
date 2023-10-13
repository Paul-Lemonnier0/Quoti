
import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import { useThemeColor } from '../components/Themed';

import { FlatList } from 'react-native';
import { SubTitleText, HugeText, SubTitleGrayText, NormalText } from '../styles/StyledText';
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

const HomeScreen = () => {

  const { Habits } = useContext(HabitsContext);

  const primary = useThemeColor({}, "Primary")
  const secondary = useThemeColor({}, "Secondary")

  const navigation = useNavigation()
  const handleOpenProfilDetails = useCallback(() => {
    navigation.navigate("ProfilDetailsScreen");
  }, []);


const numColumns = 1;

  const sortedHabits = Habitudes.sort((a, b) => {
    if (a.doneSteps >= a.totalSteps) 
    {
      return 1; 
    } 
    else {
      return -1; 
    }
  });

  const [currentEndDate, setCurrentEndDate] = useState(new Date())

  const [currentDate, setCurrentDate] = useState(new Date())
  const currentDateMonth = currentDate.toLocaleDateString("fr", {month: "long"})
  const currentDateDayMonth = currentDate.getDate() + " " + currentDate.toLocaleDateString("fr", {month: "short"})
  const stylesCard = cardStyle()
  const stylesView = viewStyle()

  const [habitudes, setHabitudes] = useState([]);

  /*useEffect(() => {

    const fetchHabitudes = async () => {
      const habitsData = await getHabitudes();
      setHabitudes(habitsData);
      console.log(habitudes, "habitudes")
    };

    fetchHabitudes();
  }, []);*/

  

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

            <View style={{paddingVertical:0}}>
                <HomeCalendarCustomWeek selectedDate={currentDate} setSelectedDate={setCurrentDate}/>
            </View>
          </View>
        
          <View style={{display: "flex", flexDirection: "column", gap: 10, flex: 1}}>
                        
            <View style={{display: "flex", flexDirection: "row", alignItems:"center", justifyContent: "space-between"}}>
                <SubTitleText text={"Plan du jour :"}/>
            </View>

            <View style={styles.habitsContainer}>
              <VerticalAnimatedFlatList data={Habits}/>
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

  },

  habitsContainer: {
    flex:1,
    flexGrow: 1,
    margin: -15,
    marginLeft: -45,
    marginTop: 0,
    marginBottom: -150
  }
});

export default HomeScreen;