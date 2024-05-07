import { View, StyleSheet } from "react-native"
import { TitleText, NormalText, SubTitleText, MassiveText } from "../../../styles/StyledText"
import { UsualScreen } from "../../../components/View/Views"
import { Image } from "react-native"
import IllustrationsList, { IllustrationsType } from "../../../data/IllustrationsList"
import { BackgroundTextButton } from "../../../components/Buttons/UsualButton"
import { FC, useContext, useEffect, useRef } from "react"
import { BottomScreenOpen_Impact } from "../../../constants/Impacts"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import { AddScreenStackType } from "../../../navigation/AddScreenNavigator"
import { IconButton, IconProvider } from "../../../components/Buttons/IconButtons"
import { AppContext } from "../../../data/AppContext"
import { useThemeColor } from "../../../components/Themed"
import ShareHabitBottomScreen from "../../BottomScreens/Social/ShareHabitBottomScreen"
import { convertBackSeriazableHabit } from "../../../primitives/HabitMethods"
import { BottomSheetModal } from "@gorhom/bottom-sheet"

type ValidationScreenHabitProps = NativeStackScreenProps<AddScreenStackType, "ValidationScreenHabit">

const ValidationScreenHabit: FC<ValidationScreenHabitProps> = ({route, navigation}) => {

    const {habit} = route.params

    const {theme} = useContext(AppContext)
    const fontGray = useThemeColor(theme, "FontGray")

    const bottomSheetModalRef_ShareHabitScreen = useRef<BottomSheetModal>(null)

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

    const handleOpenShare = () => {
        bottomSheetModalRef_ShareHabitScreen.current?.present()
    }

    return (
        <UsualScreen hideMenu>   
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <MassiveText text="Bravo !"/>
                        <TitleText text="Nouvelle habitude" style={{color: fontGray}}/>
                    </View>

                    <View style={{padding: 0, marginRight: -10, marginTop: 5}}>
                        <IconButton name="share-2" provider={IconProvider.Feather} onPress={handleOpenShare}/>
                    </View>
                </View>


                <View style={{flex: 1, flexGrow: 1}}>
                    <View style={styles.emptySreenContainer}>
                    
                        <Image style={styles.emptyScreenImageContainer} source={IllustrationsList[IllustrationsType.Validation]}/>

                        <View style={styles.emptyScreenSubContainer}>
                            <TitleText text="Continuez comme ça !"/>
                            <NormalText bold text={"Vous êtes sur la bonne voie"} style={{color: fontGray}}/>
                        </View>
                    </View>
                </View>

                <View>
                    <BackgroundTextButton text={"Retour à l'accueil"} onPress={handleGoHome} bold/>
                </View>

            </View>

            <ShareHabitBottomScreen
                bottomSheetModalRef={bottomSheetModalRef_ShareHabitScreen}
                habit={convertBackSeriazableHabit(habit)}
            />
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
        justifyContent: "space-between",
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