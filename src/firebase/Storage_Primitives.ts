import AsyncStorage from "@react-native-async-storage/async-storage"
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage"
import { Image } from "react-native"

export const saveProfilPicture = async(uid: string, uri: string): Promise<string> => {
    try {
        const response = await fetch(uri)
        const blob = await response.blob()

        const storage = getStorage()
        const profilPictureRef = ref(storage,`profilPictures/${uid}`)

        const uploadTask = uploadBytesResumable(profilPictureRef, blob)
        return new Promise<string>((resolve, reject) => {
            uploadTask.then(() => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL)
                }).catch(reject)
            }).catch(reject)
        })
    }

    catch(e) {
        console.log("Error while updating user profil picture : ", e)
        throw e
    }
}