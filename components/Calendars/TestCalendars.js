import { memo, useState, useCallback, useMemo } from 'react';
import { Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, CalendarList, CalendarProps } from 'react-native-calendars';

const THEME = {};

const CustomDayComponent = memo(({ date, state, marking, onDayPress }) => {

  return (
    <TouchableOpacity
      onPress={() => onDayPress(date.dateString)}
      style={{
        backgroundColor: marking && marking.selected ? 'red' : 'transparent',
      }}>
      <Text>{date.day}</Text>
    </TouchableOpacity>
  );
});

export default function TestCalendar() {
  const [pressedDays, setPressedDays] = useState([]);

  const onDayPress = useCallback((date) => {
    setPressedDays((pressedDays) => {
      const days = new Set(pressedDays);
      days.add(date);
      return Array.from(days);
    });
  }, []);

  const markedDates = useMemo(() => {
    let markedDatesObject = {};
    pressedDays.forEach((day) => {

      markedDatesObject = {
        ...markedDatesObject,
        [day]: {
          selected: true,
        },
      };
    });

    return markedDatesObject;
  }, [pressedDays]);

  const dayComponent = useCallback(
    (props) => (
      <CustomDayComponent
        key={props.date.dateString}
        {...props}
        onDayPress={onDayPress}
      />
    ),
    [onDayPress]
  );

  return (
      <CalendarList
      current={pressedDays[0]}
        theme={THEME}
        enableSwipeMonths
        
        markedDates={markedDates}
        markingType="custom"
        dayComponent={dayComponent}
      />
  );
}
