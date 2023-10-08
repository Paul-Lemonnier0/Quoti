import { View } from "react-native"
import { CircleBorderButton, GoBackButton, GoNextButton } from "../../components/Buttons/UsualButton"
import { BackgroundView, MainView, TopScreenView } from "../../components/View/Views"
import { SubText, SubTitleText, TitleText } from "../../styles/StyledText"
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

export const ChooseIconScreen = () => {

    const {addHabit, handleAddHabit} = useContext(HabitsContext)

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

    const splitHabitsIconsData = splitArrayIntoChunks(habitsIconsData, 16);

    const handleValidation = async() => {
        
        const newHabit = await addHabit(finalHabit)
        handleAddHabit(newHabit)

        navigation.navigate("ValidationScreenHabit", {finalHabit})
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
            <View style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", flex: 1, marginBottom: -40}}>
                <FlatList
                    data={item}
                    keyExtractor={(itm) => itm.id}
                    renderItem={renderItem}
                    numColumns={4}
                    contentContainerStyle={styles.gridContainer}
                />
            </View>
        )
    }

    return(
        <MainView>
            <TopScreenView>

                <View style={{display: "flex", flexDirection: "row", alignItems:"center", justifyContent: "space-between", marginBottom: 15, marginTop: -10}}>

                    <GoBackButton/>

                    <View style={{flex: 1, alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column", gap: 0, marginHorizontal: 20}}>
                        <SubTitleText text={colorHabit.titre} style={{textAlign: "center"}}/>
                        <SubText text={colorHabit.description} style={{textAlign: "center"}}/>
                    </View>

                    <CircleBorderButton onPress={handleValidation}>
                        <Feather name="check" size={20} color={font} />
                    </CircleBorderButton>

                </View>

                <View style={{marginVertical: 10}}>
                    <TitleText text={"Séléctionnez une icône"} style={{textAlign: "center"}}/>
                </View>

                <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: 10}}>
                    <View style={{backgroundColor: primary, borderRadius: 50, padding: 20, borderColor: colorHabit.color, borderWidth: 2}}>
                        <Image style={{width: 30, height: 30}} source={HabitIcons[selectedIcon]}/>
                    </View>
                </View>

            </TopScreenView>

            <BackgroundView>

                <View style={{flex: 1, marginBottom: 40}}>
                    <CustomCarousel
                        data={splitHabitsIconsData}
                        renderItem={renderIconSelectorItem}
                        customWidth={30}
                    />
                </View>

            </BackgroundView>
        </MainView>
    )
}

const styles = StyleSheet.create({
    gridContainer: {
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
})