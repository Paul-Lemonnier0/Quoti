import React, { FC, RefObject, useContext, useEffect, useRef, useState } from 'react'
import { CustomStaticBottomSheet } from '../../../components/BottomSheets/CustomBottomSheet'
import { DimensionValue, Share, StyleSheet, View } from 'react-native'
import { Habit } from '../../../types/HabitTypes'
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { BottomScreenOpen_Impact, Success_Impact } from '../../../constants/Impacts'
import { CustomTextInputRefType, SearchBarCustom } from '../../../components/TextFields/TextInput'
import { Database_getAllUsers, Database_getUsersInfo, UserDataBase } from '../../../firebase/Database_User_Primitives'
import { UserContext } from '../../../data/UserContext'
import ProfilItem from '../../../components/Profil/ProfilItem'
import { FlatList } from 'react-native'
import { BackgroundIconButton, BorderIconButton, CloseButton, IconProvider } from '../../../components/Buttons/IconButtons'
import { LittleNormalText, NormalText, TitleText } from '../../../styles/StyledText'
import { UsualScreen } from '../../../components/View/Views'
import Separator from '../../../components/Other/Separator'
import { BackgroundTextButton } from '../../../components/Buttons/UsualButton'
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';
import ProfilButton from '../../../components/Profil/ProfilButton'
import { ScrollView } from 'react-native-gesture-handler'
import { AppContext } from '../../../data/AppContext'
import { useThemeColor } from '../../../components/Themed'
import { sendHabitInvitation } from '../../../firebase/Firestore_User_Primitives'

interface ShareHabitBottomScreenProps {
    bottomSheetModalRef: RefObject<BottomSheetModal>,
    habit: Habit,
}

const ShareHabitBottomScreen: FC<ShareHabitBottomScreenProps> = ({bottomSheetModalRef, habit}) => {
    const {user} = useContext(UserContext)
    const {theme, setIsLoading} = useContext(AppContext)
    const fontGray = useThemeColor(theme, "FontGray")

    const link = user ? `exp://172.20.10.2:8081/--/SharedHabitScreen?habitID='50'&userID=${user.uid}` : ""

    const handleShare = async() => {
        BottomScreenOpen_Impact()

        try{
            if(user) {
                const result = await Share.share({
                    message: habit.titre + " : " + habit.description,
                    url: link,
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

    const handleCopyLink = () => {
        Success_Impact()
        Toast.show({
            type: "info",
            text1: "Lien copié !",
            position: "top",
            visibilityTime: 3000,
            swipeable: true
        })
        Clipboard.setStringAsync(link)
    }

    
    const handleShareToFriend = async () => {
        if (user && user.email !== null) {
            setIsLoading(true);
            try {
                for (const receiver of selectedUserEmails) {
                    await sendHabitInvitation(user.uid, user.email ?? "", receiver, habit.habitID);
                }
                Success_Impact();
            } catch (error) {
                console.error("Error while sending habit invitations:", error);
            } finally {
                setIsLoading(false);
            }
        }

        closeModal()
    };
    

    const [selectedUserEmails, setSelectedUserEmails] = useState<string[]>([])

    const [searchValue, setSearchValue] = useState<string>("")
    const searchValueRef = useRef<CustomTextInputRefType>(null)
    const [users, setUsers] = useState<UserDataBase[]>([])

    const [filteredUsers, setFilteredUsers] = useState<UserDataBase[]>([])

    useEffect(() => {
        const retrieveFriends = async() => {
            if(user && user.friends) {
                console.log("ok")
                const resultat = await Database_getUsersInfo(user?.friends)
                const res = resultat.filter(r => r !== null && r !== undefined)

                setUsers(res)
                setFilteredUsers(res)
            }
        }

        retrieveFriends()
    }, [])

    useEffect(() => {
        if(searchValue === "") {
            setFilteredUsers(users)
        }

        else {
            setFilteredUsers( 
                users.filter(user => (
                    user.displayName.startsWith(searchValue) ||
                    user.firstName.startsWith(searchValue) ||
                    user.lastName.startsWith(searchValue)
                ))
            )
        }
    }, [searchValue])

    const updateUserList = (text: string) => {
        setSearchValue(text)
    };

    const renderUser = ({item}) => {

        if(!item) return null

        const onPress = () => {
            setSelectedUserEmails((prevSelectedUserEmails) => {
                if(prevSelectedUserEmails.includes(item.email)) {
                    return prevSelectedUserEmails.filter(email => email !== item.email);
                }

                return [...prevSelectedUserEmails, item.email]
            })
        }

        return (
            <View style={{flex: 1/3, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 10}}>
                <ProfilButton 
                    isSelected={selectedUserEmails.includes(item.email)} 
                    tall
                    noBadge 
                    isPrimary
                    
                    user={item} 
                    onPress={onPress}
                />

                <View style={{width: "100%", flexDirection: 'column', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <NormalText bold numberOfLines={1} text={item.displayName}/>
                    <LittleNormalText style={{color: fontGray, flex: 1}} numberOfLines={1} text={item.firstName + " " + item.lastName}/>
                </View>
            </View>
        )
    }
    
    const snapPoints = ["80%"]

    const closeModal = () => {
        bottomSheetModalRef.current?.close()
    }


    return (
        <CustomStaticBottomSheet bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints}>
            <UsualScreen secondaryBackground hideMenu>
                <View style={styles.container}>
                    <View style={styles.pageTitleContainer}>
                        <View style={{flex: 1}}>
                            <TitleText text="Partager l'habitude"/>
                        </View>
                        <CloseButton noPadding methode={closeModal}/>
                    </View>
                    
                    <View>
                        <SearchBarCustom 
                            ref={searchValueRef} 
                            placeholder={"Rechercher un ami..."} 
                            onChangeText={updateUserList}
                            isPrimary 
                        />
                    </View>

                    <View style={{marginHorizontal: -30}}>
                        <Separator opacity={0.5}/>
                    </View>

                    <ScrollView style={{flex: 1, marginTop: -30}} showsVerticalScrollIndicator={false}>
                        <FlatList 
                            numColumns={3}
                            key={1}
                            data={filteredUsers} 
                            
                            style={{flex: 1}} 
                            renderItem={renderUser} 
                            scrollEnabled={false}
                            contentContainerStyle={{gap: 40, marginHorizontal: -40, paddingHorizontal: 35, marginVertical: 30}}
                        />              
                    </ScrollView>

                    <View style={{gap: 10, marginTop: -30, paddingTop: 0, marginHorizontal: -30, height: 80}}>
                        <Separator opacity={0.5}/>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                        {
                            selectedUserEmails.length === 0 ?
                            <View style={{flexDirection: "row", gap: 20, justifyContent: 'center', alignItems: "center", padding: 5}}>
                                <BorderIconButton isRound name="link" provider={IconProvider.Feather} onPress={handleCopyLink}/>
                                <BorderIconButton isRound name="share" provider={IconProvider.Feather} onPress={handleShare}/>
                            </View>

                            :
                            <View style={{padding: 5, marginHorizontal: 20}}>
                                <BackgroundTextButton text="Envoyer" bold onPress={handleShareToFriend}/>
                            </View>
                        }
                        </View>
                    </View>
                </View>
          </UsualScreen>
        </CustomStaticBottomSheet>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        gap: 30, 
        marginBottom: 30, 
        flexDirection: "column", 
        justifyContent: "space-between",
        marginHorizontal: -20,
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
  
      footer: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
      },
})


export default ShareHabitBottomScreen