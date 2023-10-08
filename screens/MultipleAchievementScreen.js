import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { View, StyleSheet, FlatList, Image } from "react-native"

import { useRef, useMemo, useCallback, useState } from "react"
import { Feather } from "@expo/vector-icons"
import { useThemeColor } from "../components/Themed"
import { CircularBarProfil, AddCircularBarProfil } from "../components/Profil/CircularBarProfil"
import { ContributorsHabits } from "../data/habitudes"
import Achievements from "../data/Achievements"
import { AchievementBox } from "../components/Achievements/AchievementBox"
import { SafeAreaView } from "react-native"

import { SimpleIconButton } from "../components/Buttons/IconButton"
import AchievementsScreen from "./BottomScreens/AchievementsScreen"
import { useNavigation } from "@react-navigation/native"
import { CircleBorderButton, GoBackButton } from "../components/Buttons/UsualButton"
import { TitleText } from "../styles/StyledText"
import { BackgroundView, MainView, TopScreenView } from "../components/View/Views"
import GroupedAchievements from "../components/Achievements/GroupedAchievements"
import { ScrollView } from "react-native-gesture-handler"
 

const MultipleAchievementScreen = () => {

    const fontGray = useThemeColor({}, "FontGray")
    const primary = useThemeColor({}, "Primary")
    const secondary = useThemeColor({}, "Secondary")
    const font = useThemeColor({}, "Font")

    const [clickedAchievement, setClickedAchievement] = useState({})

    const navigation = useNavigation()

    const handleBack = () => {
      navigation.goBack()
    }

    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['50%'], []);

    const handleOpenAchievements = useCallback(() => {
        bottomSheetModalRef.current?.present();
      }, []);

    const handleSheetChanges = useCallback((index) => {
        console.log("handleSheetChange", index)
    }, []);

    const groupAchievementsByClass = (achievements) => {
      return achievements.reduce((result, achievement) => {
        const classKey = achievement.class || "Autre"; // Use "Autre" as default class if class is not provided
        if (!result[classKey]) {
          result[classKey] = [];
        }
        result[classKey].push(achievement);
        return result;
      }, {});
    };


    const groupedAchievements = groupAchievementsByClass(Achievements)
  
    // renders
    return(
      <BottomSheetModalProvider>
        <MainView>
          <TopScreenView>
              <View style={{display: "flex", flexDirection: "row", alignItems:"center", justifyContent: "space-between", marginBottom: 15, marginTop: -10}}>

                <GoBackButton/>

                <TitleText text="Succès"/>

                <CircleBorderButton onPress={() => {}}>
                    <Feather name="more-horizontal" size={20} color={font} />                                
                </CircleBorderButton>

              </View>
            
          </TopScreenView>

          <BackgroundView>
                <ScrollView style={{marginHorizontal: -15, padding: 15}}>
                  <View style={{ gap: 20, flex:1, display: "flex", flexDirection: "column" }}>

                    {

                      Object.entries(groupedAchievements).map(([className, achievements]) => {
                        
                        return(
                          <GroupedAchievements 
                            achievementsList={achievements} 
                            className={className} 
                            handleOpenAchievements={handleOpenAchievements} 
                            setClickedAchievement={setClickedAchievement}/>
                        )

                      })
                    }

                  </View>
                </ScrollView>

                <AchievementsScreen
                    bottomSheetModalRef={bottomSheetModalRef} 
                    snapPoints={snapPoints} 
                    handleSheetChanges={handleSheetChanges}
                    achievement={clickedAchievement}
                    />
            </BackgroundView>
          
        </MainView>
      </BottomSheetModalProvider>
    );
  };
  
  const styles = StyleSheet.create({
    imageStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
        aspectRatio: 1,
        width: 125,
        maxHeight: 125,
        borderRadius: 100,
      },

      contentContainer: {
        flex: 1,
        alignItems: 'center',
      },

    HabitsList:{
      flex:1,
      flexGrow: 1,
      display: "flex",
      width: "100%",
    },
});
  
  export default MultipleAchievementScreen;