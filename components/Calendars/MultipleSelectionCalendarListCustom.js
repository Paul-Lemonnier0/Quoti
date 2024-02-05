import React, {useState, useMemo, useCallback, forwardRef, useImperativeHandle} from 'react';
import {StyleSheet, Text, View, TextStyle, Dimensions, TouchableOpacity, Pressable} from 'react-native';
import {CalendarList, DateData} from 'react-native-calendars';
import { useThemeColor } from '../Themed';
import { NormalText, SubTitleText } from '../../styles/StyledText';
import { BottomScreenOpen_Impact } from '../../constants/Impacts';
import { MemoizedDayContainer } from './DayComponent';
import { addDays } from 'date-fns';
import { MemoizedMultiSelectionDayComponent } from './MultiSelectionDayComponent';
import CalendarDayLabels from './CalendarDayLabels';
import CalendarMonthHeader from './CalendarMonthHeader';
import { RANGE, THEME } from '../../constants/CalendarConst';

const MultipleSelectionCalendarListCustom = forwardRef((props, ref) => {



    const WIDTH = Dimensions.get("window").width - 40

    const {closeModal, startingDate, endingDate, setStartingDate, setEndingDate} = props;

    const [selectedDates, setSelectedDates] = useState([])

    useImperativeHandle(ref, () => ({
      getStartingDate: () => selectedDates[0],
      getEndingDate: () => selectedDates[1],
    }));


    const onDayPress = useCallback((date) => {
        const newDate = new Date(date);

        
        setSelectedDates((previousSelected) => {
            if (!previousSelected[0]) {
                return [newDate, null];
            } 
            
            else if (newDate < previousSelected[0]) {
                return [newDate, null];
            } 

            else if (newDate.toDateString() === previousSelected[0].toDateString()){
              return [newDate, null];
            } 
            
            else if (!previousSelected[1]) {
                return [previousSelected[0], newDate];
            }

            else {
              return [newDate, null];
            } 
            
        });
    
        BottomScreenOpen_Impact();
    }, []);
    
    
    const markedDates = useMemo(() => {
        let markedDatesObject = {}
        if(selectedDates.length === 0 || !selectedDates[0]) return markedDatesObject

        const startingDate_temp = selectedDates[0]
        const startingDateString = startingDate_temp.toISOString().slice(0, 10)

        const endingDate_temp = selectedDates[1]

        if(!endingDate_temp){
            markedDatesObject = {
                [startingDateString]: {selected: true, startingDate: true},
            }
        }

        else {
            const endingDateString = endingDate_temp.toISOString().slice(0, 10)

            markedDatesObject = {
                [startingDateString]: {startingDate: true},
                [endingDateString]: {endingDate: true},
            }

            let currentDate = new Date(startingDateString)
            currentDate = addDays(currentDate, 1)

            while(currentDate < endingDate_temp){
                const currentDateString = currentDate.toISOString().slice(0, 10)

                markedDatesObject[currentDateString] = {selected: true}
                currentDate = addDays(currentDate, 1)
            }
        }

        return markedDatesObject;
    }, [selectedDates]);

    const dayComponent = useCallback(
      (props) => {
        return <MemoizedMultiSelectionDayComponent
          key={props.date.dateString}
          {...props}
          onDayPress={onDayPress}
        />
      }, 
      [onDayPress]
    );

    const currentDateString = new Date().toISOString().slice(0, 10)

    return (
      <View style={styles.container}>
        <CalendarDayLabels/>
        <CalendarList
          calendarWidth={WIDTH}
          theme={THEME}
          markingType={"period"}
          markedDates={markedDates}
          firstDay={1}
          renderScrollComponent={null}
          showScrollIndicator={false}
          current={currentDateString}
          pastScrollRange={RANGE}
          futureScrollRange={RANGE}
          onDayPress={onDayPress}
          place
          customHeader={(date) => <CalendarMonthHeader date={date}/>}
          dayComponent={dayComponent}
        />
      </View>
    );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 20
  }
});

export default MultipleSelectionCalendarListCustom