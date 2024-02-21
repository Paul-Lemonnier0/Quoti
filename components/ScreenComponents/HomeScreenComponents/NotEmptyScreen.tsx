import { StyleSheet, View } from "react-native"
import HabitsSkeletonList from "../../Habitudes/HabitsSkeletonList"
import HabitudesList from "../../Habitudes/HabitudesList"
import Objectifs_SkeletonList from "../../Objectifs/Objectifs_SkeletonList"
import ObjectifsList from "../../Objectifs/ObjectifsList"
import { FC, memo } from "react"
import { TitleText } from "../../../styles/StyledText"
import { getHeightResponsive } from "../../../styles/UtilsStyles"
import { Habit } from "../../../types/HabitTypes"

interface DisplayHabitsScreenProps {
  isSkeleton: Boolean,
  displayedHabits: Habit[],
  selectedDate: Date,
}

export const DisplayHabitsScreen: FC<DisplayHabitsScreenProps> = ({isSkeleton, displayedHabits, selectedDate}) => {
    return(
      <>
          {
            isSkeleton ?
            <HabitsSkeletonList/> :
            <HabitudesList habits={displayedHabits} selectedDate={selectedDate}/>
          }
      </>
    )
}

interface RenderHabitsProps {
  habits: Habit[],
  selectedDate: Date,
  isLoading: Boolean,
  isFetched: Boolean,
}

export const RenderHabits: FC<RenderHabitsProps> = memo(({habits, selectedDate, isLoading, isFetched}) => {

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
        selectedDate={selectedDate}
      />
    </View>
  )
})

interface DisplayObjectifsScreenProps {
  isSkeleton: Boolean,
  displayedObjectifs: TempObjectifsType[],
  selectedDate: Date,
}

export const DisplayObjectifsScreen: FC<DisplayObjectifsScreenProps> = ({isSkeleton, displayedObjectifs, selectedDate}) => {
  
    return(
        <>
          {
            isSkeleton ?
            <Objectifs_SkeletonList/> :
            <ObjectifsList objectifs={displayedObjectifs} selectedDate={selectedDate}/>
          }
        </>  
    )
}

interface RenderObjectifsProps {
  objectifs: string[],
  selectedDate: Date,
  selectedPeriode: string,
  isLoading: Boolean,
  isFetched: Boolean
}

interface TempObjectifsType {
  objectifID: string,
  frequency: string
}

export const RenderObjectifs: FC<RenderObjectifsProps> = memo(({objectifs, selectedDate, selectedPeriode, isLoading, isFetched}) => {

  const isSkeleton = isLoading || !isFetched
  const displayedObjectifs_Array: TempObjectifsType[] = objectifs.map(obj => ({objectifID: obj, frequency: selectedPeriode})) ?? []
  const isObjectifsEmpty = objectifs.length === 0

  if(displayedObjectifs_Array.length === 0 && !isSkeleton){
    return null
  }

  return(
    <View style={styles.objectifsContainer}>
      <TitleText text={"Objectifs"}/>

      <DisplayObjectifsScreen
        isSkeleton={isSkeleton}
        displayedObjectifs={displayedObjectifs_Array}
        selectedDate={selectedDate}
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