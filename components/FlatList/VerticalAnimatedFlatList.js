import { FlatList } from "react-native"
import { useSharedValue } from "react-native-reanimated"
import { HabitudeListItem } from "../Habitudes/HabitudeListItem"
import { useRef } from "react"
import { useCallback } from "react"

export default VerticalAnimatedFlatList = ({data, renderItem}) => {

    const viewableItems = useSharedValue([]);
    const onViewableItemsChanged = ({viewableItems: vItems}) => {
        // console.log(vItems);
        viewableItems.value = vItems
    };
    const viewabilityConfigCallbackPairs = useRef([
        { onViewableItemsChanged },
    ]);

      const renderHabits = ({item}) => {
        return (<HabitudeListItem id={item.habitID} viewableItems={viewableItems}/>)
    }

    return(
        <FlatList 
            data={data} 
            renderItem={renderHabits}
            contentContainerStyle={{paddingBottom: 100}}
            showsVerticalScrollIndicator={false}
            viewabilityConfig={{itemVisiblePercentThreshold: 50}}
            viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
            key={2}
            numColumns={1}
        />
    )
}