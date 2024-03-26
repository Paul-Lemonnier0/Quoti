import { View, StyleSheet } from "react-native"
import { MassiveText, SubTitleText } from "../../styles/StyledText"
import { useRef, useState, FC } from "react"
import { useThemeColor } from "../../components/Themed"
import { UsualScreen } from "../../components/View/Views"
import { NavigationButton } from "../../components/Buttons/IconButtons"
import { Image } from "react-native"
import { useContext } from "react"
import { auth } from "../../firebase/InitialisationFirebase"
import { UserContext, UserType } from "../../data/UserContext"
import { TouchableOpacity } from "react-native"
import * as ImagePicker from 'expo-image-picker';
import { CustomTextInputRefType, TextInputCustom } from "../../components/TextFields/TextInput"
import Separator from "../../components/Other/Separator"
import { Error_Impact, Success_Impact } from "../../constants/Impacts"
import { Database_setUser } from "../../firebase/Database_User_Primitives"
import { saveProfilPicture } from "../../firebase/Storage_Primitives"
import { IMAGE_COMPRESSION, IMAGE_DIMENSIONS, IMAGE_FORMAT } from "../../constants/BasicConstants"
import * as ImageManipulator from 'expo-image-manipulator';
import { AppContext } from "../../data/AppContext"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { HomeStackParamsList } from "../../navigation/BottomTabNavigator"
import { updateProfile } from "firebase/auth"
import React from "react"

type ProfilSettingsScreenProps = NativeStackScreenProps<HomeStackParamsList, "ProfilSettingsScreen">

const ProfilSettingsScreen: FC<ProfilSettingsScreenProps> = ({navigation}) => {

    const {setIsLoading} = useContext(AppContext)
    const {user, setUser} = useContext(UserContext)

    const displayNameRef = useRef<CustomTextInputRefType>(null)

    const secondary = useThemeColor({}, "Secondary")

    const [isDisplayNameWrong, setIsDisplayNameWrong] = useState(false)
    const [profilPicture, setProfilPicture] = useState(user?.photoURL ?? "")



    const handleUploadImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1
        })

        if(!result.canceled){
        
            const {uri} = result.assets[0]
            
            const resizedImage = await ImageManipulator.manipulateAsync(uri, 
                [{
                    resize: IMAGE_DIMENSIONS
                }],
                {
                    compress: IMAGE_COMPRESSION, 
                    format: IMAGE_FORMAT
                }
            )

            setProfilPicture(resizedImage.uri)
        }
    }

    interface newValuesProps {
        photoUrl: string | undefined,
        displayName: string | undefined,
    }

    const handleModificationValidation = async() => {
        const newDisplayName = displayNameRef.current?.getValue()

        if(newDisplayName !== "" && user){
            setIsLoading(true)
            setIsDisplayNameWrong(false)
            const newValues: newValuesProps = {
                photoUrl: user?.photoURL ?? undefined,
                displayName: user?.displayName ?? undefined
            }

            if(profilPicture !== user?.photoURL){
                try{
                    if(user?.uid){
                        const photoURL = await saveProfilPicture(user.uid, profilPicture)
                        newValues.photoUrl = photoURL
                    }
                }
    
                catch(e){
                    console.log("Impossible de load l'image : ", e)
                }
            }

            if(user?.displayName !== newDisplayName){
                newValues.displayName = newDisplayName
            }

            try{
                if(auth.currentUser){
                    await updateProfile(auth.currentUser, {...newValues})
                }

                const updatedUser: UserType = {
                    ...newValues,
                    ...user
                }

                setUser(updatedUser)

                await Database_setUser(updatedUser);

                Success_Impact()
                navigation.goBack()
            }

            catch(e){
                console.log("Impossible de mettre à jour le profil : ", e)
            }

            Error_Impact()
            setIsLoading(false)
        }

        else {
            Error_Impact()
            setIsDisplayNameWrong(true)
        }
    }    

    const RenderPlaceholderProfilPicture = () => {
        const firstUsernameLetter = user?.displayName?.substring(0,1) ?? "A"
  
        return(
            <View style={[styles.imageStyle, {justifyContent: "center", alignItems: "center", backgroundColor: secondary }]}>
                <MassiveText text={firstUsernameLetter}/>
            </View>
        )
      }

    return(
        <UsualScreen>
          <View style={[styles.container]}>
                <View style={styles.header}>
                    <View style={styles.subHeader}>
                        <NavigationButton action={"goBack"}/>
                        <NavigationButton action={"validation"} noPadding methode={handleModificationValidation}/>
                    </View>
                </View>

                <View style={styles.body}>
                    <View style={{display: "flex", flexDirection: "column", gap: 20, alignItems: "center"}}>
                        <TouchableOpacity style={styles.imageContainerStyle} onPress={handleUploadImage}>
                            {
                                profilPicture ?
                                <Image style={styles.imageStyle} source={{uri: profilPicture}}/>
                                :
                                <RenderPlaceholderProfilPicture/>
                            }
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={handleUploadImage} style={{display: "flex", flexDirection: "row"}}>
                            <SubTitleText text={"Modifier la photo de profil"}/>
                        </TouchableOpacity>
                    </View>
                        
                    <Separator/>

                    <TextInputCustom ref={displayNameRef} isWrong={isDisplayNameWrong} errorMessage={"Entrez un nom d'utilisateur valide"} 
                        labelName={"Nom d'utilisateur"} boldLabel startingValue={user?.displayName ?? ""}/>
                </View>
          </View>
        </UsualScreen>
    );
  };
  
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
        gap: 20
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
  }
});
  
export default ProfilSettingsScreen;