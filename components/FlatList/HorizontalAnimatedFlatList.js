import { useSharedValue } from "react-native-reanimated"
import { useRef } from "react"
import {Animated} from 'react-native'
import { HabitudeBlock } from "../Habitudes/HabitudeBlock"
import ObjectifBlock from "../Objectifs/ObjectifBlock"
import { FlatList } from "react-native"

export default HorizontalAnimatedFlatList = ({data, currentDateString}) => {

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
            <HabitudeBlock habitID={item.habitID} index={index}
                currentDateString={currentDateString}
                scrollY={scrollY} 
                listVisibility={listVisibility}
                viewableItems={viewableItems}/>
        )
    }
    const renderObjectifs = ({item, index}) => {
        console.log("Item : ", item)
        const objectifID = item.objectifID
        const frequency = item.frequency

        return (
            <ObjectifBlock key={objectifID} objectifID={objectifID} frequency={frequency}/>
        )
    }

    return(
        <FlatList 
            data={data} 
            renderItem={renderObjectifs}
            showsHorizontalScrollIndicator={false}
            style={{marginHorizontal: -30}}
            contentContainerStyle={{paddingHorizontal: 30, gap: 15}}
            horizontal
        />
    )
}