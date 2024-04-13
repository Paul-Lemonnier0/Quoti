import { FlatList, StyleSheet, View } from 'react-native';
import { UsualScreen } from '../components/View/Views';
import { HugeText } from '../styles/StyledText';
import { FC, useCallback, useContext, useRef, useState } from 'react';
import { Database_getAllUsers, UserDataBase } from '../firebase/Database_User_Primitives';
import ProfilItem from '../components/Profil/ProfilItem';
import { CustomTextInputRefType, SearchBarCustom } from '../components/TextFields/TextInput'
import { AppContext } from '../data/AppContext';
import { IconButton, IconProvider } from '../components/Buttons/IconButtons';
import { User } from 'firebase/auth';
import React from "react"
import { HabitsContext } from '../data/HabitContext';
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { NewsScreenStackType } from '../navigation/BottomTabNavigator';
import { auth } from '../firebase/InitialisationFirebase';

type NewsScreenProps = NativeStackScreenProps<NewsScreenStackType, "NewsScreen">

const NewsScreen: FC<NewsScreenProps> = ({navigation}) => {

    const {addHabit, addObjectif} = useContext(HabitsContext);
    const {setIsLoading} = useContext(AppContext)

    const [users, setUsers] = useState<UserDataBase[]>([])
    const [searchValue, setSearchValue] = useState("")

    const searchValueRef = useRef<CustomTextInputRefType>(null)

    const renderUser = ({item}) => {
      return <ProfilItem user={item} onPress={() => navigation.navigate("AnyUserProfilScreen", {detailledUser: item})}/>
    }
    
    const updateUserList = useCallback((text: string) => {
        setSearchValue(text)
        const getAllUsers = async() => {
          const res = await Database_getAllUsers(text)
          setUsers(res.filter(user => user.uid !== auth.currentUser?.uid))     
        }
  
        getAllUsers()
      }, []);
    

    return(
        <UsualScreen>
          <View style={styles.container}>
          <View style={styles.header}>
              <View style={styles.subHeader}>
              <HugeText text="Utilisateurs"/>

                  <IconButton noPadding name={"tool"} provider={IconProvider.Feather} onPress={() => navigation.navigate("UtilsScreen")}/>
              </View>
            </View>


            <View style={styles.body}>
                <SearchBarCustom ref={searchValueRef} placeholder={"Rechercher un utilisateur..."} onChangeText={updateUserList}/>

                <View style={{display: "flex", flexDirection: "column", flex: 1, gap: 20, marginTop: 20}}>
                  <FlatList 
                    data={users} 
                    style={{flex: 1}} 
                    renderItem={renderUser} 
                    contentContainerStyle={{gap: 20}}
                    />
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
        display: 'flex',
        flexDirection: 'column'
    },
});

export default NewsScreen