
import { StyleSheet, View } from "react-native";
import { CalendarList, NewCalendarList } from "react-native-calendars";
import CalendarListCustom from "../../components/Calendars/CalendarListCustom";
import WeekCalendarCustom from "../../components/Calendars/WeekCalendarCustom";
import { BottomTextInputCustom } from "../../components/TextFields/TextInput";
import TestCalendar from "../../components/Calendars/TestCalendars";
import { UsualScreen } from "../../components/View/Views";
import { CloseButton } from "../../components/Buttons/IconButtons";
import { TitleText } from "../../styles/StyledText";
import Separator from "../../components/Other/Separator";
import { TextButton } from "../../components/Buttons/UsualButton";
import { BottomScreenOpen_Impact } from "../../constants/Impacts";
import React, { Dispatch, FC, RefObject, useMemo } from "react";
import { backgroundColor } from "react-native-calendars/src/style";
import { useThemeColor } from "../../components/Themed";
import MultipleSelectionCalendarListCustom from "../../components/Calendars/MultipleSelectionCalendarListCustom";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import SimpleFullBottomSheet from "../../components/BottomSheets/SimpleFullBottomSheet";

interface SelectDateBottomScreenProps {
  bottomSheetModalRef: RefObject<BottomSheetModal>,
  selectedDate: Date,
  setSelectedDate: Dispatch<Date>
}

const SelectDateBottomScreen: FC<SelectDateBottomScreenProps> = ({bottomSheetModalRef, selectedDate, setSelectedDate}) => {

    const handleSelectDate = (date: Date) => {
      bottomSheetModalRef.current?.close();
      setSelectedDate(date)
    }

    const closeModal = () => {
      bottomSheetModalRef.current?.close();
    }

    const handleGoToday = () => {
      setSelectedDate(new Date())
      closeModal()
      BottomScreenOpen_Impact()
    }

    const snapPoints_Default = useMemo(() => ['75%'], []);

    return (
        <SimpleFullBottomSheet bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints_Default}
            footerText={"Aujourd'hui"} footerMethod={handleGoToday}>

          <UsualScreen secondaryBackground>
            <View style={styles.container}>
              <View style={styles.pageTitleContainer}>
                  <View style={{flex: 1}}>
                      <TitleText text="Choisissez une date"/>
                  </View>
                  <CloseButton noPadding methode={closeModal}/>
              </View>

              <View style={styles.calendarContainer}>
                <CalendarListCustom closeModal={closeModal} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
              </View>
            </View>
          </UsualScreen>
        </SimpleFullBottomSheet>
    );
  };
  
  export default SelectDateBottomScreen;

  const styles = StyleSheet.create({

    container:{
      flex: 1, 
      gap: 30, 
      marginBottom: 60, 
      flexDirection: "column", 
      justifyContent: "space-between"
    },
    
    pageTitleContainer: {
      display: "flex", 
      flexDirection: "row", 
      alignItems:"center", 
      gap: 20,
      marginLeft: 5,
    },

    footer: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },

    calendarContainer: {
      flex: 1, 
      marginHorizontal: -10
    },
  })