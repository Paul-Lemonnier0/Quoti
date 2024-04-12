import React, { FC, useContext, useRef, useState } from 'react'
import { Image, View } from 'react-native'
import { CustomScrollView, UsualScreen } from '../../../components/View/Views'
import { NavigationActions, NavigationButton } from '../../../components/Buttons/IconButtons'
import ProfilButton from '../../../components/Profil/ProfilButton'
import { auth } from '../../../firebase/InitialisationFirebase'
import { HugeText, NormalGrayText } from '../../../styles/StyledText'
import { StyleSheet } from 'react-native'
import { CustomTextInputRefType, TextInputCustom } from '../../../components/TextFields/TextInput'
import { DatePicker } from '../../../components/TextFields/DatePicker'
import SelectDateBottomScreen from '../../BottomScreens/SelectDateBottomScreen'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import Separator from '../../../components/Other/Separator'
import { Database_setUser } from "../../../firebase/Database_User_Primitives"
import { saveProfilPicture } from "../../../firebase/Storage_Primitives"
import { IMAGE_COMPRESSION, IMAGE_DIMENSIONS, IMAGE_FORMAT } from "../../../constants/BasicConstants"
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { getProfilePictureLocalPath, saveProfilePictureLocally, selectImage } from '../../../primitives/UserPrimitives'
import { AppContext } from '../../../data/AppContext'
import { isTextInputValueValid } from '../../../primitives/BasicsMethods'
import { updateEmail, updateProfile } from 'firebase/auth'
import { UserContext, UserType } from '../../../data/UserContext'
import { Error_Impact, Success_Impact } from '../../../constants/Impacts'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeStackParamsList } from '../../../navigation/BottomTabNavigator'

type ProfilDataSettingsScreenProps = NativeStackScreenProps<HomeStackParamsList, "ProfilDataSettingsScreen">

export interface newUserValuesProps {
    photoURL?: string | null,
    displayName?: string,
    email?: string,
    fullName?: string
}

const ProfilDataSettingsScreen: FC<ProfilDataSettingsScreenProps> = ({navigation}) => {

    const {user, handleSetUser} = useContext(UserContext)
    const {setIsLoading} = useContext(AppContext)

    const [profilPicture, setProfilPicture] = useState<string | null>(user?.photoURL ?? null)

    const [isDisplayNameWrong, setIsDisplayNameWrong] = useState<boolean>(false)
    const [isFullNameWrong, setIsFullNameWrong] = useState<boolean>(false)
    const [isEmailWrong, setIsEmailWrong] = useState<boolean>(false)
    const [birthDate, setBirthDate] = useState<Date>(new Date())

    const displayNameRef = useRef<CustomTextInputRefType>(null)
    const fullNameRef = useRef<CustomTextInputRefType>(null)
    const emailRef = useRef<CustomTextInputRefType>(null)

    const calendarBottomRef = useRef<BottomSheetModal>(null)

    const handleOpenCalendar = () => {
        calendarBottomRef.current?.present()
    }

    const handleEditProfilPicture = async() => {
        await selectImage(setProfilPicture)
    }

  

    const handleValidation = async() => {
        const newDisplayName = displayNameRef.current?.getValue()
        const newFullName = fullNameRef.current?.getValue()
        const newEmail = emailRef.current?.getValue()

        if(user && newDisplayName && newFullName && newEmail &&
            isTextInputValueValid(newDisplayName) && isTextInputValueValid(newFullName) && isTextInputValueValid(newEmail)
        ) {
            setIsLoading(true)

            setIsDisplayNameWrong(false)
            setIsFullNameWrong(false)
            setIsEmailWrong(false)

            const newValues: newUserValuesProps = {}
            if(user.photoURL !== profilPicture && profilPicture) {
                if(user.uid) {                    
                    const downloadedPhotoURL = await saveProfilPicture(user.uid, profilPicture)
                    newValues.photoURL = downloadedPhotoURL
                }
            }

            if(user.displayName !== newDisplayName)
                newValues.displayName = newDisplayName
         
            if(user.email !== newEmail) 
                newValues.email = newEmail
            
            try {
                if(auth.currentUser && user){
                    await updateProfile(auth.currentUser, {...newValues})
                    if(newValues.email) {
                        await updateEmail(auth.currentUser, newValues.email)
                    }
    
                    const updatedUser: UserType = {
                        ...user,
                        ...newValues
                    }

                    handleSetUser({...newValues})
                    await Database_setUser(updatedUser)
                    Success_Impact()
                    navigation.goBack()
                }

                setIsLoading(false)
            }

            catch(e) {
                console.log("Erreur lors de la mise à jour du profil : ", e)   
                Error_Impact()
                setIsLoading(false)
            }
        }

        else {
            Error_Impact()
            setIsDisplayNameWrong(!isTextInputValueValid(newDisplayName))
            setIsEmailWrong(!isTextInputValueValid(newEmail))
            setIsFullNameWrong(!isTextInputValueValid(newFullName))
        }
    }

    return (
        <UsualScreen hideMenu>
            <View style={[styles.container]}>
                <View style={styles.header}>
                    <View style={styles.subHeader}>
                        <NavigationButton action={NavigationActions.goBack}/>
                        <NavigationButton action={NavigationActions.validation} methode={handleValidation}/>
                    </View>
                </View>

                <CustomScrollView>
                    <View style={styles.body}>
                        <View style={styles.bodyHeader}>
                            {user && <ProfilButton tall modificationBadge user={{...user, photoURL: profilPicture}} onPress={handleEditProfilPicture}/>}
                            <View style={styles.titreEtDescriptionContainer}>
                                <HugeText text={user?.displayName ?? "unknown"}/>
                                <NormalGrayText text={user?.email ?? "unknown"} />
                            </View>
                        </View>

                        <Separator/>

                        <TextInputCustom ref={displayNameRef} startingValue={user?.displayName ?? undefined}
                            isWrong={isDisplayNameWrong}
                            placeholder={"Entrer votre nom d'utilisateur..."} labelName={"Nom d'utilisateur"} semiBold/>

                        <TextInputCustom ref={fullNameRef} startingValue={user?.displayName ?? undefined}
                            isWrong={isFullNameWrong}
                            placeholder={"Entrer votre nom complet..."} labelName={"Nom complet"} semiBold/>

                        <Separator/>

                        <DatePicker label={"Date d'anniversaire"} semiBoldLabel
                            date={birthDate}
                            onPress={handleOpenCalendar}/>
                            
                        <TextInputCustom ref={emailRef} startingValue={user?.email ?? undefined}
                            isWrong={isEmailWrong}
                            placeholder={"Entrer votre mail..."} labelName={"Email"} semiBold/>
                    </View>
                </CustomScrollView>
            </View>

            <SelectDateBottomScreen
                bottomSheetModalRef={calendarBottomRef}
                selectedDate={birthDate}
                setSelectedDate={setBirthDate}
            />
        </UsualScreen>
    )
}

const styles = StyleSheet.create({
    container: {
      display: "flex", 
      flexDirection: "column", 
      gap: 20, 
      flex: 1, 
      marginBottom: 0    
    },

    header: {
        display: "flex", 
        flexDirection: "column", 
        gap: 20,
        marginBottom: 5
    },

    titreEtDescriptionContainer:{
        display: "flex", 
        flex: 1,
        flexDirection: "column", 
        justifyContent: "center",
        gap: 0
    },

    subHeader: {
      display: "flex", 
      flexDirection: "row", 
      alignItems:"center", 
      justifyContent: "space-between"
    },

    body: {
        flex: 1, 
        gap: 30,
    },

    imageStyle: {
      alignSelf: 'center',
      justifyContent: 'center',
      resizeMode: 'contain',
      aspectRatio: 1,
      flex: 1,      
      borderRadius: 200,
    },

    imageContainerStyle: {
      aspectRatio: 1,
      width: 120,
      alignItems: 'center',
      justifyContent: 'center', 
    },

    bodyHeader: {
        flexDirection: "row",
        gap: 20
    },

    bodyCore: {
        gap: 20
    }
});
  
export default ProfilDataSettingsScreen