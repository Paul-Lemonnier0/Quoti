import { HabitudeListItem } from "./HabitudeListItem"
import { FC } from "react"
import Animated from "react-native-reanimated"
import { Habit } from "../../types/HabitTypes"

interface HabitudesListProps {
  habits: Habit[],
}

const HabitudesList: FC<HabitudesListProps> = ({habits}) => {

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
                  <HabitudeListItem habitude={habit} key={habit.habitID} index={index}/>
              )
            }
          </Animated.View>
    )
}

export default HabitudesList