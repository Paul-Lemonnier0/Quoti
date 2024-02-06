import { getAuth, createUserWithEmailAndPassword, updateCurrentUser } from "@firebase/auth"
import { Image, View } from "react-native"
import { HugeText, LittleNormalText, NormalText, SubText } from "../../styles/StyledText"
import { UsualScreen } from "../../components/View/Views"
import { StyleSheet } from "react-native"
import { PasswordInputCustom, TextInputCustom } from "../../components/TextFields/TextInput"
import { BackgroundTextButton, TextButton } from "../../components/Buttons/UsualButton"
import { useRef } from "react"
import { useState } from "react"
import { auth, db } from "../../firebase/InitialisationFirebase"
import { Alert } from "react-native"
import { NavigationButton } from "../../components/Buttons/IconButtons"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { updateProfile } from "firebase/auth"
import { useNavigation } from "@react-navigation/native"
import { useColorScheme } from "react-native"
import SocialButton, { SocialConnectionWay } from "../../components/Buttons/SocialButton"
import Separator from "../../components/Other/Separator"
import { Error_Impact, Success_Impact } from "../../constants/Impacts"

export default SignUpScreen = () => {

    const usernameRef = useRef()
    const [isUserNameWrong, setIsUserNameWrong] = useState(false)

    const emailRef = useRef()
    const [isEmailWrong, setIsEmailWrong] = useState(false)

    const passwordRef = useRef()
    const [isPasswordWrong, setIsPasswordWrong] = useState(false)

    const navigation = useNavigation()

    const handleGoToLoginScreen = () => {
        navigation.navigate("LoginScreen")
    }

    const handleSignUp = async() => {

     const username = usernameRef.current?.getValue()
     const email = emailRef.current?.getValue()
     const password = passwordRef.current?.getValue()



     if(username === ""){
        setIsUserNameWrong(true)
     }

     else if(email === ""){
        setIsEmailWrong(true)
     }

     else if(password === ""){
        setIsPasswordWrong(true)
     }

     else{
        try{
            const {user} = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(user, {displayName: username});

            const userDocRef = doc(db, "Users", email)
            const docSnapshot = await getDoc(userDocRef);
        
            if (!docSnapshot.exists()) {
                await setDoc(userDocRef, {});
                Success_Impact()

                navigation.navigate("AccountCreatedScreen")
            }            
        }

        catch(e){
            console.log("probleme lors de l'inscription : ", e)
            Error_Impact()
        }

     }
    }

    const handleGoogleSignUp = () => {}

    const handleFacebookSignUp = () => {}


    return (
        <UsualScreen hideMenu>
            <View style={styles.container}>

                <View style={styles.header}>
                    <View style={styles.subHeader}>
                        <NavigationButton action={"goBack"}/>
                    </View>
                    <HugeText text={"Inscription"}/>
                </View>


                <View style={styles.body}>
                    <View style={{gap: 20}}>
                        <TextInputCustom ref={usernameRef} isWrong={isUserNameWrong} placeholder={"Nom d'utilisateur"}/>
                        <TextInputCustom ref={emailRef} isWrong={isEmailWrong} placeholder={"Email"}/>
                        <PasswordInputCustom ref={passwordRef} isWrong={isPasswordWrong} placeholder={"Mot de passe"}/>
                    </View>
                    
                    <View style={{display: "flex", flexDirection: "column", gap: 20}}>

                        <BackgroundTextButton text={"S'inscrire"} bold onPress={handleSignUp}/>

                        <View style={{justifyContent: "center", marginHorizontal: 30, display: "flex", alignItems: "center", flexDirection: "column"}}>
                            <SubText style={{textAlign: "center"}} text={"En vous inscrivant, vous acceptez nos conditions d'utilisations "}/>
                        </View>

                    </View>
                    <Separator/>

                    <View style={{flex: 1, alignItems: "center", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>

                        <View style={{display: "flex", flexDirection: "row", gap: 20, alignItems: "center", justifyContent: "center", flex: 1}}>
                            <SocialButton provider={SocialConnectionWay.Google} onPress={handleGoogleSignUp}/>
                            <SocialButton provider={SocialConnectionWay.Facebook} onPress={handleFacebookSignUp}/>
                        </View>
              
                    </View>

                    <View style={{display: "flex", flexDirection: "column", gap: 20}}>

                        <View style={styles.footer}>
                            <NormalText text={"Déjà membre ? "}/> 
                            <TextButton semiBold noPadding text={"Connectez vous"} onPress={handleGoToLoginScreen}/>
                        </View>
                    </View>
                </View>
            </View>
        </UsualScreen>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 50,
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 20
    },

    header: {
        display: "flex", 
        flexDirection: "column", 
        gap: 20,
        
    },

    subHeader: {
        display: "flex",
        flexDirection: "row"
    },  

    body: {
        flex: 1,
        gap: 40,
    },

    connexionContainer: {
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        gap: 20
    },

    footer: {
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center"
    }
})