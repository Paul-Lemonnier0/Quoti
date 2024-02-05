import { View, StyleSheet } from "react-native"

import { HugeText } from "../styles/StyledText"
import { useRef, useMemo, useCallback, useState } from "react"
import { useThemeColor } from "../components/Themed"

import Achievements from "../data/Achievements"
import { AchievementBox } from "../components/Achievements/AchievementBox"

import { useNavigation } from "@react-navigation/native"
import { UsualScreen } from "../components/View/Views"
 
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

    return(
      <UsualScreen>
        <HugeText text="ProfilDetailsScreen"/>
      </UsualScreen>
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