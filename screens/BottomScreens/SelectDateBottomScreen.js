import Calendar from "react-native-swipe-calendar";
import CustomBottomSheet from "../../components/BottomSheets/CustomBottomSheet"
import CalendarCustom from "../../components/Calendars/CalendarCustom"
import { useSharedValue } from "react-native-reanimated";

const SelectDateBottomScreen = ({bottomSheetModalRef, snapPoints, handleSheetChanges, 
                                  selectedDate, setSelectedDate}) => {

    const handleSelectDate = (date) => {
      bottomSheetModalRef.current?.close();
      setSelectedDate(date)
    }

    return (
        <CustomBottomSheet bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints} onChange={handleSheetChanges}>
            <CalendarCustom selectedDate={selectedDate} setSelectedDate={handleSelectDate}/>
        </CustomBottomSheet>
    );
  };
  
  export default SelectDateBottomScreen;