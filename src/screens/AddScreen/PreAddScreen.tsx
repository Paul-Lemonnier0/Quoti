import { Image, View } from "react-native"
import { UsualScreen } from "../../components/View/Views"
import { HugeText, NormalGrayText, NormalText } from "../../styles/StyledText"
import { FC, useContext, useState } from "react"
import { StyleSheet } from "react-native"
import StepIndicator from "../../components/Other/StepIndicator"
import { NavigationActions, NavigationButton } from "../../components/Buttons/IconButtons"
import { RadioButtonsBar } from "../../components/RadioButtons/RadioButtonsBar"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import IllustrationsList, { IllustrationsType } from "../../data/IllustrationsList"
import React from "react"
import Quoti from "../../components/Other/Quoti"
import { BottomScreenOpen_Impact } from "../../constants/Impacts"
import { AddScreenStackType } from "../../navigation/AddScreenNavigator"
import { AppContext } from "../../data/AppContext"
import { useThemeColor } from "../../components/Themed"

enum ItemType {
    Habitude = "Habitude",
    Goal = "Goal"
}

enum NavItemType {
    AddBasicDetails = "AddBasicDetails",
    AddBasicDetailsGoal = "AddBasicDetailsGoal"
}

type PreAddScreenProps = NativeStackScreenProps<AddScreenStackType, "PreAddScreen">

export const PreAddScreen: FC<PreAddScreenProps> = ({navigation}) => {

    const {theme} = useContext(AppContext)
    const fontGray = useThemeColor(theme, "FontGray")
    const font = useThemeColor(theme, "Font")

    const [selectedItem, setSelectedItem] = useState<NavItemType>(NavItemType.AddBasicDetails)
    const [totalSteps, setTotalSteps] = useState(6)

    type RadioType = { key: NavItemType, text: ItemType }

    const radios: RadioType[] = [
        {key: NavItemType.AddBasicDetails, text: ItemType.Habitude },
        {key: NavItemType.AddBasicDetailsGoal, text: ItemType.Goal},
    ];

    const handleSetSelectedItem = (item: string) => {
        if(item !== selectedItem) {
            BottomScreenOpen_Impact()
            setSelectedItem(item as NavItemType)

            if(item === NavItemType.AddBasicDetails){
                setTotalSteps(6)
            }
    
            else setTotalSteps(5)
        }
    }

    const handleClose = () => {
        BottomScreenOpen_Impact()
        navigation.navigate("Home")
    }

    const handleGoNext = () => {
        BottomScreenOpen_Impact()
        navigation.navigate(selectedItem);
    }

    const isSelected = (type: NavItemType): boolean => {
        return type === selectedItem
    }   

    return(
        <UsualScreen hideMenu>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <NavigationButton noPadding action={NavigationActions.close} methode={handleClose}/>
                        <Quoti/>
                        <NavigationButton noPadding action={NavigationActions.goNext} methode={handleGoNext}/>
                    </View>

                    <HugeText text="Que voulez vous faire ?"/>

                    <StepIndicator totalSteps={totalSteps} currentStep={0}/>
                </View>
                
                <View style={styles.body}>

                    <View style={{flex: 1, flexGrow: 1, marginTop: 20}}>
                        <View style={styles.emptySreenContainer}>
                        
                            <Image style={styles.emptyScreenImageContainer} source={IllustrationsList[IllustrationsType.Creative]}/>

                            <View style={styles.emptyScreenSubContainer}>
                                <HugeText text={"Créer une "} style={{textAlign: "center", color: fontGray}}>
                                    <HugeText text={"habitude"} style={{textAlign: "center", color: isSelected(NavItemType.AddBasicDetails) ? font : fontGray}}/>
                                    <HugeText text={" ou un "} style={{textAlign: "center", color: fontGray}}/>
                                    <HugeText text={"goal"} style={{textAlign: "center", color: isSelected(NavItemType.AddBasicDetailsGoal) ? font : fontGray}}/>
                                    <HugeText text={" ?"} style={{textAlign: "center", color: fontGray}}/>
                                </HugeText>
                                    
                                <NormalGrayText bold style={{textAlign: "center"}} text={
                                    selectedItem === NavItemType.AddBasicDetails ?
                                    "Les habitudes forment la structure de vos actions quotidiennes et de vos projets. Elles constituent votre routine." :
                                    "Les goals sont composés d'habitudes et permettent de structurer davantage votre quotidien et vos projets"
                                }/>
                            </View>
                        </View>
                    </View>

                    <View style={styles.groupContainer}>
                        <RadioButtonsBar items={radios} setSelectedItem={handleSetSelectedItem} selectedItem={selectedItem}/>
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

    header: {
        display: "flex", 
        flexDirection: "column", 
        gap: 30
    },
    
    body: {
        flex: 1, 
        gap: 30,
        justifyContent: "space-between"
    },

    groupContainer: {
        display: 'flex', 
        flexDirection: "row",
        justifyContent: "center",
        gap: 0,
        width: "100%"
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
        width: "85%", 
        maxHeight: "85%",
        flex: 0.75,
    },

    emptyScreenSubContainer: {
        justifyContent: "space-evenly", 
        alignItems: "center",
        flex: 1
    },
})
