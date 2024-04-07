import { View, StyleSheet } from "react-native"
import { TitleText, NormalText, SubTitleText, MassiveText } from "../../../styles/StyledText"
import { UsualScreen } from "../../../components/View/Views"
import { Image } from "react-native"
import IllustrationsList, { IllustrationsType } from "../../../data/IllustrationsList"
import { BackgroundTextButton } from "../../../components/Buttons/UsualButton"
import { FC, useEffect } from "react"
import { BottomScreenOpen_Impact } from "../../../constants/Impacts"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AddScreenStackType } from "../../../navigation/BottomTabNavigator"
import React from "react"

type ValidationScreenHabitProps = NativeStackScreenProps<AddScreenStackType, "ValidationScreenHabit">

const ValidationScreenHabit: FC<ValidationScreenHabitProps> = ({route, navigation}) => {

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
                    <View style={{width: "80%"}}>
                        <MassiveText text="Bravo !"/>
                        <TitleText text="Nouvelle habitude ajoutée"/>
                    </View>
                </View>


                <View style={{flex: 1, flexGrow: 1}}>
                    <View style={styles.emptySreenContainer}>
                    
                        <Image style={styles.emptyScreenImageContainer} source={IllustrationsList[IllustrationsType.Validation]}/>

                        <View style={styles.emptyScreenSubContainer}>
                            <NormalText text={"Continuez comme ça! "}/>
                            <SubTitleText text={"vous êtes sur la bonne voie !"}/>
                        </View>
                    </View>
                </View>

                <View>
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
  
  export default ValidationScreenHabit;