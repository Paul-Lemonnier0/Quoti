import { View } from "react-native"
import { CircleBorderButton, GoBackButton, GoNextButton } from "../../components/Buttons/UsualButton"
import { BackgroundView, MainView, TopScreenView, UsualScreen } from "../../components/View/Views"
import { HugeText, SubText, SubTitleText, TitleText } from "../../styles/StyledText"
import { Image } from "react-native"
import HabitIcons from "../../data/HabitIcons"
import { StackActions, useNavigation, useRoute } from "@react-navigation/native"
import { useThemeColor } from "../../components/Themed"
import { FlatList } from "react-native-gesture-handler"
import { useCallback, useContext, useMemo, useRef, useState } from "react"
import { StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native"
import { CustomCarousel } from "../../components/Carousel/CustomCarousel"
import { Feather } from "@expo/vector-icons"
import AddingHabitScreen from "./ValidationScreenHabit"
import { addNewHabit } from "../../firebase/FirestorePrimitives"
import { HabitsContext } from "../../data/HabitContext"
import StepIndicator from '../../components/Other/StepIndicator.js'


export const ChooseIconScreen = () => {

    const {addHabit, handleAddHabit, Habits} = useContext(HabitsContext)

    const route= useRoute()
    const primary = useThemeColor({}, "Primary")
    const secondary = useThemeColor({}, "Secondary")
    const contrast = useThemeColor({}, "Contrast")
    const font = useThemeColor({}, "Font")

    const [selectedIcon, setSelectedIcon] = useState("ball")

    const navigation = useNavigation()

    const {colorHabit} = route.params

    const finalHabit = {
        ...colorHabit,
        icon: selectedIcon,
    }

    const habitsIconsData = Object.keys(HabitIcons).map((key) => ({
        id: key,
        icon: HabitIcons[key],
        title: key,
    }));
      
    const splitArrayIntoChunks = (arr, chunkSize) => {
        const chunkedArray = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
          chunkedArray.push(arr.slice(i, i + chunkSize));
        }
        return chunkedArray;
    };

    const splitHabitsIconsData = splitArrayIntoChunks(habitsIconsData, 12);

    const handleValidation = async() => {
        
        const newHabit = await addHabit(finalHabit)
        console.log(newHabit)
        const indexHabit = handleAddHabit(newHabit)
        console.log("INDEX : ", indexHabit)

        navigation.navigate("ValidationScreenHabit", {habit: newHabit})
    }


    const renderItem = ({ item }) => {

        const isSelected = item.id == selectedIcon

        return (
          <TouchableOpacity style={styles.gridItem} onPress={() => setSelectedIcon(item.id)}>
                <View style={{backgroundColor: secondary, borderWidth: 2, borderColor: isSelected ? contrast : secondary, borderRadius: 50, padding: 20}}>
                    <Image style={{width: 30, height: 30}} source={item.icon}/>
                </View>
          </TouchableOpacity>
        );

    };

    const renderIconSelectorItem = ({item, index}) => {
        return(
            <View style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", flex: 1}}>
                <FlatList
                    data={item}
                    keyExtractor={(itm) => itm.id}
                    renderItem={renderItem}
                    numColumns={3} key={1}
                    contentContainerStyle={styles.gridContainer}
                />
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

                    <GoNextButton handleGoNext={handleValidation}/>

                </View>

                <StepIndicator totalSteps={5} currentStep={4}/>



                <View style={styles.body}>
                    <View style={{flex: 1, marginBottom:30}}>
                        <CustomCarousel
                            data={splitHabitsIconsData}
                            renderItem={renderIconSelectorItem}
                        />
                    </View>
                </View>

            </View>
        </UsualScreen>
    )
}

const styles = StyleSheet.create({
    gridContainer: {
        flex: 1,
        justifyContent: "center"
      },

    gridItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        padding:10
      },

    icon: {
        width: 48,
        height: 48,
        marginBottom: 8,
      },

    title: {
        textAlign: 'center',
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
        gap: 20
    },
})