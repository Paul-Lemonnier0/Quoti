import React, { useState, useEffect, useContext, FC } from "react";
import { View } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { HabitsContext } from "../../data/HabitContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Habit } from "../../types/HabitTypes";
import { HomeStackParamsList } from "../../navigation/HomeNavigator";
import GoalDetailsComponent from "./GoalDetailsComponent";

type GoalDetailsScreenProps = NativeStackScreenProps<HomeStackParamsList, "GoalDetailsScreen">

const GoalDetailsScreen: FC<GoalDetailsScreenProps> = ({route, navigation}) => {

  const { filteredHabitsByDate, Habits } = useContext(HabitsContext);
  const { 
    seriazableGoal, 
    frequency, 
    currentDateString, 
    noInteractions,
    isPresentation 
  } = route.params;

  const [isGoalValid, setIsGoalValid] = useState(false);
  const [displayedHabits, setDisplayedHabits] = useState<Habit[]>([]);

  useEffect(() => {
    let isMounted = true;

    const validateGoal = async () => {
      if (seriazableGoal?.goalID && frequency) {
        const isGoalVide =
            !filteredHabitsByDate[frequency]?.Goals?.hasOwnProperty(seriazableGoal.goalID);

        if (frequency === undefined || frequency === null || isGoalVide) {
          if (isMounted) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "HomeScreen" }],
              })
            );
          }

          setIsGoalValid(false);
        } 
        
        else setIsGoalValid(true);
      } 
      
      else {
        if (isMounted && !isPresentation)
          navigation.goBack();
        
        setIsGoalValid(false);
      }
    };

    validateGoal();

    return () => {
      isMounted = false;
    };
  }, [navigation, seriazableGoal, frequency, filteredHabitsByDate]);

  const goal = seriazableGoal || {};

  useEffect(() => {
    if(isPresentation) {
      setDisplayedHabits(
          Object.values(Habits)
          .filter(habit => habit.goalID === goal.goalID)
      )
    }

    else if (frequency && seriazableGoal?.goalID && filteredHabitsByDate[frequency]?.Goals?.hasOwnProperty(seriazableGoal.goalID)) {

      const habits_temp = Object.values(
        filteredHabitsByDate[frequency]?.Goals?.[seriazableGoal.goalID] ?? {}
      )

      setDisplayedHabits(habits_temp.map((habit) => ({...habit})));
    }
  }, [seriazableGoal, filteredHabitsByDate]);


  const steps = displayedHabits.flatMap((habit) =>
    Object.values(habit.steps)
  );

  const doneSteps = steps.filter((step) => step.isChecked).length;
  const totalSteps = steps.length;
  const pourcentage_value = (doneSteps * 100) / totalSteps;

  const handlePressOnHabit = (habitude: Habit, goalID: string | undefined, currentDateString: string) => {
    navigation.navigate("HabitudeScreen", {
      habitID: habitude.habitID,
      habitFrequency: habitude.frequency, 
      goalID, 
      currentDateString,
      noInteractions
    })    
  }

  return (
    <>
      {
        (isGoalValid || isPresentation) ? 
        <GoalDetailsComponent
           goal={goal} 
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

export default GoalDetailsScreen
