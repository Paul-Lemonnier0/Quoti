import React, { FC, useState } from 'react'
import { View } from 'react-native'
import { UsualScreen } from '../../../components/View/Views'
import { IconProvider, NavigationActions, NavigationButton } from '../../../components/Buttons/IconButtons'
import { HugeText } from '../../../styles/StyledText'
import { StyleSheet } from 'react-native'
import { RenderSettingsListItem, RenderSettingsListItemProps } from '../ProfilSettingsScreen'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeStackParamsList } from '../../../navigation/BottomTabNavigator'

type SecurityScreenProps = NativeStackScreenProps<HomeStackParamsList, "SecurityScreen">

const SecurityScreen: FC<SecurityScreenProps> = ({navigation}) => {

    const [taskedMasked, setTaskedMasked] = useState<boolean>(false)

    const commands: RenderSettingsListItemProps[] = [ 
        {
            icon: "eye-off",
            provider: IconProvider.Feather,
            text: "Masquer vos activités",
            onPress: () => setTaskedMasked(!taskedMasked),
            switchButton: true,
            switchButtonValue: taskedMasked
        },

        {
            icon: "block",
            provider: IconProvider.MaterialIcons,
            text: "Compte bloqués",
            onPress: () => navigation.navigate("ConditionUtilisationScreen")
        },
        {
            icon: "lock",
            provider: IconProvider.Feather,
            text: "Modifier votre mot de passe",
            onPress: () => navigation.navigate("ConditionUtilisationScreen")
        },
    ]

    return (
        <UsualScreen>
          <View style={[styles.container]}>
                <View style={styles.header}>
                    <View style={styles.subHeader}>
                        <NavigationButton action={NavigationActions.goBack}/>
                    </View>

                    <HugeText text="Sécurité"/>

                </View>

                <View style={{flex: 1}}>
                    <View style={styles.body}>
                        <View style={styles.bodyHeader}>

                        </View>

                        <View style={styles.bodyCore}>
                            <View style={{gap: 10}}>
                            {
                                commands.map((command, index) => <RenderSettingsListItem key={index} {...command}/>)
                            }
                            </View>

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
  
export default SecurityScreen