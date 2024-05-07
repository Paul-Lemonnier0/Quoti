
import { StyleSheet, View } from "react-native";
import CalendarListCustom from "../../components/Calendars/CalendarListCustom";
import { UsualScreen } from "../../components/View/Views";
import { BottomSheetCloseButton, CloseButton } from "../../components/Buttons/IconButtons";
import { TitleText } from "../../styles/StyledText";
import { BottomScreenOpen_Impact } from "../../constants/Impacts";
import React, { Dispatch, FC, RefObject, useMemo } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { CustomStaticBottomSheet } from "../../components/BottomSheets/CustomBottomSheet";

export interface SelectDateBottomScreenProps {
  bottomSheetModalRef: RefObject<BottomSheetModal>,
  selectedDate: Date,
  setSelectedDate: Dispatch<Date>,
  disabledPastDays?: boolean
}

const SelectDateBottomScreen: FC<SelectDateBottomScreenProps> = ({
  bottomSheetModalRef,
  selectedDate,
  setSelectedDate,
  disabledPastDays
}) => {

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
        <CustomStaticBottomSheet 
          bottomSheetModalRef={bottomSheetModalRef} 
          snapPoints={snapPoints_Default}
          footerMethod={handleGoToday}
          footerText={"Aujourd'hui"}>
          <UsualScreen hideMenu>
            <View style={styles.container}>

              <View style={styles.pageTitleContainer}>
                  <View style={{flex: 1}}>
                      <TitleText text="Choisissez une date"/>
                  </View>
                  <BottomSheetCloseButton methode={closeModal}/>

              </View>

              <View style={styles.calendarContainer}>
                <CalendarListCustom 
                  disablePastDays={disabledPastDays}
                  closeModal={closeModal} 
                  selectedDate={selectedDate} 
                  setSelectedDate={setSelectedDate}
                />
              </View>

            </View>
          </UsualScreen>
        </CustomStaticBottomSheet>
    );
  };
  
  export default SelectDateBottomScreen;

  const styles = StyleSheet.create({

    container:{
      flex: 1, 
      gap: 30, 
      marginBottom: 30, 
      marginHorizontal: -20,
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
      marginHorizontal: -10,
      marginBottom: 30, 
    },
  })