import React, {useState, useMemo, useCallback} from 'react';
import {StyleSheet, Text, View, TextStyle, Dimensions, TouchableOpacity, Pressable} from 'react-native';
import {Calendar, CalendarList, DateData} from 'react-native-calendars';
import { useThemeColor } from '../Themed';
import { NormalText, SubTitleText } from '../../styles/StyledText';
import { BottomScreenOpen_Impact } from '../../constants/Impacts';
import { MemoizedDayContainer } from './DayComponent';

const RANGE = 12;

const theme={
  backgroundColor: 'transparent',
  calendarBackground: 'transparent',
  'stylesheet.calendar.main': {
    week: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginVertical: 0,
      padding: 0
    },
    monthView: {
      padding: 0,
      margin: 0,
    },

    container: {
      padding: 0,
      margin: 0
    }
  },
}

const CalendarListCustom = (props) => {

    const contrast = useThemeColor({}, "Contrast")
    const fontContrast = useThemeColor({}, "FontContrast")
    const fontGray = useThemeColor({}, "FontGray")
    const font = useThemeColor({}, "Font")

    const WIDTH = Dimensions.get("window").width - 30
    const initialDate = new Date()

  const {closeModal, selectedDate, setSelectedDate} = props;

  const onDayPress = useCallback((day) => {
    setSelectedDate(new Date(day));
    closeModal()
    BottomScreenOpen_Impact()
  }, []);
  
  const markedDates = useMemo(() => {
    const markedDatesObject = {[selectedDate]: {selected: true}}
    return markedDatesObject;
  }, [selectedDate]);

  const selectedDateString = selectedDate.toISOString().split('T')[0]

  const dayComponent = useCallback(
    (props) => {

      let marking = props.marking
      if(selectedDateString === props.date.dateString){
        marking = {selected: true}
      }

      return <MemoizedDayContainer
        key={props.date.dateString}
        {...props}
        marking={marking}
        onDayPress={onDayPress}
      />
    }, 
    [onDayPress]
  );

  return (
    <Calendar
      enableSwipeMonths
      calendarWidth={WIDTH}
      theme={theme}
      markingType={'custom'}
      markedDates={markedDates}
      firstDay={1}
      renderScrollComponent={null}
      current={selectedDate}
      pastScrollRange={RANGE}
      futureScrollRange={RANGE}
      onDayPress={onDayPress}
      customHeader={renderCustomHeader}
      style={{height: 400, maxHeight: 400}}
    />
  );
};

function renderCustomHeader(date) {

    const currentDate = new Date(date.current)
    const header = currentDate.toLocaleDateString('fr', {month: "long", year: "numeric"});

    return (
        <View style={styles.header}>
            <SubTitleText text={header}/>
        </View>
    );
}

export default CalendarListCustom;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    gap: 20,
    marginBottom: 15
  },
});