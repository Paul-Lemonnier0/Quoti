import { View } from "react-native"
import { CircleBorderButton, GoBackButton, GoNextButton } from "../../components/Buttons/UsualButton"
import { BackgroundView, MainView, TopScreenView } from "../../components/View/Views"
import { SubText, SubTitleText, TitleText } from "../../styles/StyledText"
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

    for (let i = 0; i < ColorsList.length; i += 16) {
      chunkedColors.push(ColorsList.slice(i, i + 16));
    }

    const handleGoNext = () => {
        navigation.navigate("ChooseIconScreen", {colorHabit})
    }


    const renderItem = ({ item }) => {

        const isSelected = item == selectedColor

        return (
          <TouchableOpacity style={styles.gridItem} onPress={() => setSelectedColor(item)} key={item}>
                <View style={{backgroundColor: secondary, borderWidth: 2, borderColor: isSelected ? contrast : secondary, borderRadius: 50, padding: 20}}>
                    <View style={{padding: 10,backgroundColor: item, borderRadius: 50}}/>
                </View>
          </TouchableOpacity>

          
        );

    };

    const renderIconSelectorItem = ({item, index}) => {
        return(
            <View style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", flex: 1, marginBottom: -40}}>
                <FlatList
                    data={item}
                    keyExtractor={(itm) => itm}
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
                        <SubTitleText text={detailledHabit.titre} style={{textAlign: "center"}}/>
                        <SubText text={detailledHabit.description} style={{textAlign: "center"}}/>
                    </View>

                    <GoNextButton handleGoNext={handleGoNext}/>

                </View>

                <View style={{marginVertical: 10}}>
                    <TitleText text={"Séléctionnez une couleur"} style={{textAlign: "center"}}/>
                </View>

                <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: 10}}>
                    <View style={{backgroundColor: primary, borderRadius: 50, padding: 20}}>
                        <View style={{padding: 10,backgroundColor: selectedColor, borderRadius: 50}}/>
                    </View>
                </View>

            </TopScreenView>

            <BackgroundView>
                <View style={{flex: 1, marginBottom: 40}}>
                    <CustomCarousel
                        data={chunkedColors}
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