import { HabitudeListItem } from "./HabitudeListItem"
import { FC, memo } from "react"
import Animated from "react-native-reanimated"
import { Habit } from "../../types/HabitTypes"
import React from "react"

export interface HabitudesListProps {
  habits: Habit[],
  handleOnPress: (habitude: Habit, 
                  objectifID: string | undefined,
                  currentDateString: string) => void,
  currentDateString: string
}

const HabitudesList: FC<HabitudesListProps> = ({habits, handleOnPress, currentDateString}) => {

    const doneHabits = habits.filter(habit => {
      const steps = Object.values(habit.steps)
      const habitDoneSteps = steps.filter(step => step.isChecked).length
      const totalSteps = steps.length

      return totalSteps === habitDoneSteps
    })

    const notDoneHabits = habits.filter(habit => !doneHabits.includes(habit))

    const sortedHabits = notDoneHabits.concat(doneHabits)

    return(
          <Animated.View style={{gap: 20, paddingBottom: 20}}>
            {
              sortedHabits.map((habit, index) => 
                  <HabitudeListItem habitude={habit} key={habit.habitID} index={index} 
                    handleOnPress={handleOnPress} currentDateString={currentDateString}/>
              )
            }
          </Animated.View>
    )
}

export default HabitudesList