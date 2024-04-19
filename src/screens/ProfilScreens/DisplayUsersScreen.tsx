import {FlatList, StyleSheet, View} from 'react-native';
import { UsualScreen } from '../../components/View/Views';
import { HugeText } from '../../styles/StyledText';
import { FC, useEffect, useRef, useState } from 'react';
import ProfilItem from '../../components/Profil/ProfilItem';
import { CustomTextInputRefType, SearchBarCustom } from '../../components/TextFields/TextInput'
import { HomeStackParamsList } from '../../navigation/BottomTabNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from "react"
import { NavigationActions, NavigationButton } from '../../components/Buttons/IconButtons';
import { TextButton } from '../../components/Buttons/UsualButton';
import { Database_getUsersInfo, UserDataBase } from '../../firebase/Database_User_Primitives';

type DisplayUsersScreenProps = NativeStackScreenProps<HomeStackParamsList, "DisplayUsersScreen">

const DisplayUsersScreen: FC<DisplayUsersScreenProps> = ({route, navigation}) => {
    const {userIDs} = route.params

    const [usersToDisplay, setUsersToDisplay] = useState<(UserDataBase | null)[]>([])
    const [searchValue, setSearchValue] = useState<string>("")

    const searchValueRef = useRef<CustomTextInputRefType>(null)

    const renderUser = ({item}) => {
      return <ProfilItem user={item} onPress={() => {}}/>
    }

    useEffect(() => {
      const getUsers = async(userIDs: string[]) => {
        setUsersToDisplay(await Database_getUsersInfo(userIDs))
      }

      getUsers(userIDs)
    }, [])

    const updateList = (text: string) => {
      setSearchValue(text)
      const getAllUsers = async() => {

        const filteredUsers = usersToDisplay.filter((user) => {
            return user?.displayName.startsWith(text)
        })

        setUsersToDisplay(filteredUsers)        
      }

      getAllUsers()
    }

    return(
        <UsualScreen>
          <View style={styles.container}>
            <View style={styles.header}>  
              <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>    
                <NavigationButton noPadding action={NavigationActions.goBack}/>
              </View>
              <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>    
                <HugeText text="Amis"/>
                <TextButton noPadding text='Trier' onPress={() => {}} bold/>

              </View>

            </View>
            <View style={styles.body}>
                <SearchBarCustom ref={searchValueRef} placeholder={"Rechercher un utilisateur..."} onChangeText={updateList}/>

                <View style={{display: "flex", flexDirection: "column", flex: 1, gap: 20, marginTop: 20}}>
                  <FlatList data={usersToDisplay} style={{flex: 1}} renderItem={renderUser} contentContainerStyle={{gap: 20}}/>
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

  export default DisplayUsersScreen