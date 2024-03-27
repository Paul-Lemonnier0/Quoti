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
    selectedHabitID?: string,
    onPress: (habit: Habit | FormDetailledObjectifHabit) => void,
    deleteHabit: (habit: Habit | FormDetailledObjectifHabit) => void,
    editHabit: (habit: Habit | FormDetailledObjectifHabit) => void,
}

const PresentationHabitList: FC<PresentationHabitListProps> = ({
    habits, 
    baseColor, 
    onPress, 
    selectedHabitID,
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
                            isSelected={selectedHabitID ? selectedHabitID === (habit as Habit).habitID : false}
                            
                            onPress={() => onPress(habit)} 
                            deleteHabit={() => deleteHabit(habit)}
                            editHabit={() => editHabit(habit as Habit)}
                        />
                    </Animated.View>
                ))
            }
        </View>
    )
}

export default PresentationHabitList