import { signInWithEmailAndPassword } from "@firebase/auth"
import { View } from "react-native"
import { HugeText, NormalText } from "../../styles/StyledText"
import { UsualScreen } from "../../components/View/Views"
import { StyleSheet } from "react-native"
import { PasswordInputCustom, TextInputCustom } from "../../components/TextFields/TextInput"
import { BackgroundTextButton } from "../../components/Buttons/UsualButton"
import { useRef } from "react"
import { useState } from "react"
import { auth } from "../../firebase/InitialisationFirebase"
import { Alert } from "react-native"
import { NavigationButton } from "../../components/Buttons/IconButtons"
import { useNavigation } from "@react-navigation/native"

export default LoginScreen = () => {

    const navigation = useNavigation()

    const emailRef = useRef()
    const [isEmailWrong, setIsEmailWrong] = useState(false)

    const passwordRef = useRef()
    const [isPasswordWrong, setIsPasswordWrong] = useState(false)

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
            navigation.navigate("HomeScreen");
        }

        catch(e){

            console.log("Erreur lors du signIn : ", e)
        }
     }


    }

    return (
        <UsualScreen hideMenu>
            <View style={styles.container}>

                <View style={styles.header}>
                    <View style={styles.subHeader}>
                        <NavigationButton action={"goBack"}/>
                    </View>
                    <HugeText text={"Login Screen"}/>
                </View>


                <View style={styles.body}>
                    <TextInputCustom ref={emailRef} isWrong={isEmailWrong} errorMessage={"Erreur sur le mail"} placeholder={"Email"}/>
                    <PasswordInputCustom ref={passwordRef} isWrong={isPasswordWrong} errorMessage={"Erreur sur le mdp"} placeholder={"Mot de passe"}/>
                </View>

                <View style={styles.footer}>
                    <BackgroundTextButton text={"Se connecter"} bold onPress={handleSignIn}/>
                </View>
            </View>
        </UsualScreen>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        display: "flex",
        justifyContent: "space-between",
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
        gap: 0,
        display: "flex",
        justifyContent: "center"
    },

    footer: {
        
    }
})