import { useNavigation } from "@react-navigation/native";
import { UsualScreen } from "../../components/View/Views";
import { Image, StyleSheet, View } from "react-native";
import { MassiveText, NormalText, SubMassiveText, SubTitleText, TitleText } from "../../styles/StyledText";
import { BackgroundTextButton, TextButton } from "../../components/Buttons/UsualButton";
import { useContext, useEffect } from "react";
import { auth } from "../../firebase/InitialisationFirebase";
import { AuthContext } from "../../data/AuthContext";


const AccountCreatedScreen = () => {

    const navigation = useNavigation();
    const {setUserAuthState} = useContext(AuthContext)

    useEffect(() => {

        const disableGestures = () => {
            navigation.setOptions({
                gestureEnabled: false,
            });
        };

        disableGestures()
    }, [])

    const handleGoToProfilPicture = () => {
        navigation.navigate("ChooseProfilPictureScreen")
    }

    const handleSkipSteps = () => {
        setUserAuthState(3)
    }

    const username = auth.currentUser.displayName

    return (
        <UsualScreen hideMenu>   
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{width: "100%"}}>
                        <TitleText text="Bienvenue,"/>
                        <SubMassiveText text={username + " !"}/>
                    </View>

                    {/* <CircleBorderIconButton onPress={() => {}} provider={"Feather"} name={"share-2"}/> */}
                </View>


                <View style={{flex: 1, flexGrow: 1}}>
                    <View style={styles.emptySreenContainer}>
                    
                        <Image style={styles.emptyScreenImageContainer} source={IllustrationsList["Validation"]}/>

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