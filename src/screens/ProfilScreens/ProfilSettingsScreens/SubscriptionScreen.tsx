import React, { FC, useRef, useState } from 'react'
import { View } from 'react-native'
import { CustomScrollView, UsualScreen } from '../../../components/View/Views'
import { IconProvider, NavigationActions, NavigationButton } from '../../../components/Buttons/IconButtons'
import ProfilButton from '../../../components/Profil/ProfilButton'
import { auth } from '../../../firebase/InitialisationFirebase'
import { HugeText, NormalGrayText } from '../../../styles/StyledText'
import { StyleSheet } from 'react-native'
import { CustomTextInputRefType, TextInputCustom } from '../../../components/TextFields/TextInput'
import { DatePicker } from '../../../components/TextFields/DatePicker'
import SelectDateBottomScreen from '../../BottomScreens/SelectDateBottomScreen'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import Separator from '../../../components/Other/Separator'
import { RenderSettingList, RenderSettingListProps, RenderSettingsListItem, RenderSettingsListItemProps } from '../ProfilSettingsScreen'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeStackParamsList } from '../../../navigation/BottomTabNavigator'

type SubscriptionScreenProps = NativeStackScreenProps<HomeStackParamsList, "SubscriptionScreen">

const SubscriptionScreen: FC<SubscriptionScreenProps> = () => {
    return (
        <UsualScreen>
          <View style={[styles.container]}>
                <View style={styles.header}>
                    <View style={styles.subHeader}>
                        <NavigationButton action={NavigationActions.goBack}/>
                    </View>

                    <HugeText text="Abonnement"/>

                </View>

                <View style={{flex: 1}}>
                    <View style={styles.body}>
                        <View style={styles.bodyHeader}>

                        </View>

                        <View style={styles.bodyCore}>

                        </View>
                    
                    </View>
                </View>
          </View>
        </UsualScreen>
    )
}

const styles = StyleSheet.create({
    container: {
      display: "flex", 
      flexDirection: "column", 
      gap: 0, 
      flex: 1, 
      marginBottom: 0    
    },

    header: {
        display: "flex", 
        flexDirection: "column", 
        gap: 20,
        marginBottom: 5
    },

    titreEtDescriptionContainer:{
        display: "flex", 
        flex: 1,
        flexDirection: "column", 
        justifyContent: "center",
        gap: 0
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
    },

    imageStyle: {
      alignSelf: 'center',
      justifyContent: 'center',
      resizeMode: 'contain',
      aspectRatio: 1,
      flex: 1,      
      borderRadius: 200,
    },

    imageContainerStyle: {
      aspectRatio: 1,
      width: 120,
      alignItems: 'center',
      justifyContent: 'center', 
    },

    bodyHeader: {
        flexDirection: "row",
        gap: 20
    },

    bodyCore: {
        gap: 20
    }
});
  
export default SubscriptionScreen