import { FC, useState } from "react";
import { AddHabitScreenType, getAddHabitStepsDetails } from "../../constants/BasicConstants";
import HabitIcons from "../../data/HabitIcons";
import { splitArrayIntoChunks } from "../../primitives/BasicsMethods";
import { useThemeColor } from "../Themed";
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { UsualScreen } from "../View/Views";
import { NavigationButton } from "../Buttons/IconButtons";
import { HugeText } from "../../styles/StyledText";
import StepIndicator from "../Other/StepIndicator";
import { CustomCarousel } from "../Carousel/CustomCarousel";
import { FormColoredHabit, FormIconedHabitValues } from "../../types/FormHabitTypes";
import { SeriazableHabit } from "../../types/HabitTypes";

interface ChooseIconFormProps {
    isForModifyingHabit?: boolean,
    habit: FormColoredHabit | SeriazableHabit,
    handleGoNext: (iconedHabit: FormIconedHabitValues) => void,
}

const ChooseIconForm: FC<ChooseIconFormProps> = ({
    isForModifyingHabit,
    habit,
    handleGoNext,
}) => {

    const secondary = useThemeColor({}, "Secondary")
    const font = useThemeColor({}, "Font")

    interface IconType {
        id: string,
        icon: string,
        title: string
    }

    const habitsIconsData: IconType[] = Object.keys(HabitIcons).map((key) => ({id: key, icon: HabitIcons[key], title: key}));

    const splitHabitsIconsData = splitArrayIntoChunks(habitsIconsData, 20);
    
    const baseIcon = 'icon' in habit ? (habit as SeriazableHabit).icon : splitHabitsIconsData[0][0].id;
    const [selectedIcon, setSelectedIcon] = useState<string>(baseIcon)

    const handleValidation = () => {
        handleGoNext({icon: selectedIcon})
    }

    const CURRENT_STEP_DETAILS = getAddHabitStepsDetails(isForModifyingHabit ? null : habit.objectifID ?? null, AddHabitScreenType.ChooseIconScreen)

    const totalSteps = CURRENT_STEP_DETAILS.TOTAL_STEPS
    const currentStep = CURRENT_STEP_DETAILS.CURRENT_STEP

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
        <UsualScreen hideMenu>
            <View style={styles.container}>

                <View style={styles.header}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <NavigationButton noPadding action={"goBack"}/>
                        <NavigationButton noPadding action={"goNext"} methode={handleValidation}/>
                    </View>

                    <HugeText text="Choisissez une icône"/>

                    <StepIndicator totalSteps={totalSteps} currentStep={currentStep}/>
                </View>


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
        marginBottom: 10
    },

    body: {
        flex: 1, 
        gap: 30,
        marginBottom: 20,
    },

    header: {
        display: "flex", 
        flexDirection: "column", 
        gap: 30
    },

    footer:{

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

export default ChooseIconForm