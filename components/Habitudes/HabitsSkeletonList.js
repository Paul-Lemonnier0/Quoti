import { View } from "react-native"
import { HabitudeListItem } from "./HabitudeListItem"
import { useContext } from "react"
import { BottomSheetModalMethodsContext, BottomSheetModalMethodsContextProvider } from "../../data/BottomSheetModalContext"
import { useRef } from "react"
import SettingHabitBottomScreen from "../../screens/BottomScreens/Habitudes/SettingsHabitBottomScreen"
import { HabitudeListItemSkeleton } from "./HabitListItemSkeleton"
import { Habits_Skeleton } from "../../constants/HabitsPlaceholder"
import { Skeleton } from "moti/skeleton"
import { useThemeColor } from "../Themed"

export default HabitudesSkeletonList = () => {
    const habits = Habits_Skeleton

    const primary = useThemeColor({}, "Primary")
    const secondary = useThemeColor({}, "Secondary")

    return(
        <Skeleton.Group show={true}>
            <View style={{gap: 20}}>
            {
                habits.map((habit, index) => {

                    return(
                        <Skeleton key={index} radius={20} colorMode="dark" colors={[secondary, primary, secondary]}>
                            <HabitudeListItemSkeleton habit={habit}/>
                        </Skeleton>
                    )}
                )
            }
            </View>
        </Skeleton.Group>
    )
}