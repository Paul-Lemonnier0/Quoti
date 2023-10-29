import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSharedValue } from "react-native-reanimated"
import { useThemeColor } from '../Themed';
import { NormalText, SubText } from "../../styles/StyledText";
import Calendar, { useCalendarContext } from 'react-native-swipe-calendar';
import { useEffect } from 'react';
import { useRef } from 'react';

const DayComponentWrapper  = ({ date, isToday, isSelected }) => {

  const font = useThemeColor({}, 'Font');
  const fontGray = useThemeColor({}, 'FontGray');

  const stateDayColor = isSelected ? font : isToday ? fontGray : "transparent";

  const dayName = date.toLocaleDateString("fr", { weekday: 'long' }).substring(0,1)       
  const dayNumber = date.getDate() 

  const ctx = useCalendarContext();

  return (
    <TouchableOpacity onPress={() => ctx.onDateSelect?.(date, { isSelected })}
            style={[styles.dayContainerStyle, { borderColor: stateDayColor, borderWidth: 2 }]}>
        
        <View style={styles.dayStyle}>
            <NormalText text={dayNumber} style={{fontFamily: "poppinsSemiBold"}}/>
            <SubText text={dayName} style={{fontFamily: "poppinsSemiBold", color: font}}/>
            <View style={{ backgroundColor: stateDayColor, height: 3, width:"80%", borderRadius: 10}}/>
        </View>

    </TouchableOpacity>
  );
};

const HeaderComponent = () => { return };
const DayLabelComponent  = () => { return };

export default function HomeCalendarCustomWeek({ selectedDate, setSelectedDate }) {
    
  const monthAnimCallbackNode = useSharedValue(0);

  useEffect(() => {
    cRef.current?.setPage(selectedDate)
  }, [selectedDate])

  const cRef = useRef(null)
  
  return (
    <View style={[styles.container]}>
      <Calendar
        ref={cRef}
        selectedDate={selectedDate}
        currentDate={selectedDate}
        pageInterval="week"
        theme={{ inactiveOpacity: 0 }}
        DayComponent={DayComponentWrapper}
        HeaderComponent={HeaderComponent}
        DayLabelComponent ={DayLabelComponent}
        onDateSelect={(date) => {
          setSelectedDate(date);
        }}
        
        weekStartsOn={1}
        monthAnimCallbackNode={monthAnimCallbackNode}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  container: { marginHorizontal: -5 },

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
    flex: 1, 
    padding: 10, 
    borderRadius: 15, 
    marginHorizontal: 2.5
  }
});
  