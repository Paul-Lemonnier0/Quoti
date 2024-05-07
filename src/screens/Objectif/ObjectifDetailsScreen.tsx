import React, { useState, useEffect, useContext, FC } from "react";
import { View } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { HabitsContext } from "../../data/HabitContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Habit } from "../../types/HabitTypes";
import { HomeStackParamsList } from "../../navigation/HomeNavigator";
import ObjectifDetailsComponent from "./ObjectifDetailsComponent";

type ObjectifDetailsScreenProps = NativeStackScreenProps<HomeStackParamsList, "ObjectifDetailsScreen">

const ObjectifDetailsScreen: FC<ObjectifDetailsScreenProps> = ({route, navigation}) => {

  const { filteredHabitsByDate, Habits } = useContext(HabitsContext);
  const { 
    seriazableObjectif, 
    frequency, 
    currentDateString, 
    noInteractions,
    isPresentation 
  } = route.params;

  const [isObjectifValid, setIsObjectifValid] = useState(false);
  const [displayedHabits, setDisplayedHabits] = useState<Habit[]>([]);

  useEffect(() => {
    let isMounted = true;

    const validateObjectif = async () => {
      if (seriazableObjectif?.objectifID && frequency) {
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
        if (isMounted && !isPresentation)
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
    if(isPresentation) {
      setDisplayedHabits(
          Object.values(Habits)
          .filter(habit => habit.objectifID === objectif.objectifID)
      )
    }

    else if (frequency && seriazableObjectif?.objectifID && filteredHabitsByDate[frequency]?.Objectifs?.hasOwnProperty(seriazableObjectif.objectifID)) {

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
    navigation.navigate("HabitudeScreen", {
      habitID: habitude.habitID,
      habitFrequency: habitude.frequency, 
      objectifID, 
      currentDateString,
      noInteractions
    })    
  }

  return (
    <>
      {
        (isObjectifValid || isPresentation) ? 
        <ObjectifDetailsComponent
           objectif={objectif} 
           habits={displayedHabits} 
           pourcentage={pourcentage_value} 
           handlePressHabit={handlePressOnHabit}
           currentDateString={currentDateString}
           isPresentation={isPresentation}
        />
        : 
        <View/>
      }
    </>
  )
};

export default ObjectifDetailsScreen
