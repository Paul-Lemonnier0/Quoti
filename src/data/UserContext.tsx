    import React, { Dispatch, FC, ReactNode, createContext } from "react";
    import { useAuthentification } from "../primitives/useAuthentification";
    import { User, UserInfo, updateCurrentUser } from "@firebase/auth";
    import { auth } from "../firebase/InitialisationFirebase";
    import { Image } from "react-native";
    import { useEffect } from "react";
    import { useState } from "react";
    import AsyncStorage from "@react-native-async-storage/async-storage";
    import { getSendedFriendRequest, removeUserFriendFirestore, subscribeToFriendRequests, subscribeToFriends, subscribeToHabitsRequests } from "../firebase/Firestore_User_Primitives";
    import * as FileSystem from 'expo-file-system';
    import { getProfilePictureLocalPath, saveProfilePictureLocally } from "../primitives/UserPrimitives";
    import { newUserValuesProps } from "../screens/ProfilScreens/ProfilSettingsScreens/ProfilDataSettingsScreen";
    import { Database_changeBlockUserState, Database_GetSpecificUser } from "../firebase/Database_User_Primitives";

    export interface UserEventRequest {
        ownerMail: string;
        ownerID: string;
        habitID: string;
    }

    export interface UserFullType extends User {
        friendRequests?: string[],
        habitRequests?: UserEventRequest[],
        friends?: string[],
        firstName: string,
        lastName: string,
        isPrivate?: boolean,
        nbHabits?: number,
        nbGoals?: number,
        nbHabitsFinished?: number,
        nbGoalsFinished?: number,
        nbSucces?: number,
        blocked?: string[],
    } 

    export type UserType = UserFullType | null

    export interface UserContextType {
        user: UserType | null,
        setUser: Dispatch<React.SetStateAction<UserType>>,
        handleSetUser: (newValues: newUserValuesProps) => Promise<void>,
        addUserFriendRequest: (userID: string) => void,
        removeUserFriendRequest: (userID: string) => void,
        sendedFriendRequests: string[],
        hasNotification: () => boolean,
        handleChangeBlockStateForUser: (userToBlockID: string, userToBlockMail: string, block: boolean) => void,
        removeUserFriend: (friendID: string, friendMail: string) => void,
        removeHabitRequest: (habitID: string, ownerID: string) => void
    }

    const UserContext = createContext<UserContextType>({
        user: null,
        setUser: () => {},
        handleSetUser: async() => {},
        addUserFriendRequest: () => {},
        removeUserFriendRequest: () => {},
        sendedFriendRequests: [],
        hasNotification: () => false,
        removeUserFriend: () => {},
        handleChangeBlockStateForUser: () => {},
        removeHabitRequest: () => {}
    })

    export interface UserContextProviderProps {
        children: ReactNode
    }

    const UserContextProvider: FC<UserContextProviderProps> = ({children}) => {

        const [user, setUser] = useState<UserType | null>(auth.currentUser ? {...auth.currentUser, firstName: "unknown", lastName: "unknown"} : null)
        const [sendedFriendRequests, setSendedFriendRequests] = useState<string[]>([])

        if(!user) {
            return null
        }    
        
        const [isLoading, setIsLoading] = useState(false)

        const hasNotification = () => {
            return ((user && user.friendRequests && user.friendRequests.length > 0) || 
                (user && user.habitRequests && user.habitRequests.length > 0)) as boolean
        }

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
        
        const setSendedUserFriendRequest = async(userMail: string) => {
            setSendedFriendRequests(await getSendedFriendRequest(userMail))
        }

        const addUserFriendRequest = (userID: string) => {
            setSendedFriendRequests(prevRequests => [...prevRequests, userID])
        }

        const removeUserFriendRequest = (userID: string) => {
            setSendedFriendRequests(prevRequests => prevRequests.filter(id => id !== userID))
        }

        const removeHabitRequest = (habitID: string, ownerID: string) => {
            if(user && user.habitRequests) {
                setUserHabitsRequests(user.habitRequests?.filter(req => !(req.habitID === habitID && req.ownerID === ownerID)))
            }
        }

        const setUserHabitsRequests = (habitsRequests: Array<any>) => {
            setUser((prevUser) => {
                if(prevUser){
                    return {
                        ...prevUser,
                        habitRequests: [...habitsRequests]
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

            if(newValues.photoURL) {
                const localPhotoURL = await saveProfilePictureLocally(newValues.photoURL, user.uid)

                if(localPhotoURL) {
                    setUser((prevUser) => (prevUser ? {...prevUser, ...newValues, photoURL: localPhotoURL} : null))
                    Image.prefetch(localPhotoURL) 
                }
            }

            else setUser((prevUser) => (prevUser ? {...prevUser, ...newValues} : null))
        }


        const handleChangeBlockStateForUser = (userToBlockID: string, userToBlockMail: string, block: boolean) => {
            Database_changeBlockUserState(user.uid, userToBlockID, !block)

            const isFriend = user.friends?.includes(userToBlockID)

            if(block) {
                if(isFriend) {
                    removeUserFriend(userToBlockID, userToBlockMail)
                }
                setUser((prevUser) => {
                    if(prevUser){
                        return {
                            ...prevUser,
                            blocked: prevUser.blocked ? [...prevUser.blocked, userToBlockID] : [userToBlockID]
                        }
                    }
        
                    return null
                })
            }

            else {
                setUser((prevUser) => {
                    if(prevUser){
                        return {
                            ...prevUser,
                            blocked: prevUser.blocked?.filter(blockedUID => blockedUID !== userToBlockID) ?? []
                        }
                    }
        
                    return null
                })
            }
        }

        const removeUserFriend = async(friendID: string, friendMail: string) => {
            if(user.email) {
                removeUserFriendFirestore(user.uid, user.email, friendID, friendMail)
                setUserFriends(user.friends?.filter(uid => uid !== friendID) ?? [])
            }
        }

        useEffect(() => {
            const handleGetUserInfo = async() => {
                const infos = await Database_GetSpecificUser(user.uid)
                if(infos && infos.firstName && infos.lastName) {
                    setUser((prevUser) => (prevUser ? {...prevUser, firstName: infos.firstName, lastName: infos.lastName, blocked: infos.blocked} : null))
                }
            }
            
            const handleLoadProfilPicture = async() => {
                setIsLoading(true)
                try {
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
                }
                
                catch(e) {
                    console.log("Erreur : ", e)
                }

                setIsLoading(false)
            }

            handleLoadProfilPicture()

            if(user.email) {
                setSendedUserFriendRequest(user.email)
                subscribeToFriendRequests(user.email, setUserFriendRequest)
                subscribeToFriends(user.email, setUserFriends)
                subscribeToHabitsRequests(user.email, setUserHabitsRequests)
                handleGetUserInfo()
            }

        }, [])

        return(
            <UserContext.Provider value={{
                user, setUser, handleSetUser, 
                addUserFriendRequest, removeUserFriendRequest, sendedFriendRequests, removeUserFriend,
                handleChangeBlockStateForUser,
                hasNotification, removeHabitRequest
            }}>
                {children}
            </UserContext.Provider>
        )
    }

    export {UserContext, UserContextProvider}