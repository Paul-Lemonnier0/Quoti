import { UsualScreen } from "../../components/View/Views"
import { MassiveText, NormalText, TitleText } from "../../styles/StyledText"
import { BackgroundTextButton, TextButton } from "../../components/Buttons/UsualButton"
import { StyleSheet } from "react-native"
import { View } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AuthNavigatorStackProps } from "../../navigation/AuthNavigator"
import { FC } from "react"
import React from "react"

type WelcomeScreenProps = NativeStackScreenProps<AuthNavigatorStackProps, "WelcomeScreen">

const WelcomeScreen: FC<WelcomeScreenProps> = ({navigation}) => {

    const handleGoToLoginScreen = () => {
        navigation.navigate("LoginScreen")
    }

    const handleGoToSignUpScreen = () => {
        navigation.navigate("SignUpScreen")
    }

    return(
        <UsualScreen hideMenu>
            <View style={styles.container}>

                <View style={styles.body}>

                    <View style={styles.header}>
                        <View>
                        <MassiveText text=".Daily" style={{fontFamily: "fontSemiBoldPoppins"}}/>
                        <TitleText text="Créez vos habitudes !" style={{fontFamily: "fontMediumPoppins"}}/>
                        </View>
                    </View>

                    <View style={styles.connexionContainer}>

                        <BackgroundTextButton bold text={"S'inscrire"} onPress={handleGoToSignUpScreen}/>
                        
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