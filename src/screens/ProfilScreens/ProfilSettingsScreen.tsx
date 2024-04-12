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
import { HomeStackParamsList } from "../../navigation/BottomTabNavigator"
import { signOut } from "firebase/auth"
import React from "react"
import ProfilButton from "../../components/Profil/ProfilButton"
import BottomMenuStyle from "../../styles/StyledBottomMenu"

type ProfilSettingsScreenProps = NativeStackScreenProps<HomeStackParamsList, "ProfilSettingsScreen">

export interface RenderSettingsListItemProps {
    icon: string,
    provider: IconProvider,
    text: string,
    onPress: () => void,
    noChevron?: boolean,
    switchButton?: boolean,
    switchButtonValue?: boolean,
}

export const RenderSettingsListItem: FC<RenderSettingsListItemProps> = ({
    icon, 
    provider, 
    text, 
    onPress, 
    noChevron, 
    switchButton,
    switchButtonValue,
}) => {
    const {theme} = useContext(AppContext)
    const fontGray = useThemeColor(theme, "FontGray")
    const secondary = useThemeColor(theme, "Secondary")

    const handleOnPress = () => {
        if(switchButton) {
            BottomScreenOpen_Impact()
        }

        onPress()
    }
    
    return(
        <TouchableOpacity disabled={switchButton} onPress={handleOnPress} style={{
            flexDirection: "row", 
            justifyContent: "space-between",
            paddingVertical: 20
        }}>
            <View style={{flexDirection: "row", gap: 20, alignItems: "center", flex: 1}}>
                <Icon name={icon} provider={provider} color={fontGray} size={26}/>
                <SubTitleText text={text}/>
            </View>
            <View>
            {
                !noChevron && !switchButton ?
                    <Icon provider={IconProvider.Feather} name={"chevron-right"} color={fontGray}/>
                    :
                switchButton && 
                    <Switch 
                        value={switchButtonValue} 
                        onValueChange={handleOnPress} 
                        trackColor={{false: secondary, true: secondary}}/>
            }
            </View>
        </TouchableOpacity>
    )
}

export interface RenderSettingListProps {
    commands: RenderSettingsListItemProps[],
    sectionTitle: string
}

export const RenderSettingList: FC<RenderSettingListProps> = ({commands, sectionTitle}) => {
    return(
        <View key={sectionTitle} style={{gap: 20}}>
            <TitleText text={sectionTitle}/>
                                
            <View style={{gap: 10}}>
                {
                    commands.map((command, index) => {
                        return <RenderSettingsListItem key={index} {...command}/>
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

    const generalCommands:  RenderSettingListProps = {
        sectionTitle: "Général",
        commands: [
            {
                icon: "user",
                provider: IconProvider.Feather,
                text: "Mon Profil",
                onPress: () => navigation.navigate("ProfilDataSettingsScreen")
            },
            {
                icon: "staro",
                provider: IconProvider.AntDesign,
                text: "Abonnement",
                onPress: () => navigation.navigate("SubscriptionScreen")
            },
        ]
    }

    const preferencesCommands: RenderSettingListProps = {
        sectionTitle: "Préférences",
        commands: [
            {
                icon: "bell",
                provider: IconProvider.Feather,
                text: "Notifications",
                onPress: () => setNotificationEnabled(!notificationEnabled),
                switchButton: true,
                switchButtonValue: notificationEnabled
            },
            {
                icon: "moon",
                provider: IconProvider.Feather,
                text: "Mode sombre",
                onPress: () => handleSetTheme(theme.light ? {dark: "dark"} : {light: "light"}),
                switchButton: true,
                switchButtonValue: isDarkMode
            },
            {
                icon: "lock",
                provider: IconProvider.Feather,
                text: "Sécurité",
                onPress: () => navigation.navigate("SecurityScreen")
            },
        ]
    }

    const otherCommands: RenderSettingListProps = {
        sectionTitle: "Autre",
        commands: [
        
        {
            icon: "help-outline",
            provider: IconProvider.MaterialIcons,
            text: "Aide et support",
            onPress: () => navigation.navigate("HelpAndSupportScreen")
        },
        {
            icon: "info",
            provider: IconProvider.Feather,
            text: "Conditions d'utilisation",
            onPress: () => navigation.navigate("ConditionUtilisationScreen")
        },
        {
            icon: "log-out",
            provider: IconProvider.Feather,
            text: "Déconnexion",
            onPress: handleSignOut,
            noChevron: true
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
                            {user && <ProfilButton tall noBadge user={user} onPress={() => {}}/>}
                            <View style={styles.titreEtDescriptionContainer}>
                                <HugeText text={user?.displayName ?? "unknown"}/>
                                <NormalGrayText text={user?.email ?? "unknown"} />
                            </View>
                        </View>

                        <View style={styles.bodyCore}>
                            <View style={{gap: 30}}>
                            {
                                commands.map((command, index) => 
                                    <RenderSettingList key={index} {...command}/>
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