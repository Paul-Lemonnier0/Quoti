import { StyleSheet, View } from "react-native"
import HabitsSkeletonList from "../../Habitudes/HabitsSkeletonList"
import HabitudesList from "../../Habitudes/HabitudesList"
import Objectifs_SkeletonList from "../../Objectifs/Objectifs_SkeletonList"
import ObjectifsList from "../../Objectifs/ObjectifsList"
import { FC, memo, useContext } from "react"
import { TitleText } from "../../../styles/StyledText"
import { getHeightResponsive } from "../../../styles/UtilsStyles"
import { FrequencyTypes, Habit, SeriazableObjectif, Step } from "../../../types/HabitTypes"
import React from "react"
import { useThemeColor } from "../../Themed"
import { AppContext } from "../../../data/AppContext"
import { HabitsContext } from "../../../data/HabitContext"

export interface DisplayHabitsScreenProps {
  isSkeleton: Boolean,
  displayedHabits: Habit[],
  handleOnPress: (habitude: Habit, 
    objectifID: string | undefined,
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
    objectifID: string | undefined,
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

export interface DisplayObjectifsScreenProps {
  isSkeleton: Boolean,
  displayedObjectifs: InnerLogicObjectifType[],
  handleOnPress: (
    seriazableObjectif: SeriazableObjectif,
    frequency: FrequencyTypes,
    currentDateString: string
  ) => void,
  currentDateString: string
}

export const DisplayObjectifsScreen: FC<DisplayObjectifsScreenProps> = ({isSkeleton, displayedObjectifs, handleOnPress, currentDateString}) => {
  
    return(
        <>
          {
            isSkeleton ?
            <Objectifs_SkeletonList/> :
            <ObjectifsList objectifs={displayedObjectifs} handleOnPress={handleOnPress} currentDateString={currentDateString}/>
          }
        </>  
    )
}

export interface RenderObjectifsProps {
  objectifs: string[],
  selectedPeriode: FrequencyTypes,
  isLoading: Boolean,
  isFetched: Boolean,
  handleOnPress: (
    seriazableObjectif: SeriazableObjectif,
    frequency: FrequencyTypes,
    currentDateString: string
  ) => void,
  currentDateString: string
}

export interface InnerLogicObjectifType {
  objectifID: string,
  frequency: FrequencyTypes
}

export const RenderObjectifs: FC<RenderObjectifsProps> = memo(({objectifs, selectedPeriode, isLoading, isFetched, handleOnPress, currentDateString}) => {

  const {theme} = useContext(AppContext)
  const font = useThemeColor(theme, "Font")
  const fontGray = useThemeColor(theme, "FontGray")

  const isSkeleton = isLoading || !isFetched
  const displayedObjectifs_Array: InnerLogicObjectifType[] = objectifs.map(obj => ({objectifID: obj, frequency: selectedPeriode})) ?? []

  if(displayedObjectifs_Array.length === 0 && !isSkeleton){
    return null
  }

  const {filteredHabitsByDate} = useContext(HabitsContext)

  let doneObjectifs: InnerLogicObjectifType[] = []

  doneObjectifs = displayedObjectifs_Array.filter(objectif => {
    let steps: Step[] = []

    if(!filteredHabitsByDate[objectif.frequency]?.Objectifs?.hasOwnProperty(objectif.objectifID)){
        return false
    }

    const habits = Object.values(filteredHabitsByDate[objectif.frequency]?.Objectifs?.[objectif.objectifID] ?? {})
    for(const habit of habits){
        steps = steps.concat(Object.values(habit.steps))

        const doneSteps = steps ? steps.filter(step => step.isChecked).length : 0
        const totalSteps = steps.length

        return totalSteps === doneSteps
    }
  })

  const areAllHabitsCompleted = doneObjectifs.length === objectifs.length 
  const color = areAllHabitsCompleted ? fontGray : font

  const notDoneObjectifs = displayedObjectifs_Array.filter(objectif => !doneObjectifs.includes(objectif))
  const sortedObjectif = notDoneObjectifs.concat(doneObjectifs)

  return(
    <View style={styles.objectifsContainer}>
      <TitleText text={"Objectifs"} style={{color}}/>

      <DisplayObjectifsScreen
        isSkeleton={isSkeleton}
        displayedObjectifs={sortedObjectif}
        currentDateString={currentDateString}
        handleOnPress={handleOnPress}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  objectifsContainer: {
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