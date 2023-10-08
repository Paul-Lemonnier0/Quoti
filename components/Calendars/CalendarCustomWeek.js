import { useState } from "react";

import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import { useSharedValue } from "react-native-reanimated"
import Calendar from 'react-native-swipe-calendar';
import {addDays } from 'date-fns'
import { useThemeColor } from '../Themed';

import { useNavigation } from "@react-navigation/native";

  const successDate = [
    new Date(2023, 6, 7),
    new Date(2023, 6, 2),
    new Date(2023, 6, 8),
    new Date(2023, 6, 9),
    new Date(2023, 6, 10),
    new Date(2023, 6, 14),
    new Date(2023, 6, 19),
    new Date(2023, 6, 25),
    new Date(2023, 6, 30),
  ]

  
  const LittleSuccess = [
    new Date(2023, 6, 3),
    new Date(2023, 6, 4),
    new Date(2023, 6, 6),
    new Date(2023, 6, 9),
    new Date(2023, 6, 13),
    new Date(2023, 6, 8),
    new Date(2023, 6, 15),
    new Date(2023, 6, 17),
    new Date(2023, 6, 23),
    new Date(2023, 6, 39),
  ]

  const handlePressDay = () => {
    const navigation = useNavigation();
    navigation.navigate("DayDetailScreen", {date: date, habitude: habitude});
    ctx.onDateSelect?.(date, { isSelected }); 
  }
    
  const DayComponentWrapper = (color, habitude) => ({ date, isInDisplayedMonth, isToday, isSelected }) => {


    const givenDate = new Date(date);
    const isSuccessDate = successDate.some((d) => {
      return (
        d.getFullYear() === givenDate.getFullYear() &&
        d.getMonth() === givenDate.getMonth() &&
        d.getDate() === givenDate.getDate()
      );
    });
  
    const primary = useThemeColor({}, 'Primary');
  
    let isLittleSuccess = false;
  
    if (!isSuccessDate) {
      isLittleSuccess = LittleSuccess.some((d) => {
        return (
          d.getFullYear() === givenDate.getFullYear() &&
          d.getMonth() === givenDate.getMonth() &&
          d.getDate() === givenDate.getDate()
        );
      });
    }
  
    const colorTile = (isSuccessDate || isLittleSuccess) ? color : primary;
  
    return (
      <TouchableOpacity
        onPress={handlePressDay}
        style={styles.dayContainerStyle}>
          <View style={[
                  styles.dayStyle,
                  {
                    backgroundColor: colorTile,
                    opacity: isLittleSuccess ? 1 / 3 : 1,
                  }
                ]}>

              <Text style={{ color: colorTile }}>{date.getDate()}</Text>
          </View>

      </TouchableOpacity>
    );
  };



  const HeaderComponent = () => {
      return
  };

  const DayLabelComponent  = () => {
    return
  }
  
  export default function CalendarCustomWeek({ colorHabit, habitude }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectDate] = useState(new Date());
    const monthAnimCallbackNode = useSharedValue(0);
    
    const startRangeDate = new Date();
    const endRangeDate = addDays(currentDate, 2);
  
    return (
      <View style={[styles.container]}>
        <Calendar
          minDate={startRangeDate}
          maxDate={endRangeDate}
          pageInterval="week"
          theme={{ inactiveOpacity: 0 }}
          currentDate={currentDate}
          HeaderComponent={HeaderComponent}
          DayLabelComponent={DayLabelComponent}
          DayComponent={DayComponentWrapper(colorHabit, habitude)}
          selectedDate={selectedDate}
          pageBuffer={1} 
          
          monthAnimCallbackNode={monthAnimCallbackNode}
        />
      </View>
    );
  }
  
  
  const styles = StyleSheet.create({

    container: { flex: 1 },

    dayStyle: {
      aspectRatio: 1/1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
    },

    dayContainerStyle :{
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    }
  });
  