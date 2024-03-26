import React, {useState, useMemo, useCallback, FC, ComponentType} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {CalendarList, DateData} from 'react-native-calendars';
import { BottomScreenOpen_Impact } from '../../constants/Impacts';
import { MemoizedDayContainer } from './DayComponent';
import CalendarMonthHeader from './CalendarMonthHeader';
import CalendarDayLabels from './CalendarDayLabels';
import { RANGE, THEME } from '../../constants/CalendarConst';
import { CalendarHeaderProps } from 'react-native-calendars/src/calendar/header';
import { DayState } from 'react-native-calendars/src/types';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import { DayProps } from 'react-native-calendars/src/calendar/day';


export interface CalendarListCustomProps {
  closeModal(): void,
  selectedDate: Date,
  setSelectedDate: (date: Date) => void
}

export interface CustomDayComponentProps {
  date: DateData,
  state: DayState,
  marking: MarkingProps
}

const CalendarListCustom: FC<CalendarListCustomProps> = ({closeModal, selectedDate, setSelectedDate}) => {

    const WIDTH = Dimensions.get("window").width - 30

    const [selectedDates, setSelectedDates] = useState<Date[]>([selectedDate])


    const onDayPress = useCallback((day: string) => {
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

  //   const dayComponent: ComponentType<DayProps & { date: DateData | undefined; }> | undefined = useCallback((props) => {
  //     return <MemoizedDayContainer
  //         key={props.date?.dateString}
  //         date={props.date}
  //         state={props.state}
  //         marking={props.marking}
  //         onDayPress={onDayPress}
  //     />;
  // }, [onDayPress]);

    // const dayComponent = useCallback(
    //   ({ date, state, marking }: ComponentType<DayProps & { date?: DateData | undefined }> | undefined) => {
    //     return <MemoizedDayContainer key={date?.dateString} date={date} state={state} marking={marking} onDayPress={onDayPress} />;
    //   },
    //   [onDayPress]
    // );
    

    const dayComponent = useCallback((props: any) => {
        return <MemoizedDayContainer key={props.date?.dateString} date={props.date} state={props.state} marking={props.marking} onDayPress={onDayPress} />;
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
          renderScrollComponent={undefined}
          showScrollIndicator={false}
          current={selectedDates[0].toDateString()}
          pastScrollRange={RANGE}
          futureScrollRange={RANGE}
          //onDayPress={onDayPress}
          customHeader={(date: CalendarHeaderProps ) => <CalendarMonthHeader currentDateString={date.current}/>}
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