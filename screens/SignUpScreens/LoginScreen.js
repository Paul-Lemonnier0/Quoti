import { sendPasswordResetEmail, signInWithEmailAndPassword } from "@firebase/auth"
import { View } from "react-native"
import { HugeText, NormalText, SubText } from "../../styles/StyledText"
import { UsualScreen } from "../../components/View/Views"
import { StyleSheet } from "react-native"
import { PasswordInputCustom, TextInputCustom } from "../../components/TextFields/TextInput"
import { BackgroundTextButton, TextButton } from "../../components/Buttons/UsualButton"
import { useContext, useRef } from "react"
import { useState } from "react"
import { auth } from "../../firebase/InitialisationFirebase"
import { Alert } from "react-native"
import { NavigationButton } from "../../components/Buttons/IconButtons"
import { useNavigation } from "@react-navigation/native"
import SocialButton from "../../components/Buttons/SocialButton"
import { useColorScheme } from "react-native"
import { Success_Impact } from "../../constants/Impacts"
import { AuthContext } from "../../data/AuthContext"

export default LoginScreen = () => {

    const navigation = useNavigation()
    const {setUserAuthState} = useContext(AuthContext)

    const emailRef = useRef()
    const [isEmailWrong, setIsEmailWrong] = useState(false)

    const passwordRef = useRef()
    const [isPasswordWrong, setIsPasswordWrong] = useState(false)

    const handleGoToSignUpScreen = () => {
        navigation.navigate("SignUpScreen")
    }

    const handleSignIn = async() => {

        const email = emailRef.current?.getValue()
        const password = passwordRef.current?.getValue()



        if(email === ""){
            setIsEmailWrong(true)
        }

        else setIsEmailWrong(false)

        if(password === ""){
            
            setIsPasswordWrong(true)
        }

        else setIsPasswordWrong(false)


        if(email !== "" && password !== ""){
            try{
                await signInWithEmailAndPassword(auth, email, password);
                Success_Impact()
                setUserAuthState(3)
            }

            catch(e){

                console.log("Erreur lors du signIn : ", e)
            }
        }
    }

    const handleForgottenPassword = () => {
        const email = emailRef.current?.getValue()

        if(email.length !== 0){
            sendPasswordResetEmail(auth, email)
        }
    }

    const colorScheme = useColorScheme()

    const Google_Icon = require("../../img/Auth/Google.png")
    const Facebook_Icon = colorScheme === "dark" ? require("../../img/Auth/Facebook-white.png") : require("../../img/Auth/Facebook-blue.png")

    const Apple_Icon = colorScheme === "dark" ? require("../../img/Auth/Apple-white.png") : require("../../img/Auth/Apple-black.png")
    const handleAppleSignUp = () => {}

    const handleGoogleSignUp = () => {}

    const handleFacebookSignUp = () => {}

    return (
        <UsualScreen hideMenu>
            <View style={styles.container}>

                <View style={styles.header}>
                    <View style={styles.subHeader}>
                        <NavigationButton action={"goBack"}/>
                    </View>
                    <HugeText text={"Connexion"}/>
                </View>


                <View style={styles.body}>
                    <View style={{gap: 20}}>
                        <TextInputCustom ref={emailRef} isWrong={isEmailWrong} placeholder={"Email"}/>
                        <PasswordInputCustom ref={passwordRef} isWrong={isPasswordWrong} placeholder={"Mot de passe"}/>
                    </View>

                    <TextButton semiBold noPadding text={"Mot de passe oublié ?"} onPress={handleForgottenPassword}/>
                    
                    <BackgroundTextButton text={"Se connecter"} bold onPress={handleSignIn}/>
                    
                    <Separator/>

                    <View style={{flex: 1, alignItems: "center", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>

                        <NormalText text={"Ou continuez avec :"} bold/>

                        <View style={{display: "flex", flexDirection: "row", gap: 20, alignItems: "center", justifyContent: "center", flex: 1}}>
                            {/* <SocialButton image={Apple_Icon}/> */}
                            <SocialButton image={Google_Icon} onPress={handleGoogleSignUp}/>
                            <SocialButton image={Facebook_Icon} onPress={handleFacebookSignUp}/>
                        </View>


                        <View style={styles.footer}>
                            <NormalText text={"Pas de compte ? "}/> 
                            <TextButton semiBold noPadding text={"inscrivez-vous"} onPress={handleGoToSignUpScreen}/>
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
        gap: 20
    },

    subHeader: {
        display: "flex",
        flexDirection: "row"
    },  

    body: {
        flex: 1,
        gap: 40,
        display: "flex",
        justifyContent: "center"
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