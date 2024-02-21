import AsyncStorage from "@react-native-async-storage/async-storage"
import { getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { Image } from "react-native"

export const saveProfilPicture = async(uid: string, uri: string): Promise<string> => {
    const response = await fetch(uri)
    const blob = await response.blob()

    const storage = getStorage()
    const profilPictureKey = ref(storage,`profilPictures/${uid}`)
    const uploadTask = uploadBytesResumable(profilPictureKey, blob)

    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100; 
            },

            (error) => {
                console.log(error);
                reject(error);
            },        

            async() => {

                const storageProfilPictureKey = uid + "_picture"

                await Image.prefetch(uri)
                await AsyncStorage.setItem(storageProfilPictureKey, uri)

                resolve(uri)
            }
        )
    })
}