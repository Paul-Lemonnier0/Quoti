import { useNavigation } from "@react-navigation/native"
import { UsualScreen } from "../../components/View/Views"
import { HugeText, MassiveText, NormalText, TitleText } from "../../styles/StyledText"
import { BackgroundTextButton, BorderTextButton, TextButton } from "../../components/Buttons/UsualButton"
import { StyleSheet } from "react-native"
import { View } from "react-native"

export default WelcomeScreen = () => {

    const navigation = useNavigation()

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