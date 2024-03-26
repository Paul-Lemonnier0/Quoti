import { StyleSheet, View } from "react-native"
import HabitsSkeletonList from "../../Habitudes/HabitsSkeletonList"
import HabitudesList from "../../Habitudes/HabitudesList"
import Objectifs_SkeletonList from "../../Objectifs/Objectifs_SkeletonList"
import ObjectifsList from "../../Objectifs/ObjectifsList"
import { FC, memo } from "react"
import { TitleText } from "../../../styles/StyledText"
import { getHeightResponsive } from "../../../styles/UtilsStyles"
import { FrequencyTypes, Habit, SeriazableObjectif } from "../../../types/HabitTypes"
import React from "react"

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
            <HabitudesList habits={displayedHabits} handleOnPress={handleOnPress} currentDateString={currentDateString}/>
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

export const RenderHabits: FC<RenderHabitsProps> = memo(({habits, isLoading, isFetched, handleOnPress, currentDateString}) => {

  const isSkeleton = isLoading || !isFetched

  if(habits.length === 0 && !isSkeleton){
    return null
  }

  return(
    <View style={styles.habitsContainer}>
      <TitleText text={"Habitudes"}/>

      <DisplayHabitsScreen 
        isSkeleton={isSkeleton}  
        displayedHabits={habits} 
        handleOnPress={handleOnPress}
        currentDateString={currentDateString}
      />
    </View>
  )
})

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

  const isSkeleton = isLoading || !isFetched
  const displayedObjectifs_Array: InnerLogicObjectifType[] = objectifs.map(obj => ({objectifID: obj, frequency: selectedPeriode})) ?? []

  if(displayedObjectifs_Array.length === 0 && !isSkeleton){
    return null
  }

  return(
    <View style={styles.objectifsContainer}>
      <TitleText text={"Objectifs"}/>

      <DisplayObjectifsScreen
        isSkeleton={isSkeleton}
        displayedObjectifs={displayedObjectifs_Array}
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
    flexDirection: "column"
  },
})