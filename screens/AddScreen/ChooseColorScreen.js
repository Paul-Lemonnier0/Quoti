import { View } from "react-native"
import { CircleBorderButton, GoBackButton, GoNextButton } from "../../components/Buttons/UsualButton"
import { BackgroundView, MainView, TopScreenView, UsualScreen } from "../../components/View/Views"
import { HugeText, SubText, SubTitleText, TitleText } from "../../styles/StyledText"
import { Image } from "react-native"
import HabitIcons from "../../data/HabitIcons"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useThemeColor } from "../../components/Themed"
import { FlatList } from "react-native-gesture-handler"
import { useCallback, useMemo, useRef, useState } from "react"
import { StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native"
import { CustomCarousel } from "../../components/Carousel/CustomCarousel"
import { Feather } from "@expo/vector-icons"
import AddingHabitScreen from "./ValidationScreenHabit"
import { ColorsList } from "../../data/ColorsList"
import StepIndicator from '../../components/Other/StepIndicator.js'

export const ChooseColorScreen = () => {

    const route= useRoute()
    const primary = useThemeColor({}, "Primary")
    const secondary = useThemeColor({}, "Secondary")
    const contrast = useThemeColor({}, "Contrast")
    const font = useThemeColor({}, "Font")

    const [selectedColor, setSelectedColor] = useState(ColorsList[0])

    const navigation = useNavigation()

    const {detailledHabit} = route.params

    const colorHabit = {
        ...detailledHabit,
        color: selectedColor,
    }

    const chunkedColors = [];

    for (let i = 0; i < ColorsList.length; i += 12) {
      chunkedColors.push(ColorsList.slice(i, i + 12));
    }

    const handleGoNext = () => {
        navigation.navigate("ChooseIconScreen", {colorHabit})
    }


    const renderItem = ({ item }) => {

        const isSelected = item == selectedColor

        return (
          <TouchableOpacity style={styles.gridItem} onPress={() => setSelectedColor(item)} key={item}>
                <View style={{backgroundColor: secondary, borderWidth: 2, borderColor: isSelected ? contrast : secondary, borderRadius: 50, padding: 20,}}>
                    <View style={{padding: 15,backgroundColor: item, borderRadius: 50}}/>
                </View>
          </TouchableOpacity>
        );

    };

    const renderIconSelectorItem = ({item, index}) => {
        return(
            <View style={{display: "flex", justifyContent: "center", alignContent: "center", flex:1}}>
                <FlatList
                    data={item}
                    keyExtractor={(itm) => itm}
                    renderItem={renderItem} key={1}
                    numColumns={3}
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
                        <HugeText text="Choisissez une couleur"/>
                    </View>

                    <GoNextButton handleGoNext={handleGoNext}/>

                </View>

                <StepIndicator totalSteps={5} currentStep={3}/>



                <View style={styles.body}>
                    <View style={{flex: 1, marginBottom:30}}>
                        <CustomCarousel
                            data={chunkedColors}
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