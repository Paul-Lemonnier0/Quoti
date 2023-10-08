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

const ValidationScreenHabit = ({bottomSheetModalRef, snapPoints, habit}) => {

    const font = useThemeColor({}, "Font")
    const popupColor = useThemeColor({}, "Popup")
    const primary = useThemeColor({}, "Primary")

    const handleValidate = () => {
    }

    const route = useRoute()

    const {finalHabit} = route.params

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

    const handleShare = () => {
        
    }
  
    // renders
    return (
        <UsualScreen>

            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>

                <CircleBorderButton onPress={handleClose}>
                    <Feather name="x" size={20} color={font}/> 
                </CircleBorderButton>

                <View style={{display: "flex", flexDirection: "column", alignItems:"center", justifyContent: "center", marginTop: -10}}>
                    <TitleText text="Bravo !" style={{textAlign: "center"}}/>                            
                </View>

                <CircleBorderButton onPress={handleShare}>
                    <Feather name="share" size={20} color={font}/> 
                </CircleBorderButton>

            </View>

            <View style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30, marginVertical: 30}}>

                <View style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                    <HugeText text="Nouvelle habitude"/>
                    <SubTitleText text="Continuez comme ça !"/>
                </View>

                <View style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10}}>

                    <StepCircularBar habit={finalHabit} tall={true}/>

                    <View style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                        <TitleText text={finalHabit.titre}/>
                        <SubText text={finalHabit.description}/>
                    </View>

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
                    contentContainerStyle={{gap: 20, paddingBottom: 40}}                            
                />

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

    groupContainer: {
        display: 'flex', 
        flexDirection: "column", flex: 1
    },

    listContainer: {
        display: "flex",
        flexDirection: "row", 
        width: "100%", 
        justifyContent: "space-between",
        gap: 10,
    },
  });
  
  export default ValidationScreenHabit;