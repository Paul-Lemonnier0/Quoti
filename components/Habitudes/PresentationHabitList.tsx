import { View } from "react-native"
import { HabitudeListItemPresentation } from "./HabitudeListItem"
import Animated, { FadeInDown } from "react-native-reanimated"
import { Habit } from "../../types/HabitTypes"
import { FC } from "react"

interface PresentationHabitListProps {
    habits: Habit[]
}

const PresentationHabitList: FC<PresentationHabitListProps> = ({habits}) => {
    return(
        <View style={{gap: 20}}>
            {
                habits.map((habit, index) => (
                    <Animated.View key={index} entering={FadeInDown.duration(400).delay(200 * index)}>
                        <HabitudeListItemPresentation key={index} habitude={habit}/>
                    </Animated.View>
                ))
            }
        </View>
    )
}

export default PresentationHabitList