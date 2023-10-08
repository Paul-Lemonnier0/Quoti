
import React, { useState, useRef, useMemo, useCallback } from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import { useThemeColor } from '../components/Themed';

import { FlatList } from 'react-native';
import { SubTitleText, HugeText, SubTitleGrayText } from '../styles/StyledText';
import { Habitudes, Friends } from '../data/habitudes';

import shadowStyle from '../styles/StyledShadow';


import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { ProfilButton } from '../components/Profil/ProfilButton';

import { useNavigation } from "@react-navigation/native";
import { HabitudeListItem } from '../components/Habitudes/HabitudeListItem';
import { useSharedValue } from 'react-native-reanimated';
import { TextInput } from 'react-native';
import HomeCalendarCustomWeek from '../components/Calendars/HomeCalendarCustomWeek';
import CalendarCustom from '../components/Calendars/CalendarCustom';
import cardStyle from '../styles/StyledCard';
import viewStyle from '../styles/StyledView';

const TabOneScreen = () => {

  const primary = useThemeColor({}, "Primary")
  const secondary = useThemeColor({}, "Secondary")

  const navigation = useNavigation()
  const handleOpenProfilDetails = useCallback(() => {
    navigation.navigate("ProfilDetailsScreen");
  }, []);

  const viewableItems = useSharedValue([]);

  const onViewableItemsChanged = ({viewableItems: vItems}) => {
    viewableItems.value = vItems
  }

  const viewabilityConfigCallbackPairs = useRef([
    { onViewableItemsChanged },
  ]);

  const numColumns = 2;

  const sortedHabits = Habitudes.sort((a, b) => {
    if (a.doneSteps >= a.totalSteps) 
    {
      return 1; // Place l'habitude à la fin si elle satisfait la condition
    } 
    else {
      return -1; // Garde l'habitude à sa position actuelle si elle ne satisfait pas la condition
    }
  });

  const [currentEndDate, setCurrentEndDate] = useState(new Date())

  const [currentDate, setCurrentDate] = useState(new Date())
  const currentDateMonth = currentDate.toLocaleDateString("fr", {month: "long"})
  const currentDateDayMonth = currentDate.getDate() + " " + currentDate.toLocaleDateString("fr", {month: "short"})
  const stylesCard = cardStyle()
  const stylesView = viewStyle()

  return (
    <SafeAreaView style={{ flex: 1,backgroundColor: secondary }}>
      <BottomSheetModalProvider>
        <View style={[styles.container]}>
            
            <View style={[styles.headerParentContainer, {backgroundColor:primary}]}>
            <View style={[styles.headerContainer, {backgroundColor:secondary}]}>
              <View style={
                  [
                    styles.ProfilContainer,
                  ]
                  }>
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
            </View>

            
            <View style={stylesView.backgroundView}>

                
              <View style={{display: "flex", flexDirection: "row", alignItems:"center", justifyContent: "space-between", marginVertical: 10}}>
                <SubTitleText text={"Plan du jour :"}/>
              </View>


            <FlatList 

            viewabilityConfigCallbackPairs={
              viewabilityConfigCallbackPairs.current
            }

            renderItem={({item}) => {
              return <HabitudeListItem habit={item} viewableItems={viewableItems} index={item.index}/>
                }
              }
            showsVerticalScrollIndicator={false}
            style={styles.HabitsList} key={numColumns}
            data={sortedHabits} numColumns={numColumns} 
            keyExtractor={item => item.id}/>

          </View>
        </View>

        </BottomSheetModalProvider>
    </SafeAreaView>
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
    marginTop: 0, marginBottom: 10,
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
    padding: 30,
    paddingBottom: 0,
    flex:1,
    gap: 0,
    display: "flex", 
  },
});

export default TabOneScreen;