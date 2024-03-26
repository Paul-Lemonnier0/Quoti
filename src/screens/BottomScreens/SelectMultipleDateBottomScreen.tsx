import { Dimensions, StyleSheet, View } from "react-native";
import SimpleFullBottomSheet from "../../components/BottomSheets/SimpleFullBottomSheet";
import { UsualScreen } from "../../components/View/Views";
import { CloseButton } from "../../components/Buttons/IconButtons";
import { SubText, TitleText } from "../../styles/StyledText";
import { BottomScreenOpen_Impact, Error_Impact } from "../../constants/Impacts";
import { FC, RefObject, useMemo, useRef, useState } from "react";
import MultipleSelectionCalendarListCustom from "../../components/Calendars/MultipleSelectionCalendarListCustom";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React from "react"

export interface SelectMultipleDateBottomScreen {
  bottomSheetModalRef: RefObject<BottomSheetModal>,
  setStartingDate: (date: Date) => void,
  setEndingDate: (date: Date) => void,
}

const SelectMultipleDateBottomScreen: FC<SelectMultipleDateBottomScreen> = ({bottomSheetModalRef, setStartingDate, setEndingDate}) => {

    const closeModal = () => {
      bottomSheetModalRef.current?.close();
    }

    const snapPoints_Default = useMemo(() => ['85%'], []);

    const [isError, setIsError] = useState(false)

    interface CalendarRefType {
      getStartingDate: () => Date | undefined;
      getEndingDate: () => Date | undefined;
    }

    const calendarRef = useRef<CalendarRefType | null>(null)

    const handleValidateDates = () => {
      const startingDate_temp = calendarRef.current?.getStartingDate()
      const endingDate_temp = calendarRef.current?.getEndingDate()

      if(!startingDate_temp){
        Error_Impact()
        setIsError(true)
      }

      else{
        setIsError(false)
        if(!endingDate_temp){
          setStartingDate(new Date(startingDate_temp))
          setEndingDate(new Date(startingDate_temp))
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
        <SimpleFullBottomSheet bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints_Default}
            footerText={"Valider"} isError={isError} setIsError={setIsError} footerMethod={handleValidateDates}>
          <UsualScreen secondaryBackground>
            <View style={{flex: 1, gap: 30, marginBottom: 60, flexDirection: "column", justifyContent: "space-between"}}>
              <View style={styles.pageTitleContainer}>
                  <View style={{flex: 1, gap: 5}}>
                      <TitleText text="Choisissez vos dates"/>
                      <SubText text={"La date de fin n'est pas obligatoire"}/>

                  </View>
                  <CloseButton noPadding methode={closeModal}/>
              </View>



              <View style={{flex: 1, marginHorizontal: -10}}>
                <MultipleSelectionCalendarListCustom ref={calendarRef}/>
              </View>
            </View>
          </UsualScreen>
        </SimpleFullBottomSheet>
    );
  };
  
  export default SelectMultipleDateBottomScreen;

  const styles = StyleSheet.create({
    
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
  })