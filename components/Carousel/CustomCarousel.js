import { StyleSheet, Dimensions, View } from "react-native"
import { useState } from "react"
import Pagination from "./Pagination"
import Carousel from "react-native-reanimated-carousel"

export const CustomCarousel = ({data, doneSteps, renderItem, defaultIndex, pagination = true}) => {

    const SLIDER_WIDTH = Dimensions.get('window').width
    const [currentIndex, setCurrentIndex] = useState(doneSteps ? doneSteps : (defaultIndex ? defaultIndex : 0))

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