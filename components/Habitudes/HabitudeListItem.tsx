import { View, StyleSheet, TouchableOpacity } from "react-native";
import { SubText, SubTitleText } from "../../styles/StyledText";
import { useThemeColor } from "../Themed";
import cardStyle from "../../styles/StyledCard";
import StepIndicator from "../Other/StepIndicator";
import { Icon, IconProvider } from "../Buttons/IconButtons";
import { FC, useCallback, useRef } from "react";
import { BottomScreenOpen_Impact } from "../../constants/Impacts";
import { getHeightResponsive, getWidthResponsive } from "../../styles/UtilsStyles";
import ItemIcon from "../Icons/ItemIcon";
import Animated, { FadeInDown } from "react-native-reanimated";
import SettingHabitBottomScreen from "../../screens/BottomScreens/Habitudes/SettingsHabitBottomScreen";
import { Habit } from "../../types/HabitTypes";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FormDetailledHabit } from "../../types/FormHabitTypes";

interface HabitudeListItemProps {
    habitude: Habit,
    index: number,
    handleOnPress: (habitude: Habit, 
        objectifID: string | undefined,
        currentDateString: string) => void,
    currentDateString: string
}

export const HabitudeListItem: FC<HabitudeListItemProps> =  ({habitude, index, handleOnPress, currentDateString}) => {
    const primary = useThemeColor({}, "Primary")
    const stylesCard = cardStyle()

    const handlePress = () => {  
        handleOnPress(habitude, habitude.objectifID, currentDateString)      
    }

    const habit = habitude

    const steps = Object.values(habit.steps)
    
    const habitDoneSteps = steps.filter(step => step.isChecked).length
    const totalSteps = steps.length

    const pourcentage = (habitDoneSteps * 100 / totalSteps)

    const isFinished = habitDoneSteps === steps.length

    const handleLongPress = () => {
        BottomScreenOpen_Impact();
        openModal()
    }

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const openModal = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);



    return(
        <>
        <TouchableOpacity style={{opacity: isFinished ? 0.5 : 1}} delayLongPress={750} onLongPress={handleLongPress} onPress={handlePress}>
            <Animated.View entering={FadeInDown.duration(400).delay(index * 200)} style={[stylesCard.card, styles.container]}>

                <View style={styles.habit}>
                    <ItemIcon icon={habit.icon} color={habit.color}/>

                    <View style={styles.habitTitleStateContainer}>
                        <SubTitleText numberOfLines={1} text={habit.titre}/>
                        <SubText numberOfLines={1} text={habit.description}/>
                    </View>

                    <View style={styles.pourcentageContainer}>
                        <Icon name="chevron-right" provider={IconProvider.Feather}/>
                    </View>
                </View>

                <StepIndicator height={3} inactiveColor={primary} color={habit.color}
                    currentStep={habitDoneSteps} totalSteps={totalSteps}/>
            </Animated.View>
        </TouchableOpacity>

        <SettingHabitBottomScreen bottomSheetModalRef={bottomSheetModalRef} habit={habit}/>

        </>
)};


interface HabitudeListItemPresentation {
    habitude: Habit | FormDetailledHabit
}

export const HabitudeListItemPresentation: FC<HabitudeListItemPresentation> =  ({habitude}) => {
    const primary = useThemeColor({}, "Primary")
    const stylesCard = cardStyle()

    const habit = habitude

    const steps = Object.values(habit.steps)
    
    const habitDoneSteps = steps.length
    const totalSteps = steps.length

    return(
        <View style={[stylesCard.card, styles.container]}>

            <View style={styles.habit}>
                <ItemIcon icon={habit.icon} color={habit.color}/>

                <View style={styles.habitTitleStateContainer}>
                    <SubTitleText numberOfLines={1} text={habit.titre}/>
                    <SubText numberOfLines={1} text={habit.description}/>
                </View>
            </View>

            <StepIndicator height={3} inactiveColor={primary} color={habit.color}
                currentStep={habitDoneSteps} totalSteps={totalSteps}/>
        </View>
)};

const styles = StyleSheet.create(
    {   
        container: {
            gap: getHeightResponsive(20),
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            // flex: 1
        },

        pourcentageContainer: {
            display: "flex", 
            justifyContent: "center",
        },

        iconContainer: {
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            borderWidth: 2,
            borderRadius: 15 
        },
        
        habit: {
            gap: getWidthResponsive(20),
            // flex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        },

        TouchableScreen: {
            flex: 1,
        },

        footerhabit: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems:"center"
        },

        habitTitleStateContainer: {
            flex:1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        },     
    }
)