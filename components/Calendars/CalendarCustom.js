import { useRef, useState} from "react";
import {View, StyleSheet, TouchableOpacity,} from 'react-native';
import { LittleNormalText, NormalText, SubText, TitleText } from '../../styles/StyledText';
import { useSharedValue } from "react-native-reanimated"
import Calendar, { useCalendarContext  } from 'react-native-swipe-calendar';
import { addMonths } from 'date-fns'
import { useThemeColor } from '../Themed';
import { Feather } from '@expo/vector-icons';
import { IconButton } from "../Buttons/IconButtons";
    
const DayComponentWrapper = ({ date, isInDisplayedMonth, isToday, isSelected }) => {

  const font = useThemeColor({}, "Font")
  const fontGray = useThemeColor({}, "FontGray")

  const ctx = useCalendarContext();
  const handleClickOnDay = () => {
      ctx.onDateSelect?.(date, { isSelected });
  }

  const borderColor = isSelected ? font : (isToday ? fontGray : 'transparent')
  const color = font

  const backgroundColor = isSelected ? font : "transparent"
  const opacity = isInDisplayedMonth ? 1 : 0.25
  return (
    <TouchableOpacity onPress={handleClickOnDay} style={styles.dayContainer}>
        <View style={[styles.daySubContainer, {borderColor: borderColor, borderWidth: 2, borderRadius: 12, opacity}]}>
            <View style={{borderColor: borderColor, borderWidth: 2, borderRadius: 9, margin: 2, flex: 1, alignItems: "center", justifyContent: "center"}}>
              <NormalText text={date.getDate()} style={{color}}/>
            </View>
        </View>
    </TouchableOpacity>
  );
};

const HeaderComponent = (calendarRef) => (date) => {

  const {endDate} = date
  const monthName = endDate.toLocaleString('fr', { month: 'long', year: 'numeric' })

  const font = useThemeColor({}, "Font")

  return (
    <View style={styles.headerContainer}>
      <View style={styles.incrementDecrementContainer}>
        <IconButton onPress={() => calendarRef.current?.decrementPage()} provider={"Feather"} name={"chevron-left"}/>
      </View>

      <TitleText text={monthName}/>

      <View style={styles.incrementDecrementContainer}>
            <IconButton onPress={() => calendarRef.current?.incrementPage()} provider={"Feather"} name={"chevron-right"}/>
      </View>
    </View>
  );
};

const DayLabelComponent  = ({date}) => {
  const dayName = date.toLocaleString('fr', { weekday: 'short' }).substring(0, 1);

  return(
      <View style={styles.dayLabelContainer}>
          <LittleNormalText text={dayName} bold/>
      </View>
  )
}

export default function CalendarCustom({selectedDate, setSelectedDate}) {

  const calendarRef = useRef(null);
  const monthAnimCallbackNode = useSharedValue(0);

  const minDate=new Date(2023, 0, 1)
  const maxDate=new Date(2026, 11, 31)

  return (
    <View style={[styles.container]}>
        <Calendar
          ref={calendarRef}
          pageInterval="month"
          minDate={minDate}
          maxDate={maxDate}
          
          theme={{ inactiveOpacity: 0 }}
          currentDate={selectedDate}
          HeaderComponent={HeaderComponent(calendarRef)}
          DayLabelComponent ={DayLabelComponent }
          DayComponent={DayComponentWrapper}
          selectedDate={selectedDate}
          onDateSelect={(date) => { setSelectedDate(date)}}
          monthAnimCallbackNode={monthAnimCallbackNode}
          pageBuffer={1}
        />
    </View>
  );
} 
  
const styles = StyleSheet.create({
  container: { flex: 1, marginTop: -10},

  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 5,
    opacity: 1,
  },

  daySubContainer: {

    height: 40, width: 40,
    borderRadius: 5,
    opacity: 1, margin: 0
  },

  dayLabelContainer: {
    alignItems:'center', 
    justifyContent:'center', 
    flex:1,
    marginVertical: 10
  },

  incrementDecrementContainer: {
    display: "flex", 
    flexDirection: "row", 
    alignItems: "center", 
    marginRight: 5
  },

  headerContainer: {
    display: "flex", 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center"
  },

  monthNameContainer: {
    paddingVertical: 10,
    justifyContent: "center",
    marginHorizontal: 10
  }
});
  