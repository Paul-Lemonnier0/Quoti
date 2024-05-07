import React, { useContext } from "react"
import {FlatList, Image, StyleSheet, View} from 'react-native';
import { UsualScreen } from '../../../components/View/Views';
import { HugeText, NormalGrayText, TitleText } from '../../../styles/StyledText';
import { FC, useEffect, useRef, useState } from 'react';
import { CustomTextInputRefType, SearchBarCustom } from '../../../components/TextFields/TextInput'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BorderIconButton, IconButton, IconProvider, NavigationActions, NavigationButton } from '../../../components/Buttons/IconButtons';
import { Database_getUsersInfo, UserDataBase } from '../../../firebase/Database_User_Primitives';
import { HomeStackParamsList } from '../../../navigation/HomeNavigator';
import ProfilItem from '../../../components/Profil/ProfilItem';
import SortBottomScreen from "../../BottomScreens/SortBottomScreen";
import { BottomScreenOpen_Impact } from "../../../constants/Impacts";
import { sortString } from "../../../primitives/BasicsMethods";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { UserContext } from "../../../data/UserContext";
import IllustrationsList, { IllustrationsType } from "../../../data/IllustrationsList";
import AnimatedScrollComponent from "../../../components/ScrollView/AnimatedScrollComponent";
import { AppContext } from "../../../data/AppContext";
import { useThemeColor } from "../../../components/Themed";

type BlockedAccountsScreenProps = NativeStackScreenProps<HomeStackParamsList, "BlockedAccountsScreen">

const BlockedAccountsScreen: FC<BlockedAccountsScreenProps> = ({route, navigation}) => {

    const {user} = useContext(UserContext)
    const {theme, setIsLoading} = useContext(AppContext)
    const primary = useThemeColor(theme, "Primary")

    const [users, setUsers] = useState<(UserDataBase | null)[]>([])
    const [usersToDisplay, setUsersToDisplay] = useState<(UserDataBase | null)[]>([])
    const [searchValue, setSearchValue] = useState<string>("")

    const searchValueRef = useRef<CustomTextInputRefType>(null)

    const RenderUser = ({item}) => {
      const handlePressOnProfil = () => {
        navigation.navigate("AnyUserProfilScreen", {detailledUser: item})
      }

      return <ProfilItem user={item} onPress={handlePressOnProfil}/>
    }

    useEffect(() => {
      const getUsers = async(userIDs: string[]) => {
        setIsLoading(true)
        const usersData = await Database_getUsersInfo(userIDs)
        setUsers(usersData)
        setUsersToDisplay(usersData)
        setIsLoading(false)
      }

      getUsers(user?.blocked ?? [])
    }, [user])

    const updateList = (text: string) => {
      setSearchValue(text)
      const filteredUsers = users.filter((user) => {
        return user?.displayName.startsWith(text)
    })

      setUsersToDisplay(filteredUsers)   
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

    return(
        <UsualScreen hideMenu>
          <View style={styles.container}>
          <View style={[styles.header, {zIndex: 10, backgroundColor: primary, paddingBottom: 10}]}>  
              <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>    
                <NavigationButton noPadding action={NavigationActions.goBack}/>
                {
                  users.length > 0 &&
                  <BorderIconButton isTransparent isBorderGray name='sort' provider={IconProvider.MaterialCommunityIcons} onPress={handleOpenSortType}/>
                }
              </View>

              <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>    
                <HugeText text="Comptes bloqués"/>
              </View>
            </View>
           {
              user?.blocked && user.blocked.length > 0 ?
              <View style={styles.body}>
                  <AnimatedScrollComponent 
                    style={{paddingTop: 130,}}
                    contentContainerStyle={{paddingHorizontal: 0, paddingBottom: 260, gap: 20}}
                    showsVerticalScrollIndicator={false}
                    
                    data={usersToDisplay}                
                    renderItem={RenderUser}

                    searchBarMethod={updateList}
                    searchBarPlaceholder='Rechercher un utilisateur...'
                  />
              </View> :

              <View style={{flex: 1, flexGrow: 1}}>
                <View style={[styles.emptySreenContainer, {justifyContent: "space-evenly"}]}>

                    <Image style={styles.emptyScreenImageContainer} source={IllustrationsList[IllustrationsType.Education]}/>

                    <View style={styles.emptyScreenSubContainer}>
                        <TitleText text="Aucun compte bloqué"/>
                        <NormalGrayText bold text={"On espère que ça va durer !"}/>
                    </View>
                </View>
              </View>
            }
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
      gap: 30,
  },

  emptySreenContainer: {
    flex: 1, 
    flexGrow: 1, 
    alignItems: "center", 
    justifyContent: "center",
    gap: 20, 
  },
  
  emptyScreenImageContainer: {
      resizeMode: 'contain', 
      width: "90%", 
      maxHeight: "60%",
  },

  emptyScreenSubContainer: {
      justifyContent: "space-evenly", 
      alignItems: "center",
      gap: 5
  },
 });

  export default BlockedAccountsScreen