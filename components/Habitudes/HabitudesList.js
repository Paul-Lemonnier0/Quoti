import { View } from "react-native"
import { HabitudeListItem } from "./HabitudeListItem"
import { useContext } from "react"
import { BottomSheetModalMethodsContext, BottomSheetModalMethodsContextProvider } from "../../data/BottomSheetModalContext"
import { useRef } from "react"
import SettingHabitBottomScreen from "../../screens/BottomScreens/Habitudes/SettingsHabitBottomScreen"

export default HabitudesList = ({habits, selectedDate}) => {

    const isPlaceholder = selectedDate === undefined
    const currentDateString = isPlaceholder ? "none" : selectedDate.toDateString()

    return(
          <View style={{gap: 20}}>
            {
              habits.map(habit => {

                  const bottomSheetModalRef = useRef(null);

                  return(
                    <BottomSheetModalMethodsContextProvider bottomSheetModalRef={bottomSheetModalRef} key={habit.habitID}>
                      <HabitudeListItem bottomSheetModalRef={bottomSheetModalRef} habitude={habit}
                            currentDateString={currentDateString}/>

                      <SettingHabitBottomScreen bottomSheetModalRef={bottomSheetModalRef} habit={habit}/>
                    </BottomSheetModalMethodsContextProvider>
                  )}
              )
            }
          </View>
    )
}