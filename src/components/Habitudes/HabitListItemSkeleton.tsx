import { Animated, View, StyleSheet, TouchableOpacity, Vibration} from "react-native";
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
import { useRef } from "react";
import { useContext } from "react";
import { BottomSheetModalMethodsContext } from "../../data/BottomSheetModalContext";
import * as Haptics from 'expo-haptics';
import { BottomScreenOpen_Impact } from "../../constants/Impacts";
import { getHeightResponsive, getWidthResponsive } from "../../styles/UtilsStyles";
import ItemIcon from "../Icons/ItemIcon";
import React from "react"



export const HabitudeListItemSkeleton =  ({habit}) => {
    
    const primary = useThemeColor({}, "Primary")
    const stylesCard = cardStyle()

    return(
        <View>
            <Animated.View style={[stylesCard.card, styles.container]}>

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
                    currentStep={1} totalSteps={1}/>
            </Animated.View>
        </View>
)};

const styles = StyleSheet.create(
    {   
        container: {
            gap: getHeightResponsive(20),
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
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