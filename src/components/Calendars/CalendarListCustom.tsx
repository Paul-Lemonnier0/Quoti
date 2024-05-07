import React, {useState, useMemo, useCallback, FC} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {CalendarList, DateData} from 'react-native-calendars';
import { BottomScreenOpen_Impact } from '../../constants/Impacts';
import { MemoizedDayContainer, StreakMemoizedDayContainer, StreakMemoizedWeekContainer } from './DayComponent';
import CalendarMonthHeader from './CalendarMonthHeader';
import CalendarDayLabels from './CalendarDayLabels';
import { RANGE, THEME } from '../../constants/CalendarConst';
import { CalendarHeaderProps } from 'react-native-calendars/src/calendar/header';
import { DayState } from 'react-native-calendars/src/types';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import { FrequencyTypes, Habit } from '../../types/HabitTypes';
import { toISOStringWithoutTimeZone } from '../../primitives/BasicsMethods';
import { addDays, differenceInDays } from 'date-fns';

export interface CalendarListCustomProps {
  closeModal(): void,
  selectedDate: Date,
  setSelectedDate: (date: Date) => void,
  disablePastDays?: boolean
}

export interface CustomDayComponentProps {
  date: DateData,
  state: DayState,
  marking: MarkingProps,
  disablePastDays?: boolean
}

const CalendarListCustom: FC<CalendarListCustomProps> = ({closeModal, selectedDate, setSelectedDate, disablePastDays}) => {

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
    const startingDateString = toISOStringWithoutTimeZone(selectedDates[0])

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
      return <MemoizedDayContainer 
        key={props.date?.dateString} 
        disablePastDays={disablePastDays}
        date={props.date} 
        state={props.state} 
        marking={props.marking} 
        onDayPress={onDayPress} 
      />;
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


interface StreakListCustomProps {
  history: Date[],
  habit: Habit,
  currentDateString: string,
}


export const StreakListCustom: FC<StreakListCustomProps> = ({history, habit, currentDateString}) => {
  const today = new Date()
  const WIDTH = Dimensions.get("window").width - 30

  const markedDates = useMemo(() => {
    const markedDatesObject = {}

    if(habit.frequency === FrequencyTypes.Hebdo) {
      history.forEach((date) => {
        const todayDiffDays = differenceInDays(new Date(toISOStringWithoutTimeZone(habit.startingDate)), date)
        const todayPlaceInWeek = -(todayDiffDays % 7)

        for(let i = 0; i >= -todayPlaceInWeek; --i) {
          markedDatesObject[toISOStringWithoutTimeZone(addDays(date, i))] = {selected: true}
        }

        for(let i = 0; 7 - todayPlaceInWeek > i; ++i) {
          markedDatesObject[toISOStringWithoutTimeZone(addDays(date, i))] = {selected: true}
        }
      })
    }
    else {
      history.forEach((date) => {
        markedDatesObject[toISOStringWithoutTimeZone(date)] = {selected: true}
      })
    }

    const currentDateISOString = toISOStringWithoutTimeZone(new Date(currentDateString))
    markedDatesObject[currentDateISOString] = {...markedDatesObject[currentDateISOString], marked: true}

    return markedDatesObject;
  }, [history]);

  const streakDayComponent = useCallback((props: any) => {
    if(habit.frequency === FrequencyTypes.Hebdo) {
      return <StreakMemoizedWeekContainer 
        key={props.date?.dateString} 
        habit={habit} 
        date={props.date} 
        state={props.state} 
        marking={props.marking}
      />
    }

    return <StreakMemoizedDayContainer  
      key={props.date?.dateString} 
        habit={habit} 
        date={props.date} 
        state={props.state} 
        marking={props.marking}
      />
  }, [])

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
        current={today.toDateString()}
        pastScrollRange={6}
        futureScrollRange={6}
        customHeader={(date: CalendarHeaderProps ) => <CalendarMonthHeader currentDateString={date.current}/>}
        dayComponent={streakDayComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 20
  }
});