import { View, StyleSheet, FlatList } from "react-native"
import { TitleText, NormalText, SubTitleText, HugeText } from "../../styles/StyledText"
import { Feather } from "@expo/vector-icons"
import { useThemeColor } from "../../components/Themed"
import { Friends } from "../../data/habitudes"
import { CircleBorderButton } from "../../components/Buttons/UsualButton"
import { useNavigation, useRoute, CommonActions } from "@react-navigation/native"
import { UsualScreen } from "../../components/View/Views"
import { StepCircularBar } from "../../components/Habitudes/StepCircularBar"
import { InviteFriendListItem } from "../../components/Profil/InviteFriendListItem"
import StepIndicator from "../../components/Other/StepIndicator"
import { Image } from "react-native"

const ValidationScreenHabit = () => {

    const font = useThemeColor({}, "Font")
    const route = useRoute()

    const {habit} = route.params

    const navigation = useNavigation()

    const handleClose = () => {
        navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: 'Home' },
              ],
            }))
    }

    const stepsHabit = Object.values(habit.steps)

    const handleShare = () => {}
  
    // renders
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

                <View style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 20, margin: 20}}>
                    <StepCircularBar habit={habit} habitDoneSteps={stepsHabit.length} tall={true}/>
                    <View style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 10}}>
                        <TitleText text={habit.titre}/>                
                        <NormalText text={habit.description}/>                
                    </View>
                </View>

                <View style={styles.groupContainer}>

                    <View style={styles.subTitleHeaderContainer}>
                        <SubTitleText text="Invitez vos amis :"/>
                    </View>

                    <FlatList
                        data={Friends}
                        style={{marginTop: 20}}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => {
                        return <InviteFriendListItem friend={item}/>}}
                        contentContainerStyle={{gap: 10, paddingBottom: 40}}                            
                    />

                </View>
            </View>


        </UsualScreen>
    );
  };
  
  const styles = StyleSheet.create({
    contentContainer: {
        gap: 20,
        display: "flex",
        flexDirection: "column",
        flex: 1
    },

    listContainer: {
        display: "flex",
        flexDirection: "row", 
        width: "100%", 
        justifyContent: "space-between",
        gap: 10,
    },

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

    groupContainer: {
        display: 'flex', 
        flexDirection: "column",
        justifyContent: "center", 
        gap: 20, flex: 1
    },
  });
  
  export default ValidationScreenHabit;