import { View, StyleSheet } from "react-native"
import { HugeText } from "../../styles/StyledText"
import { useRef, useMemo, useCallback, useState } from "react"
import { useThemeColor } from "../../components/Themed"
import { useNavigation } from "@react-navigation/native"
import { UsualScreen } from "../../components/View/Views"
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