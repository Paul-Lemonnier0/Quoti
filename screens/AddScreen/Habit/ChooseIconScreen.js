import { View } from "react-native"
import { GoNextButton } from "../../../components/Buttons/UsualButton"
import { UsualScreen } from "../../../components/View/Views"
import { HugeText } from "../../../styles/StyledText"
import { Image } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useThemeColor } from "../../../components/Themed"
import { FlatList } from "react-native-gesture-handler"
import { useContext, useState } from "react"
import { StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native"
import { CustomCarousel } from "../../../components/Carousel/CustomCarousel"
import { HabitsContext } from "../../../data/HabitContext"
import { splitArrayIntoChunks } from "../../../primitives/BasicsMethods"
import StepIndicator from '../../../components/Other/StepIndicator.js'
import HabitIcons from "../../../data/HabitIcons"
import { NavigationButton } from "../../../components/Buttons/IconButtons.js"
import { getSeriazableHabit } from "../../../primitives/HabitMethods.js"


export const ChooseIconScreen = () => {

    const navigation = useNavigation()
    const route= useRoute()
    const {colorHabit} = route.params


    const habitsIconsData = Object.keys(HabitIcons).map((key) => ({id: key, icon: HabitIcons[key], title: key}));

    const splitHabitsIconsData = splitArrayIntoChunks(habitsIconsData, 20);
    const [selectedIcon, setSelectedIcon] = useState(splitHabitsIconsData[0][0].id)
    const finalHabit = {...colorHabit, icon: selectedIcon}

    const {addHabit} = useContext(HabitsContext)

    const secondary = useThemeColor({}, "Secondary")
    const font = useThemeColor({}, "Font")
      

    const handleValidation = async() => {
        try{
            const fullHabit = await addHabit(finalHabit)
            const seriazableHabit = getSeriazableHabit(fullHabit)
            navigation.navigate("ValidationScreenHabit", {habit: {...seriazableHabit}})
        }

        catch (e){
            console.log("erreur dans l'ajout de l'habitude : ", e)
        }
    }

    const renderItem = ({ item }) => {

        const isSelected = item.id == selectedIcon

        return (
          <TouchableOpacity style={styles.iconContainer} onPress={() => setSelectedIcon(item.id)}>
                <View style={{backgroundColor: secondary, justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: isSelected ? font : secondary, borderRadius: 20, width: "100%", aspectRatio: 1}}>
                    <Image style={{width: 30, height: 30}} source={item.icon}/>
                </View>
          </TouchableOpacity>
        );

    };

    const renderIconSelectorItem = ({item}) => {
        return(
            <View style={styles.centerFullContent}>
                <FlatList scrollEnabled={false}
                    data={item} renderItem={renderItem}
                    numColumns={4} key={1} keyExtractor={(itm) => itm.id}
                    contentContainerStyle={styles.iconListContainer}/>
            </View>
        )
    }

    return(
        <UsualScreen>
            <View style={styles.container}>

                <View style={styles.header}>
                    <View style={{width: "80%"}}>
                        <HugeText text="Choisissez une icône"/>
                    </View>

                    <NavigationButton action={"validation"} methode={handleValidation}/>
                </View>

                <StepIndicator totalSteps={5} currentStep={5}/>

                <View style={styles.body}>
                    <View style={{flex: 1}}>
                        <CustomCarousel
                            data={splitHabitsIconsData}
                            renderItem={renderIconSelectorItem}/>
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
        gap: 30, 
        flex: 1, 
        marginBottom: 0
    },

    body: {
        flex: 1, 
        gap: 30,
    },

    header: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        justifyContent: "space-between"
    },
    
    iconListContainer: {
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 20
      },

    iconContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding:10,
    },

    centerFullContent: {
        display: "flex", 
        justifyContent: "center", 
        alignContent: "center", 
        flex:1
    }
})