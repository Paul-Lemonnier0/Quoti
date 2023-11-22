import { useState, useRef, useMemo, useCallback } from "react"
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native"
import { BorderTextButton, GoNextButton } from "../../../components/Buttons/UsualButton"
import { UsualScreen } from "../../../components/View/Views"
import { HugeText, SubTitleText } from "../../../styles/StyledText"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useThemeColor } from "../../../components/Themed"
import { ColorsList } from "../../../data/ColorsList"
import StepIndicator from '../../../components/Other/StepIndicator.js'
import CustomColorBottomScreen from "../../BottomScreens/CustomColorBottomScreen"
import { NavigationButton } from "../../../components/Buttons/IconButtons.js"
import ColorListSelector from "../../../components/Other/ColorListSelector.js"

export const ChooseColorScreen = () => {

    const font = useThemeColor({}, "Font")

    const navigation = useNavigation()
    const route= useRoute()
    const {detailledHabit} = route.params

    const [selectedColor, setSelectedColor] = useState(ColorsList[0])
    const colorHabit = {...detailledHabit, color: selectedColor,}

    const handleGoNext = () =>  navigation.navigate("ChooseIconScreen", {colorHabit})

    const bottomSheetModalRef_CustomColor = useRef(null);
    const snapPoints_CustomColor = useMemo(() => ['65%'], []);
  
    const handleOpenCustomColor = useCallback(() => {
        bottomSheetModalRef_CustomColor.current?.present();
      }, []);
  
    const handleSheetChangesCustomColor = useCallback((index) => {
        console.log("handleSheetChange", index)
    }, []);
  

    return(
        <UsualScreen>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{width: "80%"}}>
                        <HugeText text="Choisissez une couleur"/>
                    </View>

                    <NavigationButton action={"goNext"} methode={handleGoNext}/>
                </View>

                <StepIndicator totalSteps={5} currentStep={4}/>

                <View style={styles.body}>
                    <View style={styles.centerFullContent}>
                        <ColorListSelector selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>
                    </View>

                    <View style={styles.centered}>
                        <View style={styles.customColorContainer}>
                            <BorderTextButton bold text="Aa" onPress={handleOpenCustomColor}/>
                            <View style={[styles.selectedColor, {borderColor: font, backgroundColor: selectedColor}]}/>
                        </View>
                    </View>
                </View>
            </View>

            <CustomColorBottomScreen 
                bottomSheetModalRef={bottomSheetModalRef_CustomColor} 
                snapPoints={snapPoints_CustomColor} 
                handleSheetChanges={handleSheetChangesCustomColor}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}/>
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

    centered: {
        justifyContent: "center", 
        display: "flex", 
        alignItems: "center"
    },

    customColorContainer: {
        display: "flex", 
        flexDirection: "row", 
        gap: 10
    },

    selectedColor: {
        aspectRatio: 1,
        borderWidth: 2, 
        borderRadius: 18,
    },

    body: {
        flex: 1,
    },

    header: {
        display: "flex", 
        flexDirection: "row", 
        alignItems:"center", 
        justifyContent: "space-between"
    },

    colorListContainer: {
        flex: 1,
        justifyContent: "center",
        marginHorizontal: -8,
    },

    colorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding:8,
    },

    colorSubContainer: {
        borderWidth: 2,
        borderRadius: 20, 
        padding: 5
    },

    centerFullContent: {
        display: "flex", 
        justifyContent: "center", 
        alignContent: "center", 
        flex:1
    }
})