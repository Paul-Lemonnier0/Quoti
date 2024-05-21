import React, { FC, useContext, useRef } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { MassiveText, NormalText, SubTitleText, TitleText } from '../../styles/StyledText'
import { AppContext } from '../../data/AppContext'
import { useThemeColor } from '../Themed'
import { BorderIconButton, Icon, IconButton, IconProvider, NavigationActions, NavigationButton } from '../Buttons/IconButtons'
import { CustomScrollView, UsualScreen } from '../View/Views'
import { UserContext, UserType } from '../../data/UserContext'
import { BackgroundTextButton } from '../Buttons/UsualButton'
import { VisitInfoUser } from '../../firebase/Firestore_User_Primitives'
import { auth } from '../../firebase/InitialisationFirebase'
import Separator from '../Other/Separator'
import CustomCard from '../Other/Card'
import ProfilButton from './ProfilButton'
import UserSettingsBottomScreen from '../../screens/BottomScreens/Social/UserSettings'
import { UserDataBase } from '../../firebase/Database_User_Primitives'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import StreakFlame from '../Other/Flames'

interface ProfilHeaderProps {
    user: UserType | VisitInfoUser,
    user_data: UserData[],
    handlePressOnProfil?: () => void,
    handleAddFriend: () => void,
    notCurrentUser?: boolean,
    hasSendedFriendRequest?: boolean,
    isFriend?: boolean,
}

const ProfilHeader: FC<ProfilHeaderProps> = ({
    user, 
    user_data, 
    notCurrentUser, 
    handlePressOnProfil, 
    hasSendedFriendRequest, 
    isFriend, 
    handleAddFriend
}) => {
    const {theme} = useContext(AppContext)
    const {hasNotification} = useContext(UserContext)

    const fontGray = useThemeColor(theme, "FontGray")
    const secondary = useThemeColor(theme, "Secondary")
    const font = useThemeColor(theme, "Font")

    const hasNotifications = hasNotification()

    const onPress = () => handlePressOnProfil ?  handlePressOnProfil() : undefined

    return(
        <>
            <View style={styles.bodyHeader}>
                {user && <ProfilButton 
                    placeholderBorder 
                    isSelected={hasNotifications && !notCurrentUser} 
                    disabled={!hasNotifications || notCurrentUser} 
                    huge 
                    hugeBadge 
                    noBadge={!hasNotifications || notCurrentUser} 
                    user={user} 
                    onPress={onPress}
                />}
                <View style={styles.titreEtDescriptionContainer}>
                    <TitleText text={"@" + user?.displayName ?? "unknown"}/>
                    <NormalText bold style={{color: fontGray}} text={user && user?.firstName && user?.lastName ? (user.firstName + " " + user.lastName) : "unknown"} />
                </View>
            </View>

            <RenderUserData user_data={user_data}/>

            {
                user && auth.currentUser && (user.uid !== auth.currentUser.uid) &&
                (
                    isFriend ?
                    <BackgroundTextButton text="Suivi(e)" bgColor={secondary} color={font} bold onPress={handleAddFriend}/> :

                    (hasSendedFriendRequest ?
                    <BackgroundTextButton text="En attente" bgColor={secondary} color={font} bold onPress={handleAddFriend}/> :
                    <BackgroundTextButton text="Suivre" bold onPress={handleAddFriend}/>)
                )
            }

            <View style={{marginBottom: -15}}>
                <Separator/>
            </View>
        </>
    )
}

const RenderPrivateData = () => {
    const {theme} = useContext(AppContext)
    const contrast = useThemeColor(theme, "Contrast")

    return(
        <View style={{flex: 1, flexGrow: 1}}>
            <View style={[styles.emptySreenContainer, {justifyContent: "space-evenly"}]}>
                <View style={{padding: 40, borderRadius: 500, borderWidth: 3, borderColor: contrast}}>
                    <Icon name="lock" provider={IconProvider.Feather} size={45}/>
                </View>

                <View style={styles.emptyScreenSubContainer}>
                    <SubTitleText text={"Ce compte est privé"}/>

                    <View style={{width: "80%"}}>
                        <NormalText style={{textAlign: 'center'}} text={"Pour consulter ce profil vous devez y être abonné"}/>
                    </View>
                </View>
            </View>
        </View>
    )
}

interface UserStatListItem {
    number: number,
    title: string,
    subTitle: string,
    color?: string,
    onPress: () => void,
  }
  
  
interface UserStatComponentProps {
    item: UserStatListItem
}

interface UserData {
    number: number,
    title: string,
    onPress: () => void,
}

const UserStatComponent: FC<UserStatComponentProps> = ({item}) => {
    const {theme} = useContext(AppContext)
    const fontGray = useThemeColor(theme, "FontGray")
    const font = useThemeColor(theme, "Font")
  
    return(
      <CustomCard flex onPress={item.number > 0 ? item.onPress : undefined}>
        <View style={{gap: 40, flex: 1}}>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <View style={{flexDirection: "row", gap: 10, alignItems: "flex-end", justifyContent: "flex-end"}}>
                <MassiveText text={item.number} style={{fontSize: 50, color: item.color ?? font}}/>
            </View>
          </View>
          
          <View>
            <SubTitleText text={item.title}/>
            <NormalText bold style={{color: fontGray}} text={item.subTitle}/>
          </View>
        </View>
      </CustomCard>
    )
  }
  


interface RenderUserDataProps {
    user_data: UserData[]
}

const RenderUserData: FC<RenderUserDataProps> = ({user_data}) => {
    const {theme} = useContext(AppContext)
    const fontGray = useThemeColor(theme, "FontGray")


    return(
      <View style={{display: "flex", flexDirection: "row", gap: 0, justifyContent: "center", alignItems: "center", marginHorizontal: 60}}>
        {
            user_data.map((data, index) => 
                <TouchableOpacity onPress={data.onPress} key={index} style={{ 
                    flex: 1, 
                    gap: 5, 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                    justifyContent: "center",
                }}>
                    <TitleText text={data.number}/>
                    <NormalText bold text={data.title} style={{color: fontGray}}/>
                </TouchableOpacity>
            )
        }
      </View>
    )
}

type ProfilDetailsFormProps = {
    user: UserType | VisitInfoUser,
    friends: string[],
    nb_habits: number,
    nb_habits_done: number,
    nb_objectifs: number,
    nb_objectifs_done: number,
    handleSeeFriends: () => void,
    handleSeeObjectifs: () => void,
    handleSeeDoneObjectifs: () => void,
    handleSeeHabits: () => void,
    handleSeeDoneHabits: () => void,
    handleSeeSucces: () => void,
    handleAddFriend?: () => void,
    handlePressOnProfil?: () => void,
    handleOpenSettings?: () => void,
    isFriend?: boolean,
    hasSendedInvitation?: boolean,
    isLoading?: boolean
}

const ProfilDetailsForm: FC<ProfilDetailsFormProps> = ({
    user,
    friends,
    nb_habits,
    nb_habits_done,
    nb_objectifs,
    nb_objectifs_done,
    handleSeeFriends,
    handleSeeObjectifs,
    handleSeeDoneObjectifs,
    handleSeeHabits,
    handleSeeDoneHabits,
    handleSeeSucces,
    handleAddFriend,
    handleOpenSettings,
    isFriend,
    hasSendedInvitation,
    handlePressOnProfil,
    isLoading
}) => {
    const {theme} = useContext(AppContext)
    const fontGray = useThemeColor(theme, "FontGray")
    const contrast = useThemeColor(theme, "Contrast")

    const streakColor = contrast

    const user_data: UserData[] = [
        {
            number: friends.length,
            title: "Amis",
            onPress: handleSeeFriends
        },
        {
            number: 4,
            title: "Posts",
            onPress: handleSeeSucces
        }
    ]

    const userStatList: UserStatListItem[] = [
        {
            number: nb_habits,
            title: "Habitudes",
            subTitle: "En cours",
            onPress: handleSeeHabits,
        },
        {
            number: nb_habits_done,
            title: "Habitudes",
            subTitle: "Terminées",
            color: fontGray,
            onPress: handleSeeDoneHabits,
        },

    
        {
            number: nb_objectifs,
            title: "Objectifs",
            subTitle: "En cours",
            onPress: handleSeeObjectifs,
        },


        {
            number: nb_objectifs_done,
            title: "Objectifs",
            subTitle: "Terminés",
            color: fontGray,
            onPress: handleSeeDoneObjectifs,
        }
    ]

    const currentStreak = 12

    const userSettingsBottomsheetModalRef = useRef<BottomSheetModal>(null)

    const handleOpenOtherUserSettings = () => {
        userSettingsBottomsheetModalRef.current?.present()
    }

    return(
        <UsualScreen>
            <View style={[styles.container]}>
                    <View style={styles.header}>
                        <View style={styles.subHeader}>
                            <NavigationButton noPadding action={NavigationActions.goBack}/>

                            <StreakFlame value={12} color={streakColor}/>
                            {
                                <BorderIconButton isBorderGray isTransparent name={"settings"} provider={IconProvider.Feather} onPress={
                                    auth && auth.currentUser && user && (user.uid === auth.currentUser.uid ) && handleOpenSettings ?
                                    handleOpenSettings :
                                    handleOpenOtherUserSettings
                                }/>
                            }
                        </View>
                    </View>
                
                    {
                    (user?.isPrivate && !isFriend)?
                    <View style={styles.body}>
                        <ProfilHeader 
                            user={user} 
                            user_data={user_data}
                            handlePressOnProfil={handlePressOnProfil}
                            notCurrentUser={handleAddFriend !== undefined}
                            handleAddFriend={handleAddFriend ?? (() => {})}
                            hasSendedFriendRequest={hasSendedInvitation}
                            isFriend={isFriend}/>

                        {
                            !isLoading &&
                            <RenderPrivateData/>
                        }
                    </View> 
                    
                    :

                    <CustomScrollView>
                        <View style={styles.body}>
                            <ProfilHeader 
                                user={user} 
                                user_data={user_data}
                                handlePressOnProfil={handlePressOnProfil}
                                notCurrentUser={handleAddFriend !== undefined}
                                handleAddFriend={handleAddFriend ?? (() => {})}
                                hasSendedFriendRequest={hasSendedInvitation}
                                isFriend={isFriend}/>

                            {
                                !isLoading &&

                                <View style={{gap: 10, margin: -20}}>
                                    <FlatList
                                        key={1}
                                        numColumns={2}
                                        columnWrapperStyle={{gap: 10, flex: 1}}
                                        contentContainerStyle={{gap: 10, padding: 20}}
                                        data={userStatList}
                                        scrollEnabled={false}
                                        renderItem={({item}) => <UserStatComponent item={item}/>}
                                    />
                                </View>
                            }
                        </View>
                    </CustomScrollView>
                    }
            </View>

            <UserSettingsBottomScreen
                bottomSheetModalRef={userSettingsBottomsheetModalRef}
                detailledUser={user as UserDataBase}/>

        </UsualScreen>
    );
}


const styles = StyleSheet.create({
    container: {
      display: "flex", 
      flexDirection: "column", 
      gap: 10, 
      flex: 1, 
      marginBottom: 0,
    },

    header: {
        display: "flex", 
        flexDirection: "column", 
        gap: 20,
        marginBottom: 10
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
        marginTop: 10,

    },

    imageStyle: {
      alignSelf: 'center',
      justifyContent: 'center',
      resizeMode: 'contain',
      aspectRatio: 1,
      flex: 1,      
      borderRadius: 200,
    },

    titreEtDescriptionContainer:{
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center",
      alignItems: "center",
      gap: 5
    },

    bodyHeader: {
      flexDirection: "column",
      gap: 25,
      justifyContent: "center",
      alignItems: "center"
   },

    imageContainerStyle: {
      aspectRatio: 1,
      width: 120,
      alignItems: 'center',
      justifyContent: 'center', 
  },

  groupContainer: {
    display: 'flex', 
    flexDirection: "row",
    justifyContent: "center",
    gap: 0,
    width: "100%"
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
  
export default ProfilDetailsForm;