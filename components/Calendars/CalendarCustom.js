import { useRef, useState} from "react";
import {View, StyleSheet, TouchableOpacity,} from 'react-native';
import { LittleNormalText, NormalText, SubText, TitleText } from '../../styles/StyledText';
import { useSharedValue } from "react-native-reanimated"
import Calendar, { useCalendarContext  } from 'react-native-swipe-calendar';
import { addMonths } from 'date-fns'
import { useThemeColor } from '../Themed';
import { SimpleButton } from "../Buttons/UsualButton";
import { Feather } from '@expo/vector-icons';
    
const DayComponentWrapper = (selectedDate, setSelectedDate) => ({ date, isInDisplayedMonth, isToday, isSelected }) => {

  const fontGray = useThemeColor({}, "FontGray")
  const font = useThemeColor({}, "Font")

  const ctx = useCalendarContext();
  const handleClickOnDay = () => {
      ctx.onDateSelect?.(date, { isSelected });
  }

  const borderColor = isSelected ? font : (isToday ? fontGray : 'transparent')

  return (
    <TouchableOpacity onPress={handleClickOnDay} style={styles.dayContainer}>
        <View style={[styles.daySubContainer, {borderColor: borderColor, borderWidth: 2, borderRadius: 12}]}>
            <NormalText text={date.getDate()} style={{color: isInDisplayedMonth ? font : fontGray}}/>
        </View>
    </TouchableOpacity>
  );
};

const HeaderComponent = (calendarRef) => (date) => {

  const {endDate} = date
  const monthName = endDate.toLocaleString('fr', { month: 'long' })
  const yearNumber = endDate.getFullYear()

  const font = useThemeColor({}, "Font")

  return (
    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
      <View style={styles.headerContainer}>
          <TitleText text={monthName}/>
          <SubText text={yearNumber}/>
      </View>

      <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 20, marginRight: 5}}>
          <SimpleButton onClick={() => calendarRef.current?.decrementPage()}>
              <Feather name="chevron-left" size={24} color={font}/>
          </SimpleButton>
          <SimpleButton onClick={() => calendarRef.current?.incrementPage()}>
              <Feather name="chevron-right" size={24} color={font}/>
          </SimpleButton>
      </View>
    </View>
  );
};

const DayLabelComponent  = ({date}) => {
  const dayName = date.toLocaleString('fr', { weekday: 'short' }).substring(0, 3);

  return(
      <View style={styles.dayLabelContainer}>
          <LittleNormalText text={dayName}/>
      </View>
  )
}

export default function CalendarCustom({selectedDate, setSelectedDate}) {

  const calendarRef = useRef(null);

  const monthAnimCallbackNode = useSharedValue(0);

  return (
    <View style={[styles.container]}>
        <Calendar
          ref={calendarRef}
          pageInterval="month"
          theme={{ inactiveOpacity: 0 }}
          currentDate={selectedDate}
          HeaderComponent={HeaderComponent(calendarRef)}
          DayLabelComponent ={DayLabelComponent }
          DayComponent={DayComponentWrapper(selectedDate, setSelectedDate)}
          selectedDate={selectedDate}
          onDateSelect={(date, options) => {
            setSelectedDate(date);
          }}
          monthAnimCallbackNode={monthAnimCallbackNode}
          pageBuffer={2}
        />
    </View>
  );
}
  
  
  const styles = StyleSheet.create({
    container: { flex: 1,marginTop: -10},
    dayContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      padding: 5,
      opacity: 1,
    },

    daySubContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 40, width: 40,
      borderRadius: 5,
      opacity: 1, margin: 0
    },

    headerContainer: {
      paddingVertical: 10,
      justifyContent: "center",
      marginHorizontal: 10
    },

    dayLabelContainer: {
      alignItems:'center', 
      justifyContent:'center', 
      flex:1
    }
  });
  