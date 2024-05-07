import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types'
import React, { FC, useCallback, useContext, useRef, useState } from 'react'
import { SocialScreenStackType } from '../../navigation/SocialNavigator'
import { FlatList, StyleSheet, View } from 'react-native'
import { CustomTextInputRefType, SearchBarCustom } from '../../components/TextFields/TextInput'
import { HugeText } from '../../styles/StyledText'
import { IconButton, IconProvider, NavigationActions, NavigationButton } from '../../components/Buttons/IconButtons'
import ProfilItem from '../../components/Profil/ProfilItem'
import { AppContext } from '../../data/AppContext'
import { HabitsContext } from '../../data/HabitContext'
import { auth } from '../../firebase/InitialisationFirebase'
import { Database_getAllUsers, UserDataBase } from '../../firebase/Database_User_Primitives'
import { UsualScreen } from '../../components/View/Views'
import AnimatedScrollComponent from '../../components/ScrollView/AnimatedScrollComponent'
import { useThemeColor } from '../../components/Themed'

type SearchUserScreenProps = NativeStackScreenProps<SocialScreenStackType, "SearchUserScreen">

const SearchUserScreen: FC<SearchUserScreenProps> = ({navigation}) => {
    const {addHabit, addObjectif} = useContext(HabitsContext);
    const {theme} = useContext(AppContext)

    const primary = useThemeColor(theme, "Primary")

    const [users, setUsers] = useState<UserDataBase[]>([])
    const [searchValue, setSearchValue] = useState("")

    const searchValueRef = useRef<CustomTextInputRefType>(null)

    const RenderUser = ({item}) => {
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
        <View style={{backgroundColor: primary, flex: 1, paddingTop: 10, paddingHorizontal: 20}}>
        
            <View style={[styles.header, {zIndex: 10, backgroundColor: primary}]}>  
                
                <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>    
                    <NavigationButton noPadding action={NavigationActions.goBack}/>
                    <IconButton noPadding name={"tool"} provider={IconProvider.Feather} onPress={() => navigation.navigate("UtilsScreen")}/>
                </View>
                
                <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>    
                    <HugeText text="Utilisateurs"/>
                </View>

            </View>



            <View style={[styles.container, {backgroundColor: primary}]}>
                <AnimatedScrollComponent 
                    style={{paddingTop: 100}}
                    contentContainerStyle={{paddingHorizontal: 0, paddingBottom: 260, gap: 20}}
                    showsVerticalScrollIndicator={false}
                    
                    data={users}                
                    renderItem={({item}) => <RenderUser item={item}/>}

                    searchBarMethod={updateUserList}
                    searchBarPlaceholder='Rechercher un utilisateur...'

                    navigation={navigation}
                />
            </View>
          </View>
    )
}
    
const styles = StyleSheet.create({  
    container: {
        flex: 1,
        marginTop: 10
      },
    
      header: {
        display: "flex", 
        flexDirection: "column", 
        gap: 20,
        marginTop: 40,
        marginBottom: 5
      },
});
export default SearchUserScreen