import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { View, StyleSheet, FlatList, Image } from "react-native"

import { IconButton } from "../components/Buttons/IconButton"
import { TitleText, NormalText, SubTitleText, SubText } from "../styles/StyledText"
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
import { SimpleButton } from "../components/Buttons/UsualButton"
 
const ProfilDetailsScreen = () => {

    const firstThreeAchievements = [Achievements[0], Achievements[1], Achievements[2]]

    const [clickedAchievement, setClickedAchievement] = useState({})

    const fontGray = useThemeColor({}, "FontGray")
    const primary = useThemeColor({}, "Primary")
    const secondary = useThemeColor({}, "Secondary")

    const navigation = useNavigation()

    const handleBack = () => {
      navigation.goBack()
    }

    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['50%'], []);

    const handleOpenDetailAchievement = useCallback(() => {
        bottomSheetModalRef.current?.present();
      }, []);

    const handleSheetChanges = useCallback((index) => {
        console.log("handleSheetChange", index)
    }, []);

    const handleOpenAchievements = () => {
        navigation.navigate("MultipleAchievementScreen")
      }

      const renderContributors = ({item}) => {
        return(
          <View style={{width: "33%"}}>
            
            <AchievementBox titre={item.nom} description={item.description} image={item.image} isAchieved={item.isAchieved} 
            onPress={() => 
            {
              setClickedAchievement(
                {
                  titre: item.nom,
                  description: item.description,
                  image: item.image,
                  isAchieved: item.isAchieved
                });
                
                handleOpenDetailAchievement(item);
            }}/>        
          </View>
        )
      }


  
    // renders
    return(
      <BottomSheetModalProvider>
        <SafeAreaView style={{ flex: 1}}>
            <View style={{backgroundColor: primary, display:"flex", flexDirection:"column", flex:1, padding: 15}}>
                <View style={{display: "flex", flexDirection: "row", alignItems:"center"}}>

                    <SimpleIconButton onClick={() => handleBack()}>
                      <Feather name="chevron-left" size={20} color={fontGray} />                
                    </SimpleIconButton>

                          {/*<SimpleIconButton onClick={() => handleOpenShareBottomSheet()}>
                              <Feather name="settings" size={20} color={fontGray} />                    
                            </SimpleIconButton>*/}

                </View>

                <View style={{ gap: 20, flex:1, alignItems: "center"}}>

                    <View style={{
                          borderRadius: 100,width: 125, height: 125}}>

                          <Image style={
                          [
                            styles.imageStyle,
                            {
                              backgroundColor: secondary
                            }]} 

                            source={require("../img/ProfilPicture/Memoji-07.png")}>

                          </Image>    
                        </View>
                        <View style={{alignItems: "center"}}>
                          <TitleText text="Paul Lemonnier"/>
                          <SubText text="Angers, France"/>
                        </View>

                        <View style={{display: "flex", flexDirection: "row", gap: 20, marginTop: 10}}>
                          <View style={{alignItems:"center"}}>
                            <SubTitleText text="20"/>
                            <SubText text="Abonnés"/>
                          </View>

                          <View style={{alignItems:"center"}}>
                            <SubTitleText text="14"/>
                            <SubText text="Amis"/>
                          </View>

                          <View style={{alignItems:"center"}}>
                            <SubTitleText text="9"/>
                            <SubText text="Habitudes"/>
                          </View>
                        </View>

                  <View style={
                  [
                    styles.contentContainer,
                  ]}>
                    <View style={{ gap: 20, flex:1 }}>

                      <View style={{justifyContent: "space-between", alignItems: "center", paddingHorizontal:20, display: "flex", flexDirection: "row"}}>

                        <TitleText text="Succès"/>
                        <SimpleButton onClick={handleOpenAchievements}>
                          <SubText text="Tout voir"/>
                        </SimpleButton>

                      </View>

                      <FlatList 
                          renderItem={renderContributors}
                          style={styles.HabitsList} key={2}
                          data={firstThreeAchievements} numColumns={3} 
                          keyExtractor={item => item.description}
                        />
                    </View>
                  </View>
                </View>

                <AchievementsScreen
                    bottomSheetModalRef={bottomSheetModalRef} 
                    snapPoints={snapPoints} 
                    handleSheetChanges={handleSheetChanges}
                    achievement={clickedAchievement}
                    />

            </View>
        </SafeAreaView>
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
      },

    HabitsList:{
      flex:1,
      flexGrow: 1,
      display: "flex",
      width: "100%",
    },
});
  
  export default ProfilDetailsScreen;