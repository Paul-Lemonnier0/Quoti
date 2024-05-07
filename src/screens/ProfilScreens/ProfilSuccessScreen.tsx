import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { View } from 'react-native'
import { RootStackParamList } from '../../navigation'

type ProfilSuccessScreenProps = NativeStackScreenProps<RootStackParamList, "ProfilSuccessScreen">

const ProfilSuccessScreen: FC<ProfilSuccessScreenProps> = ({}) => {
  return (
    <View></View>
  )
}

export default ProfilSuccessScreen