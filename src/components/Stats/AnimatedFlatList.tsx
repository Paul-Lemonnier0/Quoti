import { FlatList, ListRenderItem, StyleSheet, View, ViewStyle, ViewToken } from "react-native"
import Animated, { SharedValue, useSharedValue } from "react-native-reanimated"
import React, { FC, LegacyRef, useCallback, useEffect, useRef } from "react"
import { VERTICAL_BAR_WIDTH } from "./VerticalBar"

interface AnimatedFlatListProps {
    data: any[],
    RenderItem: FC<{ item: any, viewableItems: SharedValue<ViewToken[]> }>,
    horizontal?: boolean,
    containerStyle?: ViewStyle,
    listContainerStyle?: ViewStyle,
    contentListContainerStyle?: ViewStyle,
    initialIndex?: number,
    itemSize?: number
}

export const AnimatedFlatList: FC<AnimatedFlatListProps> = ({
    data, 
    RenderItem, 
    horizontal, 
    containerStyle, 
    listContainerStyle, 
    contentListContainerStyle,
    initialIndex,
    itemSize
}) => {
            
    const viewableItems = useSharedValue<ViewToken[]>([])

    const onViewableItemsChanged = useCallback(({viewableItems: vItems}) => {
        viewableItems.value = vItems
    }, []);
    
    const listRef = useRef<FlatList>(null)

    return (
        <View style={[styles.container, containerStyle]}>
            <FlatList
                ref={listRef}
                data={data}
                renderItem={({item}) => <RenderItem item={item} viewableItems={viewableItems}/> }

                keyExtractor={(item) => (item as any).id}
                horizontal={horizontal}
                onLayout={() => listRef.current?.scrollToEnd({animated: true})}
                getItemLayout={(data, index) => (
                    {length: itemSize ?? VERTICAL_BAR_WIDTH, offset: (itemSize ?? VERTICAL_BAR_WIDTH + 15) * index, index}
                  )}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}

                style={[styles.listContainer, listContainerStyle]}
                contentContainerStyle={[styles.listContentContainer, contentListContainerStyle]}
                onViewableItemsChanged={onViewableItemsChanged}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },

    listContainer: {
        flex: 1,
        marginHorizontal: -20,
    },

    listContentContainer: {
        paddingHorizontal: 20,
        // gap: 20,
    },
})