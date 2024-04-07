import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { View } from 'react-native'
import { HomeStackParamsList } from '../../navigation/BottomTabNavigator'

type DisplayUsersScreenProps = NativeStackScreenProps<HomeStackParamsList, "ProfilListSuccessScreen">

const ProfilListSuccessScreen: FC<DisplayUsersScreenProps> = ({}) => {
  return (
    <View></View>
  )
}

export default ProfilListSuccessScreen