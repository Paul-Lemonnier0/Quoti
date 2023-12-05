import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { useRef, useMemo, useCallback } from "react";
import { useThemeColor } from "../Themed";
import { LittleNormalText, NormalText, SubText, SubTitleText, TitleText } from "../../styles/StyledText";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export const AchievementBox = ({ achievement, onPress, whiteText, TitleHide }) => {
  
  const secondary = useThemeColor({}, "Secondary");

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.achievementContainer, { backgroundColor: secondary }]}>
        <Image style={styles.imageStyle} source={achievement.image}/>
      </View>

      {!TitleHide && 
      <View style={{display: "flex", flexDirection: "row"}}>
        {whiteText ? <LittleNormalText text={achievement.nom} style={styles.titleText} /> : 
                     <SubText text={achievement.nom} style={styles.titleText} />}
      </View>} 

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  achievementContainer: {
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    alignSelf: "center",
    justifyContent: "center",
    resizeMode: "contain",
    aspectRatio: 1,
    width: 40,
    height: 40,
    borderRadius: 15,
  },
  titleText: {
    marginTop: 10,
    textAlign: "center",

  },
});

export default AchievementBox;