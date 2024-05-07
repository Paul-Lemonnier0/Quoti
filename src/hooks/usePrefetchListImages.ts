import { Image } from "expo-image";
import { useCallback, useRef } from "react";

const usePrefetchListImages = () => {
    const dataItems = useRef<any[]>([]);
  
    const highestPrefetchedIndex = useRef(0);
    const previousLength = useRef(0);
  
    const setItems = (items: any[]) => {
      dataItems.current = items;
    };
  
    const resetPrefetch = () => {
      highestPrefetchedIndex.current = 0;
      previousLength.current = 0;
    };
  
    const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: any[] }) => {
      const lastIndex = viewableItems?.[viewableItems.length - 1]?.index;
    
      if (lastIndex == null) return;
    
      const hasNewItems = dataItems.current.length > previousLength.current;
    
      if (lastIndex % 5 !== 0 && !hasNewItems) return;
    
      previousLength.current = dataItems.current.length;
    
      const sliceFrom = highestPrefetchedIndex.current === 0 || hasNewItems ? lastIndex : lastIndex + 5;
      const sliceTo = lastIndex + 10;
    
      const nextItems = dataItems.current.slice(sliceFrom, sliceTo + 1);
    
      const imagesToPrefetch: string[] = [];
    
      const addImages = (item: any) => {
        if(item.photoURL) {
          imagesToPrefetch.push(item.photoURL);
        }
      };
    
      for (const item of nextItems) {
        addImages(item);
      }
    
      highestPrefetchedIndex.current = sliceTo;
    
      Image.prefetch(imagesToPrefetch);
    }, []);
  
    return {
      setItems,
      highestPrefetchedIndex,
      onViewableItemsChanged,
    };
};

export default usePrefetchListImages