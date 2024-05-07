import React from "react"
import {FlatList, StyleSheet, View} from 'react-native';
import { UsualScreen } from '../../components/View/Views';
import { HugeText } from '../../styles/StyledText';
import { FC, useEffect, useRef, useState } from 'react';
import { CustomTextInputRefType, SearchBarCustom } from '../../components/TextFields/TextInput'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IconButton, IconProvider, NavigationActions, NavigationButton } from '../../components/Buttons/IconButtons';
import { TextButton } from '../../components/Buttons/UsualButton';
import { Database_getUsersInfo, UserDataBase } from '../../firebase/Database_User_Primitives';
import { HomeStackParamsList } from '../../navigation/HomeNavigator';
import ProfilItem from '../../components/Profil/ProfilItem';
import SortBottomScreen from "../BottomScreens/SortBottomScreen";
import { BottomScreenOpen_Impact } from "../../constants/Impacts";
import { sortString } from "../../primitives/BasicsMethods";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

type AnyUserProfilFriendsScreenProps = NativeStackScreenProps<HomeStackParamsList, "AnyUserProfilFriendsScreen">

const AnyUserProfilFriendsScreen: FC<AnyUserProfilFriendsScreenProps> = ({route, navigation}) => {
    const {userIDs} = route.params

    const [users, setUsers] = useState<(UserDataBase | null)[]>([])
    const [usersToDisplay, setUsersToDisplay] = useState<(UserDataBase | null)[]>([])
    const [searchValue, setSearchValue] = useState<string>("")

    const searchValueRef = useRef<CustomTextInputRefType>(null)

    const renderUser = ({item}) => {
      const handlePressOnProfil = () => {
        navigation.push("AnyUserProfilScreen", {detailledUser: item})
      }

      return <ProfilItem user={item} onPress={handlePressOnProfil}/>
    }

    useEffect(() => {
      const getUsers = async(userIDs: string[]) => {
        const usersData = await Database_getUsersInfo(userIDs)
        setUsers(usersData)
        setUsersToDisplay(usersData)
      }

      getUsers(userIDs)
    }, [])

    const updateList = (text: string) => {
      setSearchValue(text)
      const getAllUsers = async() => {

        const filteredUsers = users.filter((user) => {
            return user?.displayName.startsWith(text)
        })

        setUsersToDisplay(filteredUsers)        
      }

      getAllUsers()
    }

    const sortTypeBottomSheetRef = useRef<BottomSheetModal>(null)

    const handleOpenSortType = () => {
      sortTypeBottomSheetRef.current?.present()
    }
  
    const closeSortModal = () => {
      sortTypeBottomSheetRef.current?.close()
    }
  
    const sortByName = () => {
      setUsersToDisplay((prevUsers) => 
          [...prevUsers].sort((a, b) => sortString(a?.displayName ?? "", b?.displayName ?? "", true))
      );
    
      BottomScreenOpen_Impact();
      closeSortModal();
    };
    
    const sortByNameDesc = () => {
      setUsersToDisplay((prevUsers) => 
        [...prevUsers].sort((a, b) => sortString(a?.displayName ?? "", b?.displayName ?? "", false))
      );
    
      BottomScreenOpen_Impact();
      closeSortModal();
    };
  
    const noSort = () => {
      const filteredUsers = users.filter((user) => {
        return user?.displayName.startsWith(searchValue)
      })

      setUsersToDisplay(filteredUsers)

      BottomScreenOpen_Impact()
      closeSortModal()
    }

    // usersToDisplay.map((user) => {
    //   if(user.blocked) {
    //     console.log(user.blocked)
    //   }
    // })

    return(
        <UsualScreen>
          <View style={styles.container}>
          <View style={styles.header}>  
              <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>    
                <NavigationButton noPadding action={NavigationActions.goBack}/>
                <IconButton noPadding name='sort' provider={IconProvider.MaterialCommunityIcons} onPress={handleOpenSortType}/>
              </View>

              <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>    
                <HugeText text="Amis"/>
              </View>
            </View>
            <View style={styles.body}>
                <SearchBarCustom ref={searchValueRef} placeholder={"Rechercher un utilisateur..."} onChangeText={updateList}/>

                <View style={{display: "flex", flexDirection: "column", flex: 1, gap: 20, marginTop: 20}}>
                  <FlatList data={usersToDisplay} style={{flex: 1}} renderItem={renderUser} contentContainerStyle={{gap: 20}}/>
                </View>
            </View>
          </View>

          <SortBottomScreen
              bottomSheetModalRef={sortTypeBottomSheetRef}
              sortByName={sortByName}
              sortByNameDesc={sortByNameDesc}
              noSort={noSort}
          />
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

  export default AnyUserProfilFriendsScreen