import { ActionCodeOperation, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "@firebase/auth";
import { auth, db } from "../../firebase/InitialisationFirebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Alert, View } from "react-native";
import { UsualScreen } from "../../components/View/Views";
import { Icon, IconProvider, NavigationButton } from "../../components/Buttons/IconButtons";
import { HugeText, NormalText, SubTitleText } from "../../styles/StyledText";
import { BackgroundTextButton } from "../../components/Buttons/UsualButton";
import { StyleSheet } from "react-native";
import { FC, useContext, useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { useThemeColor } from "../../components/Themed";
import { useRoute } from "@react-navigation/native";
import { Success_Impact } from "../../constants/Impacts";
import { getDatabase, ref, set } from "@firebase/database";
import { Database_setUser } from "../../firebase/Database_User_Primitives";
import { saveProfilPicture } from "../../firebase/Storage_Primitives";
import { AuthContext, AuthStates } from "../../data/AuthContext";
import { AppContext } from "../../data/AppContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthNavigatorStackProps } from "../../navigation/AuthNavigator";

type ChooseProfilPictureScreenProps = NativeStackScreenProps<AuthNavigatorStackProps, "ChooseProfilPictureScreen">

const ChooseProfilPictureScreen: FC<ChooseProfilPictureScreenProps> = () => {

    const secondary = useThemeColor({}, "Secondary")

    const {setIsLoading} = useContext(AppContext)
    const {setUserAuthState} = useContext(AuthContext)

    const user = auth.currentUser
    const username = user?.displayName ?? "unknown"

    const [image, setImage] = useState<string | undefined>(undefined);

    const handleUploadImage = async() => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1
      })

      if(!result.canceled){
        setImage(result.assets[0].uri)
      }
    }

    const handleSignUp = async() => {
        setIsLoading(true)

        try{
            if(user?.uid && image){
                const photoURL = await saveProfilPicture(user.uid, image)
                await updateProfile(user, {photoURL});
                await Database_setUser({...user, displayName: username, photoURL})
           
                setUserAuthState(AuthStates.Ready)                       
            }
        }

        catch(e){
            console.log("Impossible de load l'image : ", e)
        }

        setIsLoading(false)
    }

    const RenderProfilPicture = () => {
        return(
            <View style={styles.subBodyContainer}>
                <TouchableOpacity onPress={handleUploadImage}>
                    <Image source={{ uri: image }} style={styles.image}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleUploadImage}>
                    <SubTitleText text={"Modifier votre photo"}/>
                </TouchableOpacity>
            </View>
        )
    }

    const RenderPlaceholderProfilPicture = () => {
        return(
            <View style={styles.subBodyContainer}>
                <TouchableOpacity onPress={handleUploadImage} 
                    style={[styles.image, {backgroundColor: secondary}]}>
                    <Icon name={"camera"} provider={IconProvider.Feather} size={40}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleUploadImage}>           
                    <SubTitleText text={"Ajouter une photo"}/>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <UsualScreen hideMenu>
            <View style={styles.container}>

                <View style={styles.header}>
                    <View style={styles.subHeader}>
                        <NavigationButton action={"goBack"}/>
                    </View>
                    <HugeText text={"Photo de profil"}/>
                </View>


                <View style={styles.body}>
                    {image ? <RenderProfilPicture/> : <RenderPlaceholderProfilPicture/>}
                </View>
                

                <View style={styles.footer}>
                    <BackgroundTextButton text={"Valider"} bold onPress={handleSignUp}/>
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
        justifyContent: "space-between"
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
        flex: 0.75,
        gap: 0,
        justifyContent: "center",
        alignItems: "center"
    },

    footer: {
        flex: 0.25,
        justifyContent: "flex-end"
    },

    subBodyContainer: {
        display: "flex", 
        flexDirection: "column", 
        gap: 20, 
        justifyContent: "center", 
        alignItems: "center"
    },

    image: {
        width: 200,
        height: 200, 
        borderRadius: 300, 
        alignItems: "center",
        justifyContent: "center"
    }
})

export default ChooseProfilPictureScreen