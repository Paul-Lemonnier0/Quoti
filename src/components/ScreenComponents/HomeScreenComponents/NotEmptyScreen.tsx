import { StyleSheet, View } from "react-native"
import HabitsSkeletonList from "../../Habitudes/HabitsSkeletonList"
import HabitudesList from "../../Habitudes/HabitudesList"
import Goals_SkeletonList from "../../Goals/Goals_SkeletonList"
import GoalsList from "../../Goals/GoalsList"
import { FC, memo, useContext } from "react"
import { TitleText } from "../../../styles/StyledText"
import { getHeightResponsive } from "../../../styles/UtilsStyles"
import { FrequencyTypes, Habit, SeriazableGoal, Step } from "../../../types/HabitTypes"
import React from "react"
import { useThemeColor } from "../../Themed"
import { AppContext } from "../../../data/AppContext"
import { HabitsContext } from "../../../data/HabitContext"

export interface DisplayHabitsScreenProps {
  isSkeleton: Boolean,
  displayedHabits: Habit[],
  handleOnPress: (habitude: Habit, 
    goalID: string | undefined,
    currentDateString: string) => void,  
  currentDateString: string
}

export const DisplayHabitsScreen: FC<DisplayHabitsScreenProps> = ({isSkeleton, displayedHabits, handleOnPress, currentDateString}) => {

    return(
      <>
          {
            isSkeleton ?
            <HabitsSkeletonList/> :
            <HabitudesList
              basicAnimation 
              habits={displayedHabits} 
              handleOnPress={handleOnPress} 
              currentDateString={currentDateString}
            />
          }
      </>
    )
}

export interface RenderHabitsProps {
  habits: Habit[],
  isLoading: Boolean,
  isFetched: Boolean,
  handleOnPress: (habitude: Habit, 
    goalID: string | undefined,
    currentDateString: string) => void,   
  currentDateString: string
}

export const RenderHabits: FC<RenderHabitsProps> = ({habits, isLoading, isFetched, handleOnPress, currentDateString}) => {

  const {theme} = useContext(AppContext)
  const font = useThemeColor(theme, "Font")
  const fontGray = useThemeColor(theme, "FontGray")

  const isSkeleton = isLoading || !isFetched

  if(habits.length === 0 && !isSkeleton){
    return null
  }

  const doneHabits = habits.filter(habit => {
    const steps = Object.values(habit.steps)
    const habitDoneSteps = steps.filter(step => step.isChecked).length
    const totalSteps = steps.length

    return totalSteps === habitDoneSteps
  })

  const notDoneHabits = habits.filter(habit => !doneHabits.includes(habit))

  const sortedHabits = notDoneHabits.concat(doneHabits)

  const areAllHabitsCompleted = notDoneHabits.length === 0

  const color = areAllHabitsCompleted ? fontGray : font

  return(
    <View style={styles.habitsContainer}>
      <TitleText 
        text={"Habitudes"}
        style={{color}}
      />

      <DisplayHabitsScreen 
        isSkeleton={isSkeleton}  
        displayedHabits={sortedHabits} 
        handleOnPress={handleOnPress}
        currentDateString={currentDateString}
      />
    </View>
  )
}

export interface DisplayGoalsScreenProps {
  isSkeleton: Boolean,
  displayedGoals: InnerLogicGoalType[],
  handleOnPress: (
    seriazableGoal: SeriazableGoal,
    frequency: FrequencyTypes,
    currentDateString: string
  ) => void,
  currentDateString: string
}

export const DisplayGoalsScreen: FC<DisplayGoalsScreenProps> = ({isSkeleton, displayedGoals, handleOnPress, currentDateString}) => {
  
    return(
        <>
          {
            isSkeleton ?
            <Goals_SkeletonList/> :
            <GoalsList goals={displayedGoals} handleOnPress={handleOnPress} currentDateString={currentDateString}/>
          }
        </>  
    )
}

export interface RenderGoalsProps {
  goals: string[],
  selectedPeriode: FrequencyTypes,
  isLoading: Boolean,
  isFetched: Boolean,
  handleOnPress: (
    seriazableGoal: SeriazableGoal,
    frequency: FrequencyTypes,
    currentDateString: string
  ) => void,
  currentDateString: string
}

export interface InnerLogicGoalType {
  goalID: string,
  frequency: FrequencyTypes
}

export const RenderGoals: FC<RenderGoalsProps> = memo(({goals, selectedPeriode, isLoading, isFetched, handleOnPress, currentDateString}) => {

  const {theme} = useContext(AppContext)
  const font = useThemeColor(theme, "Font")
  const fontGray = useThemeColor(theme, "FontGray")

  const isSkeleton = isLoading || !isFetched
  const displayedGoals_Array: InnerLogicGoalType[] = goals.map(obj => ({goalID: obj, frequency: selectedPeriode})) ?? []

  if(displayedGoals_Array.length === 0 && !isSkeleton){
    return null
  }

  const {filteredHabitsByDate} = useContext(HabitsContext)

  let doneGoals: InnerLogicGoalType[] = []

  doneGoals = displayedGoals_Array.filter(goal => {
    let steps: Step[] = []

    if(!filteredHabitsByDate[goal.frequency]?.Goals?.hasOwnProperty(goal.goalID)){
        return false
    }

    const habits = Object.values(filteredHabitsByDate[goal.frequency]?.Goals?.[goal.goalID] ?? {})
    for(const habit of habits){
        steps = steps.concat(Object.values(habit.steps))

        const doneSteps = steps ? steps.filter(step => step.isChecked).length : 0
        const totalSteps = steps.length

        return totalSteps === doneSteps
    }
  })

  const areAllHabitsCompleted = doneGoals.length === goals.length 
  const color = areAllHabitsCompleted ? fontGray : font

  const notDoneGoals = displayedGoals_Array.filter(goal => !doneGoals.includes(goal))
  const sortedGoal = notDoneGoals.concat(doneGoals)

  return(
    <View style={styles.goalsContainer}>
      <TitleText text={"Goals"} style={{color}}/>

      <DisplayGoalsScreen
        isSkeleton={isSkeleton}
        displayedGoals={sortedGoal}
        currentDateString={currentDateString}
        handleOnPress={handleOnPress}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  goalsContainer: {
    gap: getHeightResponsive(20),
    display: 'flex',
    flexDirection: "column"
  },

  habitsContainer: {
    gap: getHeightResponsive(20),
    display: 'flex',
    flexDirection: "column",
    marginBottom: 100
  },
})