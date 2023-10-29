import {FlatList, StyleSheet, Image, View} from 'react-native';
import {StoriesProfil} from '../components/Profil/StoriesProfil'
import { UsualScreen } from '../components/View/Views';
import { HugeText } from '../styles/StyledText';


const NewsScreen = () => {

    const renderStoriesProfil = ({item}) => {
        return(
          <View style={{margin:15}}>
            <StoriesProfil profil={item}/>
            </View>
        )
      }

    return(
        <UsualScreen style={[styles.storiesContainer]}>
          <HugeText text="NewsScreen"/>
        </UsualScreen>
    )
}

const styles = StyleSheet.create({  
    storiesContainer: {
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      marginHorizontal: -20,
    }, 
  });

export default NewsScreen