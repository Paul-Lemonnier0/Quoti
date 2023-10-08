import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { useRef, useMemo, useCallback } from "react";
import { useThemeColor } from "../Themed";
import { LittleNormalText, NormalText, SubText, SubTitleText, TitleText } from "../../styles/StyledText";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export const AchievementBox = ({ titre, image, description, isAchieved, onPress, whiteText, TitleHide }) => {

  const isWhiteText = whiteText ? true : false
  const isTitleHide = TitleHide 

  const primary = useThemeColor({}, "Primary");
  const contrast = useThemeColor({}, "Contrast");
  const secondary = useThemeColor({}, "Secondary");

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["50%"], []);


  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      accessibilityLabel={"achievement : " + titre}
    >
      <View style={[styles.achievementContainer, { backgroundColor: secondary }]}>
        <Image
          style={[
            styles.imageStyle,
            {
              tintColor: isAchieved ? null : "gray",
            },
          ]}
          source={image}
        />
      </View>

      {!isTitleHide ? 
      <View style={{display: "flex", flexDirection: "row"}}>
        {isWhiteText ? <LittleNormalText text={titre} style={styles.titleText} /> : <SubText text={titre} style={styles.titleText} />}
      </View>
      
      :
      
      null}

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