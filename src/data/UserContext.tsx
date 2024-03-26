import React, { Dispatch, FC, ReactNode, createContext } from "react";
import { useAuthentification } from "../primitives/useAuthentification";
import { User, UserInfo, updateCurrentUser } from "@firebase/auth";
import { auth } from "../firebase/InitialisationFirebase";
import { Image } from "react-native";
import { useEffect } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { subscribeToFriendRequests, subscribeToFriends } from "../firebase/Firestore_User_Primitives";

export interface UserFullType extends User {
    friendRequests?: string[],
    friends?: string[]
} 

export type UserType = UserFullType | null

export interface UserContextType {
    user: UserType | null,
    setUser: Dispatch<React.SetStateAction<UserType>>
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {}
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

    useEffect(() => {
        const handleLoadProfilPicture = async() => {
            if(user){
                try{
                    setIsLoading(true)
    
                    const storageProfilPictureKey = user.uid + "_" + "picture"
    
                    if(user.photoURL){
    
                        await Image.prefetch(user.photoURL)
                        await AsyncStorage.setItem(storageProfilPictureKey, user.photoURL)
                        setUser((prevUser: UserType) => {
                            if(prevUser){
                                return {
                                    ...prevUser, 
                                    photoURL: user.photoURL
                                }
                            }
                            
                            return null
                        })
                    }
    
                    else {
                        const cachedProfilImage = await AsyncStorage.getItem(storageProfilPictureKey)
                        
                        if(cachedProfilImage){
                            setUser((prevUser: UserType) => {
                                if(prevUser){
                                    return {
                                        ...prevUser, 
                                        photoURL: cachedProfilImage
                                    }
                                }
                                
                                return null
                            })
                        }
                    }
    
                    setIsLoading(false)
                }
    
                catch(e){
                    console.log("Erreur en fetch user image")
                }
            }
        }

        handleLoadProfilPicture()
        subscribeToFriendRequests(user.email ?? "", setUserFriendRequest)
        subscribeToFriends(user.email ?? "", setUserFriends)
    }, [])

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserContextProvider}