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

const AchievementsScreen = ({bottomSheetModalRef, snapPoints, handleSheetChanges, achievement}) => {
    
    const image = achievement.image
    const titre = achievement.titre
    const description = achievement.description
    const isAchieved = achievement.isAchieved
  
    return (
        <CustomBottomSheet bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints} onChange={handleSheetChanges}>

                <AchievementBox titre={titre} description={description} image={image} isAchieved={isAchieved} whiteText={true}/>
                <SubText text={description} style={{textAlign: "center"}} />
                
      </CustomBottomSheet>
    );
  };
  
  export default AchievementsScreen;