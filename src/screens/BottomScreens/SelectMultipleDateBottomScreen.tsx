import { StyleSheet, View } from "react-native";
import { UsualScreen } from "../../components/View/Views";
import { BottomSheetCloseButton, CloseButton } from "../../components/Buttons/IconButtons";
import { NormalGrayText, TitleText } from "../../styles/StyledText";
import { BottomScreenOpen_Impact, Error_Impact } from "../../constants/Impacts";
import { FC, RefObject, useMemo, useRef, useState } from "react";
import MultipleSelectionCalendarListCustom from "../../components/Calendars/MultipleSelectionCalendarListCustom";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React from "react"
import { CustomStaticBottomSheet } from "../../components/BottomSheets/CustomBottomSheet";
import Toast from "react-native-toast-message";
import { addDays } from "date-fns";

export interface SelectMultipleDateBottomScreenProps {
  bottomSheetModalRef: RefObject<BottomSheetModal>,
  setStartingDate: (date: Date) => void,
  setEndingDate: (date: Date | undefined) => void,
  startingDate?: Date,
  endingDate?: Date,
  disablePastDays?: boolean
}

  const SelectMultipleDateBottomScreen: FC<SelectMultipleDateBottomScreenProps> = ({
    bottomSheetModalRef, 
    setStartingDate,
    setEndingDate,
    startingDate,
    endingDate,
    disablePastDays
}) => {

  const snapPoints_Default = useMemo(() => ['85%'], []);

  interface CalendarRefType {
    getStartingDate: () => Date | undefined;
    getEndingDate: () => Date | undefined;
  }

  const calendarRef = useRef<CalendarRefType | null>(null)

  const checkError = (): boolean => {
    const startingDate_temp = calendarRef.current?.getStartingDate()

    const isError = (!startingDate_temp || startingDate_temp <= addDays(new Date(), -1))

    if(isError) {
      Toast.show({
        type: "error",
        text1: "Date de début invalide",
        position: "top"
      })
    }

    return isError
  }

  const closeModal = () => {
    bottomSheetModalRef.current?.close();
  }

  const closeAndSave = () => {
    if(checkError()) {
      Error_Impact()
    }

    else {
      handleValidateDates()
      closeModal()
    }
  }

  const handleValidateDates = () => {
    const startingDate_temp = calendarRef.current?.getStartingDate()
    const endingDate_temp = calendarRef.current?.getEndingDate()

    if(startingDate_temp){
      if(!endingDate_temp){
        setStartingDate(new Date(startingDate_temp))
        setEndingDate(undefined)
      }

      else{
        setStartingDate(new Date(startingDate_temp))
        setEndingDate(new Date(endingDate_temp))
      }

      closeModal()
      BottomScreenOpen_Impact()
    }
  }

  return (
    <CustomStaticBottomSheet 
      bottomSheetModalRef={bottomSheetModalRef} 
      snapPoints={snapPoints_Default}
      footerText="Valider"
      footerMethod={handleValidateDates}
      checkError={checkError}
      noPressBackdrop
      noPanDownToClose>
      <UsualScreen hideMenu>
        <View style={styles.container}>
          <View style={styles.pageTitleContainer}>
              <View style={{flex: 1, gap: 5}}>
                  <TitleText text="Choisissez vos dates"/>
                  <NormalGrayText bold text={"La date de fin n'est pas obligatoire"}/>
              </View>
              <BottomSheetCloseButton methode={closeAndSave}/>
          </View>

          <View style={{flex: 1, marginHorizontal: -10}}>
            <MultipleSelectionCalendarListCustom 
              disablePastDays={disablePastDays}
              startingDate={startingDate}
              endingDate={endingDate}
              ref={calendarRef}/>
          </View>
        </View>
      </UsualScreen>
    </CustomStaticBottomSheet>
  );
};

export default SelectMultipleDateBottomScreen;

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