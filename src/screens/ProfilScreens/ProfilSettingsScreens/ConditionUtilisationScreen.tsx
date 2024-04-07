import React, { useRef, useState } from 'react'
import { CustomScrollView, UsualScreen } from '../../../components/View/Views'
import { View } from 'moti'
import { NavigationActions, NavigationButton } from '../../../components/Buttons/IconButtons'
import { HugeText, NormalGrayText, NormalText, TitleText } from '../../../styles/StyledText'
import { StyleSheet } from 'react-native'
import { EMAIL_SUPPORT } from '../../../constants/SupportConstants'

const ConditionUtilisationScreen = () => {
    return (
        <UsualScreen>
            <View style={[styles.container]}>
                <View style={styles.header}>
                    <View style={styles.subHeader}>
                        <NavigationButton action={NavigationActions.goBack}/>
                    </View>
                </View>

                <CustomScrollView>
                    <View style={styles.body}>
                        <View style={{gap: 5}}>
                            <HugeText text="Conditions d'Utilisation"/>
                            <NormalGrayText bold text="Dernière mise à jour : 07 avril 2024"/>
                        </View>

                        <View style={{gap: 20}}>
                            <NormalText bold text={"Veuillez lire attentivement ces conditions d'utilisation avant d'utiliser l'application mobile Quoti. exploitée par Paul Lemonnier."}/>
                            <NormalText text={"En accédant ou en utilisant Quoti., vous acceptez d'être lié par ces Conditions. Si vous n'êtes pas d'accord avec une partie quelconque des conditions, vous ne pouvez pas accéder à Quoti."}/>
                        </View>

                        <View style={{gap: 20}}>
                            <TitleText text={"Comptes Utilisateur"}/>

                            <NormalText text={"Pour accéder à certaines fonctionnalités de l'Application, vous devez créer un compte et fournir des informations personnelles précises et à jour. Vous êtes responsable de la confidentialité de votre compte et de votre mot de passe, ainsi que de toutes les activités qui se produisent sous votre compte."}/>
                            <NormalText text={"Vous acceptez de ne pas utiliser le compte d'un autre utilisateur sans autorisation appropriée."}/>
                            <NormalText text={"Nous nous réservons le droit de suspendre ou de résilier votre compte à tout moment et sans préavis si nous estimons que vous avez enfreint ces Conditions ou agi de manière inappropriée."}/>
                        </View>

                        <View style={{gap: 20}}>
                            <TitleText text={"Plan Payant et Version Gratuite"}/>

                            <NormalText text={"L'Application offre un plan payant avec des fonctionnalités avancées ainsi qu'une version gratuite avec des fonctionnalités de base. En optant pour le plan payant, vous acceptez de payer les frais associés conformément à nos modalités de paiement."}/>
                        </View>

                        <View style={{gap: 20}}>
                            <TitleText text={"Fonctionnalités de l'Application"}/>

                            <NormalText text={"L'Application ne permet pas l'envoi ou la réception de messages entre les utilisateurs. Cependant, vous pouvez ajouter d'autres utilisateurs comme amis."}/>
                            <NormalText text={"Tous les comptes utilisateur sont privés par défaut. Cela signifie que les autres utilisateurs ne peuvent pas accéder à vos informations sans votre autorisation expresse."}/>
                            <NormalText text={"Vous pouvez chercher et envoyer des demandes d'amitié à d'autres utilisateurs, mais ceux-ci doivent explicitement accepter votre demande pour que vous puissiez devenir amis sur l'Application."}/>
                        </View>

                        <View style={{gap: 20}}>
                            <TitleText text={"Contenu Utilisateur"}/>

                            <NormalText text={"Vous êtes entièrement responsable de tout le contenu que vous publiez ou partagez via l'Application. Vous acceptez de ne pas publier de contenu qui enfreint les droits d'auteur, la confidentialité, la propriété intellectuelle ou tout autre droit d'une tierce partie."}/>
                            <NormalText text={"Nous nous réservons le droit de supprimer tout contenu que nous jugeons inapproprié ou en violation de ces Conditions."}/>
                        </View>

                        <View style={{gap: 20}}>
                            <TitleText text={"Modifications des Conditions"}/>

                            <NormalText text={"Nous nous réservons le droit de modifier ces Conditions à tout moment. Les modifications entrent en vigueur dès leur publication sur cette page."}/>
                            <NormalText text={"En continuant à accéder ou à utiliser l'Application après toute modification, vous acceptez d'être lié par les Conditions modifiées. Il est de votre responsabilité de consulter régulièrement cette page pour prendre connaissance des éventuelles modifications."}/>
                        </View>

                        <View style={{gap: 20}}>
                            <TitleText text={"Contactez-nous"}/>

                            <NormalText text={"Si vous avez des questions concernant ces Conditions, veuillez nous contacter à :"}/>
                            <NormalText bold text={EMAIL_SUPPORT}/>
                        </View>
                    </View>
                </CustomScrollView>
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
        gap: 40,
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
});
  
export default ConditionUtilisationScreen