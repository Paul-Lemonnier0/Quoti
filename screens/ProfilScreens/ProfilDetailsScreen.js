import { View, StyleSheet, FlatList, Image } from "react-native"

import { TitleText, NormalText, SubTitleText, SubText } from "../../styles/StyledText"
import { useRef, useMemo, useCallback, useState } from "react"
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { useThemeColor } from "../../components/Themed"
import { CircularBarProfil, AddCircularBarProfil } from "../../components/Profil/CircularBarProfil"
import { ContributorsHabits, Friends, Habitudes, colors } from "../../data/habitudes"
import Achievements from "../../data/Achievements"
import { SafeAreaView } from "react-native"

import AchievementsScreen from "../BottomScreens/AchievementsScreen"
import { useNavigation } from "@react-navigation/native"
import { CircleBorderButton, GoBackButton, SimpleButton, SimpleButtonBackground } from "../../components/Buttons/UsualButton"
import cardStyle from "../../styles/StyledCard"
import { TouchableOpacity } from "react-native-gesture-handler"
import { BackgroundView, MainView, TopScreenView } from "../../components/View/Views"
import { UserProfil } from "../../components/Profil/UserProfil"
import { ActivityBlock } from "../../components/Activity/ActivityBlock"
import AchievementBox from "../../components/Achievements/AchievementBox"
const ProfilDetailsScreen = () => {

    const [clickedAchievement, setClickedAchievement] = useState({})

    const fontGray = useThemeColor({}, "FontGray")
    const font = useThemeColor({}, "Font")
    const primary = useThemeColor({}, "Primary")
    const secondary = useThemeColor({}, "Secondary")

    const navigation = useNavigation()


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

    const handleNavigateToStat = () => {
      navigation.navigate("StatProfilScreen")
    }

    const renderAchievements = ({item}) => {
      return(
        <View style={{padding: 10}}>
          
          <AchievementBox TitleHide={true} titre={item.nom} description={item.description} image={item.image} isAchieved={item.isAchieved} 
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
        <MainView>

          <TopScreenView>
                <View style={{display: "flex", flexDirection: "row", alignItems:"center", justifyContent: "space-between", marginBottom: 15, marginTop: -10}}>

                    <GoBackButton/>

                    <TitleText text="Profil"/>

                    <CircleBorderButton onPress={() => {}}>
                        <Feather name="settings" size={20} color={font} />                                
                    </CircleBorderButton>

                </View>

                  <View style={{ gap: 20, marginBottom: 10}}>


                          <View style={{alignItems: "center", marginBottom: 0}}>
                            <UserProfil profil={Friends[0]}/>
                          </View>                               

                          <View style={{alignItems: "center", marginBottom: 0}}>
                            <SubTitleText text="Paul Lemonnier"/>
                            <SubText text="Angers, France"/>
                          </View>

                          <View style={{display: "flex", flexDirection: "row", justifyContent: "space-around", gap: 20, marginTop: 10, marginHorizontal: 20}}>
                              <TouchableOpacity style={{alignItems:"center"}}>
                                <SubTitleText text="20"/>
                                <SubText text="Abonnés"/>
                              </TouchableOpacity>

                              <TouchableOpacity style={{alignItems:"center"}}>
                                <SubTitleText text="14"/>
                                <SubText text="Amis"/>
                              </TouchableOpacity>

                              <TouchableOpacity style={{alignItems:"center"}}>
                                <SubTitleText text={Habitudes.length}/>
                                <SubText text="Habitudes"/>
                              </TouchableOpacity>
                              
                              <TouchableOpacity style={{alignItems:"center"}}>
                                <SubTitleText text="5"/>
                                <SubText text="Défis"/>
                              </TouchableOpacity>
                          </View>

                  </View>
              </TopScreenView>

              <View style={{flex: 1, gap: 30, marginTop: 0}}>

                    <View style={{flex: 1}}>
                        <ActivityBlock onPress={handleNavigateToStat}/>
                    </View>

                    <View style={{ gap: 20}}>

                      <View style={{justifyContent: "space-between", alignItems: "center", paddingHorizontal:0, display: "flex", flexDirection: "row"}}>

                          <SubTitleText text="Vos Succès"/>
                          <SimpleButton onClick={handleOpenAchievements}>
                            <SubText text="Tout voir"/>
                          </SimpleButton>

                      </View>

                      <FlatList 
                          renderItem={renderAchievements} 
                          style={styles.succesList} key={1} horizontal={true}
                          data={Achievements} showsHorizontalScrollIndicator={false}
                          keyExtractor={item => item.description}
                          contentContainerStyle={{gap: 10, paddingHorizontal: 20}}
                        />
                    </View>

                <AchievementsScreen
                    bottomSheetModalRef={bottomSheetModalRef} 
                    snapPoints={snapPoints} 
                    handleSheetChanges={handleSheetChanges}
                    achievement={clickedAchievement}
                    />
            </View>
        </MainView>
    );
  };
  
  const styles = StyleSheet.create({
    imageStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
        aspectRatio: 1,
        width: "100%",
        maxHeight: "100%",
        borderRadius: 100,
      },

      contentContainer: {
        flex: 1,
      },

      succesList:{
      marginHorizontal: -30
    },
});
  
  export default ProfilDetailsScreen;