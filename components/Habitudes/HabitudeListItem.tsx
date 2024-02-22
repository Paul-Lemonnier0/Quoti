import { View, StyleSheet, TouchableOpacity, Vibration} from "react-native";
import { HugeText, LittleNormalText, NormalText, SubText, SubTitleText, TitleText} from "../../styles/StyledText";
import { useThemeColor } from "../Themed";
import { useNavigation } from "@react-navigation/native";
import cardStyle from "../../styles/StyledCard";
import IconImage from "../Other/IconImage";
import StepIndicator from "../Other/StepIndicator";
import { BackgroundIconButton, Icon, IconProvider } from "../Buttons/IconButtons";
import ProgressBar from "../Progress/ProgressBar";
import { getHabitType } from "../../primitives/HabitMethods";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Alert } from "react-native";
import { FC, useCallback, useRef } from "react";
import { useContext } from "react";
import { BottomSheetModalMethodsContext, BottomSheetModalMethodsContextProvider } from "../../data/BottomSheetModalContext";
import * as Haptics from 'expo-haptics';
import { BottomScreenOpen_Impact } from "../../constants/Impacts";
import { getHeightResponsive, getWidthResponsive } from "../../styles/UtilsStyles";
import ItemIcon from "../Icons/ItemIcon";
import Animated, { FadeInDown } from "react-native-reanimated";
import SettingHabitBottomScreen from "../../screens/BottomScreens/Habitudes/SettingsHabitBottomScreen";
import { Habit } from "../../types/HabitTypes";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

interface HabitudeListItemProps {
    habitude: Habit,
    index: number
}

export const HabitudeListItem: FC<HabitudeListItemProps> =  ({habitude, index}) => {
    const primary = useThemeColor({}, "Primary")
    const stylesCard = cardStyle()

    const objectifID  = habitude.objectifID

    const handlePress = () => {        
        //navigation.navigate("HabitudeScreen", {habitID: habitude.habitID, habitFrequency: habitude.frequency, objectifID, currentDateString})    
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
    habitude: Habit
}

export const HabitudeListItemPresentation: FC<HabitudeListItemPresentation> =  ({habitude}) => {
    const primary = useThemeColor({}, "Primary")
    const stylesCard = cardStyle()

    const objectifID  = habitude.objectifID

    const habit = habitude

    const steps = Object.values(habit.steps)
    
    const habitDoneSteps = steps.length
    const totalSteps = steps.length

    const pourcentage = (habitDoneSteps * 100 / totalSteps)

    const isFinished = habitDoneSteps === steps.length

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