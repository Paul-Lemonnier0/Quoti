import { Dimensions, StyleSheet, View } from "react-native";
import SimpleFullBottomSheet from "../../components/BottomSheets/SimpleFullBottomSheet";
import { UsualScreen } from "../../components/View/Views";
import { CloseButton } from "../../components/Buttons/IconButtons";
import { SubText, TitleText } from "../../styles/StyledText";
import { BottomScreenOpen_Impact, Error_Impact } from "../../constants/Impacts";
import { useMemo, useRef, useState } from "react";
import { useThemeColor } from "../../components/Themed";
import MultipleSelectionCalendarListCustom from "../../components/Calendars/MultipleSelectionCalendarListCustom";

const SelectMultipleDateBottomScreen = ({bottomSheetModalRef, snapPoints, handleSheetChanges, 
    startingDate, endingDate, setStartingDate, setEndingDate}) => {

    const WIDTH = Dimensions.get("window").width - 30
    const fontGray = useThemeColor({}, "FontGray")

    const handleSelectDate = (date) => {
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

    const snapPoints_Default = useMemo(() => ['85%'], []);

    const [isError, setIsError] = useState(false)

    const calendarRef = useRef(null)
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
        <SimpleFullBottomSheet bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints_Default} onChange={handleSheetChanges}
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
                <MultipleSelectionCalendarListCustom 
                  ref={calendarRef}
                  closeModal={closeModal} 
                  startingDate={startingDate} setStartingDate={setStartingDate}
                  endingDate={endingDate} setEndingDate={setEndingDate}
                />
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