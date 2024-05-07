import { FC, useContext, useEffect } from "react";
import { HabitsContext } from "../../data/HabitContext";
import { HugeText, NormalGrayText, SubTitleText, TitleText } from "../../styles/StyledText";
import { CustomScrollView, UsualScreen } from "../../components/View/Views";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react"
import { StyleSheet, View } from "react-native";
import { BorderIconButton, IconButton, IconProvider, NavigationActions, NavigationButton } from "../../components/Buttons/IconButtons";
import ProfilButton from "../../components/Profil/ProfilButton";
import { AppContext } from "../../data/AppContext";
import { useThemeColor } from "../../components/Themed";
import Separator, { HoleLineSeparator } from "../../components/Other/Separator";
import HabitIcons from "../../data/HabitIcons";
import { FrequencyDetails } from "../../components/Habitudes/FrequencyDetails";
import StepsList from "../../components/Habitudes/Step/StepsList";
import { Image } from "react-native";
import BottomMenuStyle from "../../styles/StyledBottomMenu";
import Quoti from "../../components/Other/Quoti";
import { acceptHabitInvitation, refuseHabitInvitation, VisitInfoUser } from "../../firebase/Firestore_User_Primitives";
import { convertBackSeriazableHabit } from "../../primitives/HabitMethods";
import Toast from "react-native-toast-message";
import { BottomScreenOpen_Impact, Success_Impact } from "../../constants/Impacts";
import { UserContext } from "../../data/UserContext";
import { HomeStackParamsList } from "../../navigation/HomeNavigator";
import { BackgroundTextButton, BorderTextButton, TextButton } from "../../components/Buttons/UsualButton";

type SharedHabitScreenProps = NativeStackScreenProps<HomeStackParamsList, "SharedHabitScreen">

const SharedHabitScreen: FC<SharedHabitScreenProps> = ({navigation, route}) => {
    const {habit, user: senderUser} = route.params;

    const {addHabitIntern} = useContext(HabitsContext)
    const {setIsLoading} = useContext(AppContext)
    const {user, removeHabitRequest} = useContext(UserContext)

    const {theme} = useContext(AppContext)
    const fontGray = useThemeColor(theme, "FontGray")
    const primary = useThemeColor(theme, "Primary")

    const imageSize = 35

    const steps = Object.values(habit.steps)

    useEffect(() => {
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            display: "none"
          }
        });
        return () => navigation.getParent()?.setOptions({
          tabBarStyle: BottomMenuStyle().bottomMenuStyle
        });
      }, [navigation]);

    const handleAcceptHabitInvitation = async() => {
        setIsLoading(true)
        if(user && user.email) {
            if(await acceptHabitInvitation(senderUser.uid, senderUser.email, user.uid, user.email, habit.habitID)) {
                addHabitIntern(convertBackSeriazableHabit({...habit, objectifID: undefined}))
                removeHabitRequest(habit.habitID, senderUser.uid)

                Toast.show({
                    type: "success",
                    text1: "Invitation acceptée !",
                    position: "top",
                    visibilityTime: 3000,
                    swipeable: true
                })

                Success_Impact()
                navigation.goBack()
            }
        }



        setIsLoading(false)
    }

    const handleRefuseHabitInvitation = () => {
        if(user && user.email) {
            refuseHabitInvitation(senderUser.uid, senderUser.email, user.email, habit.habitID)
        }

        Toast.show({
            type: "error",
            text1: "Invitation refusée",
            position: "top",
            visibilityTime: 3000,
            swipeable: true
        })

        BottomScreenOpen_Impact()
        navigation.goBack()
    }

    return(
        <UsualScreen hideMenu>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <NavigationButton noPadding action={NavigationActions.goBack}/>
                        <Quoti/>
                        <IconButton noPadding name="settings" provider={IconProvider.Feather} onPress={() => {}}/>
                    </View>

                    {/* <HugeText text="Invitation"/>
 */}
                </View>

                <CustomScrollView>     
                    <View style={styles.body}>
                        <View style={{gap: 30, justifyContent: "center", alignItems: "center"}}>
                            <View style={{gap: 20, justifyContent: "center", alignItems: "center"}}>
                                <ProfilButton
                                    huge
                                    user={senderUser as VisitInfoUser}
                                    disabled
                                    noBadge
                                    isSelected
                                    onPress={() => {}}
                                />
                                <View style={styles.titreEtDescriptionContainer}>
                                    <TitleText text={senderUser.displayName}/>
                                    <SubTitleText bold style={{color: fontGray}}
                                        text={"Te propose une nouvelle habitude"}/>
                                </View>
                            </View>

                            <View style={{display: "flex", flexDirection: "row", gap: 20, paddingHorizontal: 20}}>
                                    <BorderTextButton isFlex bold text="Décliner" onPress={handleRefuseHabitInvitation}/>
                                    <BackgroundTextButton isFlex bold text="Accepter" onPress={handleAcceptHabitInvitation}/>
                            </View>
                        </View>

                        <View style={{marginBottom: -30, marginHorizontal: -30}}>
                            <Separator/>
                        </View>
                        
                        <View style={styles.habitBody}>            
                            <View style={styles.bodyHeader}>
                                <View style={[styles.displayRow, {gap: 20}]}>
                                    <View style={{borderRadius: 20, borderColor: habit.color, borderWidth: 2, padding: 15}}>
                                        <Image source={HabitIcons[habit.icon]} style={{height: imageSize, aspectRatio: 1}}/>
                                    </View>

                                    <View style={styles.habitTitreEtDescriptionContainer}>
                                        <HugeText text={habit.titre}/>
                                        <NormalGrayText bold text={habit.description}/>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.bodyCore}>
                                
                                <View style={styles.groupContainer}>
                                    <TitleText text="Etapes"/>

                                    <View style={styles.displayColumn}>
                                        <StepsList softDisabled steps={steps} color={habit.color}/>
                                    </View>
                                </View>

                                <View style={{marginHorizontal: -30}}>
                                    <Separator/>
                                </View>

                                <View style={{ gap: 30, flex: 1, flexWrap: 'wrap', flexDirection: 'column' }}>
                                    <TitleText text={"Fréquence"}/>
                                    <FrequencyDetails frequency={habit.frequency} reccurence={habit.reccurence} occurence={habit.occurence}/>
                                </View>
                            </View>
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
      gap: 10, 
      flex: 1, 
      marginBottom: 30,
    },

    header: {
      display: "flex", 
      flexDirection: "column", 
      gap: 30,
      marginBottom: 5
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
        marginTop: 30
    },

    habitBody: {
        flex: 1,
        gap: 30,
        paddingTop: 30
    },
    
    titreEtDescriptionContainer:{
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center",
        alignItems: "center",
        gap: 5
    },

    habitTitreEtDescriptionContainer: {
        display: "flex", 
        flex: 1,
        flexDirection: "column", 
        justifyContent: "center",
    },
    
    displayColumn: {
        display: "flex",
        flexDirection: "column",
    },

    displayRow: {
        display: "flex", 
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    bodyHeader: {
        gap: 15,
        display: "flex",
        flexDirection: "column"
    }, 

    bodyCore: {
        display: "flex", 
        flexDirection: "column", 
        gap: 30
    },

    groupContainer: {
        display: "flex", 
        flexDirection: "column", 
        gap: 30
    },
});

export default SharedHabitScreen