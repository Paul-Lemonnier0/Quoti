import { useState, useEffect } from "react";

import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import { useSharedValue } from "react-native-reanimated"
import Calendar, { useCalendarContext } from 'react-native-swipe-calendar';
import {addDays } from 'date-fns'
import { useThemeColor } from '../Themed';

import { useNavigation } from "@react-navigation/native";
import { NormalText, SubText, SubTitleGrayText, SubTitleText, TitleGrayText } from "../../styles/StyledText";
import cardStyle from "../../styles/StyledCard";
import { StepCircularBar } from "../Habitudes/StepCircularBar";

const successDate = [];
const littleSuccess = [];
const cancelDate = [];

const startDate = new Date(2023, 5, 1); // June 1, 2023
const endDate = new Date(2023, 7, 31); // August 31, 2023

const getRandomDate = (start, end) => {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const randomTime = startTime + Math.random() * (endTime - startTime);
  return new Date(randomTime);
};

while (successDate.length < 16) {
  const date = getRandomDate(startDate, endDate);
  if (!successDate.includes(date)) {
    successDate.push(date);
  }
}

while (littleSuccess.length < 16) {
  const date = getRandomDate(startDate, endDate);
  if (!successDate.includes(date) && !littleSuccess.includes(date)) {
    littleSuccess.push(date);
  }
}

while (cancelDate.length < 16) {
  const date = getRandomDate(startDate, endDate);
  if (!successDate.includes(date) && !littleSuccess.includes(date) && !cancelDate.includes(date)) {
    cancelDate.push(date);
  }
}

  const handlePressDay = () => {

  }
    
  const DayComponentWrapper = ({ habit }) => ({ date, isInDisplayedMonth, isToday, isSelected }) => {

    const givenDate = new Date(date);
    const isSuccessDate = successDate.some((d) => {
      return (
        d.getFullYear() === givenDate.getFullYear() &&
        d.getMonth() === givenDate.getMonth() &&
        d.getDate() === givenDate.getDate()
      );
    });
  
    let isLittleSuccess = false;
  
    if (!isSuccessDate) {
      isLittleSuccess = littleSuccess.some((d) => {
        return (
          d.getFullYear() === givenDate.getFullYear() &&
          d.getMonth() === givenDate.getMonth() &&
          d.getDate() === givenDate.getDate()
        );
      });
    }

    let isCancel = false

    if (!isLittleSuccess) {
      isCancel = cancelDate.some((d) => {
        return (
          d.getFullYear() === givenDate.getFullYear() &&
          d.getMonth() === givenDate.getMonth() &&
          d.getDate() === givenDate.getDate()
        );
      });
    }

    const primary = useThemeColor({}, 'Primary');
    const secondary = useThemeColor({}, 'Secondary');
    const contrast = useThemeColor({}, 'Contrast');
    const dayName = date.toLocaleDateString("fr", { weekday: 'long' }).substring(0,1)       
    const dayNumber = date.getDate() 

    const backgroundColor = isSelected ? contrast :  "transparent"
    const borderColor = isSelected ? contrast :  (isToday ? contrast : "transparent")

    const stateDayColor = isSuccessDate ? "#39BF5C" : (isLittleSuccess ? "#ceba5b" : (isCancel ? "#bc3b40" : (isSelected ? "white" : "transparent")))

    const ctx = useCalendarContext();

    return (


      <TouchableOpacity
        onPress={() => ctx.onDateSelect?.(date, { isSelected })}
        style=
        {
          [
            styles.dayContainerStyle,
            {
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              borderWidth: 2,
            }
          ]
        }>
          <View style={
            [
              styles.dayStyle,
            ]
          }>
              {/*isSelected ? <SubText text={dayName} style={{fontFamily: "poppinsSemiBold", color: "white"}}/> :  <SubText text={dayName} style={{fontFamily: "poppinsSemiBold"}}/>*/}
              <NormalText text={dayNumber} style={{fontFamily: "poppinsSemiBold"}}/>
              <StepCircularBar habit={habit}/>
          </View>

      </TouchableOpacity>
    );
  };



  const HeaderComponent = (date) => {
      return
  };

  const DayLabelComponent  = () => {
    return
  }
  
  export default function HabitCalendarCustomWeek({ habit, selectedDate, setSelectedDate }) {
    
    // Appeler la fonction de rappel avec la nouvelle valeur de currentEndDate


    const monthAnimCallbackNode = useSharedValue(0);

    return (
      <View style={[styles.container]}>
        <Calendar
          pageInterval="week"
          theme={{ inactiveOpacity: 0 }}
          DayComponent={DayComponentWrapper({habit})}
          HeaderComponent={HeaderComponent}
          DayLabelComponent ={DayLabelComponent}
          selectedDate={selectedDate}
          onDateSelect={(date, options) => {
            setSelectedDate(date);
          }}
          
          pageBuffer={1} 
          weekStartsOn={1}
          
          monthAnimCallbackNode={monthAnimCallbackNode}
        />
      </View>
    );
  }
  
  
  const styles = StyleSheet.create({

    container: { marginHorizontal: -5
    },

    dayStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      display: "flex",
      flexDirection: "column",
      gap: 5,
      borderRadius: 10, width: "100%"
    },

    dayContainerStyle :{
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1, padding: 10, borderRadius: 15, marginHorizontal: 2.5
    }
  });
  