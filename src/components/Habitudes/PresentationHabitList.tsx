import { FlatList, View, ViewToken } from "react-native"
import { HabitudeListItemPresentation } from "./HabitudeListItem"
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { Habit } from "../../types/HabitTypes"
import { FC, useCallback } from "react"
import { FormDetailledGoalHabit } from "../../types/FormHabitTypes"
import React from "react"
import { UserDataBase } from "../../firebase/Database_User_Primitives"

interface RenderPresentationHabitItemProps {
    item: Habit | FormDetailledGoalHabit,
    index: number,
    viewableItems?: Animated.SharedValue<ViewToken[]>,
    baseColor?: string,
    deleteHabit: (habit: Habit | FormDetailledGoalHabit) => void,
    editHabit: (habitID: string, newHabit: Habit | FormDetailledGoalHabit) => void,
    isNotGoalIDConst?: boolean,
    isNotNewGoalHabit?: boolean,
    noAnimation?: boolean,
    onPress?: (habit: Habit) => void,
    marginBottom?: number,
    owner?: UserDataBase,
    isArchived?: boolean,
    isDone?: boolean,
}

export interface PresentationHabitListProps {
    habits: (Habit | FormDetailledGoalHabit)[],
    baseColor?: string,
    deleteHabit: (habit: Habit | FormDetailledGoalHabit) => void,
    editHabit: (habitID: string, newHabit: Habit | FormDetailledGoalHabit) => void,
    isNotGoalIDConst?: boolean,
    isNotNewGoalHabit?: boolean,
    noAnimation?: boolean,
    onPress?: (habit: Habit) => void,
    marginBottom?: number,
    owner?: UserDataBase,
    isArchived?: boolean,
    isDone?: boolean,
}

export const RenderPresentationHabitItem: FC<RenderPresentationHabitItemProps> = React.memo(({
    item: habit, 
    index, 
    viewableItems,
    baseColor, 
    deleteHabit,
    editHabit,
    isNotGoalIDConst,
    isNotNewGoalHabit,
    onPress,
    noAnimation,
    marginBottom,
    owner,
    isArchived,
    isDone
}) => {
        
    const rStyle = useAnimatedStyle(() => {
        const isVisible = viewableItems ? 
            viewableItems.value.some((viewableItem) => viewableItem.item.habitID === habit.habitID && viewableItem.isViewable) :
            true

        return {
            opacity: withTiming(isVisible ? 1 : 0),
            transform: [{
                scale: withTiming(isVisible ? 1 : 0.6) 
            }]
        }
    }, [])
    
    return(
        <Animated.View key={index} style={((noAnimation || !viewableItems) ? undefined : rStyle)}>
            <HabitudeListItemPresentation 
                key={index} 
                isNotGoalIDConst={isNotGoalIDConst}
                isNotNewGoalHabit={isNotNewGoalHabit}
                habitude={baseColor ? {...habit, color: baseColor} : habit}                             
                deleteHabit={() => deleteHabit(habit)}
                editHabit={editHabit}
                owner={owner}
                onPress={ onPress ? () => onPress(habit as Habit) : undefined}
                isArchived={isArchived}
                isDone={isDone}
            />
        </Animated.View>
    )
})


const PresentationHabitList: FC<PresentationHabitListProps> = ({
    habits, 
    baseColor, 
    deleteHabit,
    editHabit,
    isNotGoalIDConst,
    isNotNewGoalHabit,
    onPress,
    noAnimation,
    marginBottom,
    owner
}) => {

    const viewableItems = useSharedValue<ViewToken[]>([])

    const onViewableItemsChanged = useCallback(({viewableItems: vItems}) => {
        viewableItems.value = vItems
    }, []);

    return(
        <FlatList 
            style={{gap: 20, marginHorizontal: -20}}
            contentContainerStyle={{gap: 20, paddingBottom: marginBottom ?? 40, paddingTop: 20, paddingHorizontal: 20}}
            data={habits}
            key={1}
            scrollEnabled={!noAnimation}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.habitID}
            renderItem={({item, index}) => 
                <RenderPresentationHabitItem 
                    item={item} 
                    index={index} 
                    viewableItems={viewableItems}
                    baseColor={baseColor} 
                    deleteHabit={deleteHabit}
                    editHabit={editHabit}
                    isNotGoalIDConst={isNotGoalIDConst}
                    isNotNewGoalHabit={isNotNewGoalHabit}
                    onPress={onPress}
                    noAnimation={noAnimation}
                    marginBottom={marginBottom}
                    owner={owner}
                />
            }
            onViewableItemsChanged={onViewableItemsChanged}
        />
    )
}

export default PresentationHabitList