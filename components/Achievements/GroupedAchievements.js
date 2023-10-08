import { View } from "react-native";
import AchievementBox from "./AchievementBox";
import { SubTitleText } from "../../styles/StyledText";
import { FlatList } from "react-native";
import { StyleSheet } from "react-native";

export default GroupedAchievements = ({achievementsList, className, setClickedAchievement, handleOpenAchievements}) => {
    
    const renderAchievements = ({item}) => {
        return(
          <View style={{width: "33%", padding: 10}}>
            
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
                
                handleOpenAchievements(item);
            }}/>        
          </View>
        )
      }
    
    return(
        <View style={{display: "flex", flexDirection: "column", flex:1, marginHorizontal: -20}}>

            <View style={{padding: 15}}>
                <SubTitleText text={className}/>
            </View>

            <FlatList 
                renderItem={renderAchievements}
                style={styles.achievementsList} key={2}
                data={achievementsList} numColumns={3} 
                keyExtractor={item => item.description}
                contentContainerStyle={{paddingHorizontal: -20, gap: 10}}
                scrollEnabled={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    achievementsList:{
      flex:1,
      flexGrow: 1,
      display: "flex"
    },
});