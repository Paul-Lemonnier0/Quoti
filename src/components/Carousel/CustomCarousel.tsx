import { StyleSheet, Dimensions, View } from "react-native"
import { FC, ReactNode, useState } from "react"
import Pagination from "./Pagination"
import Carousel, { CarouselRenderItem } from "react-native-reanimated-carousel"
import React from "react"

export interface CustomCarouselProps {
    data: Array<any>,
    renderItem: CarouselRenderItem<any>,
    doneSteps?: number,
    defaultIndex?: number,
    pagination?: boolean
}

export const CustomCarousel: FC<CustomCarouselProps> = ({data, doneSteps, renderItem, defaultIndex = 0, pagination = true}) => {

    const SLIDER_WIDTH = Dimensions.get('window').width
    const [currentIndex, setCurrentIndex] = useState(doneSteps ? doneSteps : defaultIndex)

    return(
        <View style={styles.container}>
            <Carousel
                data={data} 
                style={{display: "flex"}}
                loop={false}
                scrollAnimationDuration={500}
                renderItem={renderItem}
                width={SLIDER_WIDTH}
                onProgressChange={(_, absoluteProgress) => setCurrentIndex(Math.round(absoluteProgress))}/>

            {pagination && <Pagination length={data.length} currentIndex={currentIndex}/>}
        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        marginHorizontal: -40, 
        gap: 5,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
})