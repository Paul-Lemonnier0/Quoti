import React, { Dispatch, FC, ReactNode, createContext } from "react";
import { useAuthentification } from "../primitives/useAuthentification";
import { User, UserInfo, updateCurrentUser } from "@firebase/auth";
import { auth } from "../firebase/InitialisationFirebase";
import { Image } from "react-native";
import { useEffect } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { subscribeToFriendRequests, subscribeToFriends } from "../firebase/Firestore_User_Primitives";
import * as FileSystem from 'expo-file-system';
import { getProfilePictureLocalPath, saveProfilePictureLocally } from "../primitives/UserPrimitives";
import { newUserValuesProps } from "../screens/ProfilScreens/ProfilSettingsScreens/ProfilDataSettingsScreen";

export interface UserFullType extends User {
    friendRequests?: string[],
    friends?: string[]
} 

export type UserType = UserFullType | null

export interface UserContextType {
    user: UserType | null,
    setUser: Dispatch<React.SetStateAction<UserType>>,
    handleSetUser: (newValues: newUserValuesProps) => Promise<void>
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
    handleSetUser: async() => {}
})

export interface UserContextProviderProps {
    children: ReactNode
}

const UserContextProvider: FC<UserContextProviderProps> = ({children}) => {

    const [user, setUser] = useState<UserType | null>(auth.currentUser)
    if(!user) {
        return null
    }
    
    const [isLoading, setIsLoading] = useState(false)

    const setUserFriendRequest = (friendRequests: Array<any>) => {
        setUser((prevUser) => {
            if(prevUser){
                return {
                    ...prevUser,
                    friendRequests: [...friendRequests]
                }
            }

            return null
        })
    }

    const setUserFriends = (friends: Array<string>) => {
        setUser((prevUser: UserType) => {
            if(prevUser){
                return {
                    ...prevUser,
                    friends: [...friends]
                }
            }

            return null
        })
    }

    const handleSetUser = async(newValues: newUserValuesProps) => {
        setUser((prevUser) => (prevUser ? {...prevUser, ...newValues, photoURL: newValues.photoURL ?? prevUser.photoURL} : null))

        if(newValues.photoURL) {
            const localPhotoURL = await saveProfilePictureLocally(newValues.photoURL, user.uid)

            if(localPhotoURL) {
                setUser((prevUser) => (prevUser ? {...prevUser, photoURL: localPhotoURL} : null))
                Image.prefetch(localPhotoURL) 
            }
        }
    }

    useEffect(() => {
        const handleLoadProfilPicture = async() => {
            setIsLoading(true)
            const profilPicturePath = await getProfilePictureLocalPath(user.uid)
            if(profilPicturePath) {
                setUser((prevUser) => (prevUser ? {...prevUser, photoURL: profilPicturePath} : null))
                Image.prefetch(profilPicturePath)
            }

            else {
                if(user.photoURL) {
                    const profilPicturePath = await saveProfilePictureLocally(user.photoURL, user.uid)
                    if(profilPicturePath) {
                        setUser((prevUser) => (prevUser ? {...prevUser, photoURL: profilPicturePath} : null))
                        Image.prefetch(profilPicturePath)
                    }
                }
            }

            setIsLoading(false)
        }

        handleLoadProfilPicture()

        subscribeToFriendRequests(user.email ?? "", setUserFriendRequest)
        subscribeToFriends(user.email ?? "", setUserFriends)
    }, [])

    return(
        <UserContext.Provider value={{user, setUser, handleSetUser}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserContextProvider}