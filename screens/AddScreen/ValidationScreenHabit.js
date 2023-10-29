import { View, StyleSheet, FlatList } from "react-native"
import { TitleText, NormalText, SubTitleText, HugeText } from "../../styles/StyledText"
import { Feather } from "@expo/vector-icons"
import { useThemeColor } from "../../components/Themed"
import { CircleBorderButton } from "../../components/Buttons/UsualButton"
import { useRoute } from "@react-navigation/native"
import { UsualScreen } from "../../components/View/Views"
import { StepCircularBar } from "../../components/Habitudes/StepCircularBar"
import StepIndicator from "../../components/Other/StepIndicator"
import { Image } from "react-native"
import HabitIcons from "../../data/HabitIcons"

const ValidationScreenHabit = () => {

    const route = useRoute()
    const {habit} = route.params
    const stepsHabit = Object.values(habit.steps)

    const secondary = useThemeColor({}, "Secondary")
    const font = useThemeColor({}, "Font")

    const icon = HabitIcons[habit.icon]

    return (
        <UsualScreen>   
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{width: "80%"}}>
                        <HugeText text="Et voilà !"/>
                        <SubTitleText text="Nouvelle habitude ajoutée"/>
                    </View>

                    <CircleBorderButton onPress={() => {}}>
                        <Feather name="share-2" size={20} color={font}/> 
                    </CircleBorderButton>
                </View>

                <StepIndicator totalSteps={5} currentStep={5}/>
                <View style={{flex: 1, flexGrow: 1}}>
                    <View style={styles.emptySreenContainer}>
                    
                        <Image style={styles.emptyScreenImageContainer} source={require('../../img/Illustration/Light_theme/Idea.png')}/>

                        <View style={styles.emptyScreenSubContainer}>
                            <NormalText text={"Continuez comme ça! "}/>
                            <SubTitleText text={"vous êtes sur la bonne voie !"}/>
                        </View>


                    </View>
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
        alignItems: "center"
      },

      iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding:10, marginBottom: 10
    },
  });
  
  export default ValidationScreenHabit;