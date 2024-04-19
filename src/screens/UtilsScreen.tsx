import {FlatList, StyleSheet, Image, View, TextInput} from 'react-native';
import { UsualScreen } from '../components/View/Views';
import { HugeText, NormalText } from '../styles/StyledText';
import { BackgroundTextButton, BorderTextButton } from '../components/Buttons/UsualButton';
import * as ImagePicker from 'expo-image-picker';
import { useContext, useRef, useState } from 'react';
import { Database_getAllUsers, Database_setUser } from '../firebase/Database_User_Primitives';
import { useEffect } from 'react';
import ProfilItem from '../components/Profil/ProfilItem';
import { CustomTextInputRefType, SearchBarCustom } from '../components/TextFields/TextInput'
import { AppContext } from '../data/AppContext';
import { BackgroundIconButton, IconButton, IconProvider, NavigationActions, NavigationButton } from '../components/Buttons/IconButtons';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, User } from 'firebase/auth';
import React from "react"
import { habitsPlaceholder, ObjectifPlaceholder_Meditation, ObjectifPlaceholder_SemiMarathon } from '../data/HabitsPlaceholder';
import { HabitsContext } from '../data/HabitContext';
import { generateRandomUsers } from '../primitives/UserPrimitives';
import { auth, db } from '../firebase/InitialisationFirebase';
import { Success_Impact } from '../constants/Impacts';
import { doc, getDoc, setDoc } from 'firebase/firestore';


const UtilsScreen = () => {

    const {addHabit, addObjectif} = useContext(HabitsContext);

    const {setIsLoading} = useContext(AppContext)

    const handleAddHabitsPlaceholder = async() => {
      try{
  
        setIsLoading(true)
  
        const obj_hab_SemiMarathon = ObjectifPlaceholder_SemiMarathon()
        const obj_hab_BienEtre = ObjectifPlaceholder_Meditation()
  
        const objectifWithID_Semi = await addObjectif(obj_hab_SemiMarathon["objectif"]) 
        if(objectifWithID_Semi?.objectifID){
          const updatedHabitsForObjectif_Semi = obj_hab_SemiMarathon["habits"].map(habit => ({...habit, objectifID: objectifWithID_Semi.objectifID}))
          await Promise.all(updatedHabitsForObjectif_Semi.map(addHabit));
        }
  
        const objectifWithID_BienEtre = await addObjectif(obj_hab_BienEtre["objectif"]) 
        if(objectifWithID_BienEtre?.objectifID){
          const updatedHabitsForObjectif_BienEtre = obj_hab_BienEtre["habits"].map(habit => ({...habit, objectifID: objectifWithID_BienEtre.objectifID}))
          await Promise.all(updatedHabitsForObjectif_BienEtre.map(addHabit));
        }
  
        await Promise.all(habitsPlaceholder.map(addHabit));
  
        setIsLoading(false)
  
      }
      catch(e){
        setIsLoading(false)
        console.log("Erreur add placeholder habits : ", e)
      }
    }
    const handleAddBunchOfUsers = async() => {
      const randomUsers = generateRandomUsers(20)

      setIsLoading(true)

      randomUsers.forEach(async(randomUser) => {
        const {user} = await createUserWithEmailAndPassword(auth, randomUser.email, randomUser.password)
        await Database_setUser({...user, displayName: randomUser.displayName}, randomUser.firstName, randomUser.lastName, randomUser.isPrivate)

        await updateProfile(user, {displayName: randomUser.displayName})

        const userDocRef = doc(db, "Users", randomUser.email.toLowerCase())
        const docSnapshot = await getDoc(userDocRef);
    
        if (!docSnapshot.exists()) {
            await setDoc(userDocRef, {});
            
            Success_Impact()
        }     

      })

      setIsLoading(false)
    }



    return(
        <UsualScreen>
          <View style={styles.container}>

              <View style={styles.header}>
                <View style={styles.subHeader}>
                    <NavigationButton noPadding action={NavigationActions.goBack}/>
                </View>
                <HugeText text="Fonctions de test"/>
              </View>




            <View style={styles.body}>
              <View style={{flex: 1}}/>
              {/* <BackgroundTextButton text={"Ajouter des utilisateurs"} bold onPress={handleAddBunchOfUsers}/> */}
              <BackgroundTextButton text={"Ajouter des habitudes"} bold onPress={handleAddHabitsPlaceholder}/>

            </View>
          </View>
        </UsualScreen>
    )
}

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
        display: 'flex',
        flexDirection: 'column'
    },
});

export default UtilsScreen