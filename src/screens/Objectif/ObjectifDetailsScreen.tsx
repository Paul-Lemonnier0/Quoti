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

type ObjectifDetailsScreenProps = NativeStackScreenProps<HomeStackParamsList, "ObjectifDetailsScreen">

const ObjectifDetailsScreen: FC<ObjectifDetailsScreenProps> = ({route, navigation}) => {

  const { filteredHabitsByDate } = useContext(HabitsContext);
  const { seriazableObjectif, frequency, currentDateString } = route.params;

  const [isObjectifValid, setIsObjectifValid] = useState(false);
  const [displayedHabits, setDisplayedHabits] = useState<Habit[]>([]);

  useEffect(() => {
    let isMounted = true;

    const validateObjectif = async () => {
      if (seriazableObjectif?.objectifID) {
        const isObjectifVide =
            !filteredHabitsByDate[frequency]?.Objectifs?.hasOwnProperty(seriazableObjectif.objectifID);

        if (frequency === undefined || frequency === null || isObjectifVide) {
          if (isMounted) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "HomeScreen" }],
              })
            );
          }

          setIsObjectifValid(false);
        } 
        
        else setIsObjectifValid(true);
      } 
      
      else {
        if (isMounted)
          navigation.goBack();
        
        setIsObjectifValid(false);
      }
    };

    validateObjectif();

    return () => {
      isMounted = false;
    };
  }, [navigation, seriazableObjectif, frequency, filteredHabitsByDate]);

  const objectif = seriazableObjectif || {};

  useEffect(() => {
    if (seriazableObjectif?.objectifID && filteredHabitsByDate[frequency]?.Objectifs?.hasOwnProperty(seriazableObjectif.objectifID)) {

      const habits_temp = Object.values(
        filteredHabitsByDate[frequency]?.Objectifs?.[seriazableObjectif.objectifID] ?? {}
      )

      setDisplayedHabits(habits_temp.map((habit) => ({...habit})));
    }
  }, [seriazableObjectif, filteredHabitsByDate]);


  const steps = displayedHabits.flatMap((habit) =>
    Object.values(habit.steps)
  );

  const doneSteps = steps.filter((step) => step.isChecked).length;
  const totalSteps = steps.length;
  const pourcentage_value = (doneSteps * 100) / totalSteps;

  const handlePressOnHabit = (habitude: Habit, objectifID: string | undefined, currentDateString: string) => {
    navigation.navigate("HabitudeScreen", {habitID: habitude.habitID, habitFrequency: habitude.frequency, objectifID, currentDateString})    
  }

  return (
    <>
      {
        isObjectifValid ? <ObjectifDetailsComponent
           objectif={objectif} 
           habits={displayedHabits} 
           pourcentage={pourcentage_value} 
           handlePressHabit={handlePressOnHabit}
           currentDateString={currentDateString}
        />
        : <View/>
      }
    </>
  )
};

export default ObjectifDetailsScreen
