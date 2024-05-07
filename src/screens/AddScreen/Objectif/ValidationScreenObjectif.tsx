import { View, StyleSheet } from "react-native"
import { TitleText, NormalText, SubTitleText, MassiveText, NormalGrayText } from "../../../styles/StyledText"
import { useNavigation } from "@react-navigation/native"
import { UsualScreen } from "../../../components/View/Views"
import { Image } from "react-native"
import IllustrationsList, { IllustrationsType } from "../../../data/IllustrationsList"
import { BackgroundTextButton } from "../../../components/Buttons/UsualButton"
import { FC, useContext, useEffect } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import { AddScreenStackType } from "../../../navigation/AddScreenNavigator"
import { useThemeColor } from "../../../components/Themed"
import { AppContext } from "../../../data/AppContext"
import { IconButton, IconProvider } from "../../../components/Buttons/IconButtons"
import { BottomScreenOpen_Impact } from "../../../constants/Impacts"

type ValidationScreenObjectifProps = NativeStackScreenProps<AddScreenStackType, "ValidationScreenObjectif">

const ValidationScreenObjectif: FC<ValidationScreenObjectifProps> = ({navigation}) => {

    const {theme} = useContext(AppContext)
    const fontGray = useThemeColor(theme, "FontGray")

    useEffect(() => {

        const disableGestures = () => {
            navigation.setOptions({
                gestureEnabled: false,
            });
        };

        disableGestures()
    }, [])

    const handleGoHome = () => {
        BottomScreenOpen_Impact()
        navigation.reset({index: 0, routes: [{ name: 'Home' }]})
    }

    return (
        <UsualScreen hideMenu>   
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <MassiveText text="Bravo !"/>
                        <TitleText text="Nouvel objectif" style={{color: fontGray}}/>
                    </View>

                    <View style={{padding: 0, marginRight: -10, marginTop: 5}}>
                        <IconButton name="share-2" provider={IconProvider.Feather} onPress={() => {}}/>
                    </View>
                </View>


                <View style={{flex: 1, flexGrow: 1}}>
                    <View style={styles.emptySreenContainer}>
                    
                        <Image style={styles.emptyScreenImageContainer} source={IllustrationsList[IllustrationsType.Validation]}/>

                        <View style={styles.emptyScreenSubContainer}>
                            <TitleText text="Continuez comme ça !"/>
                            <NormalGrayText bold text={"Vous êtes sur la bonne voie"}/>
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <BackgroundTextButton text={"Retour à l'accueil"} onPress={handleGoHome} bold/>
                </View>

            </View>
        </UsualScreen>
    );
  };
  
  const styles = StyleSheet.create({

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

    footer:{
    
    },

    habitPresentationContainer: {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center", 
        gap: 20, 
        margin: 20
    },

    titleAndDescriptionContainer: {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center", 
        gap: 10
    },

    groupContainer: {
        display: 'flex', 
        flexDirection: "column",
        justifyContent: "center", 
        gap: 20, flex: 1
    },

    emptySreenContainer: {
        flex: 1, 
        flexGrow: 1, 
        alignItems: "center", 
        justifyContent: "center",
        gap: 20, 

    },
    
    emptyScreenImageContainer: {
        resizeMode: 'contain', 
        width: "90%", 
        maxHeight: "60%",
    },

    emptyScreenSubContainer: {
        justifyContent: "space-evenly", 
        alignItems: "center",
        gap: 5
    },
  });
  
  export default ValidationScreenObjectif;