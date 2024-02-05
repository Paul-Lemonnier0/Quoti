import {FlatList, StyleSheet, Image, View} from 'react-native';
import {StoriesProfil} from '../components/Profil/StoriesProfil'
import { UsualScreen } from '../components/View/Views';
import { HugeText, NormalText } from '../styles/StyledText';
import { BorderTextButton } from '../components/Buttons/UsualButton';
import * as ImagePicker from 'expo-image-picker';
import { useContext, useRef, useState } from 'react';
import { Database_getAllUsers } from '../firebase/Database_User_Primitives';
import { useEffect } from 'react';
import ProfilItem from '../components/Profil/ProfilItem';
import { SearchBarCustom } from '../components/TextFields/TextInput'
import { AppContext } from '../data/AppContext';
import { IconButton } from '../components/Buttons/IconButtons';


export default NewsScreen = () => {

    const temp = 20

    const [users, setUsers] = useState([])
    const [searchValue, setSearchValue] = useState("")

    const searchValueRef = useRef(null)

    const {setIsLoading} = useContext(AppContext)

    // useEffect(() => {
    //   const getAllUsers = async() => {
    //     setUsers(await Database_getAllUsers())        
    //   }

    //   getAllUsers()
    // }, [temp])

    const renderUser = ({item}) => {
      return <ProfilItem user={item}/>
    }

    const updateList = (text) => {
      setSearchValue(text)
      const getAllUsers = async() => {
        setUsers(await Database_getAllUsers(text))        
      }

      getAllUsers()
    }

    const handleSetIsLoading = () => {
      setIsLoading(true)
    
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }


    return(
        <UsualScreen style={[styles.storiesContainer]}>
          <View style={styles.container}>
              <View style={styles.header}>
                <HugeText text="Utilisateurs"/>
                <IconButton name={"loader"} provider={"Feather"} onPress={handleSetIsLoading}/>
              </View>

            <View style={styles.body}>
                <SearchBarCustom ref={searchValueRef} placeholder={"Rechercher un utilisateur..."} onChangeText={updateList}/>

                <View style={{display: "flex", flexDirection: "column", flex: 1, gap: 20, marginTop: 20}}>
                  <FlatList data={users} style={{flex: 1}} renderItem={renderUser} contentContainerStyle={{gap: 20}}/>
                </View>
            </View>
          </View>
        </UsualScreen>
    )
}

const styles = StyleSheet.create({  
    container: {
      display: "flex", 
      flexDirection: "column", 
      gap: 20, 
      flex: 1, 
      marginBottom: 0    
    },

    header: {
      display: "flex", 
      flexDirection: "column", 
      gap: 20
    },

    subHeader: {
      display: "flex", 
      flexDirection: "row", 
      alignItems:"center", 
      justifyContent: "space-between"
    },

    body: {
        flex: 1, 
        gap: 30,
    },
  });