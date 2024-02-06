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
import { NavigationButton } from "../../../components/Buttons/IconButtons.tsx"
import ColorListSelector from "../../../components/Other/ColorListSelector.js"

export const ChooseColorScreenObjectif = () => {

    const font = useThemeColor({}, "Font")

    const navigation = useNavigation()
    const route= useRoute()
    const {detailledObjectif} = route.params

    const [selectedColor, setSelectedColor] = useState(ColorsList[0])
    const coloredObjectif = {...detailledObjectif, color: selectedColor}

    const handleGoNext = () =>  navigation.navigate("ChooseIconScreenObjectif", {coloredObjectif})

    const bottomSheetModalRef_CustomColor = useRef(null);
    const snapPoints_CustomColor = useMemo(() => ['65%'], []);
  
    const handleOpenCustomColor = useCallback(() => {
        bottomSheetModalRef_CustomColor.current?.present();
      }, []);
  
    const handleSheetChangesCustomColor = useCallback((index) => {
    }, []);
  

    return(
        <UsualScreen hideMenu>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <NavigationButton noPadding action={"goBack"}/>
                        <NavigationButton noPadding action={"goNext"} methode={handleGoNext}/>
                    </View>

                    <HugeText text="Choisissez une couleur"/>

                    <StepIndicator totalSteps={5} currentStep={2}/>
                </View>

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
        marginBottom: 10
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
        gap: 0,
    },

    header: {
        display: "flex", 
        flexDirection: "column", 
        gap: 30
    },

    centerFullContent: {
        display: "flex", 
        justifyContent: "center", 
        alignContent: "center", 
        flex:1
    }
})