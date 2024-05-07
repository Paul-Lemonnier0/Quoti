import React, { useState, useEffect, useContext, FC } from "react";
import { HabitsContext } from "../../data/HabitContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Habit } from "../../types/HabitTypes";
import ObjectifDetailsComponent from "./ObjectifDetailsComponent";
import { SocialScreenStackType } from "../../navigation/SocialNavigator";
import { HomeStackParamsList } from "../../navigation/HomeNavigator";

type PresentationObjectifDetailsScreenProps = 
  NativeStackScreenProps<SocialScreenStackType, "PresentationObjectifDetailsScreen"> | 
  NativeStackScreenProps<HomeStackParamsList, "PresentationObjectifDetailsScreen">
  
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
