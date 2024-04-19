import { View } from "react-native"
import { HabitudeListItemPresentation } from "./HabitudeListItem"
import Animated, { FadeInDown } from "react-native-reanimated"
import { Habit } from "../../types/HabitTypes"
import { FC } from "react"
import { FormDetailledObjectifHabit } from "../../types/FormHabitTypes"
import React from "react"

export interface PresentationHabitListProps {
    habits: (Habit | FormDetailledObjectifHabit)[],
    baseColor?: string,
    deleteHabit: (habit: Habit | FormDetailledObjectifHabit) => void,
    editHabit: (habitID: string, newHabit: Habit | FormDetailledObjectifHabit) => void,
    isNotObjectifIDConst?: boolean,
    isNotNewObjectifHabit?: boolean,
    onPress?: (habit: Habit) => void
}

const PresentationHabitList: FC<PresentationHabitListProps> = ({
    habits, 
    baseColor, 
    deleteHabit,
    editHabit,
    isNotObjectifIDConst,
    isNotNewObjectifHabit,
    onPress
}) => {

    return(
        <View style={{gap: 20}}>
            {
                habits.map((habit, index) => (
                    <Animated.View key={index} entering={FadeInDown.duration(400).delay(200 * index)}>
                        <HabitudeListItemPresentation key={index} 
                            isNotObjectifIDConst={isNotObjectifIDConst}
                            isNotNewObjectifHabit={isNotNewObjectifHabit}
                            habitude={baseColor ? {...habit, color: baseColor} : habit}                             
                            deleteHabit={() => deleteHabit(habit)}
                            editHabit={editHabit}
                            onPress={ onPress ? () => onPress(habit as Habit) : undefined}
                        />
                    </Animated.View>
                ))
            }
        </View>
    )
}

export default PresentationHabitList