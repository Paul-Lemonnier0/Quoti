import { sendPasswordResetEmail, signInWithEmailAndPassword } from "@firebase/auth"
import { View } from "react-native"
import { HugeText, NormalText, SubText } from "../../styles/StyledText"
import { UsualScreen } from "../../components/View/Views"
import { StyleSheet } from "react-native"
import { CustomTextInputRefType, PasswordInputCustom, TextInputCustom } from "../../components/TextFields/TextInput"
import { BackgroundTextButton, TextButton } from "../../components/Buttons/UsualButton"
import { FC, useContext, useRef } from "react"
import { useState } from "react"
import { auth } from "../../firebase/InitialisationFirebase"
import { Alert } from "react-native"
import { NavigationButton } from "../../components/Buttons/IconButtons"
import { useNavigation } from "@react-navigation/native"
import SocialButton, { SocialConnectionWay } from "../../components/Buttons/SocialButton"
import { useColorScheme } from "react-native"
import { Success_Impact } from "../../constants/Impacts"
import { AuthContext, AuthStates } from "../../data/AuthContext"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AuthNavigatorStackProps } from "../../navigation/AuthNavigator"
import Separator from "../../components/Other/Separator"

type LoginScreenProps = NativeStackScreenProps<AuthNavigatorStackProps, "LoginScreen">

const LoginScreen: FC<LoginScreenProps> = ({navigation}) => {

    const {setUserAuthState} = useContext(AuthContext)

    const emailRef = useRef<CustomTextInputRefType>(null)
    const [isEmailWrong, setIsEmailWrong] = useState<boolean>(false)

    const passwordRef = useRef<CustomTextInputRefType>(null)
    const [isPasswordWrong, setIsPasswordWrong] = useState<boolean>(false)

    const handleGoToSignUpScreen = () => {
        navigation.navigate("SignUpScreen")
    }

    const handleSignIn = async() => {

        const email = emailRef.current?.getValue()
        const password = passwordRef.current?.getValue()

        setIsEmailWrong(email === "")
        setIsPasswordWrong(password === "")

        if(email && email !== "" && password && password !== ""){
            try{
                await signInWithEmailAndPassword(auth, email, password);
                Success_Impact()
                setUserAuthState(AuthStates.Ready)
            }

            catch(e){

                console.log("Erreur lors du signIn : ", e)
            }
        }
    }

    const handleForgottenPassword = () => {
        const email = emailRef.current?.getValue()

        if(email && email.length !== 0){
            sendPasswordResetEmail(auth, email)
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
                            <SocialButton provider={SocialConnectionWay.Google} onPress={handleGoogleSignUp}/>
                            <SocialButton provider={SocialConnectionWay.Facebook} onPress={handleFacebookSignUp}/>
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

export default LoginScreen