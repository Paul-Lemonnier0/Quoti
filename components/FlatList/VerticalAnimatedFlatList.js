import { useSharedValue } from "react-native-reanimated"
import { useRef } from "react"
import {Animated} from 'react-native'
import { HabitudeBlock } from "../Habitudes/HabitudeBlock"

export default VerticalAnimatedFlatList = ({data, currentDateString}) => {

    const viewableItems = useSharedValue([]);
    const listVisibility = useSharedValue(1);
    const scrollY = useRef(new Animated.Value(0)).current;

    const onViewableItemsChanged = ({viewableItems: vItems}) => {
        viewableItems.value = vItems
    };
    const viewabilityConfigCallbackPairs = useRef([
        { onViewableItemsChanged },
    ]);

    const numCols = 2;

      const renderHabits = ({item, index}) => {
        return (
            <HabitudeBlock habitID={item.habitID} index={index}
                currentDateString={currentDateString}
                scrollY={scrollY} 
                listVisibility={listVisibility}
                viewableItems={viewableItems}/>
        )
    }

    return(
        <Animated.FlatList 
            data={data} 
            renderItem={renderHabits}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 120, marginLeft: 30}} //30 + 10 dans le habitudeBlock
            viewabilityConfig={{itemVisiblePercentThreshold: 100}}
            viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
            key={numCols}
            keyExtractor={(item) => item.habitID}
            scrollEventThrottle={16}
            numColumns={numCols}
            onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: scrollY}}}],
                {useNativeDriver: true}
            )}
        />
    )
}