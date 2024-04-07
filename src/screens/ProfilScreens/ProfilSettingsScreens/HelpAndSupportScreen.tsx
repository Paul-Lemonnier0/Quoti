import React, { useRef, useState } from 'react'
import { CustomScrollView, UsualScreen } from '../../../components/View/Views'
import { View } from 'moti'
import { NavigationActions, NavigationButton } from '../../../components/Buttons/IconButtons'
import { HugeText, NormalGrayText, NormalText, TitleText } from '../../../styles/StyledText'
import { StyleSheet } from 'react-native'
import { EMAIL_SUPPORT } from '../../../constants/SupportConstants'

const HelpAndSupportScreen = () => {
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
                            <HugeText text="Aide et support"/>
                        </View>

                        <View style={{gap: 50}}>
                            <View style={{gap: 10}}>
                                <TitleText text={"Foire Aux Questions (FAQ)"}/>

                                <NormalGrayText bold text={"Trouvez ici les questions fréquemment posées par nos utilisateurs."}/>
                            </View>

                            <View style={{gap: 20}}>
                                <NormalText bold text={"Q : Comment puis-je ajouter un ami sur Quoti ?"}/>

                                <NormalText bold text={"R : Pour ajouter un ami sur Quoti, suivez ces étapes simples :"}/>

                                <NormalText text={"Connectez-vous à votre compte Quoti."}/>
                                <NormalText text={"Accédez à la section 'Amis' dans le menu principal."}/>
                                <NormalText text={"Cliquez sur le bouton 'Ajouter un ami'."}/>
                                <NormalText text={"Recherchez le nom d'utilisateur de votre ami et envoyez-lui une demande d'ajout."}/>
                                <NormalText text={"Une fois que votre ami accepte votre demande, vous serez ajouté à sa liste d'amis."}/>
                            </View>

                            <View style={{gap: 20}}>
                                <NormalText bold text={"Q : Comment puis-je changer mon mot de passe ?"}/>

                                <NormalText bold text={"R : Pour changer votre mot de passe sur Quoti, veuillez suivre ces étapes :"}/>

                                <NormalText text={"Connectez-vous à votre compte Quoti."}/>
                                <NormalText text={"Accédez à la section 'Paramètres' dans le menu principal."}/>
                                <NormalText text={"Sélectionnez l'option 'Changer le mot de passe'."}/>
                                <NormalText text={"Entrez votre ancien mot de passe, puis saisissez votre nouveau mot de passe et confirmez-le."}/>
                                <NormalText text={"Cliquez sur 'Enregistrer' pour appliquer les modifications."}/>

                            </View>
                        </View>

                        <View style={{gap: 20}}>
                            <TitleText text={"Contactez-nous"}/>
                            <NormalText bold text={EMAIL_SUPPORT}/>

                            <NormalText text={"Pour toute question, commentaire ou problème technique, n'hésitez pas à nous contacter à l'adresse mail ci-dessus. Notre équipe d'assistance est là pour vous aider du lundi au vendredi, de 9h à 17h. Nous nous efforçons de répondre à toutes les demandes dans les plus brefs délais."}/>

                        </View>

                        <View style={{gap: 20}}>
                            <TitleText text={"Signaler un Problème"}/>

                            <NormalText text={"Rencontrez-vous un problème technique ou un bug sur Quoti ? Veuillez nous en informer en remplissant le formulaire ci-dessous. Merci de fournir autant de détails que possible sur le problème rencontré afin que notre équipe puisse le résoudre rapidement. Nous vous remercions pour votre aide à rendre Quoti encore meilleur !"}/>
                        </View>

                        <View style={{gap: 20}}>
                            
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
  
export default HelpAndSupportScreen