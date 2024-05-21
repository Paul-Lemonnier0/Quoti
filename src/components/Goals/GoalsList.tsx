import { ViewToken } from "react-native"
import { FC, useContext, useEffect, useState } from "react"
import { FlatList } from "react-native"
import GoalBlock, { PresentationGoalBlock } from "./GoalBlock"
import { HabitsContext } from "../../data/HabitContext"
import { InnerLogicGoalType } from "../ScreenComponents/HomeScreenComponents/NotEmptyScreen"
import { FrequencyTypes, Habit, Goal, SeriazableGoal, Step } from "../../types/HabitTypes"
import React from "react"
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated"
import { getSeriazableGoal } from "../../primitives/GoalMethods"
import { UserContext } from "../../data/UserContext"
import AnimatedScrollComponent from "../ScrollView/AnimatedScrollComponent"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

export interface GoalListProps {
    goals: InnerLogicGoalType[],
    handleOnPress: (
        seriazableGoal: SeriazableGoal,
        frequency: FrequencyTypes,
        currentDateString: string
    ) => void,
    currentDateString: string
}

const GoalsList: FC<GoalListProps> = ({goals, handleOnPress, currentDateString}) => {

    const renderGoals = ({item, index}) => {
        const goalID = item.goalID
        const frequency = item.frequency

        return (
            <GoalBlock key={goalID} index={index}
                goalID={goalID} frequency={frequency}
                currentDateString={currentDateString} handleOnPress={handleOnPress}/>
        )
    }

    return(
        <FlatList 
            data={goals} 
            renderItem={renderGoals}
            showsHorizontalScrollIndicator={false}
            style={{marginHorizontal: -30, marginVertical: -15}}
            contentContainerStyle={{paddingHorizontal: 30, paddingVertical: 20, gap: 15}}
            horizontal
        />
    )
}

export default GoalsList


interface RenderPresentationGoalItemProps {
    item: Goal,
    index: number,
    onPress: (seriazableGoal: SeriazableGoal) => void,
    viewableItems?: Animated.SharedValue<ViewToken[]>,
    habits: Habit[],
    noEnteringAnimation?: boolean,
}

const RenderPresentationGoals: FC<RenderPresentationGoalItemProps> = ({
    item: goal, 
    index,
    onPress,
    viewableItems,
    habits,
    noEnteringAnimation
}) => {

    const rStyle = useAnimatedStyle(() => {
        const isVisible = viewableItems ? 
            viewableItems.value.some((viewableItem) => 
                viewableItem.item.goalID === goal.goalID && viewableItem.isViewable) :
            true;

        return {
            opacity: withTiming(isVisible ? 1 : 0),
            transform: [{
                scale: withTiming(isVisible ? 1 : 0.6) 
            }]
        }
    }, [])
    
    const goalID = goal.goalID

    return (
        <Animated.View key={index} style={viewableItems ? rStyle : undefined}>
            <PresentationGoalBlock 
                key={goalID} 
                goal={goal}
                index={index}
                handleOnPress={() => onPress(getSeriazableGoal(goal))}
                habits={habits}
                noAnimation={noEnteringAnimation}/>
        </Animated.View>
    )
}


interface PresentationGoalListProps {
    goals: Goal[],
    handleOnPress: (seriazableGoal: SeriazableGoal) => void,
    noEnteringAnimation?: boolean,
    marginBottom?: number,
    differentUserMail?: string,
    habitsForGoals?: {[key: string]: Habit[]},
    handleSearchGoal?: (text: string) => void,
    navigation?: NativeStackNavigationProp<any>,
}


export const PresentationGoalList: FC<PresentationGoalListProps> = ({
    goals, 
    handleOnPress,
    noEnteringAnimation,
    differentUserMail,
    habitsForGoals,
    handleSearchGoal,
    navigation
}) => {
    const {Habits} = useContext(HabitsContext)
    const {user} = useContext(UserContext)

    const habits = Object.values(Habits)

    const [habitsForGoalsFinal, setHabitsForGoalsFinal] = useState<{[key: string]: Habit[]}>({})

    useEffect(() => {
        if(user) {
            if(differentUserMail && user.email !== differentUserMail && habitsForGoals)
                setHabitsForGoalsFinal(habitsForGoals)

            else {
                const objHabits: {[key: string]: Habit[]} = {}
    
                goals.map((obj) => {
                    objHabits[obj.goalID] = habits.filter((habit) => habit.goalID === obj.goalID)
                })
    
                setHabitsForGoalsFinal(objHabits)
            }
        }
    }, [differentUserMail])    

    return(
        <AnimatedScrollComponent 
            data={goals} 
            renderItem={({item, index}) => 
                <RenderPresentationGoals 
                    item={item} 
                    index={index} 
                    onPress={handleOnPress}
                    habits={habitsForGoalsFinal[item.goalID] ?? []}
                    noEnteringAnimation={noEnteringAnimation}
                />
            }

            searchBarMethod={handleSearchGoal}
            searchBarPlaceholder='Rechercher un goal...'
            navigation={navigation}

            showsVerticalScrollIndicator={false}
            style={{paddingTop: 100}}
            contentContainerStyle={{paddingHorizontal: 0, paddingBottom: 260, gap: 20}}
        />
    )
}