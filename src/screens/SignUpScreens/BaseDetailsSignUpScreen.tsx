import { createUserWithEmailAndPassword } from "@firebase/auth"
import { View } from "react-native"
import { HugeText, NormalText, SubText, SubTitleText } from "../../styles/StyledText"
import { UsualScreen } from "../../components/View/Views"
import { StyleSheet } from "react-native"
import { CustomTextInputRefType, PasswordInputCustom, TextInputCustom } from "../../components/TextFields/TextInput"
import { BackgroundTextButton, TextButton } from "../../components/Buttons/UsualButton"
import { FC, useCallback, useContext, useRef } from "react"
import { useState } from "react"
import { auth, db } from "../../firebase/InitialisationFirebase"
import { Icon, IconProvider, NavigationActions, NavigationButton } from "../../components/Buttons/IconButtons"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { updateProfile } from "firebase/auth"
import SocialButton, { SocialConnectionWay } from "../../components/Buttons/SocialButton"
import Separator from "../../components/Other/Separator"
import { Error_Impact, Success_Impact } from "../../constants/Impacts"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AuthNavigatorStackProps } from "../../navigation/AuthNavigator"
import React from "react"
import { AppContext } from "../../data/AppContext"
import { DatePicker } from "../../components/TextFields/DatePicker"
import SelectDateBottomScreen from "../BottomScreens/SelectDateBottomScreen"
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { TouchableOpacity } from "react-native"
import { useThemeColor } from "../../components/Themed"
import { Switch } from "react-native"

type BaseDetailsSignUpScreenProps = NativeStackScreenProps<AuthNavigatorStackProps, "BaseDetailsSignUpScreen">

const BaseDetailsSignUpScreen: FC<BaseDetailsSignUpScreenProps> = ({navigation}) => {

    const {setIsLoading, theme} = useContext(AppContext)
    const fontGray = useThemeColor(theme, "FontGray")
    const secondary = useThemeColor(theme, "Secondary")

    const firstNameRef = useRef<CustomTextInputRefType>(null)
    const [isFirstNameWrong, setIsFirstNameWrong] = useState<boolean>(false)

    const lastNameRef = useRef<CustomTextInputRefType>(null)
    const [isLastNameWrong, setIsLastNameWrong] = useState<boolean>(false)

    const handleGoNext = async() => {

        const firstName = firstNameRef.current?.getValue()
        const lastName = lastNameRef.current?.getValue()

        if(!firstName || firstName?.trim().length === 0){
            setIsFirstNameWrong(true)
        }

        else if(!lastName || lastName?.trim().length === 0){
            setIsLastNameWrong(true)
        }

        else{

        }

        if(firstName && lastName){
            if(firstName.trim().length > 0 && lastName.trim().length > 0)
            {    
                setIsFirstNameWrong(false)
                setIsLastNameWrong(false)
    
                navigation.navigate("SignUpScreen", {
                    firstName: firstName,
                    lastName: lastName,
                    isPrivate: isPrivateAccount,
                })
            }

            else {
                setIsFirstNameWrong(firstName.trim().length <= 0)
                setIsLastNameWrong(lastName.trim().length <= 0)            
            }
        }
        
        else {
            setIsFirstNameWrong(!firstName)
            setIsLastNameWrong(!lastName)
        }
    }

    const [isPrivateAccount, setIsPrivateAccount] = useState<boolean>(true)

    const handleSwitchPrivateProfil = () => {
        setIsPrivateAccount(!isPrivateAccount)
    }

    return (
        <UsualScreen hideMenu>
            <View style={styles.container}>

                <View style={styles.header}>
                    <View style={styles.subHeader}>
                        <NavigationButton action={NavigationActions.goBack}/>
                        <NavigationButton action={NavigationActions.goNext} methode={handleGoNext}/>
                    </View>
                    <HugeText text={"Inscription"}/>
                </View>


                <View style={styles.body}>
                    <TextInputCustom ref={firstNameRef} isWrong={isFirstNameWrong} labelName="Prénom" boldLabel placeholder={"Entrer votre prénom..."}/>
                    <TextInputCustom ref={lastNameRef} isWrong={isLastNameWrong}labelName="Nom" boldLabel placeholder={"Entrer votre nom..."}/>
                    
                    <Separator/>
                    
                    <View style={{flexDirection: "row", justifyContent: "space-between", paddingVertical: 20}}>
                        <View style={{flexDirection: "row", gap: 20, alignItems: "center", flex: 1}}>
                            <Icon name={"eye-off"} provider={IconProvider.Feather} color={fontGray} size={26}/>
                            <SubTitleText text={"Compte privé"}/>
                        </View>

                        <Switch value={isPrivateAccount} onValueChange={handleSwitchPrivateProfil} trackColor={{false: secondary, true: secondary}}/>
                        
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
        flexDirection: "row",
        justifyContent: "space-between"
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

export default BaseDetailsSignUpScreen