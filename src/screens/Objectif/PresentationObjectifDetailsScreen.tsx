import React, { useState, useEffect, useContext, FC, useCallback, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { CommonActions, useNavigation, useRoute } from "@react-navigation/native";
import { CustomScrollView, UsualScreen } from "../../components/View/Views";
import { IconButton, IconProvider, NavigationActions, NavigationButton } from "../../components/Buttons/IconButtons";
import {HugeText, NormalGrayText, TitleText} from "../../styles/StyledText";
import HabitudesList from "../../components/Habitudes/HabitudesList";
import ProgressBar from "../../components/Progress/ProgressBar";
import { useThemeColor } from "../../components/Themed";
import { HabitsContext } from "../../data/HabitContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamsList } from "../../navigation/BottomTabNavigator";
import { Habit } from "../../types/HabitTypes";
import SettingsObjectifBottomSheet from "../BottomScreens/Objectifs/SettingsObjectifBottomScreen";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { convertBackSeriazableObjectif, getSeriazableObjectif } from "../../primitives/ObjectifMethods";
import { convertBackSeriazableHabit } from "../../primitives/HabitMethods";
import Quoti from "../../components/Other/Quoti";
import { AppContext } from "../../data/AppContext";
import ObjectifDetailsComponent from "./ObjectifDetailsComponent";

type PresentationObjectifDetailsScreenProps = NativeStackScreenProps<HomeStackParamsList, "PresentationObjectifDetailsScreen">

const PresentationObjectifDetailsScreen: FC<PresentationObjectifDetailsScreenProps> = ({route, navigation}) => {
  const { Habits, Objectifs } = useContext(HabitsContext);
  const { seriazableObjectif } = route.params;

  const habits = Object.values(Habits)

  const [displayedHabits, setDisplayedHabits] = useState<Habit[]>(habits.filter((habit) => habit.objectifID === seriazableObjectif.objectifID));

  //Check si l'objectif est vide ou non, auquel cas on renvoie sur le homescreen
  //TODO : ne pas renvoyer directement, faire un screen disant que cet objectif n'a pas d'habitudes associées

  useEffect(() => {
    setDisplayedHabits(habits.filter((habit) => habit.objectifID === seriazableObjectif.objectifID))
  }, [navigation, Habits, Objectifs])

  const objectif = seriazableObjectif || {};

  return (
      <ObjectifDetailsComponent
          objectif={objectif} 
          habits={displayedHabits} 
          isPresentation
      />  
  )
};

export default PresentationObjectifDetailsScreen
