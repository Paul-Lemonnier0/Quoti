import React, {useState, useMemo, useCallback} from 'react';
import {StyleSheet, Text, View, TextStyle, Dimensions, TouchableOpacity, Pressable} from 'react-native';
import {CalendarList, DateData} from 'react-native-calendars';
import { useThemeColor } from '../Themed';
import { NormalText, SubTitleText } from '../../styles/StyledText';
import { BottomScreenOpen_Impact } from '../../constants/Impacts';
import { MemoizedDayContainer } from './DayComponent';
import CalendarMonthHeader from './CalendarMonthHeader';
import CalendarDayLabels from './CalendarDayLabels';
import { RANGE, THEME } from '../../constants/CalendarConst';

const CalendarListCustom = (props) => {

    const WIDTH = Dimensions.get("window").width - 30

    const {closeModal, selectedDate, setSelectedDate} = props;
    const [selectedDates, setSelectedDates] = useState([selectedDate])


    const onDayPress = useCallback((day) => {
      const date_object = new Date(day)
      
      //Pour fermer direct la page
      setSelectedDate(date_object)
      closeModal()

      //Attendre une validation donc update en temps réel
      // setSelectedDates((previousSelected) => {
      //   return [date_object]
      // });

      BottomScreenOpen_Impact()
    }, []);
    
    const markedDates = useMemo(() => {
      const startingDateString = selectedDates[0].toISOString().slice(0, 10)

      const markedDatesObject = {[startingDateString]: {selected: true}}
      return markedDatesObject;
    }, [selectedDates]);

    const dayComponent = useCallback(
      (props) => {

        return <MemoizedDayContainer
          key={props.date.dateString}
          {...props}
          onDayPress={onDayPress}
          simpleSelection
        />
      }, 
      [onDayPress]
    );

    return (
      <View style={styles.container}>
        <CalendarDayLabels/>
        <CalendarList
          calendarWidth={WIDTH}
          theme={THEME}
          markingType={'custom'}
          markedDates={markedDates}
          firstDay={1}
          renderScrollComponent={null}
          showScrollIndicator={false}
          current={selectedDates[0]}
          pastScrollRange={RANGE}
          futureScrollRange={RANGE}
          onDayPress={onDayPress}
          place
          customHeader={(date) => <CalendarMonthHeader date={date}/>}
          dayComponent={dayComponent}
        />
      </View>
    );
};

export default CalendarListCustom;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 20
  }
});