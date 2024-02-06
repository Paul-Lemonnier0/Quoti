import { View, StyleSheet } from "react-native"
import { HugeText, LittleNormalText, MassiveText, NormalGrayText, NormalText, SubText, SubTitleGrayText, SubTitleText, TitleText } from "../../styles/StyledText"
import { useRef, useMemo, useCallback, useState } from "react"
import { useThemeColor } from "../../components/Themed"
import { useNavigation } from "@react-navigation/native"
import { UsualScreen } from "../../components/View/Views"
import { NavigationButton } from "../../components/Buttons/IconButtons"
import { ProfilButton } from "../../components/Profil/ProfilButton"
import { Image } from "react-native"
import { useContext } from "react"
import { HabitsContext } from "../../data/HabitContext"
import { signOut, updateProfile } from "@firebase/auth"
import { auth } from "../../firebase/InitialisationFirebase"
import { BackgroundTextButton, BorderTextButton, TextButton } from "../../components/Buttons/UsualButton"
import { UserContext } from "../../data/UserContext"
import { TouchableOpacity } from "react-native"
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { onSnapshot } from "firebase/firestore"
import { useAuthentification } from "../../primitives/useAuthentification"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { TextInputCustom } from "../../components/TextFields/TextInput"
import Separator from "../../components/Other/Separator"
import { Error_Impact, Success_Impact } from "../../constants/Impacts"
import { Database_setUser } from "../../firebase/Database_User_Primitives"
import { saveProfilPicture } from "../../firebase/Storage_Primitives"
import { IMAGE_COMPRESSION, IMAGE_DIMENSIONS, IMAGE_FORMAT } from "../../constants/BasicConstants"
import * as ImageManipulator from 'expo-image-manipulator';
import { AppContext } from "../../data/AppContext"



const ProfilSettingsScreen = () => {

    const {setIsLoading} = useContext(AppContext)
    const {user, setUser} = useContext(UserContext)

    const navigation = useNavigation()

    const displayNameRef = useRef()

    const secondary = useThemeColor({}, "Secondary")

    const [isDisplayNameWrong, setIsDisplayNameWrong] = useState(false)
    const [profilPicture, setProfilPicture] = useState(user.photoURL)



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

    const handleModificationValidation = async() => {


        const newDisplayName = displayNameRef.current?.getValue()

        if(newDisplayName !== ""){
            setIsLoading(true)
            setIsDisplayNameWrong(false)
            let newValues = {}

            if(profilPicture !== user.photoURL){
                try{
                    const photoURL = await saveProfilPicture(user.uid, profilPicture)
                    newValues = {...newValues, photoURL}
                }
    
                catch(e){
                    console.log("Impossible de load l'image : ", e)
                }
            }

            if(user.displayName !== newDisplayName){
                newValues = {...newValues, displayName: newDisplayName}
            }

            try{
                await updateProfile(auth.currentUser, {...newValues})
                setUser((prevUser) => ({...prevUser, ...newValues}))
                await Database_setUser({...user, ...newValues})

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
        const firstUsernameLetter = user.displayName.substr(0,1)
  
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
                        labelName={"Nom d'utilisateur"} boldLabel startingValue={user.displayName}/>
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