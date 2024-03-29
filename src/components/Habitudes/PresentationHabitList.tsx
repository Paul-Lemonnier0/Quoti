import { View } from "react-native"
import { HabitudeListItemPresentation } from "./HabitudeListItem"
import Animated, { FadeInDown } from "react-native-reanimated"
import { Habit } from "../../types/HabitTypes"
import { FC } from "react"
import { FormDetailledHabit, FormDetailledObjectifHabit } from "../../types/FormHabitTypes"
import React from "react"

export interface PresentationHabitListProps {
    habits: (Habit | FormDetailledObjectifHabit)[],
    baseColor?: string,
    deleteHabit: (habit: Habit | FormDetailledObjectifHabit) => void,
    editHabit: (habitID: string, newHabit: Habit | FormDetailledObjectifHabit) => void,
}

const PresentationHabitList: FC<PresentationHabitListProps> = ({
    habits, 
    baseColor, 
    deleteHabit,
    editHabit
}) => {
    return(
        <View style={{gap: 20}}>
            {
                habits.map((habit, index) => (
                    <Animated.View key={index} entering={FadeInDown.duration(400).delay(200 * index)}>
                        <HabitudeListItemPresentation key={index} 
                            habitude={baseColor ? {...habit, color: baseColor} : habit}                             
                            deleteHabit={() => deleteHabit(habit)}
                            editHabit={editHabit}
                        />
                    </Animated.View>
                ))
            }
        </View>
    )
}

export default PresentationHabitList