import { StyleSheet, View } from "react-native"
import HabitsSkeletonList from "../../Habitudes/HabitsSkeletonList"
import HabitudesList from "../../Habitudes/HabitudesList"
import Objectifs_SkeletonList, { HelloWorld } from "../../Objectifs/Objectifs_SkeletonList"
import HorizontalAnimatedFlatList from "../../FlatList/HorizontalAnimatedFlatList"
import ObjectifsList from "../../Objectifs/ObjectifsList"
import { memo } from "react"
import { TitleText } from "../../../styles/StyledText"
import { getHeightResponsive } from "../../../styles/UtilsStyles"

export const DisplayHabitsScreen = ({isSkeleton, displayedHabits, selectedDate}) => {
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


export const RenderHabits = memo(({habits, selectedDate, isLoading, isFetched}) => {

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


export const DisplayObjectifsScreen = ({isSkeleton, displayedObjectifs, selectedDate}) => {
  
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

export const RenderObjectifs = memo(({objectifs, selectedDate, selectedPeriode, isLoading, isFetched}) => {

  const isSkeleton = isLoading || !isFetched
  const displayedObjectifs_Array = objectifs.map(obj => ({objectifID: obj, frequency: selectedPeriode})) ?? []
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