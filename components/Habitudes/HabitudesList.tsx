import { View } from "react-native"
import { HabitudeListItem } from "./HabitudeListItem"
import { FC, useContext } from "react"
import { BottomSheetModalMethodsContext, BottomSheetModalMethodsContextProvider } from "../../data/BottomSheetModalContext"
import { useRef } from "react"
import SettingHabitBottomScreen from "../../screens/BottomScreens/Habitudes/SettingsHabitBottomScreen"
import Animated from "react-native-reanimated"
import { Habit } from "../../types/HabitTypes"

interface HabitudesListProps {
  habits: Habit[],
  selectedDate: Date
}

const HabitudesList: FC<HabitudesListProps> = ({habits, selectedDate}) => {

    const currentDateString = selectedDate.toDateString()

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
              sortedHabits.map((habit, index) => {
                  return(
                      <HabitudeListItem habitude={habit} key={habit.habitID} index={index}
                            currentDateString={currentDateString}/>
                  )}
              )
            }
          </Animated.View>
    )
}

export default HabitudesList