import { HabitudeListItem, HabitudeListItemPresentation } from "./HabitudeListItem"
import { FC, memo, useCallback } from "react"
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { Habit } from "../../types/HabitTypes"
import React from "react"
import { ViewToken } from "react-native"
import { FlatList } from "react-native"

interface RenderPresentationHabitItemProps {
  item: Habit,
  index: number,
  viewableItems: Animated.SharedValue<ViewToken[]>,
}

export interface HabitudesListProps {
  habits: Habit[],
  handleOnPress: (
    habitude: Habit, 
    objectifID: string | undefined,
    currentDateString: string) => void,
  currentDateString: string,
  basicAnimation?: boolean,
  noAnimation?: boolean
}

const HabitudesList: FC<HabitudesListProps> = ({
  habits, 
  handleOnPress, 
  currentDateString,
  basicAnimation,
  noAnimation
}) => {

  const viewableItems = useSharedValue<ViewToken[]>([])

  const onViewableItemsChanged = useCallback(({viewableItems: vItems}) => {
      viewableItems.value = vItems
  }, []);

  const RenderHabitItem: FC<RenderPresentationHabitItemProps> = React.memo(({item: habit, index, viewableItems}) => {
      
    const rStyle = useAnimatedStyle(() => {
        const isVisible = viewableItems.value.some((viewableItem) => viewableItem.item.habitID === habit.habitID && viewableItem.isViewable);

        return {
            opacity: withTiming(isVisible ? 1 : 0),
            transform: [{
                scale: withTiming(isVisible ? 1 : 0.6) 
            }]
          }
      }, [])
      
      const delay = index * 200 > 600 ? 600 : index * 200

      return(
        <Animated.View entering={FadeInDown.delay(delay)}>
          <Animated.View key={index} style={(noAnimation || basicAnimation) ? undefined : rStyle}>
              <HabitudeListItem 
                  habitude={habit} 
                  key={habit.habitID} 
                  index={index} 
                  noAnimation={noAnimation || !basicAnimation}
                  handleOnPress={handleOnPress} 
                  currentDateString={currentDateString}
              />
          </Animated.View>
        </Animated.View>
      )
  })

    return(
      <FlatList 
        style={{gap: 20, margin: -20}}
        contentContainerStyle={{gap: 20, marginBottom: 40, padding: 20}}
        data={habits}
        key={1}
        scrollEnabled={(!basicAnimation && !noAnimation)}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.habitID}
        renderItem={({item, index}) => 
          <RenderHabitItem 
              item={item} 
              index={index} 
              viewableItems={viewableItems}
          />
        }
        onViewableItemsChanged={onViewableItemsChanged}
      />
    )
}

export default HabitudesList