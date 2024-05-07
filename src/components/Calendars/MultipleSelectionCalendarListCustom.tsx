import React, {useState, useMemo, useCallback, forwardRef, useImperativeHandle, SetStateAction} from 'react';
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
import { CalendarHeaderProps } from 'react-native-calendars/src/calendar/header';
import { toISOStringWithoutTimeZone } from '../../primitives/BasicsMethods';
import { TabRouter } from '@react-navigation/native';


export interface MarkedMultipleDateType {
  selected?: boolean,
  startingDate?: boolean,
  endingDate?: boolean,
  onlyDaySelected?: boolean,
}

export interface MultipleSelectionCalendarListCustomProps {
  startingDate?: Date,
  endingDate?: Date,
  disablePastDays?: boolean
}

const MultipleSelectionCalendarListCustom = forwardRef((props: MultipleSelectionCalendarListCustomProps, ref) => {
    const WIDTH = Dimensions.get("window").width - 40

    const [selectedDates, setSelectedDates] = useState<[Date, Date | null]>([
      new Date(toISOStringWithoutTimeZone(props.startingDate ?? new Date())),      
      props.endingDate ?? null])

    useImperativeHandle(ref, () => ({
      getStartingDate: () => selectedDates[0],
      getEndingDate: () => selectedDates[1],
    }));


    const onDayPress = useCallback((date: string) => {
        const newDate = new Date(date);

        setSelectedDates((previousSelected: SetStateAction<[Date, Date | null]>) => {
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
        let markedDatesObject: {[dateString: string]: MarkedMultipleDateType} = {}

        const startingDate_temp = selectedDates[0]
        const startingDateString = toISOStringWithoutTimeZone(startingDate_temp)

        const endingDate_temp = selectedDates[1]

        if(endingDate_temp === null || endingDate_temp === undefined){
            markedDatesObject = {
                [startingDateString]: {selected: true, startingDate: true},
            }
        }

        else {

            const endingDateString = toISOStringWithoutTimeZone(endingDate_temp)

            markedDatesObject[startingDateString] = {startingDate: true}

            let currentDate = new Date(startingDateString)
            currentDate = addDays(currentDate, 1)

            while(currentDate < endingDate_temp){
                const currentDateString = toISOStringWithoutTimeZone(currentDate)

                markedDatesObject[currentDateString] = {selected: true}
                currentDate = addDays(currentDate, 1)
            }

            markedDatesObject[endingDateString] = {endingDate: true}
        }

        return markedDatesObject;
    }, [selectedDates]);

    const disablePastDays = props.disablePastDays

    const dayComponent = useCallback(
      (props: any) => {
        return <MemoizedMultiSelectionDayComponent
          key={props.date.dateString}
          {...props}
          disablePastDays={disablePastDays}
          onDayPress={onDayPress}
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
          markingType={"period"}
          markedDates={markedDates}
          firstDay={1}
          renderScrollComponent={undefined}
          showScrollIndicator={false}
          current={selectedDates[0].toDateString()}
          pastScrollRange={0}
          futureScrollRange={RANGE*2}
          customHeader={(date: CalendarHeaderProps ) => <CalendarMonthHeader currentDateString={date.current}/>}
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