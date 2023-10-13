import { FlatList } from "react-native"
import { useAnimatedScrollHandler, useSharedValue, withSpring, withTiming } from "react-native-reanimated"
import { HabitudeListItem } from "../Habitudes/HabitudeListItem"
import { useRef } from "react"
import { useCallback } from "react"
import {Animated} from 'react-native'

export default VerticalAnimatedFlatList = ({data, renderItem}) => {

    const viewableItems = useSharedValue([]);
    const listVisibility = useSharedValue(1);
    const scrollY = useRef(new Animated.Value(0)).current;

    const onViewableItemsChanged = ({viewableItems: vItems}) => {
        viewableItems.value = vItems
    };
    const viewabilityConfigCallbackPairs = useRef([
        { onViewableItemsChanged },
    ]);

      const renderHabits = ({item, index}) => {
        return (<HabitudeListItem id={item.habitID} index={index}
            scrollY={scrollY} listVisibility={listVisibility}
            viewableItems={viewableItems}/>)
    }

    return(
        <Animated.FlatList 
            data={data} 
            renderItem={renderHabits}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 120}}
            viewabilityConfig={{itemVisiblePercentThreshold: 100}}
            viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
            key={2}
            numColumns={1}
            onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: scrollY}}}],
                {useNativeDriver: true}
            )}
            scrollEventThrottle={16}
        />
    )
}