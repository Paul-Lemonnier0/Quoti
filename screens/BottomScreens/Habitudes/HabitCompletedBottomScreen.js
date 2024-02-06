import { HugeText, MassiveText, NormalText, SubText, SubTitleText, TitleText } from "../../../styles/StyledText"

import { View } from "react-native";
import { StyleSheet } from "react-native";
import { CloseButton, Icon } from "../../../components/Buttons/IconButtons";
import Confetti from "../../../components/Other/Confetti";
import { useRef } from "react";
import { useEffect } from "react";
import { Image } from "react-native";
import SimpleFullBottomSheet from "../../../components/BottomSheets/SimpleFullBottomSheet";
import { UsualScreen } from "../../../components/View/Views";
import IllustrationsList from "../../../data/IllustrationsList";
import { HabitudeListItem, HabitudeListItemPresentation } from "../../../components/Habitudes/HabitudeListItem";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default HabitCompletedBottomScreen = ({bottomSheetModalRef, habit}) => {
    
    const snapPoints = ["55%"]

    const confettiRef = useRef(null)

    const triggerConfetti = () => {
        if(confettiRef.current){
            confettiRef.current.play(0);
        }
    }

    useEffect(() => {
        triggerConfetti()
    }, [])

    const closeModal = () => {
        bottomSheetModalRef.current?.close()
    }

    const navigation = useNavigation()

    const goBackHome = () => {
        navigation.navigate("HomeScreen")
    }

    return (
        <SimpleFullBottomSheet bottomSheetModalRef={bottomSheetModalRef} onChange={() => {}} isPrimary
            footerText={"Retour à l'accueil"} footerMethod={goBackHome}>
            <UsualScreen hideMenu>
                <View style={styles.container}>
                    <View style={styles.pageTitleContainer}>
                        <CloseButton noPadding methode={closeModal}/>
                    </View>



                    <View style={{flex: 0.75, flexGrow: 0.75}}>
                        <View style={styles.emptySreenContainer}>

                            <Image style={styles.emptyScreenImageContainer} source={IllustrationsList["WorkingFullSpeed"]}/>

                            <View style={styles.emptyScreenSubContainer}>
                                <MassiveText text={"Bravo !"}/>
                                <TitleText text={"Habitude complétée"}/>
                            </View>
                        </View>
                    </View>

                    <View style={styles.footer}>
                        {/* <Animated.View style={{position: "absolute", bottom: 0}} entering={FadeInDown.delay(200)}> */}
                            <HabitudeListItemPresentation habitude={habit} currentDateString={new Date().toDateString()}/>
                        {/* </Animated.View> */}
                    </View>
                </View>


            </UsualScreen>

            <Confetti ref={confettiRef}/>

        </SimpleFullBottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex", 
        flexDirection: "column", 
        gap: 20, 
        flex: 1,
    },

    displayRow: {
        display: "flex",
        flexDirection: "row",
        gap: 0
    },

    pageTitleContainer: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        gap: 20,
        marginLeft: 5,
      },

    emptySreenContainer: {
        flex: 1, 
        flexGrow: 1, 
        alignItems: "center", 
        justifyContent: "space-around",
        gap: 20, 

    },
    
    emptyScreenImageContainer: {
        resizeMode: 'contain', 
        flex: 1,
        width: "90%", 
    },

    emptyScreenSubContainer: {
        justifyContent: "space-evenly", 
        alignItems: "center",
        gap: 5
    },

    footer: {
        justifyContent: "center",
        flex: 0.25,
    }
})
  
