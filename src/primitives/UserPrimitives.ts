import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { Dispatch } from "react";
import { IMAGE_COMPRESSION, IMAGE_DIMENSIONS, IMAGE_FORMAT } from '../constants/BasicConstants';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUserWithEmailAndPassword, User } from 'firebase/auth';
import { faker } from '@faker-js/faker';

export const selectImage = async(setImage: Dispatch<string | null>) => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1
    })

    if(!result.canceled){
    
        const {uri} = result.assets[0]
        
        const resizedImage = await ImageManipulator.manipulateAsync(uri, 
            [{ resize: IMAGE_DIMENSIONS }],
            {
                compress: IMAGE_COMPRESSION, 
                format: IMAGE_FORMAT
            }
        )

        setImage(resizedImage.uri)
    }
}

export const saveProfilePictureLocally = async (uri: string, uid: string): Promise<string | null> => {
    try {
        const fileName = `${uid}.jpg`; 
        const directory = `${FileSystem.cacheDirectory}profilePictures/`;
        const path = `${directory}${fileName}`;
        
        const downloadResumable = FileSystem.createDownloadResumable(uri, path)
        const result = await downloadResumable.downloadAsync()

        if(result) {
            await AsyncStorage.removeItem('picture_'+uid)
            await AsyncStorage.setItem('picture_'+uid, result.uri);
            return result.uri;
        }
        
        return null
    } catch (error) {
        console.error('Erreur lors de la sauvegarde de la photo de profil:', error);
        return null;
    }
};


export const getProfilePictureLocalPath = async (uid: string): Promise<string | null> => {
    try {
        const profilPicture = await AsyncStorage.getItem("picture_"+uid)
        return profilPicture
    } catch (error) {
        console.error('Erreur lors de la récupération de la photo de profil:', error);
        return null;
    }
};

export interface BaseUserType {
    displayName: string,
    email: string,
    isPrivate: boolean,
    firstName: string,
    lastName: string,
    password: string
}

function generateRandomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
}


export const generateRandomUsers = (nbUsers: number): BaseUserType[] => {
    const users: BaseUserType[] = []
    
    for(let i = 0; i<nbUsers; ++i) {
        let value = generateRandomInteger(10);

        users.push({
            displayName: faker.person.fullName(),
            email: faker.internet.email(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            isPrivate: value % 2 === 0,
            password: faker.internet.password()
        })
    }
    
    return users
}