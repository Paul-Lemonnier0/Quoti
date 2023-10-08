import { useState, useRef, useCallback, useMemo } from "react";

  import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';

  import { LittleNormalText, NormalText, SubText, TitleText } from '../../styles/StyledText';
  import { useSharedValue } from "react-native-reanimated"
  import Calendar, { useCalendarContext, onPageChange  } from 'react-native-swipe-calendar';
  import { differenceInCalendarMonths, format, addMonths } from 'date-fns'
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
    
  const DayComponentWrapper = (color, habitude) => ({ date, isInDisplayedMonth, isToday, isSelected }) => {

    const navigation = useNavigation();

    const givenDate = new Date(date);
    const isSuccessDate = successDate.some((d) => {
      return (
        d.getFullYear() === givenDate.getFullYear() &&
        d.getMonth() === givenDate.getMonth() &&
        d.getDate() === givenDate.getDate()
      );
    });
  
    const fontGray = useThemeColor({}, 'FontGray');
    const secondary = useThemeColor({}, 'Secondary');
  
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
  
    let colorTile;
  
    if (isSuccessDate || isLittleSuccess) colorTile = color;
    else colorTile = secondary;
  
    const ctx = useCalendarContext();
    return (
      <TouchableOpacity
        onPress={() => 
          {
            navigation.navigate("DayDetailScreen", {date: date, habitude: habitude});
            ctx.onDateSelect?.(date, { isSelected }); 
          }}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          padding: 5,
          opacity: 1,
        }}>

          <View
            style={{
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
              borderRadius: 5,
              backgroundColor: colorTile,
              opacity: isLittleSuccess ? 1 / 3 : 1,
            }}>

              <Text style={{ color: colorTile }}>{date.getDate()}</Text>

          </View>

      </TouchableOpacity>
    );
  };



  const HeaderComponent = (date) => {

    const {endDate} = date
    const monthName = endDate.toLocaleString('fr', { month: 'long' })
    const yearNumber = endDate.getFullYear()

    const stylesHeader = StyleSheet.create({
        headerContainer: {
          padding: 10,
          justifyContent: "center",
        },
      });

      return (

        <View style={stylesHeader.headerContainer}>
            <TitleText text={monthName}/>
            <SubText text={yearNumber}/>
        </View>
    );
  };

  const DayLabelComponent  = ({date}) => {
    const dayName = date.toLocaleString('fr', { weekday: 'short' }).substring(0, 3);

    return(
        <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
            <LittleNormalText text={dayName}/>
        </View>
    )
  }

  export default function CalendarCustom({colorHabit, habitude}) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const startDate = addMonths(currentDate, -2)
    const endDate = addMonths(currentDate, 2)
    const [selectedDate, setSelectDate] = useState(new Date());
    const monthAnimCallbackNode = useSharedValue(0);

  
    const primary = useThemeColor({}, "Primary");
  
    return (
      <View style={[styles.container, { backgroundColor: primary }]}>
        <Calendar
    
            minDate={startDate}
            maxDate={endDate}
          pageInterval="month"
          theme={{ inactiveOpacity: 0 }}
          currentDate={currentDate}

          HeaderComponent={HeaderComponent}
          DayLabelComponent ={DayLabelComponent }
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
  });
  