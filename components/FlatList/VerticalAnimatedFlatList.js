import { useSharedValue } from "react-native-reanimated"
import { useRef } from "react"
import {Animated} from 'react-native'
import { HabitPresentationBlock, HabitudeBlock } from "../Habitudes/HabitudeBlock"
import { NormalText } from "../../styles/StyledText"
import { View } from "react-native"
import { HabitudeListItem } from "../Habitudes/HabitudeListItem"

export default VerticalAnimatedFlatList = ({data, currentDateString, presentation, numCols = 1}) => {

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
        return (
            <HabitudeListItem habitID={item.habitID} index={index}
                currentDateString={currentDateString}
                scrollY={scrollY} 
                listVisibility={listVisibility}
                viewableItems={viewableItems}/>
        )
    }

    const renderHabitPresentation = ({item: habit}) => {
        console.log("HAB : ", habit)
        return <HabitPresentationBlock habitude={habit} viewableItems={viewableItems}/>
    }

    return(
        <Animated.FlatList 
            data={data} 
            renderItem={presentation ? renderHabitPresentation : renderHabits}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 120}} //30 + 10 dans le habitudeBlock
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