import { useNavigation } from "@react-navigation/native"
import { UsualScreen } from "../../components/View/Views"
import { HugeText } from "../../styles/StyledText"
import { BorderTextButton } from "../../components/Buttons/UsualButton"
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
        <UsualScreen>
            <View style={styles.container}>
                <HugeText text="Welcome !"/>

                <BorderTextButton text={"Se connecter"} onPress={handleGoToLoginScreen}/>
                <BorderTextButton text={"S'inscrire"} onPress={handleGoToSignUpScreen}/>
            </View>
        </UsualScreen>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        display: "flex",
    }
})