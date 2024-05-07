import React, { FC, useCallback, useRef, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { UsualScreen } from '../components/View/Views'
import { FlatList, StyleSheet, View } from 'react-native'
import { IconButton, IconProvider, NavigationActions, NavigationButton } from '../components/Buttons/IconButtons'
import { HugeText } from '../styles/StyledText'
import { CustomTextInputRefType, SearchBarCustom } from '../components/TextFields/TextInput'
import { UserDataBase } from '../firebase/Database_User_Primitives'
import { HomeStackParamsList } from '../navigation/HomeNavigator'
import ProfilItem from '../components/Profil/ProfilItem'
import Quoti from '../components/Other/Quoti'

type MembersScreenProps = NativeStackScreenProps<HomeStackParamsList, "MembersScreen">

const MembersScreen = ({navigation, route}: MembersScreenProps) => {
    
    const {users} = route.params
    const [filteredUsers, setFilteredUsers] = useState<UserDataBase[]>(users)
    const [searchValue, setSearchValue] = useState("")

    const searchValueRef = useRef<CustomTextInputRefType>(null)

    const renderUser = ({item}) => {
        return <ProfilItem user={item} onPress={() => navigation.navigate("AnyUserProfilScreen", {detailledUser: item})}/>
    }

    const updateUserList = useCallback((text: string) => {
        setSearchValue(text)
        if(text === "") {
            setFilteredUsers(users)
        }
        else {
            setFilteredUsers(users.filter(user => (
                user.displayName.startsWith(text) ||
                user.firstName.startsWith(text) ||
                user.lastName.startsWith(text)
            )))
        }
    }, []);
        
    return (
        <UsualScreen hideMenu>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <NavigationButton noPadding action={NavigationActions.goBack}/>
                        <Quoti/>
                        <IconButton noPadding onPress={() => {}} name='settings' provider={IconProvider.Feather}/>
                    </View>

                    <HugeText text="Membres"/>
                </View>

                <View style={styles.body}>
                    <SearchBarCustom ref={searchValueRef} placeholder={"Rechercher un utilisateur..."} onChangeText={updateUserList}/>

                    <View style={{display: "flex", flexDirection: "column", flex: 1, gap: 20, marginTop: 20}}>
                        <FlatList 
                            data={filteredUsers} 
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

export default MembersScreen