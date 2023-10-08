import {FlatList, StyleSheet, Image, View} from 'react-native';
import {StoriesProfil} from '../components/Profil/StoriesProfil'
import {Habitudes, Friends} from '../data/habitudes';


const NewsScreen = () => {

    const renderStoriesProfil = ({item}) => {
        return(
          <View style={{margin:15}}>
            <StoriesProfil profil={item}/>
            </View>
        )
      }

    return(
        <View style={[styles.storiesContainer]}>

              <FlatList
              data={Friends}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={renderStoriesProfil}/>

          </View>
    )
}

const styles = StyleSheet.create({  
    storiesContainer: {
      borderTopColor: "#69738c",
      borderTopWidth: 0,
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      marginHorizontal: -20,
    }, 
  });

export default NewsScreen