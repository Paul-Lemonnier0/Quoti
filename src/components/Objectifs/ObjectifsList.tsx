import { ViewToken } from "react-native"
import { FC, useContext, useEffect, useState } from "react"
import { FlatList } from "react-native"
import ObjectifBlock, { PresentationObjectifBlock } from "./ObjectifBlock"
import { HabitsContext } from "../../data/HabitContext"
import { InnerLogicObjectifType } from "../ScreenComponents/HomeScreenComponents/NotEmptyScreen"
import { FrequencyTypes, Habit, Objectif, SeriazableObjectif, Step } from "../../types/HabitTypes"
import React from "react"
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated"
import { getSeriazableObjectif } from "../../primitives/ObjectifMethods"
import { UserContext } from "../../data/UserContext"
import AnimatedScrollComponent from "../ScrollView/AnimatedScrollComponent"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

export interface ObjectifListProps {
    objectifs: InnerLogicObjectifType[],
    handleOnPress: (
        seriazableObjectif: SeriazableObjectif,
        frequency: FrequencyTypes,
        currentDateString: string
    ) => void,
    currentDateString: string
}

const ObjectifsList: FC<ObjectifListProps> = ({objectifs, handleOnPress, currentDateString}) => {

    const renderObjectifs = ({item, index}) => {
        const objectifID = item.objectifID
        const frequency = item.frequency

        return (
            <ObjectifBlock key={objectifID} index={index}
                objectifID={objectifID} frequency={frequency}
                currentDateString={currentDateString} handleOnPress={handleOnPress}/>
        )
    }

    return(
        <FlatList 
            data={objectifs} 
            renderItem={renderObjectifs}
            showsHorizontalScrollIndicator={false}
            style={{marginHorizontal: -30, marginVertical: -15}}
            contentContainerStyle={{paddingHorizontal: 30, paddingVertical: 20, gap: 15}}
            horizontal
        />
    )
}

export default ObjectifsList


interface RenderPresentationObjectifItemProps {
    item: Objectif,
    index: number,
    onPress: (seriazableObjectif: SeriazableObjectif) => void,
    viewableItems?: Animated.SharedValue<ViewToken[]>,
    habits: Habit[],
    noEnteringAnimation?: boolean,
}

const RenderPresentationObjectifs: FC<RenderPresentationObjectifItemProps> = ({
    item: objectif, 
    index,
    onPress,
    viewableItems,
    habits,
    noEnteringAnimation
}) => {

    const rStyle = useAnimatedStyle(() => {
        const isVisible = viewableItems ? 
            viewableItems.value.some((viewableItem) => 
                viewableItem.item.objectifID === objectif.objectifID && viewableItem.isViewable) :
            true;

        return {
            opacity: withTiming(isVisible ? 1 : 0),
            transform: [{
                scale: withTiming(isVisible ? 1 : 0.6) 
            }]
        }
    }, [])
    
    const objectifID = objectif.objectifID

    return (
        <Animated.View key={index} style={viewableItems ? rStyle : undefined}>
            <PresentationObjectifBlock 
                key={objectifID} 
                objectif={objectif}
                index={index}
                handleOnPress={() => onPress(getSeriazableObjectif(objectif))}
                habits={habits}
                noAnimation={noEnteringAnimation}/>
        </Animated.View>
    )
}


interface PresentationObjectifListProps {
    objectifs: Objectif[],
    handleOnPress: (seriazableObjectif: SeriazableObjectif) => void,
    noEnteringAnimation?: boolean,
    marginBottom?: number,
    differentUserMail?: string,
    habitsForObjectifs?: {[key: string]: Habit[]},
    handleSearchObjectif?: (text: string) => void,
    navigation?: NativeStackNavigationProp<any>,
}


export const PresentationObjectifList: FC<PresentationObjectifListProps> = ({
    objectifs, 
    handleOnPress,
    noEnteringAnimation,
    differentUserMail,
    habitsForObjectifs,
    handleSearchObjectif,
    navigation
}) => {
    const {Habits} = useContext(HabitsContext)
    const {user} = useContext(UserContext)

    const habits = Object.values(Habits)

    const [habitsForObjectifsFinal, setHabitsForObjectifsFinal] = useState<{[key: string]: Habit[]}>({})

    useEffect(() => {
        if(user) {
            if(differentUserMail && user.email !== differentUserMail && habitsForObjectifs)
                setHabitsForObjectifsFinal(habitsForObjectifs)

            else {
                const objHabits: {[key: string]: Habit[]} = {}
    
                objectifs.map((obj) => {
                    objHabits[obj.objectifID] = habits.filter((habit) => habit.objectifID === obj.objectifID)
                })
    
                setHabitsForObjectifsFinal(objHabits)
            }
        }
    }, [differentUserMail])    

    return(
        <AnimatedScrollComponent 
            data={objectifs} 
            renderItem={({item, index}) => 
                <RenderPresentationObjectifs 
                    item={item} 
                    index={index} 
                    onPress={handleOnPress}
                    habits={habitsForObjectifsFinal[item.objectifID] ?? []}
                    noEnteringAnimation={noEnteringAnimation}
                />
            }

            searchBarMethod={handleSearchObjectif}
            searchBarPlaceholder='Rechercher un objectif...'
            navigation={navigation}

            showsVerticalScrollIndicator={false}
            style={{paddingTop: 100}}
            contentContainerStyle={{paddingHorizontal: 0, paddingBottom: 260, gap: 20}}
        />
    )
}