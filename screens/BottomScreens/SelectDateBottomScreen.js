import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { View, StyleSheet, FlatList, Image } from "react-native"

import { IconButton } from "../../components/Buttons/IconButton"
import { TitleText, NormalText, SubText } from "../../styles/StyledText"
import { useRef, useMemo, useCallback, useState } from "react"
import { Feather } from "@expo/vector-icons"
import { useThemeColor } from "../../components/Themed"
import { CircularBarProfil, AddCircularBarProfil } from "../../components/Profil/CircularBarProfil"
import { ContributorsHabits } from "../../data/habitudes"
import Achievements from "../../data/Achievements"
import { AchievementBox } from "../../components/Achievements/AchievementBox"
import CustomBottomSheet from "../../components/BottomSheets/CustomBottomSheet"
import CalendarCustom from "../../components/Calendars/CalendarCustom"
import cardStyle from "../../styles/StyledCard"

const SelectDateBottomScreen = ({bottomSheetModalRef, snapPoints, handleSheetChanges, 
                                  selectedDate, setSelectedDate}) => {

    const handleSelectDate = (date) => {
      bottomSheetModalRef.current?.close();
      setSelectedDate(date)
    }
    const styleCard = cardStyle()

    return (
        <CustomBottomSheet bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints} onChange={handleSheetChanges}>
            <CalendarCustom selectedDate={selectedDate} setSelectedDate={handleSelectDate}/>
        </CustomBottomSheet>
    );
  };
  
  export default SelectDateBottomScreen;