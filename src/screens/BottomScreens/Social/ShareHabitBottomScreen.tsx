import React, { FC, RefObject, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { CustomStaticBottomSheet } from '../../../components/BottomSheets/CustomBottomSheet'
import { Share, StyleSheet, View } from 'react-native'
import { Habit } from '../../../types/HabitTypes'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { BottomScreenOpen_Impact } from '../../../constants/Impacts'
import { auth } from '../../../firebase/InitialisationFirebase'
import { CustomTextInputRefType, SearchBarCustom } from '../../../components/TextFields/TextInput'
import { Database_getAllUsers, UserDataBase } from '../../../firebase/Database_User_Primitives'
import { UserContext } from '../../../data/UserContext'
import ProfilItem from '../../../components/Profil/ProfilItem'
import { FlatList } from 'react-native'

interface ShareHabitBottomScreenProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    habit: Habit,
}

const ShareHabitBottomScreen: FC<ShareHabitBottomScreenProps> = ({bottomSheetModalRef, habit}) => {
    const {user} = useContext(UserContext)

    const handleShare = async() => {
        BottomScreenOpen_Impact()

        try{
            if(user) {
                const result = await Share.share({
                    message: habit.titre + " : " + habit.description,
                    url: `exp://172.20.10.2:8081/--/SharedHabitScreen?habitID='50'&userID=${user.uid}`,
                })
                
                if(result.action === Share.sharedAction){
                    //shared
                }

                else if(result.action === Share.dismissedAction){
                    //Pas shared
                }
            }
        }

        catch(e){
            console.log("Shared Error : ", e)
        }
    }

    const [searchValue, setSearchValue] = useState<string>("")
    const searchValueRef = useRef<CustomTextInputRefType>(null)
    const [users, setUsers] = useState<UserDataBase[]>([])

    const updateUserList = useCallback((text: string) => {
        setSearchValue(text)
        const getAllUsers = async() => {
          const res = await Database_getAllUsers(text, user?.friends)
          setUsers(res)     
        }
  
        getAllUsers()
      }, []);

    const renderUser = ({item}) => {
        return <ProfilItem isPrimary user={item} onPress={() => {}}/>
    }
    
    const snapPoints = ["50%"]

    return (
        <CustomStaticBottomSheet bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints}>
            <View style={styles.container}>
                <View>
                    <SearchBarCustom 
                        ref={searchValueRef} 
                        placeholder={"Rechercher un ami..."} 
                        onChangeText={updateUserList}
                        isPrimary keyboardAvoidingView
                    />
                </View>
                <View style={{flex: 1}}>
                    <FlatList 
                        data={users} 
                        style={{flex: 1}} 
                        renderItem={renderUser} 
                        contentContainerStyle={{gap: 20}}
                    />
                </View>
            </View>
        </CustomStaticBottomSheet>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "space-between",
        gap: 20, 
        flex: 1
    },

    displayRow: {
        display: "flex",
        flexDirection: "row",
        gap: 30,
        marginVertical: 20
    },

    pageTitleContainer: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        gap: 20,
        marginLeft: 5,
      },
})


export default ShareHabitBottomScreen