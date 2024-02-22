import { StyleSheet, View } from "react-native"
import HabitsSkeletonList from "../../Habitudes/HabitsSkeletonList"
import HabitudesList from "../../Habitudes/HabitudesList"
import Objectifs_SkeletonList from "../../Objectifs/Objectifs_SkeletonList"
import ObjectifsList from "../../Objectifs/ObjectifsList"
import { FC, memo } from "react"
import { TitleText } from "../../../styles/StyledText"
import { getHeightResponsive } from "../../../styles/UtilsStyles"
import { FrequencyTypes, Habit } from "../../../types/HabitTypes"

interface DisplayHabitsScreenProps {
  isSkeleton: Boolean,
  displayedHabits: Habit[],
}

export const DisplayHabitsScreen: FC<DisplayHabitsScreenProps> = ({isSkeleton, displayedHabits}) => {
    return(
      <>
          {
            isSkeleton ?
            <HabitsSkeletonList/> :
            <HabitudesList habits={displayedHabits}/>
          }
      </>
    )
}

interface RenderHabitsProps {
  habits: Habit[],
  isLoading: Boolean,
  isFetched: Boolean,
}

export const RenderHabits: FC<RenderHabitsProps> = memo(({habits, isLoading, isFetched}) => {

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
      />
    </View>
  )
})

interface DisplayObjectifsScreenProps {
  isSkeleton: Boolean,
  displayedObjectifs: InnerLogicObjectifType[],
}

export const DisplayObjectifsScreen: FC<DisplayObjectifsScreenProps> = ({isSkeleton, displayedObjectifs}) => {
  
    return(
        <>
          {
            isSkeleton ?
            <Objectifs_SkeletonList/> :
            <ObjectifsList objectifs={displayedObjectifs}/>
          }
        </>  
    )
}

interface RenderObjectifsProps {
  objectifs: string[],
  selectedPeriode: FrequencyTypes,
  isLoading: Boolean,
  isFetched: Boolean
}

export interface InnerLogicObjectifType {
  objectifID: string,
  frequency: FrequencyTypes
}

export const RenderObjectifs: FC<RenderObjectifsProps> = memo(({objectifs, selectedPeriode, isLoading, isFetched}) => {

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