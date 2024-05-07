import { UsualScreen } from "../../components/View/Views"
import { MassiveText, NormalText, TitleText } from "../../styles/StyledText"
import { BackgroundTextButton, TextButton } from "../../components/Buttons/UsualButton"
import { StyleSheet } from "react-native"
import { View } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AuthNavigatorStackProps } from "../../navigation/AuthNavigator"
import { FC, useContext } from "react"
import React from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase/InitialisationFirebase"
import { AuthContext, AuthStates } from "../../data/AuthContext"
import { AppContext } from "../../data/AppContext"
import { useThemeColor } from "../../components/Themed"

type WelcomeScreenProps = NativeStackScreenProps<AuthNavigatorStackProps, "WelcomeScreen">

const WelcomeScreen: FC<WelcomeScreenProps> = ({navigation}) => {

    const {theme} = useContext(AppContext)
    const fontGray = useThemeColor(theme, 'FontGray')

    const {setUserAuthState} = useContext(AuthContext)

    const handleGoToLoginScreen = () => {
        navigation.navigate("LoginScreen")
    }

    const handleGoToBaseDetailsSignUpScreen = () => {
        navigation.navigate("BaseDetailsSignUpScreen")
    }

    const connectToDarkCreep = async() => {
        console.log("connection to zazou...")
        await signInWithEmailAndPassword(auth, "paul.lemonnier7@gmail.com", "123456");
        setUserAuthState(AuthStates.Ready)

      }
  
      const connectToArzakal = async() => {
        console.log("connection to arzakal...")
  
        try {
            await signInWithEmailAndPassword(auth, "paul.lemonnier49070@gmail.com", "123456");
            setUserAuthState(AuthStates.Ready)

        }

        catch(e) {
            console.log("erreur connection à arzakal : ", e)
        }
      }

    return(
        <UsualScreen hideMenu>
            <View style={styles.container}>

                <View style={styles.body}>

                    <View style={styles.header}>
                        <View>
                        <MassiveText text="quoti." style={{fontFamily: "fontSemiBoldPoppins"}}/>
                        <TitleText text="Créez vos habitudes !" style={{fontFamily: "fontMediumPoppins"}}/>
                        </View>
                    </View>

                    <View style={styles.connexionContainer}>

                        <View style={{flexDirection: 'row', justifyContent: 'center', gap: 20}}>
                            <BackgroundTextButton text={"Zazou"} bold onPress={connectToDarkCreep}/>
                            <BackgroundTextButton text={"Arzakal"} bold onPress={connectToArzakal}/>
                        </View>
                        
                        <BackgroundTextButton bold text={"S'inscrire"} onPress={handleGoToBaseDetailsSignUpScreen}/>
                        
                        <View style={styles.footer}>
                            <NormalText text={"Déjà membre ? "} style={{color: fontGray}}/> 
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
        gap: 20,
        display: "flex",
        marginBottom: 20
    },

    header: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    body: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    connexionContainer: {
        width: "100%",
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

export default WelcomeScreen