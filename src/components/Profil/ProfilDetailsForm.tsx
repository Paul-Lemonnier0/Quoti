import { User } from 'firebase/auth'
import React, { FC, useContext } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { MassiveText, NormalText, SubMassiveText, SubTitleText, TitleText } from '../../styles/StyledText'
import { AppContext } from '../../data/AppContext'
import { useThemeColor } from '../Themed'
import Separator from '../Other/Separator'
import CustomCard from '../Other/Card'
import { Icon, IconButton, IconProvider, NavigationActions, NavigationButton } from '../Buttons/IconButtons'
import ProfilButton from './ProfilButton'
import { CustomScrollView, UsualScreen } from '../View/Views'
import { UserType } from '../../data/UserContext'
import IllustrationsList, { IllustrationsType } from '../../data/IllustrationsList'
import { Image } from 'react-native'

interface ProfilHeaderProps {
    user: UserType,
    user_data: UserData[],
    handlePressOnProfil?: () => void,
    notCurrentUser?: boolean
}

const ProfilHeader: FC<ProfilHeaderProps> = ({user, user_data, notCurrentUser, handlePressOnProfil}) => {
    const {theme} = useContext(AppContext)
    const fontGray = useThemeColor(theme, "FontGray")

    const hasNotification = user?.friendRequests && user.friendRequests.length > 0

    const onPress = () => handlePressOnProfil ?  handlePressOnProfil() : undefined

    return(
        <>
            <View style={styles.bodyHeader}>
                {user && <ProfilButton disabled={!hasNotification || notCurrentUser} huge hugeBadge noBadge={!hasNotification || notCurrentUser} user={user} onPress={onPress}/>}
                <View style={styles.titreEtDescriptionContainer}>
                    <TitleText text={"@" + user?.displayName ?? "unknown"}/>
                    <NormalText bold style={{color: fontGray}} text={user?.email ?? "unknown"} />
                </View>
            </View>

            <RenderUserData user_data={user_data}/>

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

                {/* <Image style={styles.emptyScreenImageContainer} source={IllustrationsList[IllustrationsType.Traveler]}/> */}

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
      <CustomCard flex onPress={item.onPress}>
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
    user: UserType,
    nb_friends: number,
    nb_habits: number,
    nb_objectifs: number,
    handleSeeFriends: () => void,
    handleSeeObjectifs: () => void,
    handleSeeHabits: () => void,
    handleSeeSucces: () => void,
    handleOpenSettings?: () => void,
    handleAddFriend?: () => void,
    handlePressOnProfil?: () => void,
    isFriend?: boolean,
    hasSendedInvitation?: boolean
}

const ProfilDetailsForm: FC<ProfilDetailsFormProps> = ({
    user,
    nb_friends,
    nb_habits,
    nb_objectifs,
    handleSeeFriends,
    handleSeeObjectifs,
    handleSeeHabits,
    handleSeeSucces,
    handleOpenSettings,
    handleAddFriend,
    isFriend,
    hasSendedInvitation,
    handlePressOnProfil
}) => {
    const {theme} = useContext(AppContext)
    const fontGray = useThemeColor(theme, "FontGray")
    const contrast = useThemeColor(theme, "Contrast")

    const streakColor = contrast

    const user_data: UserData[] = [
        {
            number: nb_friends,
            title: "Amis",
            onPress: handleSeeFriends
        },
        {
            number: 4,
            title: "Succès",
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
            number: 7,
            title: "Habitudes",
            subTitle: "Terminées",
            color: fontGray,
            onPress: handleSeeHabits,
        },

    
        {
            number: nb_objectifs,
            title: "Objectifs",
            subTitle: "En cours",
            onPress: handleSeeObjectifs,
        },


        {
            number: 4,
            title: "Objectifs",
            subTitle: "Terminés",
            color: fontGray,
            onPress: handleSeeObjectifs,
        }
    ]

    //TODO : add to user : best streak, current streak, succes, ended obj, ended habits

    const isPrivateUser = false
    const currentStreak = 12

    const friendIconName = isFriend ? "user-check" : (hasSendedInvitation ? "user-minus" : "user-plus")

    return(
        <UsualScreen>
            <View style={[styles.container]}>
                    <View style={styles.header}>
                        <View style={styles.subHeader}>
                            <NavigationButton noPadding action={NavigationActions.goBack}/>

                            <View style={{flexDirection: "row", gap: 10, alignItems: 'center', justifyContent: 'center'}}>
                                {/* <Icon provider={IconProvider.Feather} name={streakIcon} color={streakColor}/> */}
                                <Icon provider={IconProvider.FontAwesome5} name="fire" color={streakColor}/>
                                <TitleText text={currentStreak}/>
                            </View>

                            {
                                handleOpenSettings &&
                                <IconButton noPadding name={"settings"} provider={IconProvider.Feather} onPress={handleOpenSettings}/>
                            }
                            {
                                handleAddFriend &&
                                
                                <IconButton noPadding name={friendIconName} provider={IconProvider.Feather} onPress={handleAddFriend}/>
                            }
                        </View>
                    </View>
                {
                    isPrivateUser ?
                    <View style={styles.body}>
                        <ProfilHeader 
                            user={user} 
                            user_data={user_data}
                            handlePressOnProfil={handlePressOnProfil}
                            notCurrentUser={handleAddFriend !== undefined}/>
                        <RenderPrivateData/>
                    </View> 
                    
                    :

                    <CustomScrollView>
                        <View style={styles.body}>
                            <ProfilHeader 
                                user={user} 
                                user_data={user_data}
                                handlePressOnProfil={handlePressOnProfil}
                                notCurrentUser={handleAddFriend !== undefined}/>

                            <View style={{gap: 10}}>
                                {/* <CustomCard>
                                    <View style={{flexDirection: "row", gap: 15, paddingHorizontal: -10, width: "100%", alignItems: "center"}}>
                                        <View style={{marginHorizontal: 0, justifyContent: "center",  marginTop: 5, alignItems: "center"}}>
                                            <Icon provider={IconProvider.FontAwesome5} size={60} name="fire"/>
                                        </View>

                                        <View style={{flex: 1}}>
                                            <SubMassiveText text={"70"}/>
                                            <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
                                                <Icon name={streakIcon} provider={IconProvider.Feather} color={streakColor}/>
                                                <NormalText bold text={streakSentence} style={{color: streakColor}}/>
                                            </View>
                                        </View>
                                    </View>
                                </CustomCard> */}

                                <FlatList
                                    key={1}
                                    numColumns={2}
                                    columnWrapperStyle={{gap: 10, flex: 1}}
                                    contentContainerStyle={{gap: 10}}
                                    data={userStatList}
                                    scrollEnabled={false}
                                    renderItem={({item}) => <UserStatComponent item={item}/>}
                                />
                            </View>
                        </View>
                    </CustomScrollView>
                }
            </View>

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