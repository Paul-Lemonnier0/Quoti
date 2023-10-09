import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { View, StyleSheet, FlatList, SafeAreaView } from "react-native"

import { IconButton } from "../../components/Buttons/IconButton"
import { TitleText, NormalText, SubTitleText, HugeText, SubText } from "../../styles/StyledText"
import { useRef, useMemo, useCallback, useState } from "react"
import { Feather } from "@expo/vector-icons"
import { useThemeColor } from "../../components/Themed"
import { CircularBarProfil, AddCircularBarProfil } from "../../components/Profil/CircularBarProfil"
import { ContributorsHabits, Friends } from "../../data/habitudes"
import CustomBottomSheet from "../../components/BottomSheets/CustomBottomSheet"
import { TextInputCustom } from "../../components/TextFields/TextInput"
import { IncrementHours, IncrementMinutes } from "../../components/Buttons/IncrementButtons"
import { BigCircleBorderButton, CircleBorderButton, GoBackButton } from "../../components/Buttons/UsualButton"
import { Keyboard } from "react-native"
import { TouchableWithoutFeedback } from "react-native"
import { Image } from "react-native"
import HabitIcons from "../../data/HabitIcons"
import { StackActions, useNavigation, useRoute, CommonActions } from "@react-navigation/native"

import { UsualScreen } from "../../components/View/Views"
import { StepCircularBar } from "../../components/Habitudes/StepCircularBar"
import { InviteFriendListItem } from "../../components/Profil/InviteFriendListItem"
import { HabitudeListItem } from "../../components/Habitudes/HabitudeListItem"
import StepIndicator from "../../components/Other/StepIndicator"

const ValidationScreenHabit = ({bottomSheetModalRef, snapPoints}) => {

    const font = useThemeColor({}, "Font")
    const popupColor = useThemeColor({}, "Popup")
    const primary = useThemeColor({}, "Primary")

    const handleValidate = () => {
    }

    const route = useRoute()

    const {habit} = route.params
    console.log("ICI : ", habit)

    const navigation = useNavigation()

    const handleClose = () => {

        navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: 'Home' },
              ],
            }))
    }

    console.log(habit)

    const handleShare = () => {
        
    }
  
    // renders
    return (
        <UsualScreen>
            
            <View style={styles.container}>

                <View style={styles.header}>

                    <View style={{width: "80%"}}>
                        <HugeText text="Et voilà !"/>
                        <SubTitleText text="Nouvelle habitude ajoutée"/>
                    </View>

                    <CircleBorderButton onPress={() => {}}>
                        <Feather name="share-2" size={20} color={font}/> 
                    </CircleBorderButton>
                </View>

                <StepIndicator totalSteps={5} currentStep={5}/>


                <View style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 20, margin: 20}}>

                    <StepCircularBar habit={{...habit, doneSteps: habit.steps.length, totalSteps: habit.steps.length}} tall={true}/>
                    <View style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 10}}>
                        <TitleText text={habit.titre}/>                
                        <NormalText text={habit.description}/>                
                    </View>
                </View>

                <View style={styles.groupContainer}>

                    <View style={styles.subTitleHeaderContainer}>
                        <SubTitleText text="Invitez vos amis :"/>
                    </View>

                    <FlatList
                        data={Friends}
                        style={{marginTop: 20}}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => {
                        return <InviteFriendListItem friend={item}/>}}
                        contentContainerStyle={{gap: 10, paddingBottom: 40}}                            
                    />

                </View>
            </View>


        </UsualScreen>
    );
  };
  
  const styles = StyleSheet.create({
    contentContainer: {
        gap: 20,
        display: "flex",
        flexDirection: "column",
        flex: 1
    },

    listContainer: {
        display: "flex",
        flexDirection: "row", 
        width: "100%", 
        justifyContent: "space-between",
        gap: 10,
    },

    container: {
        display: "flex", 
        flexDirection: "column", 
        gap: 30, 
        flex: 1, 
        marginBottom: 0
    },

    header: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        justifyContent: "space-between"
    },
    
    body: {
        flex: 1, 
        gap: 30,
    },

    groupContainer: {
        display: 'flex', 
        flexDirection: "column",
        justifyContent: "center", 
        gap: 20, flex: 1
    },
  });
  
  export default ValidationScreenHabit;