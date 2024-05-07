import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { View } from 'react-native'
import { RootStackParamList } from '../../navigation'
import { SocialScreenStackType } from '../../navigation/SocialNavigator'
import { HomeStackParamsList } from '../../navigation/HomeNavigator'

type AnyUserProfilSuccessScreenProps = 
  NativeStackScreenProps<SocialScreenStackType, "AnyUserProfilSuccessScreen"> | 
  NativeStackScreenProps<HomeStackParamsList, "AnyUserProfilSuccessScreen">


const AnyUserProfilSuccessScreen: FC<AnyUserProfilSuccessScreenProps> = ({}) => {
  return (
    <View></View>
  )
}

export default AnyUserProfilSuccessScreen