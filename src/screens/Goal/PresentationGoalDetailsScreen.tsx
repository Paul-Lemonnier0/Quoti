import React, { useState, useEffect, useContext, FC } from "react";
import { HabitsContext } from "../../data/HabitContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Habit } from "../../types/HabitTypes";
import GoalDetailsComponent from "./GoalDetailsComponent";
import { SocialScreenStackType } from "../../navigation/SocialNavigator";
import { HomeStackParamsList } from "../../navigation/HomeNavigator";

type PresentationGoalDetailsScreenProps = 
  NativeStackScreenProps<SocialScreenStackType, "PresentationGoalDetailsScreen"> | 
  NativeStackScreenProps<HomeStackParamsList, "PresentationGoalDetailsScreen">
  
const PresentationGoalDetailsScreen: FC<PresentationGoalDetailsScreenProps> = ({route, navigation}) => {
  const { Habits, Goals } = useContext(HabitsContext);
  const { seriazableGoal } = route.params;

  const habits = Object.values(Habits)

  const [displayedHabits, setDisplayedHabits] = useState<Habit[]>(habits.filter((habit) => habit.goalID === seriazableGoal.goalID));

  //Check si l'goal est vide ou non, auquel cas on renvoie sur le homescreen
  //TODO : ne pas renvoyer directement, faire un screen disant que cet goal n'a pas d'habitudes associées

  useEffect(() => {
    setDisplayedHabits(habits.filter((habit) => habit.goalID === seriazableGoal.goalID))
  }, [navigation, Habits, Goals])

  const goal = seriazableGoal || {};

  return (
      <GoalDetailsComponent
          goal={goal} 
          habits={displayedHabits} 
          isPresentation
      />  
  )
};

export default PresentationGoalDetailsScreen
