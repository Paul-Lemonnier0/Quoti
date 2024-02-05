import { createContext } from "react";
import { useAuthentification } from "../primitives/useAuthentification";
import { updateCurrentUser } from "@firebase/auth";
import { auth } from "../firebase/InitialisationFirebase";
import { Image } from "react-native";
import { useEffect } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { subscribeToFriendRequests, subscribeToFriends } from "../firebase/Firestore_User_Primitives";

const UserContext = createContext()

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(auth.currentUser)
    if(!user) {
        return null
    }
    
    const userBis = useAuthentification()
    const [isLoading, setIsLoading] = useState(false)

    const setUserFriendRequest = (friendRequests) => {
        setUser((prevUser) => ({
            ...prevUser,
            friendRequests: [...friendRequests]
        }))
    }

    const setUserFriends = (friends) => {
        setUser((prevUser) => ({
            ...prevUser,
            friends: [...friends]
        }))
    }

    useEffect(() => {
        const handleLoadProfilPicture = async() => {
            try{
                setIsLoading(true)

                if(user.photoURL){

                    await Image.prefetch(user.photoURL)
                    await AsyncStorage.setItem(storageProfilPictureKey, user.photoURL)
                    setUser((prevUser) => ({...prevUser, photoURL: user.photoURL}))
                }

                else {
                    const storageProfilPictureKey = user.uid + "_" + "picture"
                    const cachedProfilImage = await AsyncStorage.getItem(storageProfilPictureKey)
                    
                    if(cachedProfilImage){
                        setUser((prevUser) => ({...prevUser, photoURL: cachedProfilImage}))
                    }
                }

                setIsLoading(false)
            }

            catch(e){
                console.log("Erreur en fetch user image")
            }

        }

        handleLoadProfilPicture()
        subscribeToFriendRequests(user.email, setUserFriendRequest)
        subscribeToFriends(user.email, setUserFriends)
    }, [])

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserContextProvider}