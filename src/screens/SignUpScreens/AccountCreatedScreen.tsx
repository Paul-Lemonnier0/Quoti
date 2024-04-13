import { useNavigation } from "@react-navigation/native";
import { UsualScreen } from "../../components/View/Views";
import { Image, StyleSheet, View } from "react-native";
import { MassiveText, NormalText, SubMassiveText, SubTitleText, TitleText } from "../../styles/StyledText";
import { BackgroundTextButton, TextButton } from "../../components/Buttons/UsualButton";
import { FC, useContext, useEffect } from "react";
import { auth } from "../../firebase/InitialisationFirebase";
import { AuthContext, AuthStates } from "../../data/AuthContext";
import IllustrationsList, { IllustrationsType } from "../../data/IllustrationsList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthNavigatorStackProps } from "../../navigation/AuthNavigator";
import React from "react"
import { Database_setUser } from "../../firebase/Database_User_Primitives";
import { setBaseDetailsUser } from "../../firebase/Firestore_User_Primitives";

type AccountCreatedScreenProps = NativeStackScreenProps<AuthNavigatorStackProps, "AccountCreatedScreen">

const AccountCreatedScreen: FC<AccountCreatedScreenProps> = ({navigation, route}) => {

    const {setUserAuthState} = useContext(AuthContext)
    const {firstName, lastName} = route.params

    useEffect(() => {
        const disableGestures = () => {
            navigation.setOptions({
                gestureEnabled: false,
            });
        };

        const createAccount_DB = async() => {
            if(auth.currentUser && auth.currentUser.email) {
                // await Database_setUser({...auth.currentUser}, firstName, lastName)
            }
        }

        createAccount_DB()
        disableGestures()
    }, [])

    const handleGoToProfilPicture = () => {
        navigation.navigate("ChooseProfilPictureScreen")
    }

    const handleSkipSteps = () => {
        setUserAuthState(AuthStates.Ready)
    }

    const username = auth.currentUser?.displayName ?? "unknown"

    return (
        <UsualScreen hideMenu>   
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{width: "100%"}}>
                        <TitleText text="Bienvenue,"/>
                        <SubMassiveText text={username + " !"}/>
                    </View>

                </View>


                <View style={{flex: 1, flexGrow: 1}}>
                    <View style={styles.emptySreenContainer}>
                    
                        <Image style={styles.emptyScreenImageContainer} source={IllustrationsList[IllustrationsType.Validation]}/>

                        <View style={styles.emptyScreenSubContainer}>
                            <SubTitleText text={"Votre compte à bien été créé !"}/>
                            <NormalText text={"Plus que quelques étapes..."}/>
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <BackgroundTextButton text={"Choisir une photo de profil"} onPress={handleGoToProfilPicture} bold/>
                    <TextButton text={"Passer les étapes"} onPress={handleSkipSteps} bold/>
                </View>

            </View>
        </UsualScreen>
    );
  };
  
  const styles = StyleSheet.create({

    container: {
        display: "flex", 
        flexDirection: "column", 
        gap: 30, 
        flex: 1, 
        marginBottom: 0
    },

    header: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        justifyContent: "space-between"
    },
    
    body: {
        flex: 1, 
        gap: 30,
    },

    footer:{
    
    },

    habitPresentationContainer: {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center", 
        gap: 20, 
        margin: 20
    },

    titleAndDescriptionContainer: {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center", 
        gap: 10
    },

    groupContainer: {
        display: 'flex', 
        flexDirection: "column",
        justifyContent: "center", 
        gap: 20, flex: 1
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
  
  export default AccountCreatedScreen;