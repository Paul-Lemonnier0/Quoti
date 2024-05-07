import { View, StyleSheet, Switch } from "react-native"
import { HugeText, NormalGrayText, SubTitleText, TitleText } from "../../styles/StyledText"
import { useState, FC, useEffect } from "react"
import { useThemeColor } from "../../components/Themed"
import { CustomScrollView, UsualScreen } from "../../components/View/Views"
import { Icon, IconProvider, NavigationActions, NavigationButton } from "../../components/Buttons/IconButtons"
import { useContext } from "react"
import { auth } from "../../firebase/InitialisationFirebase"
import { UserContext } from "../../data/UserContext"
import { TouchableOpacity } from "react-native"
import { BottomScreenOpen_Impact } from "../../constants/Impacts"
import { AppContext } from "../../data/AppContext"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { signOut } from "firebase/auth"
import React from "react"
import ProfilButton from "../../components/Profil/ProfilButton"
import BottomMenuStyle from "../../styles/StyledBottomMenu"
import { HomeStackParamsList } from "../../navigation/HomeNavigator"
import Command, { CommandType } from "../../components/Other/Command"

type ProfilSettingsScreenProps = NativeStackScreenProps<HomeStackParamsList, "ProfilSettingsScreen">

export interface RenderCommandListProps {
    commands: CommandType[],
    sectionTitle: string
}

export const RenderCommandList: FC<RenderCommandListProps> = ({commands, sectionTitle}) => {
    return(
        <View key={sectionTitle} style={{gap: 20}}>
            <TitleText text={sectionTitle}/>
                                
            <View style={{gap: 10}}>
                {
                    commands.map((command, index) => {
                        return <Command key={index} {...command}/>
                    })
                }
            </View>
        </View>
    )
}

const ProfilSettingsScreen: FC<ProfilSettingsScreenProps> = ({navigation}) => {
    const {user, setUser} = useContext(UserContext)
    const {theme, handleSetTheme} = useContext(AppContext)

    const [notificationEnabled, setNotificationEnabled] = useState<boolean>(true)

        
    useEffect(() => {
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            display: "none"
          }
        });
        return () => navigation.getParent()?.setOptions({
          tabBarStyle: BottomMenuStyle().bottomMenuStyle
        });
      }, [navigation]);

    const handleSignOut = async() => {
        await signOut(auth)
        console.log("déconnecté")
    }   

    const isDarkMode = theme.dark !== undefined

    const generalCommands:  RenderCommandListProps = {
        sectionTitle: "Général",
        commands: [
            {
                icon: "user",
                provider: IconProvider.Feather,
                text: "Mon Profil",
                method: () => navigation.navigate("ProfilDataSettingsScreen"),
                chevron: true
            },
            {
                icon: "staro",
                provider: IconProvider.AntDesign,
                text: "Abonnement",
                method: () => navigation.navigate("SubscriptionScreen"),
                chevron: true
            },
            {
                icon: "archive-outline",
                provider: IconProvider.MaterialCommunityIcons,
                text:"Habitudes archivées",
                method: () => navigation.navigate("ArchivedHabitsScreen"),
                chevron: true
            },
        ]
    }

    const preferencesCommands: RenderCommandListProps = {
        sectionTitle: "Préférences",
        commands: [
            {
                icon: "bell",
                provider: IconProvider.Feather,
                text: "Notifications",
                method: () => setNotificationEnabled(!notificationEnabled),
                switchButton: true,
                switchButtonValue: notificationEnabled
            },
            {
                icon: "moon",
                provider: IconProvider.Feather,
                text: "Mode sombre",
                method: () => handleSetTheme(theme.light ? {dark: "dark"} : {light: "light"}),
                switchButton: true,
                switchButtonValue: isDarkMode
            },
            {
                icon: "lock",
                provider: IconProvider.Feather,
                text: "Sécurité",
                method: () => navigation.navigate("SecurityScreen"),
                chevron: true
            },
        ]
    }

    const otherCommands: RenderCommandListProps = {
        sectionTitle: "Autre",
        commands: [
        {
            icon: "help-outline",
            provider: IconProvider.MaterialIcons,
            text: "Aide et support",
            method: () => navigation.navigate("HelpAndSupportScreen"),
            chevron: true
        },
        {
            icon: "info",
            provider: IconProvider.Feather,
            text: "Conditions d'utilisation",
            method: () => navigation.navigate("ConditionUtilisationScreen"),
            chevron: true
        },
        {
            icon: "log-out",
            provider: IconProvider.Feather,
            text: "Déconnexion",
            method: handleSignOut,
        },
    ]}

    const commands = [generalCommands, preferencesCommands, otherCommands]

    return(
        <UsualScreen hideMenu>
          <View style={[styles.container]}>
                <View style={styles.header}>
                    <View style={styles.subHeader}>
                        <NavigationButton action={NavigationActions.goBack}/>
                    </View>
                </View>

                <CustomScrollView>
                    <View style={styles.body}>
                        <View style={styles.bodyHeader}>
                            {user && <ProfilButton placeholderBorder tall noBadge user={user} onPress={() => {}}/>}
                            <View style={styles.titreEtDescriptionContainer}>
                                <HugeText text={user?.displayName ?? "unknown"}/>
                                <NormalGrayText text={user?.email ?? "unknown"} />
                            </View>
                        </View>

                        <View style={styles.bodyCore}>
                            <View style={{gap: 30}}>
                            {
                                commands.map((command, index) => 
                                    <RenderCommandList key={index} {...command}/>
                                )
                            }
                            </View>

                        </View>
                    
                    </View>
                </CustomScrollView>
          </View>
        </UsualScreen>
    );
  };
  
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
        gap: 20,
        marginBottom: 5
    },

    titreEtDescriptionContainer:{
        display: "flex", 
        flex: 1,
        flexDirection: "column", 
        justifyContent: "center",
        gap: 0
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

    imageStyle: {
      alignSelf: 'center',
      justifyContent: 'center',
      resizeMode: 'contain',
      aspectRatio: 1,
      flex: 1,      
      borderRadius: 200,
    },

    imageContainerStyle: {
      aspectRatio: 1,
      width: 120,
      alignItems: 'center',
      justifyContent: 'center', 
    },

    bodyHeader: {
        flexDirection: "row",
        gap: 20
    },

    bodyCore: {
        gap: 20
    }
});
  
export default ProfilSettingsScreen;